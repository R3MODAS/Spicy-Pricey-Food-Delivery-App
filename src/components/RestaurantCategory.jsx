import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { RES_MENU_IMG } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearCart } from '../utils/cartSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";

const RestaurantCategory = (props) => {
  const [ShowPopup, setShowPopup] = useState(false)

  const { title, itemCards, ShowItem, handleShowItem, ResInfoData } = props
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems)
  const resInfo = useSelector(state => state.cart.restaurant)

  const handleAccordionBody = () => {
    handleShowItem();
  }

  const handleAddItem = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem?.info?.id === item?.card?.info?.id);
    const isSameRes = resInfo?.name === ResInfoData?.name;

      if(isItemInCart){
        toast.error('Already added to the Cart');
      }
      else{
        if(isSameRes || Object.keys(resInfo).length === 0){
          toast.success('Added to the Cart');
          dispatch(addItem({ ...item, ResInfoData }));
          setShowPopup(false)
        }
        else{
          setShowPopup(true)
        }
      }
  }

  return (
    <>
      {/* Accordion Header */}
      <div className='flex items-center justify-between py-5 px-3 sm:p-6 shadow-md text-left' onClick={handleAccordionBody}>
        <h2 className='text-color-9 sm:text-lg font-ProximaNovaBold'>{title} ({itemCards?.length})</h2>
        <div className='text-xl text-color-9'>
          {
            ShowItem ? <IoIosArrowUp /> : <IoIosArrowDown />
          }
        </div>
      </div>

      {/* Accordion Body */}
      {
        ShowItem &&
        <>
          <div className='accordion-body'>
            {
              itemCards?.map((item) => (
                <div key={item?.card?.info?.id} className='item flex items-start justify-between pb-8'>
                  <div className='md:w-auto w-3/5'>
                    {
                      item?.card?.info?.itemAttribute?.vegClassifier === 'VEG' ? <img src="/assets/veg.png" alt="veg" /> : <img src='/assets/nonveg.png' alt='non-veg'></img>
                    }
                    <h4 className='text-base text-color-9 font-ProximaNovaMed'>{item?.card?.info?.name}</h4>
                    {
                      item?.card?.info?.price ? <span className='rupee text-color-9 text-sm font-ProximaNovaMed'>{item?.card?.info?.price / 100}</span> : <span className='rupee text-color-9 text-sm font-ProximaNovaMed'>{item?.card?.info?.defaultPrice / 100}</span>
                    }
                    {
                      item?.card?.info?.description && <p className='text-color-10 mt-3 tracking-tight font-ProximaNovaThin text-sm md:w-3/4'>{item?.card?.info?.description}</p>
                    }
                  </div>
                  <div className='relative w-[118px] h-24'>
                    {
                      item?.card?.info?.imageId && <button className='cursor-pointer w-[118px] h-24 rounded-md'>
                        <img src={`${RES_MENU_IMG}${item?.card?.info?.imageId}`} alt="menu-img" className='rounded-md w-[118px] h-24 object-cover' />
                      </button>
                    }
                    <button onClick={() => handleAddItem(item)} className='absolute -bottom-2 left-1/2 -translate-x-1/2 z-[1] w-24 h-9 shadow-md shadow-color-7 bg-white text-center inline-block rounded text-[#60b246] text-sm font-ProximaNovaSemiBold uppercase'>Add</button>
                  </div>
                </div>
              ))
            }
          </div>

          {
            ShowPopup &&
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/3 p-5 bg-white flex flex-col w-full max-w-[500px] h-52 shadow-md popup-anim z-10">
              <h3 className='font-ProximaNovaSemiBold text-xl'>Items already in cart</h3>
              <p className='text-color-3 font-ProximaNovaThin text-sm py-2'>
                Your cart contains items from other restaurant. Would you
                like to reset your cart for adding items from this
                restaurant?
              </p>
              <div className='flex justify-between sm:justify-center font-ProximaNovaSemiBold sm:text-sm text-xs sm:gap-0 gap-6'>
                <button onClick={() => setShowPopup(false)} className='bg-white border border-color-11 sm:w-2/5 w-40 sm:h-14 sm:m-5 px-1 py-3'>NO</button>
                <button onClick={() => {
                  dispatch(clearCart())
                  setShowPopup(false)
                }} className='sm:w-2/5 w-40 sm:h-14 sm:m-5 bg-color-11 text-white'>YES, START AFRESH</button>
              </div>
            </div>
          }
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

export default RestaurantCategory