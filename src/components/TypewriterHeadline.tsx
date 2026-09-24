import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface TypewriterHeadlineProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  onStateChange?: (state: {
    phraseIndex: number;
    currentText: string;
    isDeleting: boolean;
    isVisible: boolean;
  }) => void;
}

const DEFAULT_PHRASES = [
  "Build high-performance Websites",
  "Create your Wikipedia page",
  "Claim Username Profiles",
  "Publish you in Major media outlets",
  "Recover disabled Instagram accounts",
];

// Visual color themes precisely matching the 3D graphics (with dark & light mode support)
function getPhraseTheme(phrase: string, index: number, isLight: boolean = false) {
  const lower = (phrase || "").toLowerCase();
  if (lower.includes("web") || lower.includes("portal") || lower.includes("code") || lower.includes("develop")) {
    return {
      gradient: isLight
        ? "from-emerald-600 via-teal-600 to-cyan-700"
        : "from-emerald-400 via-green-300 to-teal-300",
      cursor: isLight
        ? "bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.8)]"
        : "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]",
    };
  }
  if (lower.includes("wiki")) {
    return {
      gradient: isLight
        ? "from-blue-600 via-indigo-600 to-sky-700"
        : "from-blue-400 via-sky-300 to-indigo-300",
      cursor: isLight
        ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        : "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.95)]",
    };
  }
  if (lower.includes("user") || lower.includes("claim") || lower.includes("@")) {
    return {
      gradient: isLight
        ? "from-cyan-600 via-blue-600 to-indigo-600"
        : "from-cyan-400 via-teal-300 to-sky-300",
      cursor: isLight
        ? "bg-cyan-600 shadow-[0_0_10px_rgba(8,145,178,0.8)]"
        : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.95)]",
    };
  }
  if (lower.includes("media") || lower.includes("publish") || lower.includes("press") || lower.includes("outlet")) {
    return {
      gradient: isLight
        ? "from-purple-600 via-indigo-600 to-violet-700"
        : "from-indigo-300 via-purple-300 to-amber-200",
      cursor: isLight
        ? "bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.8)]"
        : "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.95)]",
    };
  }
  if (lower.includes("instagram") || lower.includes("account") || lower.includes("recover")) {
    return {
      gradient: isLight
        ? "from-rose-600 via-pink-600 to-amber-600"
        : "from-amber-400 via-rose-400 to-pink-500",
      cursor: isLight
        ? "bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
        : "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.95)]",
    };
  }
  // Fallback
  return {
    gradient: isLight
      ? "from-indigo-600 via-blue-600 to-cyan-700"
      : "from-indigo-300 via-purple-300 to-amber-200",
    cursor: isLight
      ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.8)]"
      : "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.95)]",
  };
}

export default function TypewriterHeadline({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2000,
  className = "",
  onStateChange,
}: TypewriterHeadlineProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep a stable ref to onStateChange to prevent infinite re-render loops
  const onStateChangeRef = useRef(onStateChange);
  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  });

  // Notify parent of typing/clearing lifecycle only when phraseIndex or isDeleting transitions
  useEffect(() => {
    onStateChangeRef.current?.({
      phraseIndex: currentPhraseIndex,
      currentText,
      isDeleting,
      isVisible: !isDeleting,
    });
  }, [currentPhraseIndex, isDeleting]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const targetPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < targetPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Pausing after typing complete before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Switch to next phrase and begin typing
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const { theme: activeTheme } = useTheme();
  const isLight = activeTheme === "light";
  const currentPhrase = phrases[currentPhraseIndex] || "";
  const theme = getPhraseTheme(currentPhrase, currentPhraseIndex, isLight);

  return (
    <span
      className={`relative inline-grid grid-cols-1 grid-rows-1 text-left align-baseline max-w-full ${className}`}
      aria-live="polite"
    >
      {/* Invisible ghost phrases that reserve the exact max width & height across all screen sizes */}
      {phrases.map((phrase, idx) => (
        <span
          key={idx}
          className="col-start-1 row-start-1 invisible select-none pointer-events-none opacity-0 font-extrabold pr-2 break-words text-[21px] sm:text-inherit"
          aria-hidden="true"
        >
          {phrase}
        </span>
      ))}

      {/* Active typing text layer */}
      <span className="col-start-1 row-start-1 inline max-w-full text-center">
        <span
          className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-extrabold inline break-words text-[21px] sm:text-inherit transition-all duration-500`}
        >
          {currentText || "\u200B"}
        </span>
        {/* Animated glowing cursor matching the active visual theme */}
        <span
          className={`inline-block ml-1 w-[3px] sm:w-[4px] h-[0.8em] align-middle ${theme.cursor} rounded-sm animate-pulse transition-all duration-500`}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
