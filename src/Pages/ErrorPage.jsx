import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div className="error-page">

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for
        doesn't exist.
      </p>

      <Link to="/">
        <button>
          Go Home
        </button>
      </Link>

    </div>
  );
}

export default ErrorPage;