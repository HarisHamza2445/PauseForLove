"use client";

import { useState } from "react";
import { DEFAULT_CONTENT, list, type SiteContent } from "@/lib/content";


export default function TherapyMatchQuiz({ c = DEFAULT_CONTENT }: { c?: SiteContent }) {
  const questions = [1, 2, 3].map((n) => ({
    question: c[`quiz.q${n}`],
    subtitle: c[`quiz.q${n}_sub`],
    options: list(c[`quiz.q${n}_options`]),
  }));
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = optionIndex;
    setSelectedAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  return (
    <section id="quiz" style={{ backgroundColor: "#E0F2FE" }}>
      <div
        className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24"
        style={{ maxWidth: "800px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#EEF2FF",
              color: "#3B5BDB",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "8px 16px",
              borderRadius: "9999px",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            {c["quiz.badge"]}
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#1A1A2E",
              marginBottom: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            {c["quiz.heading"]}
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#4B5563",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {c["quiz.description"]}
          </p>
        </div>

        {/* Quiz Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)",
            border: "1px solid #E5E7EB",
            padding: "clamp(20px, 4vw, 40px)",
          }}
        >
          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#E5E7EB",
              borderRadius: "9999px",
              marginBottom: "36px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#3B5BDB",
                borderRadius: "9999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Question */}
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#1A1A2E",
              lineHeight: 1.35,
              marginBottom: "8px",
            }}
          >
            {currentStep + 1}. {currentQuestion.question}
          </h3>

          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.5,
              marginBottom: "28px",
            }}
          >
            {currentQuestion.subtitle}
          </p>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "clamp(14px, 3vw, 18px) clamp(14px, 3vw, 20px)",
                  backgroundColor: selectedAnswers[currentStep] === index ? "#EEF2FF" : "#FFFFFF",
                  border: selectedAnswers[currentStep] === index ? "2px solid #3B5BDB" : "1px solid #E5E7EB",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    color: selectedAnswers[currentStep] === index ? "#1A1A2E" : "#374151",
                    fontWeight: selectedAnswers[currentStep] === index ? 600 : 400,
                    lineHeight: 1.5,
                  }}
                >
                  {option}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={selectedAnswers[currentStep] === index ? "#3B5BDB" : "#9CA3AF"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginLeft: "16px" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
