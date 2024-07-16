"use client";

import React, { useRef, useEffect } from "react";

interface Props {
  onInView?: () => void;
}

const VisibilityChecker = ({ onInView }: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView && onInView();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1,
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Clean up the observer
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={targetRef}
      style={{
        width: "100px",
        height: "100px",
      }}
    />
  );
};

export default VisibilityChecker;
