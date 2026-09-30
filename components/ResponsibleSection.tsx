// Same purple gradient as "Undetectable" in the hero.
const PURPLE = "linear-gradient(90deg, #6d28d9, #a855f7, #6d28d9)";

type Part = { text: string; tone?: "dark" | "brand" };

// Edit the wording here. "dark" is near-black, "brand" is the purple gradient.
const PARTS: Part[] = [
  { text: "Wah AI is made for conversations where getting help from AI is " },
  { text: "allowed", tone: "dark" },
  {
    text: ". Sales calls, client meetings, mock interviews, language practice, self-study. ",
  },
  { text: "Read the rules first.", tone: "dark" },
  {
    text: " If your employer, school, or the person on the other end says no, honor that. When you are not sure, ",
  },
  { text: "just ask", tone: "brand" },
  { text: "." },
];

export default function ResponsibleUseSection() {
  return (
    <section
      aria-label="Responsible use"
      className="w-full px-4 pb-24 pt-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p
          className="m-0 text-[#8b90a0]"
          style={{
            fontSize: "clamp(1.25rem, 2.6vw, 1.875rem)",
            lineHeight: 1.7,
            letterSpacing: "-0.025em",
          }}
        >
          {PARTS.map(({ text, tone }, i) => {
            if (tone === "dark") {
              return (
                <strong key={i} className="font-medium text-[#151515]">
                  {text}
                </strong>
              );
            }
            if (tone === "brand") {
              return (
                <span
                  key={i}
                  className="bg-clip-text font-medium text-transparent"
                  style={{
                    backgroundImage: PURPLE,
                    WebkitBoxDecorationBreak: "clone",
                    boxDecorationBreak: "clone",
                  }}
                >
                  {text}
                </span>
              );
            }
            return text;
          })}
        </p>
      </div>
    </section>
  );
}