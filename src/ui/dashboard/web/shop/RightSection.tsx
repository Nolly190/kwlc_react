import React,{ useState, useEffect, FC, useContext } from "react";
import ShopTopProductItem from "../../../../components/shop-top-product";
import { filterShopTopItems, initShopTopItems } from "../../../../controller/shop.controller";
import ShopItemDTO from "../../../../dto/ShopItem.dto";
import { WebShopInterface } from "../../../../types/webShopInterface";
import { ShopContext } from "../../../../context-providers/ShopContext.provider";
import { Input, Button } from '@chakra-ui/react';


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
                <Input
                    focusBorderColor= '#000'
                    placeholder='Search articles' 
                    margin= '0 0 1rem 0'
                    // variant='outline'
                    // colorScheme='#000'
                    // box-shadow= '0 1px 6px 0 rgb(32 33 36 / 15%)'
                    onChange={(event) => {
                    setSearchTerm(event.target.value);
                    }}
                    className='pad'
                />

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
                <Button 
                    background='#000' 
                    color='#fff'
                    margin='.75rem 0'
                    height= '3.2rem'
                    width= '8rem'
                    variant='solid'
                    _hover={{ bg: '#3c3d3e' }}
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    onClick={() => onFilterClick()}
                >
                    Filter
                </Button>
                    {/* <button className="button" onClick={() => onFilterClick()}>Filter</button> */}
                    <div className="filterValue">Price <span >N{minPrice}- N{(filterPrice > 0 ? filterPrice : maxPrice)}</span></div>
                </div>

                <div className="columnProducts">
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
        </div>
        </>
    );
}

function setSearchTerm(value: string) {
    throw new Error("Function not implemented.");
}
