import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import RestaurantMenuList from "./RestaurantMenuList"

const RestaurantCategory = ({ data, ShowItem, handleShowItem }) => {

  const handleAccordionBody = () => {
    handleShowItem();
  }

  return (
    <>
      {/* Accordion Header */}
      <div className='flex items-center justify-between py-5 px-3 sm:p-6 shadow-md text-left' onClick={handleAccordionBody}>
        <h2 className='text-color-9 sm:text-lg font-ProximaNovaBold'>{data?.title} ({data?.itemCards?.length})</h2>
        <div className='text-xl text-color-9'>
          {
            ShowItem ? <IoIosArrowUp /> : <IoIosArrowDown />
          }
        </div>
      </div>

      {/* Accordion Body */}
      {ShowItem && <RestaurantMenuList items={data?.itemCards} />}
    </>
  )
}

export default RestaurantCategory