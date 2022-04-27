import HomePage from "../src/ui/dashboard/web/homepage/index";
import { initUtilFunc } from "../src/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    initUtilFunc(window.localStorage, router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HomePage />;
}
