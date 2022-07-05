import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ConfirmPayment, getUserHistory } from "../../../../api/familyArea.api";
import DualRing from "../../../../components/loader";
import { KingdomPublisherConfirmPaymentDto } from "../../../../dto/familyArea.dto";
import { LoaderWrapper } from "../../admin/blog/getall";

const KingdomPage = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);
  const router = useRouter();

  const handlePayNow = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    // const payload: KingdomPublisherConfirmPaymentDto = {
    //   uniqueId: TkpID,
    //   email: emailLogin,
    // };
    // const response = await ConfirmPayment(payload);
    // console.log(response, payload, "ppp loogg");
    // if (response.status) {
    //   toast.success(response.responseMessage);
    // } else {
    //   toast.error(response.responseMessage);
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("TKPID") === null) router.push("/web");
  }, [router]);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header card-header-primary">
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <span className="nav-tabs-title">
                  Kingdom Publisher History
                </span>
                <ul className="nav nav-tabs" data-tabs="tabs">
                  <li className="nav-item" onClick={(e) => handlePayNow(e)}>
                    <a className="nav-link active" data-toggle="tab">
                      Pay Now
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
            <div className="table-responsive" id="table_div">
              {isLoading ? (
                <LoaderWrapper>
                  <DualRing width="40px" height="40px" color="#0b0146" />
                </LoaderWrapper>
              ) : (
                <table className="table">
                  <thead className=" text-primary">
                    <th>Title</th>
                    <th>State</th>
                    <th>Pastor</th>
                    <th>Is HQ</th>
                    <th>Date Created</th>
                    <th></th>
                    <th></th>
                  </thead>
                  <tbody id="tbody">
                    {items?.length > 0 ? (
                      items.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name}</td>
                            <td> {x.state}</td>
                            <td>
                              yyyy
                              {/* {branchController.renderPastor(pastors, x.id)} */}
                            </td>
                            <td> {x.isBranchHq ? "Yes" : "No"}</td>
                            <td>
                              kjnjknnjk
                              {/* {moment(x.dateCreated).format("DD/MMM/yyyy")} */}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div>no data available</div>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KingdomPage;
