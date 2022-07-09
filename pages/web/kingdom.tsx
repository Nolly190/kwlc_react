import React from "react";
import { getEventsApi } from "../../src/api/event.api";
import { getUserHistory } from "../../src/api/familyArea.api";
import KingdomPage from "../../src/ui/dashboard/web/KingdomPublishers/KingdomPage";

export default function Kingdom(props) {
  return <KingdomPage />;
}

export async function getStaticProps() {
  const res = await getUserHistory();
  const data = res.data || null;

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
