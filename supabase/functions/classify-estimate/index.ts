import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { estimate_id } = await req.json()
    if (!estimate_id) {
      return new Response(JSON.stringify({ error: "estimate_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: estimate, error: estimateError } = await supabase
      .from("estimates")
      .select("id, summary, business_id, estimate_line_items(item_name, quantity, unit_price)")
      .eq("id", estimate_id)
      .maybeSingle()

    if (estimateError || !estimate) {
      return new Response(JSON.stringify({ error: "Estimate not found or access denied" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("industry")
      .eq("id", estimate.business_id)
      .maybeSingle()

    const itemsList = (estimate.estimate_line_items || [])
      .map((it: any) => `- ${it.item_name} (qty ${it.quantity}, $${it.unit_price} each)`)
      .join("\n")

    const prompt = `You are classifying a business estimate into a single business-line category.

Business industry: ${business?.industry || "unknown"}
Estimate summary: ${estimate.summary || "none provided"}
Line items:
${itemsList || "none"}

Classify this estimate into exactly ONE of these categories: Materials, Labor, Consulting, Equipment, Services, Other.
Respond with ONLY valid JSON in this exact format, nothing else:
{"category": "one of the categories above", "reason": "one short sentence why"}`

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY")!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    const anthropicData = await anthropicRes.json()
    const text = anthropicData?.content?.[0]?.text?.trim() || "{}"

    let parsed: { category?: string; reason?: string } = {}
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = { category: "Other", reason: "Could not parse classification." }
    }

    const category = parsed.category || "Other"

    await supabase
      .from("estimates")
      .update({ business_line_category: category })
      .eq("id", estimate_id)

    return new Response(JSON.stringify({ category, reason: parsed.reason }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
