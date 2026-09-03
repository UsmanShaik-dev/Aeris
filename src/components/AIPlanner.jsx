import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import AerisChatBot from "./AerisChatBot";

import "./AIPlanner.css";

function AIPlanner() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <section className="ai-planner-section" id="journey">
        {/* Background glow */}
        <div className="ai-planner-glow" />

        <div className="ai-planner-content">
          <div className="ai-planner-icon">
            <Sparkles size={22} />
          </div>

          <span className="section-eyebrow">
            YOUR JOURNEY, INTELLIGENTLY PLANNED
          </span>

          <h2>
            Plan your journey
            <span>with AI.</span>
          </h2>

          <p>
            Tell us where you're dreaming of going, how long you have, and what
            you love. We'll turn it into a personalized journey.
          </p>

          <div className="ai-planner-actions">
            <button
              type="button"
              className="ai-primary-button"
              onClick={() => setIsChatOpen(true)}
            >
              <WandSparkles size={18} />
              Start planning
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="ai-secondary-button"
              onClick={() => setIsChatOpen(true)}
            >
              <CalendarDays size={17} />
              Explore itinerary planner
            </button>
          </div>
        </div>

        <button
          type="button"
          className="ai-planner-preview"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open Aeris AI Travel Assistant"
        >
          <div className="preview-top">
            <div className="preview-ai-icon">
              <Bot size={19} />
            </div>

            <div>
              <strong>AI Travel Assistant</strong>
              <span>Ready to plan your adventure</span>
            </div>

            <div className="online-dot" />
          </div>

          <div className="preview-message user-message">
            I want to spend 5 days exploring Kyoto.
          </div>

          <div className="preview-message ai-message">
            <Sparkles size={14} />

            <span>
              Perfect. I can create a balanced 5-day itinerary with temples,
              local experiences and hidden gems.
            </span>
          </div>

          <div className="preview-input">
            <span>Ask your travel assistant...</span>
            <ArrowRight size={16} />
          </div>
        </button>
      </section>

      <AerisChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default AIPlanner;
