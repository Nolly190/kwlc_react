import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getToken } from "../../../../request";
import AdminLayout from "../admin.layout";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Dashboard"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="dashboard-card card card-stats">
            <div className="card-header card-header-warning card-header-icon">
              <div className="card-icon">
                <i className="material-icons"></i>
              </div>
              <p className="card-category">Today Users</p>
              <h3 className="card-title" id="today_user">
                0
              </h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-dark"></i>
                <a href="javascript:;">
                  <small>Total Users: </small>
                  <span id="total_user">2</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-warning card-header-icon">
              <div className="card-icon">
                <i className="material-icons"></i>
              </div>
              <p className="card-category">Today Complaints</p>
              <h3 className="card-title" id="today_complaints">
                0
              </h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-danger"></i>
                <a href="javascript:;">
                  <small>Total Complaints: </small>
                  <span id="total_complaints">2</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-warning card-header-icon">
              <div className="card-icon">
                <i className="material-icons"></i>
              </div>
              <p className="card-category">Today Bookings</p>
              <h3 className="card-title" id="today_booking">
                0
              </h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-danger"></i>
                <a href="javascript:;">
                  <small>Total Bookings: </small>
                  <span id="total_booking">2</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
                <div className="col-md-4">
                    <div className="card card-chart">
                        <div className="card-header card-header-success">
                            <div className="ct-chart" id="usersChart"></div>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Customers</h4>
                            <p className="card-category">
                                Customer Registration</p>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card card-chart">
                        <div className="card-header card-header-warning">
                            <div className="ct-chart" id="complaintsViewsChart"></div>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Complaints</h4>
                            <p className="card-category">Customer Complaints</p>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card card-chart">
                        <div className="card-header card-header-danger">
                            <div className="ct-chart" id="bookingsChart"></div>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Bookings</h4>
                            <p className="card-category">Customer Bookings</p>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card card-chart">
                        <div className="card-header card-header-danger"> */}
      {/* <div className="ct-chart"
                                element-type="chart"
                                type="bar"
                                url="/dashboard/analytic/user/"
                                chart-data='["id","created_at"]'
                                data-key="users"
                                duration-type="week"
                            ></div> */}
      {/* </div>
                        <div className="card-body">
                            <h4 className="card-title">Customers</h4>
                            <p className="card-category">Customer Registration</p>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </AdminLayout>
  );
}
