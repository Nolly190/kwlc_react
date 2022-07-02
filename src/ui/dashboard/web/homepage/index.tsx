import Head from "next/head";
import Image from "next/image";
import { HomeAboutArea } from "./AboutArea";
import HeroBanner from "./heroBanner";
import HomeTimer from "./homeTimer";
import HomeServiceArea from "./serviceArea";
import HomeWorshipArea from "./worshipArea";
import HomeDonate from "./donate";
import HomeFamilyArea from "./familySection";
import LocationArea from "./locationArea";
import HomePageFooter from "./../footer";
import Layout from "../layout";
import Autocomplete from "react-google-autocomplete";

// import styles from './../../styles/Home.module.css'

export default function HomePage({ data, slides, branches }) {
  // return (
  //   <Autocomplete
  //     apiKey={"AIzaSyD3MhJ08jqDq2khuAK4KXR7eSo6TuwwiMA"}
  //     onPlaceSelected={(place) => console.log(place)}
  //   />
  // );

  return (
    <>
      <div className="bg_secondary_color">
        <Head>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <link href="/styles/css/style.css" rel="stylesheet" />
          <link href="/icofont/icofont.min.css" rel="stylesheet" />
          <link href="/icofont/icofont/fontawesome-all.min" rel="stylesheet" />
        </Head>
        <div className="main_container home-container">
          <HeroBanner slides={slides} />
          <HomeTimer data={data} />
          <HomeServiceArea />
          <HomeAboutArea />
          <HomeWorshipArea branches={branches} />
          <HomeDonate />
          <HomeFamilyArea />
          <LocationArea />
          <HomePageFooter />
        </div>
      </div>
    </>
  );
}
