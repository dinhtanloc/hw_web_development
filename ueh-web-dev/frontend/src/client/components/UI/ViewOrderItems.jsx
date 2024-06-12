import React from "react";
import { useCart } from "../../utils/cartContext";
import "../../styles/cart-items.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


const ViewOrderItems = ({ item}) => {
  const {removeFromCart, updateCartItemQuantity} =useCart();
  const{carName, color, imgUrl, quantity,total_price ,unit_price }=item
  console.log(item)
  const [amount, setQuantity] = useState(quantity); // Khởi tạo state cho số lượng, ban đầu là 1

  const handleRemove = () => {
    // Gọi hàm removeFromCart để xóa mục khỏi giỏ hàng khi người dùng click vào biểu tượng xóa
    removeFromCart(item.id);
  };

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    updateCartItemQuantity(item.id, quantity + 1); // Gọi hàm xử lý từ props để cập nhật số lượng
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      updateCartItemQuantity(item.id, quantity - 1); // Gọi hàm xử lý từ props để cập nhật số lượng
    }
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
          <div className="buttons">
            {/* <span className="delete-btnc"></span>
            <span className="like-btnc"></span> */}
            <FontAwesomeIcon icon={faHeartRegular} style={{ marginRight: '10px' }} />
      <FontAwesomeIcon icon={faHeart} style={{ marginRight: '10px' }} />
            <FontAwesomeIcon icon={faTrash} onClick={handleRemove} />
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
            <button className="plus-btnc" type="button" name="button" onClick={increaseQuantity}>
              {/* <img src="plus.svg" alt="" /> */}
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <input type="text" name="name" value={amount} readOnly/>
            <button className="minus-btnc" type="button" name="button" onClick={decreaseQuantity}>
              {/* <img src="minus.svg" alt="" /> */}
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
       
          <div className="total-price">{total_price}</div>
        </div>
    );
}
export default ViewOrderItems