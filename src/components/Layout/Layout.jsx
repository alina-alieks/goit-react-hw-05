import Navigation from "../Navigation/Navigation";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <div className={css.container}>{children}</div>
    </>
  );
}
