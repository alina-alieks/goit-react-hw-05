import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <p>
      Oops! Page not found. Please turn to
      <Link to="/" className={css.linkHome}>
        {" "}
        Home Page
      </Link>
    </p>
  );
}
