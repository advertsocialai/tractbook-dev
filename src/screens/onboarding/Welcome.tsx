import { useNavigate } from "react-router-dom";
import { Wordmark } from "../../components/ui/Wordmark";
import { Button } from "../../components/ui/Button";

/**
 * Spacing below is measured directly from the source Figma export
 * (iPhone_16_-_1__1_.svg), not eyeballed:
 *   wordmark top:      82px
 *   wordmark -> H1:     52px gap
 *   H1 -> subtext:      20px gap
 *   subtext -> card:    71px gap
 *   card (blue) height: 188.19px
 *   card -> button:     50.81px gap
 *   button height:      43px, radius 10px (NOT a full pill)
 *   button -> terms:     7px gap
 */
export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="app-shell text-white"
      style={{
        background:
          "linear-gradient(155deg, #B2B2B2 0%, #B7C7F4 50%, #C0D4CB 76%, #CBCBCB 100%)",
      }}
    >
      <div className="w-full max-w-[391px] mx-auto flex flex-col items-center px-8 pt-[82px]">
        <Wordmark variant="light" className="h-[23px]" />

        <h1 className="text-[31px] leading-[1.15] font-bold text-center mt-[52px]">
          Financial control, built for growing businesses
        </h1>
        <p className="text-white/80 text-[14px] leading-snug text-center max-w-[300px] mt-[20px]">
          Create invoices, track expenses, and stay compliant — all from one
          intelligent dashboard.
        </p>

        {/* Card illustration: offsets match exact Figma geometry
            (blue backing is same width, 13px taller, shifted +8.7px right / -5.8px up) */}
        <div className="relative w-[143px] h-[175px] mt-[41px] rotate-[-4deg]">
          <div className="absolute bg-brand-blue-mid rounded-sm w-[143px] h-[188px] left-[9px] -top-[6px]" />
          <div className="relative bg-white text-black rounded-sm border border-border w-[143px] h-[175px] px-3 py-3 text-[9px]">
            <p className="font-semibold border-b border-border pb-1.5 mb-1.5">
              Net Income
            </p>

            <p className="font-semibold text-[8px] text-body">Income</p>
            <div className="flex justify-between text-[8px] mb-1.5">
              <span className="text-muted">
                2019
                <br />
                <span className="text-[9px] text-body">$24,000.00</span>
              </span>
              <span className="text-brand-blue-mid text-right">
                2020
                <br />
                <span className="text-[9px] font-semibold">$58,000.00</span>
              </span>
            </div>

            <p className="font-semibold text-[8px] text-body">Expense</p>
            <div className="flex justify-between text-[8px] mb-1.5">
              <span className="text-muted">
                2019
                <br />
                <span className="text-[9px] text-body">$24,000.00</span>
              </span>
              <span className="text-brand-blue-mid text-right">
                2020
                <br />
                <span className="text-[9px] font-semibold">$8,500.00</span>
              </span>
            </div>

            <div className="border-t border-border pt-1.5">
              <p className="font-semibold text-[8px] text-body">Net Income</p>
              <div className="flex justify-between text-[8px]">
                <span className="text-muted">
                  2019
                  <br />
                  <span className="text-[9px] text-body">$18,000</span>
                </span>
                <span className="text-brand-blue-mid text-right">
                  2020
                  <br />
                  <span className="text-[9px] font-semibold">$49,500.00</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-[51px]">
          <Button
            variant="primary"
            className="!rounded-[10px] h-[43px]"
            onClick={() => navigate("/sign-up")}
          >
            Get Started
          </Button>
        </div>
        <p className="text-[11px] text-white/70 text-center leading-snug px-2 mt-[7px]">
          By signing up, you are indicating that you have read and agree to
          the <span className="underline font-medium">Terms of Use</span> and{" "}
          <span className="underline font-medium">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

