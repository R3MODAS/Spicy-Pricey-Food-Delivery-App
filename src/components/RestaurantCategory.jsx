import RestaurantMenuList from './RestaurantMenuList';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

const RestaurantCategory = (props) => {
    const {data, handleShowItem, ShowItem} = props;

    const handleItemShown = () => {
      handleShowItem();
    }
  return (
    <> 
        {/* Accordion Header */}
        <div onClick={handleItemShown} className='flex items-center justify-between cursor-pointer p-6 shadow-md text-left'>
            <h2 className='text-customblack-3 text-lg font-ProximaNovaBold'>{data?.title} ({data?.itemCards?.length})</h2>
            <div className='text-xl text-customblack-3'>
              {
                ShowItem ? <IoIosArrowUp /> : <IoIosArrowDown />
              }
                
            </div>
        </div>

        {/* Accordion Body */}
        {
         ShowItem && <RestaurantMenuList items = {data?.itemCards}  />
        }
        
    </>
  )
}

export default RestaurantCategory