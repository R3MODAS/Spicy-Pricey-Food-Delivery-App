import { RES_MENU_IMG } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../utils/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

const RestaurantMenuList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems)
  const userDetails = useSelector(state => state.user.userDetails)

  const handleAddItem = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem?.card?.info?.id === item?.card?.info?.id);

    if (isItemInCart) {
      if (userDetails) {
        toast.error('Already added to the Cart');
      }
      else{
        toast.error('Please Login first')
      }
    } else {
      if (userDetails) {
        toast.success('Added to the Cart');
        dispatch(addItem(item));
      }
      else {
        toast.error('Please Login first');
      }
    }
  };


  return (
    <div className='accordion-body'>
      {
        items?.map((item) => (
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
      <Toaster toastOptions={{
        className: 'font-ProximaNovaSemiBold',
        position: 'top-center',
        duration: 1500,
      }} />
    </div>
  )
}

export default RestaurantMenuList