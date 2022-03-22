import moment from "moment";
import { FC } from "react";
import { BranchServiceDTO } from "../../dto/Branch.dto";

interface branchItem {
    title: string,
    description: string,
    timers: BranchServiceDTO[],
    onClick,
};

const BranchItem:FC<branchItem> = ({title, description, timers, onClick}) => {
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }
    
    let ref:Object = undefined;
    
    return (
        <>
            {/* <div className="col">
                <h4>{title}</h4>

                <div className="row">
                    <div className="image">
                        <img src="/images/list-icon-1.svg" alt=""  />
                    </div>
                    <span>
                        {description}
                    </span>
                </div>

                <div className="row">
                    <div className="image">
                        <img src="/images/list-icon-2.svg" alt="" />
                    </div>

                    <span>{`${moment(timers[0]).format("hh:mm a")}-${moment(timers[1]).format("hh:mm a")}`}
                        <ul>
                            <li>{`${moment(timers[2]).format("hh:mm a")}-${moment(timers[3]).format("hh:mm a")}`}</li>
                        </ul>
                    </span>
                </div>
                <a href="#" onClick={(e) => handleClick(e)}>See More</a>
            </div> */}

            <div className="branch_card">
                <div className="col">
                    <h3>{title}</h3>
                </div>
                <div className="col">
                    <span><i className="fa fa-home" aria-hidden="true"></i></span>
                    <p>{description}</p>
                </div>
                <div className="col">
                    <span><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                    <p>
                        {timers.length > 0 ? timers.map(x => (
                        <>
                            {x.day} {x.time} <i className="fa fa-circle" aria-hidden="true"></i> 
                        </>)) : undefined}
                        
                        
                    </p> 
                </div>
                <div className="col">
                    <div className="see_more">
                        <div className="line_bar"></div>
                        <a 
                            ref={(r => ref = r)} 
                            onMouseOver={() => {
                                ref['style']['cursor'] = 'pointer';
                            }} 
                            onClick={(e) => handleClick(e)}
                        >
                            <h4>See More</h4>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BranchItem;