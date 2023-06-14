import React from 'react'
import CartFilterProduct from './CartFilterProduct'

export const CartProducts = ({cartProducts, cartProductIncrease, cartProductDecrease, reduceOfPrice, reduceOfQty}) => {
  return cartProducts.map(cartProduct => {
    return <CartFilterProduct key={cartProduct.ID} 
    cartProduct={cartProduct} 
    cartProductIncrease={cartProductIncrease} 
    cartProductDecrease={cartProductDecrease} 
    reduceOfPrice={reduceOfPrice}
    reduceOfQty={reduceOfQty}/>
  })
}

