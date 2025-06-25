import React, { useEffect, useRef, useMemo } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import approveAnimationData from "./approve-tick.json";
import pendingAnimationData from "./pending.json";
import rejectedAnimationData from "./rejected.json";
import salesAnimationData from "./sales.json";
import architectAnimationData from "./architect.json";

interface SectionAnimProps {
  type: "pending" | "approved" | "rejected" | "sales" | "architect";
  shouldPlay?: boolean;
  showLastFrame?: boolean;
}

const SectionAnim: React.FC<SectionAnimProps> = ({
  type,
  shouldPlay = false,
  showLastFrame = false,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const animationData = useMemo(() => {
    switch (type) {
      case "approved":
        return approveAnimationData;
      case "rejected":
        return rejectedAnimationData;
      case "sales":
        return salesAnimationData;
      case "architect":
        return architectAnimationData;
      case "pending":
      default:
        return pendingAnimationData;
    }
  }, [type]);

  useEffect(() => {
    if (!lottieRef.current) return;

    if (shouldPlay) {
      lottieRef.current.stop();
      lottieRef.current.play();
    } else if (showLastFrame) {
      const lastFrame = animationData.op ?? 100;
      lottieRef.current.goToAndStop(lastFrame, true);
    } else {
      lottieRef.current.goToAndStop(0, true);
    }
  }, [shouldPlay, showLastFrame, animationData]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
      style={{ height: 35, width: 35 }}
    />
  );
};

export default SectionAnim;
