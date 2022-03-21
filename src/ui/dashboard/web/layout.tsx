import React, {useEffect} from 'react';
import Head from 'next/head';
import { LayoutProps } from "../../../types/appTypes";
import HomePageFooter from './footer';
import { initApp, saltConst } from '../../../utils';
import { LoginModelDTO } from '../../../dto/login.dto';
import { CryptoEncodeDecode } from '../../../encodeDecode';
import HeaderMenu from './header';


const Layout: React.FC<LayoutProps> = ({ children, externalStyles, navbar, title="KWLC", withFooter=false }: LayoutProps) => {
  useEffect(() => {
    initApp(
      new LoginModelDTO({username: "Nolly", password: "12345"}),
      localStorage,
      new CryptoEncodeDecode(saltConst),
    )
  }, []);
  
  return (
      <>
        <Head>
            <title>
              {title}
            </title>
            
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            {
              externalStyles.length > 0 && externalStyles.map((x, index) => {
                  return (<link 
                    key={index} 
                    href={x} 
                    rel="stylesheet" 
                  />)
              })
            }
        </Head>
        {navbar == "web" && <HeaderMenu />} 
        {children}
        {withFooter && <HomePageFooter />}
      </>
  );
}

export default Layout;