import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center p-5">
      <h1 className="display-4 fw-bold">INXINFO Labs</h1>
      <p className="lead">Build. Learn. Deploy.</p>

      <div className="mt-4">
        <Link to="/auth/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/auth/register" className="btn btn-outline-primary">
          Register
        </Link>
      </div>
    </section>
  );
}
