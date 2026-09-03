import { useEffect, useRef, useState } from "react";
import { ArrowUp, MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import AIProfile from "../assets/AIprofile.png";
import AerisBot from "../assets/AIChat.png";

import "./AerisChatBot.css";

function AerisChatBot({ isOpen, onClose }) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hey, I'm Aeris ✨ Tell me where you're dreaming of going, how many days you have, and what kind of experiences you love.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Aeris chatbot error:", error);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "I'm having a little trouble connecting right now. Give me another moment and try again. ✨",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}

          <motion.div
            className="aeris-chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* CHAT WINDOW */}

          <motion.div
            className="aeris-chatbot"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* HEADER */}

            <div className="aeris-chat-header">
              <div className="aeris-chat-brand">
                {/* AI PROFILE IMAGE */}
                <div className="aeris-chat-profile">
                  <img src={AIProfile} alt="Aeris" />
                </div>

                <div className="aeris-chat-brand-info">
                  <strong>Aeris</strong>

                  <span>
                    <i />
                    AI Travel Assistant
                  </span>
                </div>
              </div>

              <button
                className="aeris-chat-close"
                onClick={onClose}
                aria-label="Close Aeris"
              >
                <X size={18} />
              </button>
            </div>

            {/* QUICK INTRO */}

            <div className="aeris-chat-intro">
              <MapPin size={14} />

              <span>Personalized travel planning, made simple.</span>
            </div>

            {/* MESSAGES */}

            <div className="aeris-chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`aeris-message ${
                    message.role === "user"
                      ? "aeris-message-user"
                      : "aeris-message-ai"
                  }`}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  {/* AERIS AVATAR */}
                  {message.role === "assistant" && (
                    <div className="aeris-message-avatar">
                      <img src={AerisBot} alt="Aeris" />
                    </div>
                  )}

                  <div className="aeris-message-bubble">{message.text}</div>
                </motion.div>
              ))}

              {/* THINKING */}

              {isLoading && (
                <motion.div
                  className="aeris-message aeris-message-ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="aeris-message-avatar">
                    <img src={AerisBot} alt="Aeris" />
                  </div>

                  <div className="aeris-thinking">
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}

            <div className="aeris-chat-input-area">
              <div className="aeris-chat-input">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Aeris anything..."
                  disabled={isLoading}
                />

                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                >
                  <ArrowUp size={17} />
                </button>
              </div>

              <span className="aeris-chat-hint">
                Aeris can help plan destinations, itineraries and experiences.
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AerisChatBot;
