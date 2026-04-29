import { useEffect, useState } from "react";

interface CounterProps {
  value: number;
  duration?: number; // milliseconds
}

const Counter: React.FC<CounterProps> = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
};

export default Counter;
