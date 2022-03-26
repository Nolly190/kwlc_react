import {Button} from '@chakra-ui/react';
export default function ShopItem({img, title, price, href}) {
    return (
        <a href={href}>
            <div className="product" >
                <img src={img} alt={title} />
                <Button 
                    background='#000' 
                    color='#fff'
                    height= '3.2rem'
                    width= '8rem'
                    variant='solid'
                    _hover={{ bg: '#3c3d3e' }}
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                >
                    Add to Cart
                </Button>
                <h4>{title}</h4>
                <p className="price">Price <span>N{price}</span></p>
            </div>
        </a>
    );
}