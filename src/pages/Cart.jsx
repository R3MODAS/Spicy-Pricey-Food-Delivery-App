import { useDispatch, useSelector } from "react-redux"
import RestaurantMenuList from "../components/RestaurantMenuList";
import CartList from "../components/CartList";
import { clearCart } from "../utils/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart is cleared Successfully', {
      className : "font-ProximaNovaSemiBold",
      position : "top-center",
      duration : 1500
  });
  }

  return (
    <div className="2xl:w-6/12 mx-auto menu-container pt-28 pb-5 md:w-10/12 w-full px-3">
      {
        cartItems.length === 0 ? <CartList items={cartItems} /> : <>
          <h2 className="font-ProximaNovaBlack text-2xl md:text-3xl lg:text-4xl text-center mb-5">Welcome to Cart Page</h2>
          <button className="bg-black text-white w-24 h-9 md:w-32 md:h-11 text-sm md:text-base font-ProximaNovaSemiBold block mx-auto mb-3"
            onClick={handleClearCart}
          >Clear Cart</button>
          <CartList items={cartItems} />
        </>
      }
      <Toaster/>
    </div>
  )
}

export default Cart