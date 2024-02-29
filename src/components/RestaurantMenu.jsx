import { Link, useParams } from 'react-router-dom'
import useRestaurantMenu from '../hooks/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import ShimmerMenu from "./ShimmerMenu"
import { useState } from 'react';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [RestaurantInfo, setRestaurantInfo, RestaurantMenu, setRestaurantMenu] = useRestaurantMenu(resId);
  const { name, city, cuisines, avgRating, areaName, feeDetails, isOpen, totalRatingsString, sla, costForTwoMessage } = RestaurantInfo;

  const [ShowIndex, setShowIndex] = useState(0);

  const handleShowItem = (CurrentIndex) => {
    if (CurrentIndex === ShowIndex) {
      setShowIndex(null)
    }
    else {
      setShowIndex(CurrentIndex)
    }
  }

  if (RestaurantMenu?.length === 0) {
    return <ShimmerMenu />
  }

  return (
    <div className="mx-auto mt-24 mb-10 2xl:w-1/2 md:w-4/5 sm:px-7 px-2">
      <>
        <div className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-color-5">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-xs font-medium">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ms-1 text-xs font-medium">{city}</span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ms-1 text-xs font-medium text-[#535665]">{name}</span>
              </div>
            </li>
          </ol>
        </div>

        <div className='text-left mt-10'>
          <h1 className='font-GrotBlack text-2xl'>{name}</h1>

          <div className='mt-14 flex justify-between'>
            <div>
              <h2 className='font-ProximaNovaSemiBold text-xl'>{name}</h2>
              <p className='text-color-8 text-xs font-ProximaNovaThin mb-1 mt-1'>{cuisines?.join(", ")}</p>
              <p className='text-color-8 text-xs font-ProximaNovaThin'>{areaName}, {sla?.lastMileTravelString}</p>
            </div>
            {
              avgRating && <div>
                <button className='sm:max-w-[100px] sm:w-auto w-[100px] p-2 text-center border border-color-7 rounded-md cursor-pointer'>
                  <div className='text-[#3d9b6d] pb-[10px] border border-b-color-7 border-l-0 border-t-0 border-r-0 mb-2 font-ProximaNovaSemiBold flex justify-center items-center gap-1'>
                    <span><img src="/assets/star-icon.png" alt="star-icon" /></span>
                    <span className='text-sm'>{avgRating}</span>
                  </div>
                  <div className='text-xs text-[#8b8d97] font-ProximaNovaBold tracking-tighter'>{totalRatingsString}</div>
                </button>
              </div>
            }
          </div>

          {
            feeDetails?.message && <div className='flex justify-start items-center gap-2 text-color-8 mt-3 mb-5'>
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/${feeDetails?.icon}`} alt="icon" />
              <p className='2xl:flex-1 text-sm font-ProximaNovaThin sm:w-1/2'>{feeDetails?.message}</p>
            </div>
          }

        </div>

        <hr className='border-1 border-dashed border-b-[#d3d3d3] my-4'></hr>
        {
          isOpen ?
            <ul className="main-menu-container">
              {
                RestaurantMenu?.map((category, index) => (
                  <li key={category?.card?.card?.title} className='cursor-pointer'>
                    <RestaurantCategory data={category?.card?.card} ShowItem={index === ShowIndex && true} handleShowItem={() => handleShowItem(index)} />
                  </li>
                ))
              }
            </ul> : <h2 className="resMsg font-ProximaNovaMed text-sm">Uh-oh! The outlet is not accepting orders at the moment. We&apos;re working to get them back online</h2>
        }

      </>

    </div>
  )
}

export default RestaurantMenu