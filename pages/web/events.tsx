import Head from "next/head";
import Image from "next/image";
import { getEventsApi } from "../../src/api/event.api";
import Events from "../../src/ui/dashboard/web/events";

export default function Event(props) {
  return <Events data={props.data} totalPages={props.totalPages} />;
}

export async function getStaticProps() {
  const res = await getEventsApi();
  const data = res.data.data;
  const totalPages = res.data.totalPages;

  return {
    props: {
      data,
      totalPages,
    },
    revalidate: 10,
  };
}
