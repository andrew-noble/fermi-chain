import { useState, useEffect } from "react";

interface TutorialOverlayProps {
  id: string;
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function TutorialOverlay({
  id,
  content,
  children,
  position = "bottom",
}: TutorialOverlayProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if this is the first instance of this ID
    if (!sessionStorage.getItem(id)) {
      setShow(true);
      sessionStorage.setItem(id, "1");
    }

    // Listen for tutorial reset events
    const handleTutorialReset = () => {
      // Only show if this is the first instance of this ID
      if (!sessionStorage.getItem(id)) {
        setShow(true);
        sessionStorage.setItem(id, "1");
      }
    };

    window.addEventListener("tutorial-reset", handleTutorialReset);
    return () =>
      window.removeEventListener("tutorial-reset", handleTutorialReset);
  }, [id]);

  if (!show) return <>{children}</>;

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  //innermost div is triangle pointer
  return (
    <div className="relative inline-block">
      <div onClick={() => setShow(false)}>{children}</div>
      {show && (
        <div
          className={`absolute ${positionClasses[position]} z-50`}
          onClick={() => setShow(false)}
        >
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm max-w-xs shadow-lg">
            {content}
            <div
              className={`absolute w-2 h-2 bg-primary transform rotate-45 ${
                position === "top"
                  ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                  : position === "bottom"
                  ? "top-[-4px] left-1/2 -translate-x-1/2"
                  : position === "left"
                  ? "right-[-4px] top-1/2 -translate-y-1/2"
                  : "left-[-4px] top-1/2 -translate-y-1/2"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
