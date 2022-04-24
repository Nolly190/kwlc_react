import { FC } from "react";
import styled from "styled-components";
import { BranchServiceDTO } from "../../dto/Branch.dto";

interface branchItem {
  title: string;
  description: string;
  timers: BranchServiceDTO[];
  onClick;
}

const BranchItem: FC<branchItem> = ({
  title,
  description,
  timers,
  onClick,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <Wrapper onClick={(e) => handleClick(e)}>
      <TopWrapper>
        <img
          className="service_img"
          src="/images/worship-1.png"
          alt="worship Image"
        />
        <h4 className="worship_head">{title}</h4>
      </TopWrapper>
      <BottomWrapper>
        <TimeWrapper>
          <span>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </span>
          <div>
            {timers?.length > 0
              ? timers.map((x, index) => (
                <TimeItem key={index}>
                  <p>{x.day}</p>
                  <p>{x.time}</p>
                </TimeItem>
              ))
              : undefined}
          </div>
        </TimeWrapper>
        <LocationWrapper>
          <span>
            <i className="fa fa-home" aria-hidden="true"></i>
          </span>
          <p>
            {description}
          </p>
        </LocationWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default BranchItem;

const Wrapper = styled.div`
  height: auto;
  border-radius: 20px;
  width: 280px;
  box-shadow: 1px 4px 10px rgb(0 0 0 / 10%);
  cursor: pointer;

  &:hover {
    box-shadow: 1px 4px 10px rgb(0 0 0 / 30%);
  }
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 75px;

  & > img {
    position: absolute;
    max-width: 100%;
    height: 100%;
  }

  & > h4 {
    color: var(--white-color);
    font-size: var(--mfont-mini);
    z-index: 2;
  }
`;

const BottomWrapper = styled.div`
  text-align: center;
  padding: 1.2rem 1.4rem;

  & > h3 {
    font-size: 14px !important;
    line-height: 1.7;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;

  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  & > span {
    margin-top: -3px;
    font-size: 22px;
  }
`;

const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;

  & > p {
    line-height: 20px;
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  align-items: flex-start;

  & > span {
    margin-top: -3px;
    font-size: 22px;
  }

  & > p {
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    text-align: start;
  }
`;
