import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { RES_MENU_IMG } from '../utils/constants';
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

const Checkout = () => {
  const [Razorpay] = useRazorpay();
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const resInfo = useSelector(state => state.cart.restaurant)
  const userDetails = useSelector(state => state.user.userDetails)
  const totalPrice = cartItems.reduce((total, item) => total + (item?.info?.price / 100 || item?.info?.defaultPrice / 100), 0);

  const handleDeleteItem = (item) => {
    if (cartItems?.length > 1) {
      dispatch(deleteItem(item?.info?.id));
      toast.success('Removed from the Cart', {
        className: "font-ProximaNovaSemiBold",
        position: "top-center",
        duration: 1500
      });
    }
    else {
      dispatch(clearCart());
    }

  }

  const handleClearAll = () => {
    dispatch(clearCart())
    toast.success('Cart is cleared Successfully', {
      className: "font-ProximaNovaSemiBold",
      position: "top-center",
      duration: 1500
    });
  }

  const handlePayment = useCallback(() => {
    if (!userDetails) {
      toast.error("Login First")
    }
    else {
      const order = ""
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: resInfo?.deliveryfee ? (totalPrice + resInfo?.deliveryfee) * 100 : totalPrice * 100,
        currency: "INR",
        name: resInfo?.name,
        description: "Payment for the Meal",
        image: resInfo?.img,
        order_id: order.id,
        handler: (res) => {
          if (res) {
            dispatch(clearCart())
          }
        },
        prefill: {
          name: userDetails?.name,
          email: userDetails?.email,
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open();
    }
  }, [Razorpay])

  return (
    <>
      {
        cartItems.length === 0 ?
          <div className='mx-auto pt-5 mb-10 md:w-1/2 min-h-screen'>
            <div className='flex items-center justify-center flex-col mt-20'>
              <img src="/assets/empty-cart.webp" alt="empty-cart" className='w-72 h-64' />
              <h2 className='mt-6 text-xl text-color-6 font-ProximaNovaSemiBold'>Your cart is empty</h2>
              <p className='mt-1 text-color-8 font-ProximaNovaThin text-sm'>You can go to home page to view more restaurants</p>
              <Link to="/" className='uppercase mt-7 py-3 px-5 bg-color-2 text-white font-ProximaNovaBold cursor-pointer border-0 text-[15px] text-center'>see restaurants near you</Link>
            </div>
          </div>
          :
          <>
            <div className='mx-auto mt-28 mb-10 2xl:w-1/2 md:w-4/5 md:px-0 px-5'>
              <div className="checkout-container">
                <div className='flex items-start justify-center gap-4 my-3'>
                  <div>
                    <img src={resInfo?.img} alt="res-img" className='sm:w-auto w-20' />
                  </div>
                  <div className='tracking-tighter'>
                    <h2 className='font-ProximaNovaMed sm:text-2xl text-lg'>{resInfo?.name}</h2>
                    <p className='font-ProximaNovaThin sm:text-base text-sm -mt-1'>{resInfo?.place}</p>
                  </div>
                </div>
                {
                  cartItems?.map((item) => (
                    <div key={item?.info?.id} className='item flex items-start justify-between pb-8'>
                      <div className='md:w-auto w-3/5'>
                        {
                          item?.info?.itemAttribute?.vegClassifier === 'VEG' ? <img src="/assets/veg.png" alt="veg" /> : <img src='/assets/nonveg.png' alt='non-veg'></img>
                        }
                        <h4 className='text-base text-color-9 font-ProximaNovaMed'>{item?.info?.name}</h4>
                        {
                          item?.info?.price ? <span className='rupee text-color-9 text-sm font-ProximaNovaMed'>{item?.info?.price / 100}</span> : <span className='rupee text-color-9 text-sm font-ProximaNovaMed'>{item?.info?.defaultPrice / 100}</span>
                        }
                        {
                          item?.info?.description && <p className='text-color-10 mt-3 tracking-tight font-ProximaNovaThin text-sm md:w-3/4'>{item?.info?.description}</p>
                        }
                      </div>
                      <div className='relative w-[118px] h-24'>
                        {
                          item?.info?.imageId && <button className='cursor-pointer w-[118px] h-24 rounded-md'>
                            <img src={`${RES_MENU_IMG}${item?.info?.imageId}`} alt="menu-img" className='rounded-md w-[118px] h-24 object-cover' />
                          </button>
                        }
                        <button onClick={() => handleDeleteItem(item)} className='absolute -bottom-2 left-1/2 -translate-x-1/2 z-[1] w-24 h-9 shadow-md shadow-color-7 bg-red-500 text-white text-center inline-block rounded text-sm font-ProximaNovaSemiBold uppercase'>Remove</button>
                      </div>
                    </div>
                  ))
                }
                <div className="flex justify-between bg-color-11 text-white py-2 sm:py-3 px-3 md:text-xl my-2 sm:flex-row flex-col sm:items-start items-center">
                  <div>
                    <h3 className="font-ProximaNovaSemiBold">Total Price:</h3>
                  </div>
                  {
                    resInfo?.deliveryfee ? <div>
                      <span className="rupee font-ProximaNovaSemiBold">{totalPrice + resInfo?.deliveryfee} {`(${String(totalPrice)} + ${String(resInfo?.deliveryfee)})`}</span>
                    </div> : <div>
                      <span className="rupee font-ProximaNovaSemiBold">{totalPrice}</span>
                    </div>
                  }

                </div>
                <div className="flex items-center justify-center gap-2 mt-2 checkout-btns">
                  <button onClick={handlePayment} className="bg-color-11 border border-color-11 text-white hover:bg-white hover:text-color-11">Place Order</button>
                  <button onClick={handleClearAll} className="border border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500">Clear All</button>
                </div>
              </div>
            </div>
          </>
      }
      <Toaster toastOptions={{
        className: 'font-ProximaNovaSemiBold',
        position: 'top-center',
        duration: 1500,
      }} />

    </>

  )
}

export default Checkout

