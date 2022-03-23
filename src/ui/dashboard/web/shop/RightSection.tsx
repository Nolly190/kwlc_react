import React,{ useState, useEffect, FC, useContext } from "react";
import ShopTopProductItem from "../../../../components/shop-top-product";
import { filterShopTopItems, initShopTopItems } from "../../../../controller/shop.controller";
import ShopItemDTO from "../../../../dto/ShopItem.dto";
import { WebShopInterface } from "../../../../types/webShopInterface";
import { ShopContext } from "../../../../context-providers/ShopContext.provider";

export default function ShopRightSection ({onFilter}: WebShopInterface) {
    const _shopContext = useContext(ShopContext);

    const emptyTopItems: ShopItemDTO[] = [];
    
    const [topItems, setTopItems] = useState(emptyTopItems);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filterPrice, setFilterPrice] = useState(0);

    useEffect(() => {
        initShopTopItems(setTopItems, setMaxPrice);
    }, []);

    const onFilterClick = async () => {
        onFilter(minPrice, filterPrice);
        filterShopTopItems(_shopContext.setItems,filterPrice);
    }

    return (
        <>
            <div className="column right">
                <form action="" className="search">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search Item" />
                </form>

                <h3>FILTER BY PRICE</h3>
                <div className="line_filter">
                    <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={filterPrice}
                    className="slider"
                    id="myRange"
                    onChange={(e) => {
                        setFilterPrice(parseInt(e.target.value));
                    }}
                    />
                </div>
                <div className="filter">
                    <button className="button" onClick={() => onFilterClick()}>Filter</button>
                    <div className="filterValue">Price <span >N{minPrice}- N{(filterPrice > 0 ? filterPrice : maxPrice)}</span></div>
                </div>

                <h3>TOP PRODUCTS</h3>
                {
                    topItems.length > 0 ? topItems.map(x => {
                        return (
                            <ShopTopProductItem 
                                copies={x.copies}
                                href={"/web/product?id=" + x.id}
                                img={x.img}
                                price={x.price}
                                title={x.title}
                                key={x.id}
                            />
                        );
                    })
                    : undefined
                }
        </div>
        </>
    );
}