import Background from "./Background";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen text-[#111] font-sans">
      {/* Global background layer */}
      <Background />

      {/* App content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}