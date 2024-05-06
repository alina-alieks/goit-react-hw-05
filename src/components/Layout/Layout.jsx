import Navigation from "../Navigation/Navigation";
import { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Suspense fallback={<ClipLoader color="rgb(255, 163, 34)" />}>
        <div className={css.container}>{children}</div>
      </Suspense>
    </>
  );
}
