import React, { useState} from "react";
import { useCart } from "../../utils/cartContext";
import "../../styles/cart-items.css"
import styled, {css, keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
} from "mdb-react-ui-kit";

const explodeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  ${'' /* 100% { transform: scale(2); } */}
`;

const StyledHeartIcon = styled(({ isActive, ...props }) => <FontAwesomeIcon {...props} />)`
  color: ${({ liked }) => (liked === 'true' ? "red" : "black")};
  ${({ isActive }) => isActive && css`animation: ${explodeAnimation} 0.8s forwards;`};
`;

const ViewOrderItems = ({ item,handleLikeClick, isOrderDetail=false  }) => {
  const [liked, setLiked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const {removeFromCart, updateCartItemQuantity} =useCart();
  const{carName, color, imgUrl, quantity,total_price ,unit_price ,brand}=item
  const [amount, setQuantity] = useState(1); // Khởi tạo state cho số lượng, ban đầu là 1

  const handleClick = () => {
    setLiked(!liked)
      // Nếu chưa được thích trước đó, tăng lượt rating lên 1
    // setLiked(true);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 800);
    handleLikeClick()
      // Cập nhật lượt rating của sản phẩm
      // Nếu đã được thích trước đó, giảm lượt rating đi 1

    // setLiked(!liked);
    // setIsActive(true);
    // setTimeout(() => setIsActive(false), 800);
    // updateProductRating(item.productId);
    
  };

  const handleRemove = () => {
    // Gọi hàm removeFromCart để xóa mục khỏi giỏ hàng khi người dùng click vào biểu tượng xóa
    removeFromCart(item.product);
  };

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    updateCartItemQuantity(item.product, amount + 1); // Gọi hàm xử lý từ props để cập nhật số lượng
    
  };

  const decreaseQuantity = () => {
    if (amount > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
     
      updateCartItemQuantity(item.product, amount-1); // Gọi hàm xử lý từ props để cập nhật số lượng

    } else{return;}
  };
    // <div className="cart-item my-1">
    //     <div className="row">
    //       <div className="col-4 col-lg-2">
    //         <img src={imgUrl} alt="Car" height="45" width="65" />
    //       </div>
    //       <div className="col-5 col-lg-6">
    //         <a href="#">{carName}</a>
    //       </div>
    //       <div className="col-3 col-lg-4 mt-4 mt-lg-0">
    //         <p>{quantity} x ${unit_price} = <b>${total_price}</b></p>
    //       </div>
    //     </div>
    //     <button onClick={removeFromCart}>Delete</button>

    //   </div>
    if (!item) {
      return <div>Invalid item</div>;
      }

    if(isOrderDetail){
      return(
      
        // <div className="item">
        //     <div className="image">
        //       <img src={imgUrl} alt="" />
        //     </div>
         
        //     <div className="description">
        //       <span style={{fontWeight:'bold',fontSize:'13px', color:'#96630b'}}>{brand}</span>
        //       <span>{carName}</span>
        //       <span style={{fontSize:'12px',fontWeight:'bolder',color:'gray'}} >{color}</span>
        //     </div>
        //     <div className="total-price">{unit_price*amount}</div>
        //   {/* <div ></div> */}
        //   </div>
          <MDBCard className="shadow-0 border mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="2">
                  <MDBCardImage
                    src={imgUrl}
                    fluid
                    alt={carName}
                  />
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0">{carName}</p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">{color}</p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">
                    {brand}
                  </p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">Qty: {quantity}</p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">{total_price}</p>
                </MDBCol>
              </MDBRow>
              <hr
                className="mb-4"
                style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
              />
              <MDBRow className="align-items-center">
                <MDBCol md="2">
                  <p className="text-muted mb-0 small">Track Order</p>
                </MDBCol>
                <MDBCol md="10">
                  <MDBProgress
                    style={{ height: "6px", borderRadius: "16px" }}
                  >
                    <MDBProgressBar
                      style={{
                        borderRadius: "16px",
                        backgroundColor: "#000d6b",
                      }}
                      width={26}
                      valuemin={0}
                      valuemax={100}
                    />
                  </MDBProgress>
                  <div className="d-flex justify-content-around mb-1">
                    <p className="text-muted mt-1 mb-0 small ms-xl-5">
                      Out for delivary
                    </p>
                    <p className="text-muted mt-1 mb-0 small ms-xl-5">
                      Delivered
                    </p>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard> 

      );

   
    }

    return(
      
      <div className="item">
        <div className="buttons">
          <StyledHeartIcon
            icon={liked ? faHeart : faHeartRegular}
            liked={liked.toString()}
            isActive={isActive}
            onClick={handleClick}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="trash-icon"
            onClick={handleRemove}
          />
        </div>
       
          <div className="image">
            <img src={imgUrl} alt="" />
          </div>
       
          <div className="description">
            <span>Common Projects</span>
            <span>{carName}</span>
            <span>{color}</span>
          </div>
        <div className="quantity">
          <button
            className="plus-btnc"
            type="button"
            name="button"
            onClick={increaseQuantity}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <input type="text" name="name" value={amount} readOnly />
          <button
            className="minus-btnc"
            type="button"
            name="button"
            onClick={decreaseQuantity}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
       
          <div className="total-price">{unit_price*amount}</div>
        </div>
    );
}
export default ViewOrderItems