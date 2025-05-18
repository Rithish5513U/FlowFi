import { useState, useEffect } from "react";

const TypingAnimation = () => {
  const text = "AI Powered Sales Forecasting";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 50; 
  const resetDelay = 2000; 

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, resetDelay);

      return () => clearTimeout(resetTimeout);
    }
  }, [index]);

  return (
    <h2>
      {displayedText}
      <span className="cursor">|</span>
    </h2>
  );
};

export default TypingAnimation;
