import { AiFillGift } from "react-icons/ai";


export default function DonateBtn({label="Donate", withImg=true, style={}, className="", labelStyle={color: "white"}, onClick}) {
    return (
        <button 
            type={style['type'] || 'button'} 
            className={!className ? "btn " : className} 
            style={{...style, }}
            onClick={(e) => onClick && onClick(e)}
        >
            {
                withImg && <AiFillGift/>
                
            }
            
            {/* <i className="fa fa-gift" aria-hidden="true"></i> */}
            <span style={{marginRight: 5, ...labelStyle}} >
                {` ${label} `}
            </span>
        </button>
    );
}

//export default function DonateBtn({
//   label = "Donate",
//   withImg = true,
//   style = {},
//   className = "",
//   labelStyle = { color: "white" },
//   onClick,
// }) {
//   return (
//     <button
//       type={style["type"] || "button"}
//       className={!className ? "btn " : className}
//       style={{ ...style }}
//       onClick={(e) => onClick && onClick(e)}
//     >
//       {withImg && <AiFillGift />}

//       {/* <i className="fa fa-gift" aria-hidden="true"></i> */}
//       <span style={{ marginRight: 5, ...labelStyle }}>{` ${label} `}</span>
//     </button>
//   );
//   return (
//     <div
//       className={
//         "border bg-black d-flex align-items-center rounded  p-1 " +
//         props.className
//       }
//     >
//       <a href={props.href}>
//         {!props.noIcon && (
//           <img
//             src="/assets/images/heart(1) 1donor-hand.png"
//             className="homepage-donate-icon"
//           />
//         )}
//         <span className="ml-10px">{props.label ? props.label : "Donate"}</span>
//       </a>
//     </div>
//   );

