import React,{ useState, useEffect, useContext } from "react";
import ShopItem from "../../../../components/shop-item";
import { initShopLeftItems } from "../../../../controller/shop.controller";
import ShopItemDTO from "../../../../dto/ShopItem.dto";
import { ShopItemsModel } from "../../../../testModel";
import { fakeModel } from "../../../../utils";
import { ShopContext } from "./../../../../context-providers/ShopContext.provider";

export default function ShopLeftSection() {
    const _shopContext = useContext(ShopContext);
    
    const emptyTopItems: ShopItemDTO[] = [];
    const staticItemsPerPage = 2;
    
    const [items, setItems] = useState(emptyTopItems);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(staticItemsPerPage);
    let min = 0;

    const calcMin = () => {
        min = ((((itemsPerPage/staticItemsPerPage) -1) * staticItemsPerPage));
        console.log("min", min, itemsPerPage, staticItemsPerPage);
    }

    const loadNext = () => {
        /* 
          0, 6  => [((6 * 1/ 6) = 1 - 1 = 0) * 6], [6] ::-> +6
          6, 12 => [((12 * 1/6) = 2 -1 = 1) * 6], [12] ::-> +6
          12, 18 => [((18 * 1/6) = 3 -1 = 2) * 6], [18] ::-> +6
          18, 24
        */
        // calcMin();
       setItemsPerPage(() => itemsPerPage + staticItemsPerPage);
    }
    const loadPrev = () => {
        setItemsPerPage(() => itemsPerPage - staticItemsPerPage);
    }
    
    useEffect(() => {
        initShopLeftItems(_shopContext.setItems);
    }, [itemsPerPage, _shopContext.setItems]);
    
    calcMin();
    return (
        <div className="column left">
          <div className="setSearch">
            <div className="result">
                Showing 
                {`${page}/${itemsPerPage} of ` + _shopContext.items.length} 
                {/* 1/9 of 15  */}
                {' '} results
            </div>
            <div className="default">Default Sorting</div>
          </div>
          <div className="products">
              {
                  (_shopContext.items.length > 0 ?
                    _shopContext.items?.slice(min, itemsPerPage).map(x => {
                        return (
                            <ShopItem 
                                key={x.id}
                                img={x.img}
                                price={x.price}
                                title={x.title}
                                href={"/web/product?id=" + x.id}
                            />
                        )
                    })
                    : undefined)
              }
          </div>
          <div className="row">
            {
                (_shopContext.items.length > staticItemsPerPage
                    &&
                    itemsPerPage < _shopContext.items.length) &&
                        <div className="pages_button">
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                loadNext();
                            }} className="next"><h5>Next Page</h5></a>
                        </div>
            }
            {
                (_shopContext.items.length > staticItemsPerPage
                    &&
                    itemsPerPage > staticItemsPerPage) &&
                        <div className="pages_button">
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                loadPrev();
                            }} className="next"><h5>Prev Page</h5></a>
                        </div>
            }
          </div>
          
        </div>
    );
}