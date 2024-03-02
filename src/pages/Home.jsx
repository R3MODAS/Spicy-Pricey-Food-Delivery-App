import { IMG_CAROUSEL } from '../utils/constants'
import RestaurantCard, { withOfferLabel } from '../components/RestaurantCard';
import ShimmerHome from '../components/ShimmerHome';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import useRestaurant from '../hooks/useRestaurant';
import { useSelector } from 'react-redux';

const Home = () => {
  const [ImageCarousel, setImageCarousel, TopChains, setTopChains, AllRestaurants, setAllRestaurants, FilteredRestaurants, setFilteredRestaurants] = useRestaurant();

  const userLocation = useSelector(state => state.location.userLocation);

  const RestaurantCardwithOffer = withOfferLabel(RestaurantCard)

  const handleFoodScrollLeft = () => {
    const foodCategory = document.querySelector(".food-category");
    foodCategory.scrollLeft = foodCategory.scrollLeft - 250;
  }

  const handleFoodScrollRight = () => {
    const foodCategory = document.querySelector(".food-category");
    foodCategory.scrollLeft = foodCategory.scrollLeft + 250;
  }

  const handleTopChainLeft = () => {
    const topCategory = document.querySelector(".top-chain-category");
    topCategory.scrollLeft = topCategory.scrollLeft - 250
  }

  const handleTopChainRight = () => {
    const topCategory = document.querySelector(".top-chain-category");
    topCategory.scrollLeft = topCategory.scrollLeft + 250
  }

  const handleFastDelivery = () => {
    setFilteredRestaurants(AllRestaurants.filter(res => res?.info?.sla?.deliveryTime >= 30 && res?.info?.sla?.deliveryTime <= 50))
  }

  const handleRating = () => {
    setFilteredRestaurants(AllRestaurants.filter(res => res?.info?.avgRating > 4.0))
  }

  const handlePureVeg = () => {
    setFilteredRestaurants(AllRestaurants.filter(res => res?.info?.badges?.imageBadges))
  }

  const handleOffers = () => {
    setFilteredRestaurants(AllRestaurants.filter(res => res?.info?.aggregatedDiscountInfoV3?.header || res?.info?.aggregatedDiscountInfoV3?.subHeader))
  }

  const handlePriceRange300to600 = () => {
    const MinPrice = "300", MaxPrice = "600"
    setFilteredRestaurants(AllRestaurants.filter(res => res?.info?.costForTwo?.slice(1, 4) >= MinPrice && res?.info?.costForTwo?.slice(1, 4) <= MaxPrice))
  }

  const handlePriceRangeLessthan300 = () => {
    const MinPrice = "300"
    setFilteredRestaurants(AllRestaurants.filter(res => res?.info?.costForTwo?.slice(1, 4) <= MinPrice))
  }

  const handleActive = (e) => {
    e.target.classList.add("active")
  }

  if (AllRestaurants.length <= 0) {
    return <ShimmerHome />
  }

  return (
    <div className="container mx-auto mt-24 mb-10 px-2 sm:px-10 overflow-x-hidden">
      {
        (ImageCarousel && ImageCarousel?.length != 0) &&
        <>
          <section id='img-carousel' className="relative">
            <h2 className='font-GrotBlack text-2xl pb-5'>What's on your mind?</h2>
            <div className="scroll-buttons absolute top-0 flex gap-2 right-10">
              <button onClick={handleFoodScrollLeft} className="scroll-left text-white flex justify-center cursor-pointer">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M7.46869 3.43394C7.79171 3.13249 8.29794 3.14998 8.59939 3.473C8.90083 3.79602 8.88334 4.30225 8.56033 4.60369L5.0839 7.84795C4.94511 7.97748 4.82252 8.0921 4.71414 8.19502L15.0937 8.19502C15.5355 8.19502 15.8937 8.5532 15.8937 8.99502C15.8937 9.43685 15.5355 9.79502 15.0937 9.79502L4.6665 9.79502C4.78625 9.90939 4.92436 10.0386 5.08389 10.1875L8.51791 13.3922C8.84092 13.6937 8.8584 14.1999 8.55695 14.5229C8.2555 14.8459 7.74927 14.8634 7.42626 14.5619L3.95463 11.3221C3.54648 10.9413 3.18179 10.601 2.92647 10.2871C2.64873 9.94573 2.41671 9.53755 2.41672 9.01769C2.41672 8.49783 2.64874 8.08965 2.92648 7.74824C3.18181 7.43439 3.54649 7.09412 3.95465 6.7133L7.46869 3.43394Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
              </button>
              <button onClick={handleFoodScrollRight} className="scroll-right flex justify-center cursor-pointer">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M10.5164 3.43418C10.1934 3.13273 9.68714 3.15022 9.3857 3.47324C9.08425 3.79626 9.10174 4.30249 9.42476 4.60394L12.9012 7.84819C13.04 7.97772 13.1626 8.09234 13.2709 8.19527L2.89142 8.19527C2.44959 8.19527 2.09142 8.55344 2.09142 8.99527C2.09142 9.4371 2.44959 9.79527 2.89142 9.79527L13.3186 9.79527C13.1988 9.90964 13.0607 10.0388 12.9012 10.1877L9.46718 13.3924C9.14416 13.6939 9.12668 14.2001 9.42813 14.5231C9.72958 14.8462 10.2358 14.8636 10.5588 14.5622L14.0304 11.3224C14.4386 10.9415 14.8033 10.6012 15.0586 10.2874C15.3364 9.94598 15.5684 9.5378 15.5684 9.01793C15.5684 8.49807 15.3363 8.08989 15.0586 7.74849C14.8033 7.43463 14.4386 7.09437 14.0304 6.71354L10.5164 3.43418Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
              </button>
            </div>
            <div className="food-category overflow-x-scroll scroll-smooth scrollbar-hide w-[1500px]">
              <div className="flex gap-6">
                {
                  ImageCarousel?.map((item) => (
                    <div className='cursor-pointer' key={item?.id}>
                      <div className='w-36'>
                        <img src={IMG_CAROUSEL + item?.imageId} alt={item?.accessibility?.altText} />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </section>

          <div className="divider"></div>
        </>
      }

      {
        (TopChains && TopChains?.length != 0) &&
        <>
          <section id='top-chain' className='relative'>
            <h2 className='font-GrotBlack text-2xl pb-5 pt-5'>Top restaurant chains in {userLocation?.city ? userLocation?.city : "Kolkata"}</h2>
            <div className="scroll-buttons absolute top-0 flex gap-2 right-10">
              <button onClick={handleTopChainLeft} className="scroll-left text-white flex justify-center cursor-pointer">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M7.46869 3.43394C7.79171 3.13249 8.29794 3.14998 8.59939 3.473C8.90083 3.79602 8.88334 4.30225 8.56033 4.60369L5.0839 7.84795C4.94511 7.97748 4.82252 8.0921 4.71414 8.19502L15.0937 8.19502C15.5355 8.19502 15.8937 8.5532 15.8937 8.99502C15.8937 9.43685 15.5355 9.79502 15.0937 9.79502L4.6665 9.79502C4.78625 9.90939 4.92436 10.0386 5.08389 10.1875L8.51791 13.3922C8.84092 13.6937 8.8584 14.1999 8.55695 14.5229C8.2555 14.8459 7.74927 14.8634 7.42626 14.5619L3.95463 11.3221C3.54648 10.9413 3.18179 10.601 2.92647 10.2871C2.64873 9.94573 2.41671 9.53755 2.41672 9.01769C2.41672 8.49783 2.64874 8.08965 2.92648 7.74824C3.18181 7.43439 3.54649 7.09412 3.95465 6.7133L7.46869 3.43394Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
              </button>
              <button onClick={handleTopChainRight} className="scroll-right flex justify-center cursor-pointer">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M10.5164 3.43418C10.1934 3.13273 9.68714 3.15022 9.3857 3.47324C9.08425 3.79626 9.10174 4.30249 9.42476 4.60394L12.9012 7.84819C13.04 7.97772 13.1626 8.09234 13.2709 8.19527L2.89142 8.19527C2.44959 8.19527 2.09142 8.55344 2.09142 8.99527C2.09142 9.4371 2.44959 9.79527 2.89142 9.79527L13.3186 9.79527C13.1988 9.90964 13.0607 10.0388 12.9012 10.1877L9.46718 13.3924C9.14416 13.6939 9.12668 14.2001 9.42813 14.5231C9.72958 14.8462 10.2358 14.8636 10.5588 14.5622L14.0304 11.3224C14.4386 10.9415 14.8033 10.6012 15.0586 10.2874C15.3364 9.94598 15.5684 9.5378 15.5684 9.01793C15.5684 8.49807 15.3363 8.08989 15.0586 7.74849C14.8033 7.43463 14.4386 7.09437 14.0304 6.71354L10.5164 3.43418Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
              </button>
            </div>
            <div className="top-chain-category overflow-x-scroll scroll-smooth scrollbar-hide w-[1500px]">
              <div className='flex gap-8'>
                {
                  TopChains?.map((res) => (
                    <Link className='relative transition-all hover:scale-95' key={res?.info?.id} to={`/restaurants/${res?.info?.id}`}>
                      {
                        res?.info?.aggregatedDiscountInfoV3 ? <RestaurantCardwithOffer info={res?.info} /> : <RestaurantCard info={res?.info} />
                      }
                    </Link>
                  ))
                }
              </div>
            </div>
          </section>

          <div className="divider"></div>
        </>
      }

      {
        (AllRestaurants && AllRestaurants?.length != 0) &&
        <>
          <section id='restaurants'>
            <h2 className='font-GrotBlack text-2xl pb-5 pt-5 2xl:text-start text-center sm:px-0 px-2'>Restaurants with online food delivery in {userLocation?.city ? userLocation?.city : "Kolkata"}</h2>

            <div className="filter-btns flex gap-3 2xl:justify-start justify-center md:flex-nowrap flex-wrap" onClick={handleActive}>
              <button className='filter-btn font-GrotMed text-color-3 text-sm tracking-tight' onClick={handleFastDelivery}>
                Fast Delivery
                <span className='text-lg ml-1 mb-[2px] hidden' onClick={() => window.location.reload()}>
                  <IoClose />
                </span>
              </button>
              <button className='filter-btn font-GrotMed text-color-3 text-sm tracking-tight' onClick={handleRating}>
                Rating 4.0+
                <span className='text-lg ml-1 mb-[2px] hidden' onClick={() => window.location.reload()}>
                  <IoClose />
                </span>
              </button>
              <button className='filter-btn font-GrotMed text-color-3 text-sm tracking-tight' onClick={handlePureVeg}>
                Pure Veg
                <span className='text-lg ml-1 mb-[2px] hidden' onClick={() => window.location.reload()}>
                  <IoClose />
                </span>
              </button>
              <button className='filter-btn font-GrotMed text-color-3 text-sm tracking-tight' onClick={handleOffers}>
                Offers
                <span className='text-lg ml-1 mb-[2px] hidden' onClick={() => window.location.reload()}>
                  <IoClose />
                </span>
              </button>
              <button className='filter-btn font-GrotMed text-color-3 text-sm tracking-tight' onClick={handlePriceRange300to600}>
                Rs. 300-Rs. 600
                <span className='text-lg ml-1 mb-[2px] hidden' onClick={() => window.location.reload()}>
                  <IoClose />
                </span>
              </button>
              <button className='filter-btn font-GrotMed text-color-3 text-sm tracking-tight' onClick={handlePriceRangeLessthan300}>
                Less than Rs. 300
                <span className='text-lg ml-1 mb-[2px] hidden' onClick={() => window.location.reload()}>
                  <IoClose />
                </span>
              </button>
            </div>

            <div className='flex gap-8 flex-wrap mt-10 2xl:justify-start justify-center'>
              {
                FilteredRestaurants?.map((res) => (
                  <Link className='relative transition-all hover:scale-95' key={res?.info?.id} to={`/restaurants/${res?.info?.id}`}>
                    {
                      res?.info?.aggregatedDiscountInfoV3 ? <RestaurantCardwithOffer info={res?.info} /> : <RestaurantCard info={res?.info} />
                    }
                  </Link>
                ))
              }
            </div>

          </section>
        </>
      }

    </div>
  )
}

export default Home