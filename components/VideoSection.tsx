import Image from "next/image";
import { Settings2, Wifi } from "lucide-react";
import Widget from "./Widget";

// Dock icons, left to right. Files live in /public
const dockApps = [
  { name: "Wah", src: "/wahlogo.png" },
  { name: "Safari", src: "/safari.png" },
  { name: "Settings", src: "/settings.png" },
  { name: "Zoom", src: "/zoom.webp" },
  { name: "Meet", src: "/meet.webp" },
];

// Call videos, left to right. Files live in /public
const callVideos = ["/a.mp4", "/b.mp4"];

// Filled mic icon for the call controls bar (inherits text colour)
function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
      <path
        d="M5 11.5a7 7 0 0 0 14 0M12 18.5v3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Filled camera-off icon for the call controls bar (inherits text colour)
function VideoOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <rect x="0.5" y="5.5" width="17" height="13.5" rx="2.5" />
        <path d="M17 10l5.2-3a.7.7 0 0 1 1.05.6v8.8a.7.7 0 0 1-1.05.6L17 14z" />
      </g>
      {/* Slash: a gap in the bar colour (#1c1e25) with the line drawn on top */}
      <path d="M2.5 2.5l19 19" stroke="#1c1e25" strokeWidth="4.5" />
      <path
        d="M2.5 2.5l19 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
          {/* Widget pill: centred in the strip of wallpaper between the menu bar and the window.
              top-* centres it in that strip at each breakpoint; scale-* shrinks it with the rest of the mock on smaller screens */}
          <Widget className="absolute left-1/2 top-[7px] z-10 w-max -translate-x-1/2 scale-[0.4] sm:top-[21px] sm:scale-[0.7] lg:top-[37px] lg:scale-100" />

          {/* Black window frame */}
          <div className="w-full overflow-hidden rounded-xl bg-[#05070b] shadow-[0_28px_70px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:rounded-2xl lg:w-[68%]">
            {/* Title bar with traffic lights */}
            <div className="flex h-8 items-center gap-2 bg-[#1b1c20] px-4 sm:h-9">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
            </div>

            {/* VIDEO SPACE: a.mp4 + b.mp4 side by side, muted and looping. Padding and gap are in % so it scales with the window */}
            <div className="grid aspect-video w-full grid-cols-2 gap-x-[2.3%] px-[1.8%] py-[3.6%]">
              {callVideos.map((src) => (
                <div
                  key={src}
                  className="relative isolate overflow-hidden rounded-md sm:rounded-lg lg:rounded-[10px]"
                >
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Call controls bar: Unmute + Start Video on the left, End on the right */}
            <div
              aria-hidden="true"
              className="flex items-center justify-between bg-[#1c1e25] px-3 py-2 sm:px-[19px] sm:py-2.5"
            >
              <div className="flex items-center gap-2 whitespace-nowrap text-[#676871] sm:gap-3">
                <div className="flex flex-col items-center gap-0.5">
                  <MicIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[9px] leading-[13px] sm:text-[11px]">
                    Unmute
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <VideoOffIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[9px] leading-[13px] sm:text-[11px]">
                    Start Video
                  </span>
                </div>
              </div>

              <div className="flex h-5 items-center rounded-md bg-[#6c3133] px-2 text-[11px] font-medium text-[#7f6a69] sm:h-[25px] sm:px-2.5 sm:text-[13px]">
                End
              </div>
            </div>
          </div>
        </div>

        {/* macOS Dock: bottom centre of the wallpaper, sits in the padding under the window */}
        <div
          aria-hidden="true"
          className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-white/40 bg-white/25 p-1 shadow-[0_8px_24px_-6px_rgba(20,10,60,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl sm:bottom-2 sm:gap-1.5 sm:rounded-2xl lg:bottom-3 lg:gap-2.5 lg:rounded-3xl lg:p-1.5"
        >
          {dockApps.map((app) => (
            <Image
              key={app.name}
              src={app.src}
              alt=""
              width={128}
              height={128}
              className="h-5 w-5 object-contain sm:h-8 sm:w-8 lg:h-12 lg:w-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}