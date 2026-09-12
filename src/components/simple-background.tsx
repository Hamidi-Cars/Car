/**
 * Simple elegant background — pure CSS, no 3D / WebGL.
 * Dark luxury base with soft golden glows and a subtle pattern.
 */
export function SimpleBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050506]" aria-hidden="true">
      {/* soft golden glow — top center */}
      <div className="absolute -top-48 left-1/2 h-[560px] w-[880px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />

      {/* soft glow — upper right */}
      <div className="absolute top-[22%] -right-48 h-[480px] w-[480px] rounded-full bg-[#b8860b]/8 blur-[130px]" />

      {/* soft glow — bottom left */}
      <div className="absolute bottom-[-10%] -left-48 h-[520px] w-[520px] rounded-full bg-[#d4af37]/7 blur-[140px]" />

      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      {/* gentle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
