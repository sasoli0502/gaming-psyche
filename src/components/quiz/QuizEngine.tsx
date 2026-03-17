"use client";

import { useState, useReducer, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Question, AxisScores, Locale } from "@/lib/types";
import { INITIAL_SCORES, addScores } from "@/lib/scoring";
import { lt } from "@/lib/i18n";
import { ProgressBar } from "./ProgressBar";
import { ScenarioCard } from "./ScenarioCard";
import { OptionButton } from "./OptionButton";

interface QuizState {
  currentIndex: number;
  scores: AxisScores;
  answers: { questionId: string; optionId: string }[];
  isComplete: boolean;
}

type QuizAction =
  | {
      type: "ANSWER";
      questionId: string;
      optionId: string;
      scores: AxisScores;
      totalQuestions: number;
    }
  | { type: "RESET" };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER": {
      const newIndex = state.currentIndex + 1;
      return {
        currentIndex: newIndex,
        scores: addScores(state.scores, action.scores),
        answers: [
          ...state.answers,
          { questionId: action.questionId, optionId: action.optionId },
        ],
        isComplete: newIndex >= action.totalQuestions,
      };
    }
    case "RESET":
      return {
        currentIndex: 0,
        scores: { ...INITIAL_SCORES },
        answers: [],
        isComplete: false,
      };
    default:
      return state;
  }
}

interface QuizEngineProps {
  questions: Question[];
  locale: Locale;
  onComplete: (scores: AxisScores, answers: { questionId: string; optionId: string }[]) => void;
}

export function QuizEngine({ questions, locale, onComplete }: QuizEngineProps) {
  const [state, dispatch] = useReducer(quizReducer, {
    currentIndex: 0,
    scores: { ...INITIAL_SCORES },
    answers: [],
    isComplete: false,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = useCallback(
    (optionId: string, scores: AxisScores) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      const question = questions[state.currentIndex];

      dispatch({
        type: "ANSWER",
        questionId: question.id,
        optionId,
        scores,
        totalQuestions: questions.length,
      });

      // Check if this was the last question
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= questions.length) {
        const finalScores = addScores(state.scores, scores);
        const finalAnswers = [
          ...state.answers,
          { questionId: question.id, optionId },
        ];
        setTimeout(() => onComplete(finalScores, finalAnswers), 600);
      }

      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, questions, state, onComplete]
  );

  if (state.isComplete) {
    return null;
  }

  const currentQuestion = questions[state.currentIndex];
  if (!currentQuestion) return null;

  const categoryLabel =
    currentQuestion.category === "tactical"
      ? "TACTICAL"
      : currentQuestion.category === "social"
      ? "SOCIAL"
      : "META";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <ProgressBar
        current={state.currentIndex + 1}
        total={questions.length}
        category={categoryLabel}
      />

      <AnimatePresence mode="wait">
        <div key={currentQuestion.id}>
          <ScenarioCard text={lt(locale, currentQuestion.scenario)} />

          <div className="w-full max-w-2xl mx-auto space-y-3">
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={option.id}
                label={option.id}
                text={lt(locale, option.text)}
                index={index}
                onClick={() => handleAnswer(option.id, option.scores)}
              />
            ))}
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
