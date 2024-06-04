import React from "react";
import { useCart } from "../../utils/cartContext";

const ViewOrderItems = ({ item }) => {
  const {removeFromCart} =useCart();
    if (!item) {
      return <div>Invalid item</div>;
    }
    const{carName, color, imgUrl, quantity,total_price ,unit_price }=item
    console.log(item)

    return(
        <div className="cart-item my-1">
            <div className="row">
              <div className="col-4 col-lg-2">
                <img src={imgUrl} alt="Car" height="45" width="65" />
              </div>
              <div className="col-5 col-lg-6">
                <a href="#">{carName}</a>
              </div>
              <div className="col-3 col-lg-4 mt-4 mt-lg-0">
                <p>{quantity} x ${unit_price} = <b>${total_price}</b></p>
              </div>
            </div>
            <button onClick={removeFromCart}>Delete</button>

          </div>
    );
}
export default ViewOrderItems