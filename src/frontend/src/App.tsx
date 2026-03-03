import { useEffect, useRef, useState } from "react";

type Phase = "landing" | "opening" | "letter";

const letterParagraphs = [
  {
    id: "p1",
    text: "You probably don't realize how much love you are going to bring in this world. I'm sure that this child will feel your warmth and kindness on a day-to-day basis. You're going to be an incredible mom in all the subtle, unseen and quiet ways.",
  },
  {
    id: "p2",
    text: "To this little person who is on their way-- you don't have the slightest idea what you're getting yourself into. And before you even got here, your family was cheering you on. That's a pretty great start.",
  },
  {
    id: "p3",
    text: "This letter was written before the world had a chance to meet you, before we heard you cry, before we held you, before we knew the color of your eyes, or what would make you laugh. It was written in the weeks when you were still a held breath, a quiet hope, a presence which filled every room without having entered one. You are already the most loved person that we know.",
  },
  {
    id: "p4",
    text: "Little one I am so excited to meet you. And Tina, I am excited to see you grow to be someone you don't even know yet.",
  },
  {
    id: "p5",
    text: `I've known Ayush long enough to know how much he cares, even if he doesn't always express it out loud. It has been truly unique to see him embark on this new chapter with you. Together, the two of you are already a stable, safe place and that is a feeling "children" carry with them throughout their lives.`,
  },
  {
    id: "p6",
    text: "Just know that I'm always here for you. Enjoy these happy and overwhelming moments, which you'll want to pause and remember later in life. This little one is already lucky and so are all of us who get to be a part of this journey with you both.",
  },
];

export default function App() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [unsealing, setUnsealing] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleUnseal = () => {
    if (unsealing) return;
    setUnsealing(true);

    // After 2.6s ceremony, switch to letter phase
    setTimeout(() => {
      setPhase("letter");
      setTimeout(() => {
        setLetterVisible(true);
      }, 100);
    }, 2600);
  };

  const handleBack = () => {
    setLetterVisible(false);
    setTimeout(() => {
      setPhase("landing");
      setUnsealing(false);
    }, 600);
  };

  useEffect(() => {
    if (phase === "letter" && letterRef.current) {
      letterRef.current.scrollTop = 0;
    }
  }, [phase]);

  return (
    <div className="app-root">
      {/* LANDING + OPENING PHASE */}
      {phase !== "letter" && (
        <div className={`landing-scene ${unsealing ? "unsealing" : ""}`}>
          {/* Layered warm background */}
          <div className="bg-layer bg-base" />
          <div className="bg-layer bg-glow-1" />
          <div className="bg-layer bg-glow-2" />
          <div className="bg-layer bg-glow-3" />
          <div className="bg-layer bg-vignette" />

          <div className={`landing-content ${unsealing ? "dissolving" : ""}`}>
            {/* Title */}
            <div className="landing-title-wrap">
              <h1 className="landing-title">
                Written Before We Met You, Little One&nbsp;🤍
              </h1>
            </div>

            {/* Dedication */}
            <div className="landing-dedication">
              <p className="dedication-name">For Tina</p>
              <p className="dedication-sub">
                and the little life she&rsquo;s holding
              </p>
              <p className="dedication-body">
                Saved here for a day you&rsquo;ll want to remember how loved you
                are.
              </p>
              <div className="dedication-spacer" />
              <p className="dedication-ready">When you&rsquo;re ready,</p>

              {/* The only interactive element */}
              <button
                type="button"
                className={`unseal-btn ${unsealing ? "pulsing" : ""}`}
                onClick={handleUnseal}
                disabled={unsealing}
                data-ocid="landing.unseal_button"
                aria-label="Unseal this letter"
              >
                unseal this
              </button>
            </div>
          </div>

          {/* Opening fade-to-parchment overlay */}
          {unsealing && <div className="opening-overlay" />}
        </div>
      )}

      {/* LETTER PHASE */}
      {phase === "letter" && (
        <div
          className={`letter-world ${letterVisible ? "letter-entered" : ""}`}
          ref={letterRef}
          data-ocid="letter.section"
        >
          {/* Back button */}
          <button
            type="button"
            className="letter-back-btn"
            onClick={handleBack}
            data-ocid="letter.back_button"
            aria-label="Return to opening page"
          >
            <span className="back-arrow" aria-hidden="true">
              &#8592;
            </span>
            <span className="back-label">return</span>
          </button>

          <article className="letter-scroll">
            {/* Ornamental header */}
            <div className="letter-ornament" aria-hidden="true">
              <span className="ornament-line ornament-line-left" />
              <span className="ornament-symbol">❧</span>
              <span className="ornament-line ornament-line-right" />
            </div>

            <header className="letter-header">
              <h1 className="letter-title">
                Written Before We Met You, Little One
              </h1>
              <p className="letter-subtitle">
                A letter sealed before you arrived
              </p>
            </header>

            <div className="letter-body">
              {/* Salutation */}
              <p
                className="letter-salutation"
                style={{ animationDelay: "0.2s" }}
              >
                Tina ❤️
              </p>

              {letterParagraphs.map((para, i) => (
                <p
                  key={para.id}
                  className="letter-paragraph"
                  style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                >
                  {para.text}
                </p>
              ))}

              {/* Closing line */}
              <p
                className="letter-closing-love"
                style={{
                  animationDelay: `${0.4 + letterParagraphs.length * 0.35}s`,
                }}
              >
                So much love to you three ❤️
              </p>
            </div>

            {/* Divider before signature */}
            <div className="letter-divider" aria-hidden="true">
              <span className="divider-line" />
              <span className="divider-dot" />
              <span className="divider-line" />
            </div>

            {/* Signature */}
            <footer
              className="letter-footer"
              style={{
                animationDelay: `${0.4 + (letterParagraphs.length + 1) * 0.35 + 0.3}s`,
              }}
            >
              <p className="letter-signature">-- Always Family</p>
            </footer>
          </article>
        </div>
      )}
    </div>
  );
}
