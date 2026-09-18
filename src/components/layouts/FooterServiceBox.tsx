import { cn } from "@/utils/classNames";
import type { FooterServiceBoxItem } from "@/constants/footer";

interface FooterServiceBoxProps {
  item: FooterServiceBoxItem;
}

export function FooterServiceBox({ item }: FooterServiceBoxProps) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "footer-info-box relative flex items-center gap-4 overflow-hidden rounded-2xl p-3 backdrop-blur-[10px] sm:rounded-[24px] sm:p-4 md:gap-6 md:p-5 xl:rounded-[28px] xl:p-[34px]",
        "border border-[rgba(255,170,210,0.10)]",
        "bg-[linear-gradient(135deg,rgba(52,16,30,0.96)_0%,rgba(30,10,18,0.98)_42%,rgba(14,5,9,0.99)_100%)]",
        "shadow-[0_12px_30px_rgba(0,0,0,0.30),0_0_22px_rgba(184,46,102,0.06),inset_0_1px_0_rgba(255,255,255,0.03)]",
        "transition-[transform,border-color,box-shadow] duration-350 ease-out",
        "after:pointer-events-none after:absolute after:right-[-40px] after:top-[-60px] after:z-0 after:h-[180px] after:w-[180px] after:rounded-full after:blur-lg after:content-['']",
        "after:bg-[radial-gradient(circle,rgba(255,120,180,0.10)_0%,transparent_72%)]",
      )}
    >
      <div
        className={cn(
          "footer-info-icon relative z-10 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl backdrop-blur-[10px] sm:size-16 md:size-[72px]",
          "border border-[rgba(255,170,210,0.14)] text-xl text-[#ffe6ef] sm:text-2xl md:text-[28px] md:rounded-3xl",
          "bg-[linear-gradient(135deg,rgba(68,18,38,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_20px_rgba(184,46,102,0.10),0_10px_24px_rgba(0,0,0,0.30)]",
          "before:pointer-events-none before:absolute before:inset-[10px] before:rounded-[18px] before:content-['']",
          "before:bg-[linear-gradient(135deg,rgba(255,120,180,0.14),rgba(184,46,102,0.06))]",
          "after:pointer-events-none after:absolute after:left-[-40%] after:top-[-30%] after:h-[180%] after:w-[70%] after:rotate-25 after:opacity-60 after:content-['']",
          "after:bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]",
        )}
      >
        <Icon
          aria-hidden
          className="relative z-10 text-[#ffdbe8] [text-shadow:0_0_12px_rgba(255,120,180,0.14)]"
        />
      </div>
      <div className="relative z-10 min-w-0 text-left">
        <p className="mb-3 text-[11px] font-extrabold tracking-[2px] text-[#df7ca5] xl:mb-[18px] sm:text-[13px] sm:tracking-[3px]">
          {item.title}
        </p>
        <p className="text-sm leading-relaxed text-[#e1ccf1] sm:text-[15px] sm:leading-loose">
          {item.descriptionLines[0]}
          <br />
          {item.descriptionLines[1]}
        </p>
      </div>
    </div>
  );
}
