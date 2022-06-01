import HomePage from "../src/ui/dashboard/web/homepage/index";
import { initUtilFunc } from "../src/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getNextEvent } from "../src/api/event.api";
import { getSliderAPI } from "../src/api/slider.api";

export default function Home(props) {
  const router = useRouter();
  useEffect(() => {
    initUtilFunc(window.localStorage, router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HomePage data={props?.data || {}} slides={props.slides} />;
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await getNextEvent();
  const slidesResponse = await getSliderAPI();
  const data = await res.data;

  const sliderData = slidesResponse.data;

  const slides = sliderData.data[1]?.sliderImages || [];

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
      slides,
    },
    revalidate: 10,
  };
}
