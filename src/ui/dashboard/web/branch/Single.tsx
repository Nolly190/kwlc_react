/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadSingleBranch } from "../../../../controller/branch.controller";
import { BranchItemDTO } from "../../../../dto/Branch.dto";
import { BranchesModel } from "../../../../testModel";
import { fakeModel, getParam, mmFormat } from "../../../../utils";
import Layout from "../layout";

const SingleBranch = () => {
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState(new BranchItemDTO());
  const router = useRouter();

  useEffect(() => {
    const idParam = getParam("id");
    if (!idParam) {
      router.push("/web/");
    } else {
      loadSingleBranch(setItem, idParam);
    }
  }, []);

  console.log("item", item);

  return (
    <Layout
      externalStyles={["/styles/css/donation.css"]}
      navbar={"web"}
      title="Church Branches"
      withFooter={true}
      withSideBar={false}
    >
      <div className="eachBranch">
        <div className="hero-banner-area">
          <img src={item?.image?.url || BranchesModel[0].image.url} alt="" />
          <div className="hero-banner-area-text">
            <h2>{item.title}</h2>
          </div>
        </div>

        <section className="hero-content" style={{ marginBottom: "2rem" }}>
          <h3>You're Welcome {item.title}</h3>

          <ProfileWrapper>
            <ProfileInfoWrapper>
              <img src="/images/profile.jpg" alt="" srcSet="" />
              <div className="profile-info">
                <h5>{item.leadPastor}</h5>
                <p>Lead pastor</p>
              </div>
            </ProfileInfoWrapper>
            <ProfileContentWrapper>
              <img src="/images/subtractSingleBranch.png" alt="" srcSet="" />
              <div className="profile-content">
                <p>Hello people,</p>
                <span>
                  My Name is {item.leadPastor}, a pastor in kingdom ways living
                  church international. It’s my humble pleasure to welcome you
                  to our world.
                </span>
                <span>Welcome! I celebrate you.</span>
              </div>
            </ProfileContentWrapper>
          </ProfileWrapper>

          <ServiceWrapper className="w-100 mt-4">
            <LocationWrapper className="col card">
              <img src="/images/list-icon-1.svg" alt="" srcSet="" />
              <p>{item.location}</p>
            </LocationWrapper>

            <ServiceTimeWrapper>
              <div className="card row w-100 align-center justify-start cards">
                <div className="image">
                  <img src="/images/list-icon-2.svg" alt="" srcSet="" />
                </div>
                <span>
                  <p className="inline">
                    {item.timers?.length > 0
                      ? item.timers?.map((x, index) => {
                          return (
                            <ul key={index} className="inline">
                              <li>
                                {x.day} {x.time}
                              </li>
                            </ul>
                          );
                        })
                      : undefined}
                  </p>
                </span>
              </div>

              <div className="card row w-100 align-center justify-start cards">
                <div className="image">
                  <img src="/images/list-icon-3.svg" alt="" srcSet="" />
                </div>

                <span>
                  <p className="inline">
                    {item.phoneNo && item.phoneNo[0]}
                    <ul className="inline">
                      <li>{item.phoneNo && item.phoneNo[1]}</li>
                    </ul>
                  </p>
                </span>
              </div>
            </ServiceTimeWrapper>
          </ServiceWrapper>
        </section>
        {/* <section className="w-100">
          <div className="image map">
            <img src="/images/maps.jpeg" alt="" srcSet="" />
          </div>
        </section> */}
      </div>
    </Layout>
  );
};

export default SingleBranch;

const ProfileWrapper = styled.div`
  display: flex;
  gap: max(40px, 4vw);
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 284px;
  height: 330px;

  & > img {
    height: 249px;
  }

  & h5 {
    font-weight: 700;
    font-size: 20px;
  }

  .profile-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    background: #77b6d5;
    padding: 0.7rem 0;
    height: 78px;
    font-style: normal;
    font-weight: bold;
    font-size: var(--font-norm);
    line-height: 27px;
    color: #000000;
  }

  .profile-info p {
    margin-top: 0;
    font-style: normal;
    font-weight: normal;
    font-size: var(--mfont-reg);
    line-height: 22px;
    color: #000000;
  }
`;

const ProfileContentWrapper = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  height: 330px;

  & > .profile-content {
    background: #ffffff;
    height: 100%;
    padding: 3rem;
    box-shadow: 0px 4px 20px rgba(119, 182, 213, 0.5);
  }

  & > img {
    width: 57px;
    height: 47.63px;
  }
`;

const ServiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LocationWrapper = styled.div`
  width: 45%;

  & > img {
    margin-bottom: 1rem !important;
  }
`;
const ServiceTimeWrapper = styled.div`
  width: 45%;
`;
