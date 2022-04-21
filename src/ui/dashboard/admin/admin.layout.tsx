import React, { useEffect } from "react";
import Head from "next/head";
import { LayoutProps } from "../../../types/appTypes";
import { initApp, Logout, saltConst } from "../../../utils";
import { CryptoEncodeDecode } from "../../../encodeDecode";
import AdminNavItem from "../../../components/admin-nav-item";
import styled from "styled-components";
import mediaQueries from "../../../mediaQueries";
import { useRouter } from "next/router";
import { AdminNavArray } from "../../../strings";
// import "./../../../../public/assets/view.v1/admin/js/charts";

const AdminLayout: React.FC<LayoutProps> = ({
  children,
  externalStyles,
  title = "KWLC",
  withFooter = false,
  withSideBar = true,
}: LayoutProps) => {
  const router = useRouter();
  let permissionsArray: string[] = [];

  if (typeof window !== 'undefined') {
    permissionsArray = JSON.parse(localStorage?.getItem("userData"))?.permissions
    console.log("permisionsArray", permissionsArray);
  }

  useEffect(() => {
    const az = localStorage;
    initApp(undefined, az, new CryptoEncodeDecode(saltConst));
  }, []);

  return (
    <>
      <Head>
        <title>{title ?? "Admin Dashboard"}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          name="viewport"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
        ></link>
        <link
          href="/assets/view.v1/admin/css/material-dashboard.css?v=2.1.2"
          rel="stylesheet"
        />

        {externalStyles.length > 0 &&
          externalStyles.map((x, index) => {
            return <link key={index} href={x} rel="stylesheet" />;
          })}
      </Head>
      <div className="wrapper ">
        {withSideBar && (
          <div
            className="sidebar"
            data-color="purple"
            data-background-color="white"
            data-image="{{asset('assets/view.v1/admin/img/sidebar-1.jpg')}}"
          >
            <div className="logo">
              <a className="simple-text logo-normal">{title}</a>
            </div>
            <div className="sidebar-wrapper">
              <ul className="nav">
                <AdminNavItem
                  url="/admin"
                  iconTitle="dashboard"
                  title="Dashboard"
                />
                {AdminNavArray.filter((x) =>
                  permissionsArray?.map((x) => x.toLowerCase())
                    .includes(x.name.toLowerCase())
                ).sort((a, b) => a.name.localeCompare(b.name)).map((x, index) => (
                  <AdminNavItem
                    key={index}
                    url={x.url}
                    iconTitle={x.iconTitle}
                    title={x.title}
                  />
                ))}
                <AdminNavItem
                  action={() => Logout()}
                  url=""
                  iconTitle="exit_to_app"
                  title="Logout"
                />
              </ul>
            </div>
          </div>
        )}

        <div className="main-panel">
          <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end"></div>
            </div>
          </nav>
          <Container>{children}</Container>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

const Container = styled.div`
  margin-top: 40px;
  padding: 30px;
  min-height: calc(100vh - 123px);

  ${mediaQueries.mobile} {
    padding: 30px 15px;
  }
`;
