import React from "react";

const ViewOrderItems = ({ props }) => {
    const{}=props.item

    return(
        <div className="cart-item my-1">
            <div className="row">
              <div className="col-4 col-lg-2">
                <img src="./images/airpords.jpg" alt="Laptop" height="45" width="65" />
              </div>
              <div className="col-5 col-lg-6">
                <a href="#">HP 15-CX0056WM Laptop, 15.6" FHD</a>
              </div>
              <div className="col-3 col-lg-4 mt-4 mt-lg-0">
                <p>1 x $89.99 = <b>$89.99</b></p>
              </div>
            </div>
          </div>
    );
}
export default ViewOrderItems