/**
 * Professional ad slot placeholder for monetization.
 * Replace the placeholder content with your ad network code (e.g. Google AdSense)
 * or direct sponsor creatives. Always keep the "Advertisement" label for compliance.
 *
 * Sizes: "banner" (728×90), "rectangle" (300×250), "sidebar" (300×250), "skyscraper" (160×600)
 */
export default function AdSlot({ size = "rectangle", slotId = "ad-slot", className = "" }) {
  const sizes = {
    banner: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    sidebar: { width: 300, height: 250 },
    skyscraper: { width: 160, height: 600 },
  };
  const { width, height } = sizes[size] || sizes.rectangle;

  return (
    <div
      className={`ad-slot ${className}`}
      data-ad-slot={slotId}
      data-ad-size={size}
      style={{
        width: "100%",
        maxWidth: width,
        margin: "0 auto",
      }}
      aria-label="Advertisement"
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center border rounded bg-light text-muted"
        style={{
          minHeight: height,
          borderColor: "var(--bs-border-color, #dee2e6)",
          borderStyle: "dashed",
        }}
      >
        <span
          className="text-uppercase fw-semibold mb-1"
          style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "#94a3b8" }}
        >
          Advertisement
        </span>
        <span className="small" style={{ color: "#cbd5e1" }}>
          {width} × {height}
        </span>
        <span className="small mt-1" style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
          Partner with us
        </span>
      </div>
    </div>
  );
}
