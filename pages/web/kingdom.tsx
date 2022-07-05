import React from "react";
import { getUserHistory } from "../../src/api/familyArea.api";
import KingdomPage from "../../src/ui/dashboard/web/KingdomPublishers/KingdomPage";

export default function Kingdom(props) {
  return <KingdomPage data={props.data} />;
}

export async function getStaticProps() {
  const res = await getUserHistory();
  const data = await res.data;

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
