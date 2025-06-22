import ShootingStars from "@/components/ShootingStars";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed background gradient and stars */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1a1b3a 0%, #2d1b69 25%, #4c1d95 50%, #7c2d92 75%, #be185d 100%)",
          }}
        />
        <ShootingStars />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
