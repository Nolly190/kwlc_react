import React, { useEffect } from "react";
import Head from "next/head";
import { LayoutProps } from "../../../types/appTypes";
import HomePageFooter from "./footer";
import { initApp, saltConst } from "../../../utils";
import { LoginModelDTO } from "../../../dto/login.dto";
import { CryptoEncodeDecode } from "../../../encodeDecode";
import HeaderMenu from "./header";
import Script from "next/script";
// import Link from 'next/link'

const Layout: React.FC<LayoutProps> = ({
  children,
  externalStyles,
  navbar,
  title = "KWLC",
  withFooter = false,
  page,
}: LayoutProps) => {
  useEffect(() => {
    initApp(
      new LoginModelDTO({ username: "Nolly", password: "12345" }),
      localStorage,
      new CryptoEncodeDecode(saltConst)
    );
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        {externalStyles.length > 0 &&
          externalStyles.map((x, index) => {
            return <link key={index} href={x} rel="stylesheet" />;
          })}
        <link href="/styles/css/donation.css" rel="stylesheet" />
        {page !== "home" && (
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
        )}
      </Head>
      {navbar == "web" && <HeaderMenu />}
      {children}
      {withFooter && <HomePageFooter />}
      <Script
        strategy="afterInteractive"
        src="https://code.jquery.com/jquery-3.6.0.min.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
      />
    </>
  );
};

export default Layout;
