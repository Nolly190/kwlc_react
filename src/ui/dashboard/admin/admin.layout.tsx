import React, {useEffect} from 'react';
import Head from 'next/head';
import { LayoutProps } from "../../../types/appTypes";
import NavBar from './admin.navbar';
import HomePageFooter from './admin.footer';
import { initApp, saltConst } from '../../../utils';
import { LoginModelDTO } from '../../../dto/login.dto';
import { CryptoEncodeDecode } from '../../../encodeDecode';
import AdminNavItem from '../../../components/admin-nav-item';
// import "./../../../../public/assets/view.v1/admin/js/charts";


const AdminLayout: React.FC<LayoutProps> = (
  { 
    children, externalStyles, title="KWLC", withFooter=false, withSideBar=true
  }: LayoutProps) => {
  useEffect(() => {
    const az = localStorage;
    initApp(
      undefined,
      az,
      new CryptoEncodeDecode(saltConst),
    );
    
  }, []);
  
  return (
      <>
        <Head>
            <title>
              {title ?? "Admin Dashboard"}
            </title>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />

            
            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"></link>
            <link href="/assets/view.v1/admin/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
            
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
        <div className="wrapper ">
          {withSideBar && <div className="sidebar" data-color="purple" data-background-color="white" data-image="{{asset('assets/view.v1/admin/img/sidebar-1.jpg')}}">
                
                <div className="logo">
                    <a className="simple-text logo-normal">
                        {title}
                    </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                      
                        <AdminNavItem url="" iconTitle="dashboard" title="Dashboard" isActive={false} />
                        <AdminNavItem 
                          url="/admin/get-all-users" 
                          iconTitle="person" 
                          title="Users"  
                          isActive={false} 
                        />
                        <AdminNavItem 
                          url="/admin/get-all-branches" 
                          iconTitle="book_online" 
                          title="Branches"  
                          isActive={false} 
                        />
                        <AdminNavItem 
                          url="/admin/get-all-donations" 
                          iconTitle="add_alert" 
                          title="Donations"  
                          isActive={false} 
                        />
                        <AdminNavItem url="" iconTitle="menu_book" title="Blog"  isActive={false} />
                        <AdminNavItem 
                          url="/admin/get-all-livestream" 
                          iconTitle="camera" 
                          title="Livestream"  
                          isActive={false} 
                        />
                        <AdminNavItem 
                          url="/admin/get-all-shop-items" 
                          iconTitle="shopping_cart" 
                          title="Market Place"  
                          isActive={false} 
                        />
                        <AdminNavItem url="" iconTitle="edit" title="Edit Profile"  isActive={false} />
                        <AdminNavItem url="" iconTitle="exit_to_app" title="Logout" isActive={false} />
                        <li className="nav-item active-pro ">
                            <p style={{paddingLeft: '20px'}}>
                                Logged in
                                <small id="admin_name"></small>
                            </p>

                        </li>
                    </ul>
                </div>
            </div>}
            
        <div className="main-panel">
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                    </div>
                </div>
            </nav>
            <div className="content">
                <div className="container-fluid">
                  {children}
                </div>
            </div>
          </div>
        </div>
        
      </>
  );
}

export default AdminLayout;