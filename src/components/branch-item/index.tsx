import moment from "moment";
import { FC } from "react";
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

  let ref: Object = undefined;

  return (
    <>
      <div className="branch_card" onClick={(e) => handleClick(e)}>
        <div className="col">
          <h4>{title}</h4>
        </div>
        <div className="col">
          <span>
            <i className="fa fa-home" aria-hidden="true"></i>
          </span>
          <p>{description}</p>
        </div>
        <div className="col">
          <span>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </span>
          <p>
            {timers.length > 0
              ? timers.map((x) => (
                  <>
                    {x.day} {x.time}{" "}
                    <i className="fa fa-circle" aria-hidden="true"></i>
                  </>
                ))
              : undefined}
          </p>
        </div>
        <div className="col">
          <div className="see_more">
            <div className="line_bar"></div>
            <a
              ref={(r) => (ref = r)}
              onMouseOver={() => {
                ref["style"]["cursor"] = "pointer";
              }}
            >
              <h5>See More</h5>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchItem;
