import React,{ useState, useEffect, FC, useContext } from "react";
import ShopTopProductItem from "../../../../components/shop-top-product";
import { filterShopTopItems, initShopTopItems } from "../../../../controller/shop.controller";
import ShopItemDTO from "../../../../dto/ShopItem.dto";
import { WebShopInterface } from "../../../../types/webShopInterface";
import { ShopContext } from "../../../../context-providers/ShopContext.provider";
import { Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';


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
                
                <InputGroup marginBottom='1rem'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                    />
                
                    <Input
                        type='search'
                        placeholder='Search articles' 
                        onChange={(event) => {
                        setSearchTerm(event.target.value);
                        }}
                    />
                </InputGroup>

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
