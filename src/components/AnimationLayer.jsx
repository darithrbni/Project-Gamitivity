import { useEffect, useState } from "react";

function AnimationLayer({ frames, frameDuration = 200, className = "" }) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((previousFrame) => {
        return (previousFrame + 1) % frames.length;
      });
    }, frameDuration);

    return () => clearInterval(interval);
  }, [frames, frameDuration]);

  return (
    <img
      src={frames[currentFrame]}
      alt=""
      className={className}
      draggable={false}
    />
  );
}

export default AnimationLayer;
