import Image from "next/image";
import { Settings2, Wifi } from "lucide-react";

export default function VideoSection() {
  return (
    <section
      aria-label="Product demo"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      {/* macOS desktop: wallpaper served from /public/macos.png */}
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl shadow-[0_30px_80px_-24px_rgba(30,20,80,0.4)] ring-1 ring-black/5 sm:rounded-[32px]">
        <Image
          src="/macos.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          quality={90}
          className="object-cover object-center"
        />

        {/* macOS menu bar: logo on the left, status icons on the right */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 flex h-6 items-center justify-between bg-black/10 px-3 backdrop-blur-sm sm:h-7 sm:px-4"
        >
          {/* Logo from /public/wahlogo.png (brightness-0 invert makes it white; remove both to keep its original colors) */}
          <Image
            src="/wahlogo.png"
            alt=""
            width={18}
            height={18}
            className="h-4 w-4 object-contain brightness-0 invert sm:h-[18px] sm:w-[18px]"
          />

          <div className="flex items-center gap-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            <Wifi className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.25} />
            <Settings2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.25} />
          </div>
        </div>

        {/* Room above the window for the floating pill later */}
        <div className="relative flex justify-center px-4 pb-10 pt-10 sm:px-10 sm:pb-16 sm:pt-16 lg:px-0 lg:pb-28 lg:pt-24">
          {/* Black window frame */}
          <div className="w-full overflow-hidden rounded-xl bg-[#05070b] shadow-[0_28px_70px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:rounded-2xl lg:w-[68%]">
            {/* Title bar with traffic lights */}
            <div className="flex h-8 items-center gap-2 bg-[#1b1c20] px-4 sm:h-9">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
            </div>

            {/* VIDEO SPACE: empty for now, drop your <video> or player in here later */}
            <div className="aspect-video w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}