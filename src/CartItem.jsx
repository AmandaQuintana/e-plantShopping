import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const parseCost = (costStr) => parseFloat(costStr.substring(1));

  // 1. Total de todos los artículos del carrito
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const price = parseCost(item.cost);
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  // 2. Continuar comprando
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // 4. Incrementar cantidad
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1,
    }));
  };

  // 4. Decrementar cantidad con if/else (updateQuantity o removeItem)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1,
      }));
    } else {
      // si caería a 0, eliminamos el artículo
      dispatch(removeItem(item.name));
    }
  };

  // 5. Eliminar planta del carrito
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 6. Subtotal del artículo (cantidad * precio)
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;


