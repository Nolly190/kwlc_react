import Head from "next/head";
import { getLiveStreamsApi } from "../../src/api/livestream";
import LiveStreamIndex from "../../src/ui/dashboard/web/livestream";

export default function Livestream(props) {
  return <LiveStreamIndex data={props.data} />;
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await getLiveStreamsApi();
  const data = await res.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
