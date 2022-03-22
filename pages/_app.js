// import './../styles/css/styles.css'
// import './../public/icofont/icofont.min.css'
// import './../public/icofont/icofont.css'
// import './../public/icofont/font-awesome.min.css'
// import './../styles/css/home.css'
// import './../styles/css/events.css'
// import './../styles/css/bootstrap/css/bootstrap.min.css'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}


export default MyApp
