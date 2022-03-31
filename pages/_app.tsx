// import './../styles/css/styles.css'
// import './../public/icofont/icofont.min.css'
// import './../public/icofont/icofont.css'
// import './../public/icofont/font-awesome.min.css'
// import './../styles/css/home.css'
// import './../styles/css/events.css'
// import './../styles/css/bootstrap/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { initUtilFunc } from "../src/utils";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    initUtilFunc(window.localStorage, router);
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
