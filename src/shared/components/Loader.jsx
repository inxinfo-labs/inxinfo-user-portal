import { Spinner } from "react-bootstrap";

export default function Loader({
  size = "md",          // sm | md | lg
  fullscreen = false,   // full page loader
  text = "Loading...",  // optional text
}) {
  const spinnerSize =
    size === "sm" ? "sm" : size === "lg" ? undefined : "sm";

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center ${
        fullscreen ? "vh-100" : "py-4"
      }`}
    >
      <Spinner
        animation="border"
        role="status"
        className="mb-2"
        variant="primary"
        size={spinnerSize}
      />
      {text && <span className="text-muted">{text}</span>}
    </div>
  );
}
