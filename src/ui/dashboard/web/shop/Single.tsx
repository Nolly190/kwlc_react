import React, {useState, useEffect} from "react";
import ShopItem from "../../../../components/shop-item";
import { shopLoadItem, shopOpenTab, shopRelatedItems } from "../../../../controller/shop.controller";
import ShopItemDTO from "../../../../dto/ShopItem.dto";
import { getParam, showMessage } from "../../../../utils";
import Layout from "../layout";

export default function ProductDetail() {
    const [item, setItem] = useState(new ShopItemDTO());
    const [quantity, setQuantity] = useState(1);
    const [relatedItem, setRelatedItem] = useState(new Array<ShopItemDTO>());
    
    useEffect(() => {
        const id = getParam("id");
        if (!id) { router.push("/web/";}
        shopLoadItem(setItem, id);
        shopRelatedItems(setRelatedItem, id);
    }, []);

    const onPurchase =  () => {
        showMessage('success', 'Item Purchased', '');
    }
    
    return (
        <Layout
            externalStyles={["/styles/css/style.css"]}
            navbar={"web"}
            title={item ? item.title : "Product Detail"}
            withFooter={true}
        >
            <div className="productLanding" style={{paddingTop: 10}}>
                {/* <div className="shopNow">Shop Now</div> */}
                <div className="row">
                    <div className="column first">
                        {
                            item.images.length > 0 ? 
                            item.images.slice(0,2).map((x, index) => {
                                return (
                                    <img
                                        key={index}
                                        style={{marginBottom: "10px"}}
                                        src={item.img}
                                        alt={item.title}
                                    />    
                                );
                            })
                            : undefined
                        }
                    </div>
                    <div className="column second">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="column third">
                        <div className="aboutProduct">
                            <h4>{item.title}</h4>
                            <div className="price">Price: <span>N{item.price}</span></div>
                            <div className="about">
                            {item.description}
                            </div>
                            <div className="copies">{item.copies} copy(s) available</div>
                            <div className="select">
                            <form action="">
                                Quantity 
                                <i className="fa fa-chevron-left" onClick={() => {
                                    if (quantity > 0) setQuantity(quantity-1);
                                }}></i> 
                                <span>{quantity}</span>
                                <i className="fa fa-chevron-right" onClick={() => {
                                    if (quantity <= item.copies) setQuantity(quantity+1);
                                }}></i>
                            </form>
                            <button className="button" onClick={() => onPurchase()}>Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="moreInfo">
                    <div className="tabs">
                        <div className="tablinks" onClick={(e) => shopOpenTab(e, 'Description')}>
                            Additional Information
                        </div>
                        <div className="tablinks active" onClick={(e) => shopOpenTab(e, 'AdditionalInformation')}>
                            Description
                        </div>
                    </div>

                    <div id="Description" className="tabcontent">
                        <p>
                            {item.description}
                        </p>
                    </div>
                    <div id="AdditionalInformation" className="tabcontent">
                        {
                            item.information.length > 0 ?
                                item.information.map((x, index) => {
                                    return (
                                        <div key={index} className="more">
                                            <div className="type">{x.key}</div>
                                            <div className="info">{x.value}</div>
                                        </div>
                                    );
                                })
                            : undefined
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="relatedProduct">Related Product</div>
                    <div className="products">
                        {
                            relatedItem.length > 0 ? 
                                relatedItem.slice(0, 3).map((x, index) => {
                                    return (
                                        <ShopItem
                                            key={x.id}
                                            img={x.img}
                                            price={x.price}
                                            title={x.title}
                                            href={"/web/product?id=" + x.id}
                                        />
                                    );
                                })        
                            : undefined
                        }
                    </div>
                </div>
            </div>

        </Layout>
    );
}