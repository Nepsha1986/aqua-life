"use client";

import React, { useRef, useEffect } from "react";

interface Props {
  onInView?: () => void;
}

const VisibilityChecker = ({ onInView }: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = targetRef.current as HTMLDivElement;
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

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return <div ref={targetRef} />;
};

export default VisibilityChecker;
