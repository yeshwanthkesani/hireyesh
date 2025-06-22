import { useMemo } from "react";

const ShootingStars = () => {
  const meteors = useMemo(() => {
    return [...Array(90)].map((_, i) => ({
      id: `meteor-${i}`,
      left: `${Math.random() * 120 - 10}%`,
      top: `${Math.random() * 120 - 10}%`,
      delay: `${i * 0.6}s`,
      duration: `${8 + Math.random() * 12}s`,
      angle: 35,
    }));
  }, []);

  const blueMeteors = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: `blue-meteor-${i}`,
      left: `${Math.random() * 120 - 10}%`,
      top: `${Math.random() * 120 - 10}%`,
      delay: `${i * 0.9}s`,
      duration: `${10 + Math.random() * 8}s`,
      angle: 32,
    }));
  }, []);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {meteors.map((m) => (
          <div
            key={m.id}
            className="absolute"
            style={{
              width: "1px",
              height: "25px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)",
              left: m.left,
              top: m.top,
              transform: `rotate(${m.angle}deg)`,
              animation: `shootingStar ${m.duration} linear infinite`,
              animationDelay: m.delay,
              opacity: 0.8,
            }}
          />
        ))}

        {blueMeteors.map((m) => (
          <div
            key={m.id}
            className="absolute"
            style={{
              width: "1px",
              height: "20px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(173,216,230,0.6) 30%, rgba(173,216,230,0.8) 50%, rgba(173,216,230,0.6) 70%, transparent 100%)",
              left: m.left,
              top: m.top,
              transform: `rotate(${m.angle}deg)`,
              animation: `shootingStar ${m.duration} linear infinite`,
              animationDelay: m.delay,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shootingStar {
          0% {
            opacity: 0;
            transform: translateX(-200px) translateY(200px) rotate(35deg) scale(0.5);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(800px) translateY(-800px) rotate(35deg) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ShootingStars;
