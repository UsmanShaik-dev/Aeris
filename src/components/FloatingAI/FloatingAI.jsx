import { useState } from "react";
import { Sparkles } from "lucide-react";

import AerisChatBot from "../AerisChatBot";
import "./FloatingAI.css";

function FloatingAI() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="floating-ai-button"
        aria-label="Open AI Travel Assistant"
        onClick={() => setIsChatOpen(true)}
      >
        <span className="floating-ai-inner">
          <Sparkles size={21} />
        </span>

        <span className="floating-ai-pulse" />
      </button>

      <AerisChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default FloatingAI;
