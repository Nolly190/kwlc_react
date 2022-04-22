/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadSingleBranch } from "../../../../controller/branch.controller";
import { BranchDTO, BranchItemDTO } from "../../../../dto/Branch.dto";
import { fakeModel, getParam, mmFormat } from "../../../../utils";
import Layout from "../layout";

const SingleBranch = () => {
  const [item, setItem] = useState(new BranchDTO());
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
          <img
            src={
              item?.sliderVm
                ? item?.sliderVm[0]?.sliderImages[0]?.url
                : "/images/branches-hero-image.jpg"
            }
            alt=""
          />
          <div className="hero-banner-area-text">
            <h2>{item.name}</h2>
          </div>
        </div>

        <section className="hero-content" style={{ marginBottom: "2rem" }}>
          <h3>You're welcome to {item.name}</h3>

          <ProfileWrapper>
            <div className="profileOne">
              <ProfileInfoWrapper>
                <img src={item?.messageVm?.pastorImage} alt="" srcSet="" />
                <div className="profile-info">
                  <h5>{item?.messageVm?.name}</h5>
                  <p>Lead pastor</p>
                </div>
              </ProfileInfoWrapper>
            </div>
            <div className="profileTwo">
              <ProfileContentWrapper>
                <img src="/images/subtractSingleBranch.png" alt="" srcSet="" />
                <div className="profile-content">
                  <h4>Hello people,</h4>
                  <br />
                  <div className="profile_description" dangerouslySetInnerHTML={{ __html: item?.messageVm?.message }}>
                  </div>
                </div>
              </ProfileContentWrapper>
            </div>
          </ProfileWrapper>

          <ServiceWrapper>
            <LocationWrapper className="cards">
              <img src="/images/list-icon-1.svg" alt="" srcSet="" />
              <p>{item.address}</p>
            </LocationWrapper>
            <ServiceTimeWrapper>
              <Card>
                <div className="cards">
                  <div className="image">
                    <img src="/images/list-icon-2.svg" alt="" srcSet="" />
                  </div>
                  <span>
                    <p className="inline">
                      <ul>
                        {item.services?.length > 0
                          ? item.services?.map((x, index) => {
                            return (
                              <li key={index}>
                                {`${x.day} - ${x.time}`}
                                {item.services?.length - 1 !== index && (
                                  <span>·</span>
                                )}
                              </li>
                            );
                          })
                          : undefined}
                      </ul>
                    </p>
                  </span>
                </div>
              </Card>

              <Card>
                <div className="cards">
                  <div className="image">
                    <img src="/images/list-icon-3.svg" alt="" srcSet="" />
                  </div>

                  {/* <span>
                    <p className="inline">
                      {item.phoneNo && item.phoneNo[0]}
                      <ul className="inline">
                        <li>{item.phoneNo && item.phoneNo[1]}</li>
                      </ul>
                    </p>
                  </span> */}
                </div>
              </Card>
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: max(40px, 4vw);
  margin-bottom: 2rem;

  @media screen and (min-width: 900px) {
    flex-wrap: nowrap;
  }
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

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
    line-height: 20px;
    color: #000000;
  }
`;

const ProfileContentWrapper = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 680px;

  & > .profile-content {
    background: #ffffff;
    height: 100%;
    padding: 1rem;
    width: 100%;
    box-shadow: 0px 4px 20px rgba(119, 182, 213, 0.5);
  }

  & .profile_description {
    font-style: normal;
    font-size: 16px;
  }

  & > img {
    width: 57px;
    height: 47.63px;

    transform: rotate(90deg);
    margin: 0.5rem;
  }

  @media screen and (min-width: 768px) {
    & > .profile-content {
      padding: 2rem;
      height: 332px;
    }

    & > img {
      width: 57px;
      height: 47.63px;
    }
  }

  @media screen and (min-width: 900px) {
    flex-direction: row;
    align-items: center;
    & > img {
      margin: 0%;
      transform: none;
    }
  }
`;

const ServiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 3rem;

  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

const ServiceTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 900px) {
    width: 45%;
    flex-direction: column;
    gap: 10px;
    margin-top: 0%;
  }
`;

const Card = styled.div`
  width: 100%;
  margin-top: 1rem;

  @media screen and (min-width: 900px) {
    min-width: 300px;
    margin-top: auto;
    align-items: center;

    & .cards {
      display: flex;
      gap: 15px;

      ul {
        display: flex;
        gap: 15px;

        li {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        span {
          font-size: 50px;
          margin-top: -10px;
        }
      }
    }
  }
`;

const LocationWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;

  & > p {
    font-size: 16px !important;
  }

  @media screen and (min-width: 900px) {
    width: 45%;

    & > p {
      font-size: 14px;
    }
  }
`;
