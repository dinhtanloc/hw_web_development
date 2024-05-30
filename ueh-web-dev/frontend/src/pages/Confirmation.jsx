import React from "react";

const Confirmation = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p><b>Name:</b> Ghulam Abbas</p>
          <p><b>Phone:</b> 111 111 1111</p>
          <p className="mb-4"><b>Address:</b> 2968, Oakwood Circle, DENVILLE, 07834, USA</p>
          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          <hr />
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
          <hr />
          {/* <div className="col-span-2 sm:col-span-1">
                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input value={''} onChange={''} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                            </div> */}
        </div>
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal: <span className="order-summary-values">$89.99</span></p>
            <p>Shipping: <span className="order-summary-values">$25</span></p>
            <p>Tax: <span className="order-summary-values">$0</span></p>
            <hr />
            <p>Total: <span className="order-summary-values">$114.99</span></p>
            <hr />
            <button id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
