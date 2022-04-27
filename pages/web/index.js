import { useRouter } from "next/router";
import { useEffect } from "react";
// import HomePage from '../../src/ui/home.page'
import HomePage from "../../src/ui/dashboard/web/homepage/index";
import { initUtilFunc } from "../../src/utils";
import { getNextEvent } from "../../src/api/event.api";
import { getSliderAPI } from "../../src/api/slider.api";

export default function Home(props) {
  const router = useRouter();

  useEffect(() => {
    initUtilFunc(window.localStorage, router);
  }, []);

  return <HomePage data={props?.data || {}} slides={props.slides} />;
}
