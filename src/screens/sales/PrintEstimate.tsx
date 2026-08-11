import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function PrintEstimate() {
  const { id } = useParams<{ id: string }>()
  const [estimate, setEstimate] = useState<any>(null)
  const [customer, setCustomer] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [id])

  async function load() {
    if (!id) return
    const { data: est } = await supabase.from("estimates").select("*, customers(*)").eq("id", id).maybeSingle()
    if (!est) return
    setEstimate(est)
    setCustomer(est.customers)

    const { data: biz } = await supabase.from("businesses").select("*").eq("id", est.business_id).maybeSingle()
    setBusiness(biz)

    const { data: lineItems } = await supabase.from("estimate_line_items").select("*").eq("estimate_id", id).order("sort_order")
    setItems(lineItems || [])
  }

  if (!estimate) return <p style={{ padding: 40 }}>Loading...</p>

  const isDraft = !estimate.sent_at && estimate.status !== "sent"

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Inter, sans-serif", padding: 24, position: "relative", overflow: "hidden" }}>
      {isDraft && (
        <div
          className="no-print-keep"
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-30deg)",
            fontSize: 90,
            fontWeight: 800,
            color: "rgba(220, 38, 38, 0.18)",
            letterSpacing: 8,
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          DRAFT
        </div>
      )}
      <div style={{ textAlign: "right", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, margin: 0 }}>ESTIMATE</h1>
        <p style={{ fontSize: 13, color: "#555" }}>
          <b>{business?.name}</b><br />
          {business?.street1}<br />
          {business?.city}, {business?.region}<br />
          {business?.country === "CA" ? "Canada" : "United States"}
        </p>
      </div>

      <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>BILL TO</p>
      <p style={{ fontSize: 14, marginBottom: 24 }}>
        <b>{[customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.name}</b><br />
        {customer?.company_name && <>{customer.company_name}<br /></>}
        {customer?.billing_address?.street1 && <>{customer.billing_address.street1}<br /></>}
        {customer?.billing_address?.street2 && <>{customer.billing_address.street2}<br /></>}
        {(customer?.billing_address?.city || customer?.billing_address?.province || customer?.billing_address?.postal_code) && (
          <>{customer?.billing_address?.city}{customer?.billing_address?.city && customer?.billing_address?.province ? ", " : ""}{customer?.billing_address?.province} {customer?.billing_address?.postal_code}<br /></>
        )}
        {customer?.email}<br />
        {customer?.phone}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 16 }}>
        <span>Estimate No. {estimate.estimate_number}</span>
        <span>{estimate.estimate_date}</span>
      </div>

      <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#111", color: "white" }}>
            <th style={{ textAlign: "left", padding: 6 }}>Item</th>
            <th style={{ padding: 6 }}>Qty</th>
            <th style={{ padding: 6 }}>Price</th>
            <th style={{ textAlign: "right", padding: 6 }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 6 }}>{it.item_name}</td>
              <td style={{ padding: 6, textAlign: "center" }}>{it.quantity}</td>
              <td style={{ padding: 6, textAlign: "center" }}>${it.unit_price}</td>
              <td style={{ padding: 6, textAlign: "right" }}>${it.line_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", marginTop: 16, fontSize: 13 }}>
        <p>Subtotal: ${estimate.subtotal}</p>
        <p>Tax: ${estimate.tax_total}</p>
        <p style={{ fontWeight: 700, fontSize: 16 }}>Total: ${estimate.total} {estimate.currency}</p>
      </div>

      <div style={{ textAlign: "center", marginTop: 40, color: "#999", fontSize: 11 }}>
        Powered by tractbook
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }} className="no-print">
        <button onClick={() => window.print()} style={{ background: "#1d4ed8", color: "white", padding: "10px 20px", borderRadius: 8, border: "none", fontWeight: 600 }}>
          Print / Save as PDF
        </button>
      </div>

      <style>{`@media print { .no-print { display: none; } }`}</style>
    </div>
  )
}



