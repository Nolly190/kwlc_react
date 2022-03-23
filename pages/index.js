import HomePage from "../src/ui/dashboard/web/homepage/index";
import { initUtilFunc, checkLocalStorage } from "../src/utils";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    initUtilFunc(window.localStorage);
  }, []);
  return <HomePage />;
}
