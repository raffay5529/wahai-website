"use client";

import Image from "next/image";
import Draggable from "react-draggable";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";

// Web version of the desktop widget pill: same look, same hover effects and the
// same Ask / Hide button. Ask opens the Assist box under the pill. The
// desktop-only parts are left out: window dragging over IPC, double-click to
// expand, react-router, and syncing with the real Assist panel. The round icon
// on the left is /public/dl.png (copy it from src/assets/dl.png).

type WidgetProps = {
  /** Icon in the round badge on the left. The file lives in /public. */
  iconSrc?: string;
  /** Start with the Ask button open (it then reads "Hide" with a chevron). */
  defaultAskOpen?: boolean;
  /** Runs when Ask / Hide is clicked, with the new open state. */
  onAskToggle?: (open: boolean) => void;
  /** Runs when a message is sent from the Assist box, with the text. The box is cleared right after. */
  onSend?: (text: string) => void;
  /** Runs when the Stop button is clicked. */
  onStop?: () => void;
  /** Extra classes on the outer wrapper (pill + Assist box), e.g. to position it inside your layout. */
  className?: string;
};

// Quick actions under the answer in the Assist box, left to right.
const assistActions = [
  { label: "Assist", Icon: SparklesIcon },
  { label: "What should I say?", Icon: WandSparklesIcon },
  { label: "Follow-up questions", Icon: MessageSquareIcon },
  { label: "Recap", Icon: RefreshIcon },
];

// ---- Dragging helpers ----
// How far (in px) the widget may move from where it sits at rest.
type Limits = { left: number; right: number; top: number; bottom: number };

// Keeps a value between min and max. If the widget is bigger than the space
// (min > max) it just sits in the middle.
const clamp = (value: number, min: number, max: number) =>
  min > max ? (min + max) / 2 : Math.min(Math.max(value, min), max);

// Works out how far the widget can travel before it would leave the wallpaper.
// The drag layer fills the wallpaper box, so its on-screen size is the play
// area. Everything is measured from real on-screen boxes, so the centring and
// scale classes on the widget need no special handling. While the Assist box
// is open it counts as part of the widget.
function measureLimits(
  layer: HTMLElement | null,
  widget: HTMLElement | null,
  panel: HTMLElement | null,
): Limits | null {
  if (!layer || !widget) return null;

  const area = layer.getBoundingClientRect();
  if (!area.width || !area.height) return null;

  const pill = widget.getBoundingClientRect();
  const box = panel ? panel.getBoundingClientRect() : pill;

  const left = Math.min(pill.left, box.left);
  const right = Math.max(pill.right, box.right);
  const top = Math.min(pill.top, box.top);
  const bottom = Math.max(pill.bottom, box.bottom);

  return {
    left: area.left - left,
    right: area.width - (right - area.left),
    top: area.top - top,
    bottom: area.height - (bottom - area.top),
  };
}

export default function Widget({
  iconSrc = "/wahlogo.png",
  defaultAskOpen = true,
  onAskToggle,
  onSend,
  onStop,
  className,
}: WidgetProps) {
  // Flips the Ask button between "Ask" and "Hide". In the desktop app this
  // follows the Assist panel; on the web it also opens / closes the Assist box.
  const [askOpen, setAskOpen] = useState(defaultAskOpen);

  // Text typed in the Assist box. It lives here so it survives Hide / Ask.
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAskClick = () => {
    const next = !askOpen;
    setAskOpen(next);
    onAskToggle?.(next);
    // Put the cursor in the box as soon as it opens.
    if (next) {
      requestAnimationFrame(() =>
        inputRef.current?.focus({ preventScroll: true }),
      );
    }
  };

  // Enter or the send button: hand the text to onSend, then clear the box.
  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = draft.trim();
    if (text) {
      onSend?.(text);
      setDraft("");
    }
    inputRef.current?.focus({ preventScroll: true });
  };

  // ---- Dragging ----
  // The widget sits inside a full-size, click-through layer, and react-draggable
  // moves that layer. That keeps the `className` you pass in (centring, top-*,
  // scale-*) working exactly as before, and the pill follows the cursor 1:1
  // even when it is scaled down on small screens.
  const dragRef = useRef<HTMLDivElement>(null); // the layer that moves
  const widgetRef = useRef<HTMLDivElement>(null); // the pill
  const panelRef = useRef<HTMLDivElement>(null); // the Assist box, while open
  const isDragging = useRef(false);

  // How far the layer has moved from its resting place, in px.
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // How far it may move. Measured again every time a drag starts.
  const [limits, setLimits] = useState<Limits | false>(false);

  // Pulls the widget back inside the wallpaper if it ended up outside (window
  // resized, or the Assist box opened next to an edge). It glides there.
  const keepInside = useCallback(() => {
    if (isDragging.current) return;
    const max = measureLimits(
      dragRef.current,
      widgetRef.current,
      panelRef.current,
    );
    if (!max) return;
    setPos((p) => {
      const x = clamp(p.x, max.left, max.right);
      const y = clamp(p.y, max.top, max.bottom);
      return x === p.x && y === p.y ? p : { x, y };
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", keepInside);
    return () => window.removeEventListener("resize", keepInside);
  }, [keepInside]);

  // The widget gets bigger / smaller when the Assist box opens / closes.
  useEffect(() => {
    keepInside();
  }, [askOpen, keepInside]);

  const handleDragStart = (x: number, y: number) => {
    isDragging.current = true;
    const max = measureLimits(
      dragRef.current,
      widgetRef.current,
      panelRef.current,
    );
    // The range always includes where the widget is right now, so starting a
    // drag can never make it jump.
    setLimits(
      max
        ? {
            left: Math.min(max.left, x),
            right: Math.max(max.right, x),
            top: Math.min(max.top, y),
            bottom: Math.max(max.bottom, y),
          }
        : false,
    );
  };

  // x / y arrive already held inside the limits by react-draggable, so the
  // widget stops cleanly at the edge and stays put until the cursor comes back.
  const handleDrag = (x: number, y: number) => {
    setPos((p) => (p.x === x && p.y === y ? p : { x, y }));
  };

  // Draggable below: nodeRef is needed on React 19 (no findDOMNode). The pill is
  // the handle, except its buttons, so Ask and Stop still click normally.
  // (The onStop here is Draggable's, not the Stop button's prop.)
  return (
    <Draggable
      nodeRef={dragRef as RefObject<HTMLElement>}
      handle=".widget-pill"
      cancel="button"
      position={pos}
      bounds={limits}
      onStart={(_, data) => handleDragStart(data.x, data.y)}
      onDrag={(_, data) => handleDrag(data.x, data.y)}
      onStop={() => {
        isDragging.current = false;
      }}
    >
      <div ref={dragRef} className="widget-drag" style={dragLayerStyle}>
        <div
          ref={widgetRef}
          className={className}
          style={{ pointerEvents: "auto" }}
        >
          {/* Anchor for the Assist box: it opens right under the pill */}
          <div style={pillAnchorStyle}>
            <div
              className="widget-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                height: 50,
                padding: "5px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 999,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <style>{`
                .widget-pill {
                  background: rgba(14, 14, 16, 0.75);
                  transition: background 0.15s ease;
                }
                .widget-dl-circle {
                  background: rgba(20, 20, 22, 0.85);
                  transition: background 0.15s ease;
                }
                .widget-hover-zoom {
                  transition: transform 0.15s ease;
                }
                /* Assist box: fades and slides in under the pill when Ask is clicked. */
                .widget-panel {
                  transform-origin: top center;
                  animation: widget-panel-in 0.16s ease-out;
                }
                @keyframes widget-panel-in {
                  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
                  to { opacity: 1; transform: none; }
                }
                /* Ring around the text box while you type. */
                .widget-input-box:focus-within {
                  box-shadow: 0 0 0 1px rgba(196, 160, 255, 0.45),
                    0 0 12px rgba(139, 92, 246, 0.25);
                }
                /* Dragging: grab cursor on the pill. The drag layer glides when the
                   widget is pulled back inside the wallpaper, but has no delay while
                   you drag, so it follows the cursor exactly. */
                .widget-pill {
                  cursor: grab;
                }
                .widget-drag {
                  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .widget-drag.react-draggable-dragging {
                  transition: none;
                }
                .widget-drag.react-draggable-dragging .widget-pill {
                  cursor: grabbing;
                }
                @media (prefers-reduced-motion: reduce) {
                  .widget-panel { animation: none; }
                  .widget-drag { transition: none; }
                }
                /* Hover effects only where a mouse can hover, so touch screens
                   don't get stuck on the hovered look after a tap. */
                @media (hover: hover) {
                  .widget-pill:hover {
                    background: rgba(210, 210, 214, 0.8);
                  }
                  .widget-hover-zoom:hover {
                    transform: scale(1.06);
                  }
                }
              `}</style>

              {/* Round icon badge (decorative) */}
              <div
                className="widget-dl-circle"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={iconSrc}
                  alt=""
                  width={19}
                  height={19}
                  draggable={false}
                  style={
                    {
                      width: 19,
                      height: 19,
                      objectFit: "contain",
                      WebkitUserDrag: "none",
                      userSelect: "none",
                      pointerEvents: "none",
                    } as CSSProperties
                  }
                />
              </div>

              <button
                type="button"
                onClick={handleAskClick}
                aria-expanded={askOpen}
                className="widget-hover-zoom"
                style={{
                  ...askButtonStyle,
                  ...(askOpen ? askButtonActiveStyle : {}),
                }}
              >
                <RocketIcon />
                {askOpen ? "Hide" : "Ask"}
                {askOpen && <ChevronUpIcon />}
              </button>

              <button
                type="button"
                onClick={() => onStop?.()}
                title="Stop"
                aria-label="Stop"
                className="widget-hover-zoom"
                style={iconButtonStyle}
              >
                <SquareIcon />
              </button>
            </div>

            {askOpen && (
              <div style={panelAnchorStyle}>
                <div
                  ref={panelRef}
                  role="region"
                  aria-label="Assist"
                  className="widget-panel"
                  style={panelStyle}
                  onAnimationEnd={keepInside}
                >
                  {/* Conversation: your question, then the answer */}
                  <div style={userBubbleRowStyle}>
                    <div style={userBubbleStyle}>What should I say?</div>
                  </div>
                  <p style={answerStyle}>
                    “A discounted cash flow model values a company by projecting
                    future free cash flows and discounting them to present value
                    using the weighted average cost of capital.”
                  </p>

                  {/* Quick actions */}
                  <div style={chipsRowStyle}>
                    {assistActions.map(({ label, Icon }, i) => (
                      <Fragment key={label}>
                        {i > 0 && (
                          <span style={chipDotStyle} aria-hidden="true" />
                        )}
                        <span style={chipStyle}>
                          <Icon />
                          {label}
                        </span>
                      </Fragment>
                    ))}
                  </div>

                  {/* Text box: type, then Enter or the send button. The text clears once it is sent. */}
                  <form
                    onSubmit={handleSend}
                    className="widget-input-box"
                    style={inputBoxStyle}
                  >
                    <div style={inputRowStyle}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        aria-label="Ask about your screen or conversation"
                        autoComplete="off"
                        enterKeyHint="send"
                        style={inputStyle}
                      />
                      {!draft && (
                        <div aria-hidden="true" style={placeholderStyle}>
                          Ask about your screen or conversation, or
                          <span style={keyCapStyle}>
                            <CommandIcon />
                          </span>
                          <span style={keyCapStyle}>
                            <EnterIcon />
                          </span>
                          for Assist
                        </div>
                      )}
                    </div>

                    <div style={inputFooterStyle}>
                      <div style={inputToolsStyle}>
                        <span style={smartPillStyle}>
                          <ZapIcon />
                          Smart
                        </span>
                        <span style={moreStyle} aria-hidden="true">
                          <EllipsisIcon />
                        </span>
                      </div>

                      <button
                        type="submit"
                        title="Send"
                        aria-label="Send"
                        className="widget-hover-zoom"
                        style={sendButtonStyle}
                      >
                        <SendIcon />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}

// Wraps the pill so the Assist box can be placed right under it.
const pillAnchorStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  width: "fit-content",
};

// Full-size layer that carries the drag offset. It fills the wallpaper box (the
// nearest positioned parent), which is also the area the widget is kept inside.
// Clicks go straight through it; the widget turns them back on. z-10 is the
// same level the widget had before.
const dragLayerStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 10,
  pointerEvents: "none",
};

// padding: 0 and the pointer cursor make the buttons look the same on the web
// whether or not your site has a CSS reset.
const iconButtonStyle: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "100%",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  background: "#242426",
  boxShadow:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flexShrink: 0,
  padding: 0,
  cursor: "pointer",
};

const askButtonStyle: CSSProperties = {
  height: 32,
  borderRadius: 999,
  border: "1px solid rgba(196, 160, 255, 0.4)",
  background: "linear-gradient(180deg, #9b6bff 0%, #7c3aed 100%)",
  boxShadow: "0 0 12px rgba(139, 92, 246, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  fontSize: 14,
  fontWeight: 500,

  padding: "0 14px",
  flexShrink: 0,
  cursor: "pointer",
};

// Applied on top of askButtonStyle when the button is open (it reads "Hide").
// Only background/border/shadow change — everything else (size, padding,
// layout) is inherited from askButtonStyle.
const askButtonActiveStyle: CSSProperties = {
  border: "1px solid rgba(255, 255, 255, 0.3)",
  background: "linear-gradient(180deg, #4a4a50 0%, #2c2c30 100%)",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.12), 0 2px 4px rgba(0, 0, 0, 0.3)",
};

// ---- Assist box (opens under the pill when Ask is clicked) ----
// Same dark look and thin white border as the pill. No blur, and the dark
// background is see-through (alpha 0.6 in panelStyle) so the video shows behind
// it. The accent is the Ask button's purple (swap the gradient below for blue
// if you want it bluer).

// Centres the box under the pill, whatever its width.
const panelAnchorStyle: CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: 8,
  display: "flex",
  justifyContent: "center",
};

const panelStyle: CSSProperties = {
  width: 520,
  flexShrink: 0,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "14px 16px 16px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: 18,
  background: "rgba(14, 14, 16, 0.6)",
  boxShadow: "0 18px 50px rgba(0, 0, 0, 0.45)",
  color: "#fff",
  fontSize: 13,
  lineHeight: 1.5,
  textAlign: "left",
};

const userBubbleRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
};

const userBubbleStyle: CSSProperties = {
  padding: "5px 14px",
  border: "1px solid rgba(196, 160, 255, 0.4)",
  borderRadius: 999,
  background: "linear-gradient(180deg, #9b6bff 0%, #7c3aed 100%)",
  boxShadow: "0 0 12px rgba(139, 92, 246, 0.45), 0 2px 4px rgba(0, 0, 0, 0.2)",
  fontSize: 12.5,
  fontWeight: 600,
};

const answerStyle: CSSProperties = {
  margin: 0,
  fontSize: 12.5,
  color: "rgba(255, 255, 255, 0.9)",
};

const chipsRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "6px 10px",
  fontSize: 12,
  color: "rgba(255, 255, 255, 0.75)",
};

const chipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  whiteSpace: "nowrap",
};

const chipDotStyle: CSSProperties = {
  width: 3,
  height: 3,
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.35)",
};

const inputBoxStyle: CSSProperties = {
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "12px 12px 10px 14px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: 14,
  background: "rgba(255, 255, 255, 0.05)",
};

const inputRowStyle: CSSProperties = {
  position: "relative",
};

const inputStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: 20,
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  border: 0,
  outline: "none",
  background: "transparent",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 13,
  lineHeight: "20px",
};

// Stands in for the input's placeholder (a real placeholder can't hold the
// key icons). It sits on top of the input and lets clicks through.
const placeholderStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  gap: 6,
  overflow: "hidden",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  fontSize: 13,
  color: "rgba(255, 255, 255, 0.45)",
};

const keyCapStyle: CSSProperties = {
  width: 20,
  height: 20,
  borderRadius: 5,
  border: "1px solid rgba(255, 255, 255, 0.25)",
  background: "rgba(255, 255, 255, 0.06)",
  color: "rgba(255, 255, 255, 0.7)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const inputFooterStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const inputToolsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const smartPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 26,
  padding: "0 10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(255, 255, 255, 0.65)",
};

const moreStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 26,
  height: 26,
  color: "rgba(255, 255, 255, 0.55)",
};

// The extra 2px of left padding nudges the triangle so it looks centred.
const sendButtonStyle: CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: "100%",
  border: "1px solid rgba(196, 160, 255, 0.4)",
  background: "linear-gradient(180deg, #9b6bff 0%, #7c3aed 100%)",
  boxShadow: "0 0 12px rgba(139, 92, 246, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: "0 0 0 2px",
  cursor: "pointer",
};

function RocketIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function SquareIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

// Shared frame for the small line icons used in the Assist box.
function SvgIcon({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SparklesIcon() {
  return (
    <SvgIcon size={13}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </SvgIcon>
  );
}

function WandSparklesIcon() {
  return (
    <SvgIcon size={13}>
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </SvgIcon>
  );
}

function MessageSquareIcon() {
  return (
    <SvgIcon size={13}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </SvgIcon>
  );
}

function RefreshIcon() {
  return (
    <SvgIcon size={13}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </SvgIcon>
  );
}

function ZapIcon() {
  return (
    <SvgIcon size={12}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </SvgIcon>
  );
}

function EllipsisIcon() {
  return (
    <SvgIcon size={16}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </SvgIcon>
  );
}

function CommandIcon() {
  return (
    <SvgIcon size={11}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </SvgIcon>
  );
}

function EnterIcon() {
  return (
    <SvgIcon size={11}>
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </SvgIcon>
  );
}

function SendIcon() {
  return (
    <SvgIcon size={12}>
      <polygon points="6 3 20 12 6 21 6 3" fill="currentColor" />
    </SvgIcon>
  );
}