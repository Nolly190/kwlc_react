import {AiFillGift} from "react-icons/ai"

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