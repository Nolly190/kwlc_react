import { useEffect } from "react";
import Admin from "../../src/ui/dashboard/admin/home";
import { initUtilFunc } from "../../src/utils";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    initUtilFunc(window.localStorage, router);
  }, []);

  return <Admin />;
}
