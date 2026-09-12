import React, { useState, useEffect, useRef } from "react";

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
  "Create your Wikipedia page",
  "Claim Username Profiles",
  "Publish you in Major media outlets",
  "Recover disabled Instagram accounts",
];

// Visual color themes precisely matching the 3D graphics
function getPhraseTheme(phrase: string, index: number) {
  const lower = (phrase || "").toLowerCase();
  if (lower.includes("wiki")) {
    return {
      gradient: "from-blue-400 via-sky-300 to-indigo-300",
      cursor: "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.95)]",
    };
  }
  if (lower.includes("user") || lower.includes("claim") || lower.includes("@")) {
    return {
      gradient: "from-cyan-400 via-teal-300 to-sky-300",
      cursor: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.95)]",
    };
  }
  if (lower.includes("media") || lower.includes("publish") || lower.includes("press") || lower.includes("outlet")) {
    return {
      gradient: "from-indigo-300 via-purple-300 to-amber-200",
      cursor: "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.95)]",
    };
  }
  if (lower.includes("instagram") || lower.includes("account") || lower.includes("recover")) {
    return {
      gradient: "from-amber-400 via-rose-400 to-pink-500",
      cursor: "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.95)]",
    };
  }
  // Fallback cycled index
  const indexThemes = [
    {
      gradient: "from-blue-400 via-sky-300 to-indigo-300",
      cursor: "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.95)]",
    },
    {
      gradient: "from-cyan-400 via-teal-300 to-sky-300",
      cursor: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.95)]",
    },
    {
      gradient: "from-indigo-300 via-purple-300 to-amber-200",
      cursor: "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.95)]",
    },
    {
      gradient: "from-amber-400 via-rose-400 to-pink-500",
      cursor: "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.95)]",
    },
  ];
  return indexThemes[index % indexThemes.length];
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

  const currentPhrase = phrases[currentPhraseIndex] || "";
  const theme = getPhraseTheme(currentPhrase, currentPhraseIndex);

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
      <span className="col-start-1 row-start-1 inline max-w-full">
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
