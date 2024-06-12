import React, { useState} from "react";
import { useCart } from "../../utils/cartContext";
import "../../styles/cart-items.css"
import styled, {css, keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


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
  const{carName, color, imgUrl, quantity,total_price ,unit_price }=item
  // console.log(item)
  const [amount, setQuantity] = useState(quantity); // Khởi tạo state cho số lượng, ban đầu là 1

  const handleClick = () => {
    setLiked(!liked)
      // Nếu chưa được thích trước đó, tăng lượt rating lên 1
    // setLiked(true);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 800);
    // console.log(item.id)
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
    // console.log(item.id)
    removeFromCart(item.product);
  };

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    updateCartItemQuantity(item.product, amount + 1); // Gọi hàm xử lý từ props để cập nhật số lượng
    // console.log(quantity+1)
    // console.log(amount+1)
  };

  const decreaseQuantity = () => {
    if (amount > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      // console.log(prevQuantity-1)
      // console.log(amount)
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

    return(
      <div className="item">
          {!isOrderDetail ? (
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
      ) : null}
       
          <div className="image">
            <img src={imgUrl} alt="" />
          </div>
       
          <div className="description">
            <span>Common Projects</span>
            <span>{carName}</span>
            <span>{color}</span>
          </div>
          {!isOrderDetail ? (
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
      ) : null}
       
          <div className="total-price">{unit_price*quantity}</div>
        </div>
    );
}
export default ViewOrderItems