import { useRouter } from "next/router";
import { useEffect } from "react";
// import HomePage from '../../src/ui/home.page'
import HomePage from "../../src/ui/dashboard/web/homepage/index";
import { initUtilFunc } from "../../src/utils";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    initUtilFunc(window.localStorage, router);
  }, []);

  return <HomePage />;
}
