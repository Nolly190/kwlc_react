import HomePage from "../src/ui/dashboard/web/homepage/index";
import { initUtilFunc } from "../src/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getNextEvent } from "../src/api/event.api";
import { getSliderAPI } from "../src/api/slider.api";
import { getBranchesApi } from "../src/api/branch.api";

export default function Home(props) {
  const router = useRouter();
  useEffect(() => {
    initUtilFunc(window.localStorage, router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomePage
      data={props?.data || {}}
      slides={props.slides}
      branches={props.branches}
    />
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await getNextEvent();
  const slidesResponse = await getSliderAPI();
  const branchesResponse = await getBranchesApi();
  const data = await res.data;

  const branches = branchesResponse.data.data;

  const sliderData = slidesResponse.data;

  const slides = sliderData.data[1]?.sliderImages || [];

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
      slides,
      branches,
    },
    revalidate: 10,
  };
}
