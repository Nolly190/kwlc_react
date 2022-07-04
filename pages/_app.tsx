import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { initUtilFunc } from "../src/utils";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../public/styles/css/style.css";
// import "../public/styles/css/donation.css";

// import { userService } from "../src/api/auth.api";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const [authorized, setAuthorized] = useState(false);

  // useEffect(() => {
  //   // run auth check on initial load
  //   authCheck(router.asPath);

  //   // set authorized to false to hide page content while changing routes
  //   const hideContent = () => setAuthorized(false);
  //   router.events.on('routeChangeStart', hideContent);

  //   // run auth check on route change
  //   router.events.on('routeChangeComplete', authCheck)

  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //     router.events.off('routeChangeStart', hideContent);
  //     router.events.off('routeChangeComplete', authCheck);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // console.log("authorized", authorized);

  // useEffect(() => {
  //   authCheck(router.asPath);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userService.userValue])

  // function authCheck(url: string) {
  //   // redirect to login page if accessing a private page and not logged in
  //   const publicPaths = ['/admin/login'];
  //   const path = url.split('?')[0];
  //   // console.log("check", userService.userValue);
  //   console.log("path", path, publicPaths.includes(path))
  //   if (!userService.userValue && !publicPaths.includes(path)) {
  //     setAuthorized(false);
  //     router.push('/admin/login');
  //   } else {
  //     setAuthorized(true);
  //     router.push('/admin');
  //   }
  // }

  useEffect(() => {
    initUtilFunc(window.localStorage, router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        // hideProgressBar
        newestOnTop={true}
        // closeOnClick={false}
        rtl={false}
        draggable={false}
        pauseOnHover={true}
        limit={1}
      />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
