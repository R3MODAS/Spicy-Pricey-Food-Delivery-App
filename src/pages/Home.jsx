import { useState } from "react"
import RestaurantCard, { RestaurantCardOffer } from "../components/RestaurantCard";
import { Link } from "react-router-dom";
import ShimmerUi from "../components/ShimmerUi";
import useRestaurant from "../hooks/useRestaurant";
import { CATEGORY_IMG, IMG_CAROUSEL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../utils/toggleSlice";


const Home = () => {

    const [AllRestaurants, FilteredRestaurants, setAllRestaurants, setFilteredRestaurants, BannerInfo, setBannerInfo, FoodCategories, setFoodCategories] = useRestaurant();
    const [SearchText, setSearchText] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const ModalOpen = useSelector((store) => store.toggleData.isModalOpen);

    const dispatch = useDispatch();

    const handleChangeLocation = () => {
        localStorage.clear();
        window.location.reload();
        dispatch(toggleModal());
    }

    const handleMenu = () => {
        dispatch(toggleModal());
    }

    const handleOffer = () => {
        setFilteredRestaurants(AllRestaurants.filter((res) => res.info.aggregatedDiscountInfoV3))
    }

    const handleFastDelivery = () => {
        setFilteredRestaurants(AllRestaurants.filter((res) => res?.info?.sla?.deliveryTime < 30))
    }

    const handleTopRated = () => {
        setFilteredRestaurants(AllRestaurants.filter((res) => res?.info?.avgRating > 4.0))
    }

    const handleSearch = () => {
        if (SearchText !== "") {
            const filteredData = AllRestaurants.filter((res) => res?.info?.name?.toLowerCase()?.includes(SearchText?.toLowerCase()));
            setFilteredRestaurants(filteredData);
            setErrorMessage("");
            if (filteredData?.length === 0) {
                setErrorMessage(
                    `Sorry, we couldn't find any results for "${SearchText}"`
                )
            }
        } else {
            setErrorMessage("");
            setFilteredRestaurants(AllRestaurants);
        }
    }

    const handleRange300to600 = () => {
        let lowRange = "300";
        let highRange = "600";
        const filterPrice = AllRestaurants.filter((res) => {
            const price = res?.info?.costForTwo?.substring(1, 4)
            if (price >= lowRange && price <= highRange) {
                return price;
            }
        })
        setFilteredRestaurants(filterPrice);
    }

    const handleRangelessThan300 = () => {
        let range = "300";
        const filterPrice = AllRestaurants.filter((res) => {
            const price = res?.info?.costForTwo?.substring(1, 4)
            if (price <= range) {
                return price;
            }
        })
        setFilteredRestaurants(filterPrice);
    }

    const handleScrollBannerLeft = () => {
        const bannerCategory = document.querySelector(".bannerCategory");
        bannerCategory.scrollLeft = bannerCategory.scrollLeft - 250;
    }

    const handleScrollBannerRight = () => {
        const bannerCategory = document.querySelector(".bannerCategory");
        bannerCategory.scrollLeft = bannerCategory.scrollLeft + 250;
    }

    const handleScrollLeft = () => {
        const foodCategory = document.querySelector(".foodCategory");
        foodCategory.scrollLeft = foodCategory.scrollLeft - 250;
    }

    const handleScrollRight = () => {
        const foodCategory = document.querySelector(".foodCategory");
        foodCategory.scrollLeft = foodCategory.scrollLeft + 250;
    }

    const RestaurantCardwithOffer = RestaurantCardOffer(RestaurantCard);

    if (AllRestaurants?.length === 0 && FilteredRestaurants?.length === 0) {
        return <ShimmerUi />
    }

    return (
        <>

            {
                ModalOpen && <>

                    <div className="modal-wrapper fixed top-0 left-0 right-0 bottom-0 bg-customblack-1 z-10">
                        <div className="modal-container flex justify-center items-center h-full font-ProximaNovaSemiBold" >
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button
                                        type="button"
                                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-4 md:p-5 text-center">
                                        <svg
                                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Are you sure you want to change the Location?
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                            onClick={handleChangeLocation}
                                        >
                                            Yes, I'm sure
                                        </button>
                                        <button
                                            type="button"
                                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                            onClick={handleMenu}
                                        >
                                            No, cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }


            <div className="container mx-auto pt-24 pb-32 min-h-screen">

                {
                    FilteredRestaurants && AllRestaurants ?

                        <>
                            {
                                BannerInfo &&
                                (
                                    <div className="hidden md:block relative">
                                        <h2 className="font-GrotBlack text-xl sm:text-2xl pt-5 pb-5">Best offers for you</h2>

                                        <div className="scroll-buttons absolute top-5 2xl:right-16 flex gap-2 right-4">
                                            <button onClick={handleScrollBannerLeft} className="scroll-left text-white flex justify-center cursor-pointer">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M7.46869 3.43394C7.79171 3.13249 8.29794 3.14998 8.59939 3.473C8.90083 3.79602 8.88334 4.30225 8.56033 4.60369L5.0839 7.84795C4.94511 7.97748 4.82252 8.0921 4.71414 8.19502L15.0937 8.19502C15.5355 8.19502 15.8937 8.5532 15.8937 8.99502C15.8937 9.43685 15.5355 9.79502 15.0937 9.79502L4.6665 9.79502C4.78625 9.90939 4.92436 10.0386 5.08389 10.1875L8.51791 13.3922C8.84092 13.6937 8.8584 14.1999 8.55695 14.5229C8.2555 14.8459 7.74927 14.8634 7.42626 14.5619L3.95463 11.3221C3.54648 10.9413 3.18179 10.601 2.92647 10.2871C2.64873 9.94573 2.41671 9.53755 2.41672 9.01769C2.41672 8.49783 2.64874 8.08965 2.92648 7.74824C3.18181 7.43439 3.54649 7.09412 3.95465 6.7133L7.46869 3.43394Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
                                            </button>
                                            <button onClick={handleScrollBannerRight} className="scroll-right flex justify-center cursor-pointer">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M10.5164 3.43418C10.1934 3.13273 9.68714 3.15022 9.3857 3.47324C9.08425 3.79626 9.10174 4.30249 9.42476 4.60394L12.9012 7.84819C13.04 7.97772 13.1626 8.09234 13.2709 8.19527L2.89142 8.19527C2.44959 8.19527 2.09142 8.55344 2.09142 8.99527C2.09142 9.4371 2.44959 9.79527 2.89142 9.79527L13.3186 9.79527C13.1988 9.90964 13.0607 10.0388 12.9012 10.1877L9.46718 13.3924C9.14416 13.6939 9.12668 14.2001 9.42813 14.5231C9.72958 14.8462 10.2358 14.8636 10.5588 14.5622L14.0304 11.3224C14.4386 10.9415 14.8033 10.6012 15.0586 10.2874C15.3364 9.94598 15.5684 9.5378 15.5684 9.01793C15.5684 8.49807 15.3363 8.08989 15.0586 7.74849C14.8033 7.43463 14.4386 7.09437 14.0304 6.71354L10.5164 3.43418Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
                                            </button>
                                        </div>

                                        <div className="bannerCategory overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-hide 2xl:max-w-[1500px]">
                                            <div className="flex md:gap-6 px-3 md:px-0">
                                                {
                                                    BannerInfo?.map((imgCard) => (
                                                        <div key={imgCard.id} className="cursor-pointer">
                                                            <div className="w-[350px]">
                                                                <img src={IMG_CAROUSEL + imgCard?.imageId} alt="img" className="object-cover w-full h-full" />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }


                            {
                                FoodCategories &&
                                (
                                    <div className="relative md:block hidden">
                                        <h2 className="font-GrotBlack text-xl sm:text-2xl pt-5 pb-5 text-left pl-4">What's on your mind?</h2>

                                        <div className="scroll-buttons absolute top-5 2xl:right-16 flex gap-2 right-4">
                                            <button onClick={handleScrollLeft} className="scroll-left text-white flex justify-center cursor-pointer">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M7.46869 3.43394C7.79171 3.13249 8.29794 3.14998 8.59939 3.473C8.90083 3.79602 8.88334 4.30225 8.56033 4.60369L5.0839 7.84795C4.94511 7.97748 4.82252 8.0921 4.71414 8.19502L15.0937 8.19502C15.5355 8.19502 15.8937 8.5532 15.8937 8.99502C15.8937 9.43685 15.5355 9.79502 15.0937 9.79502L4.6665 9.79502C4.78625 9.90939 4.92436 10.0386 5.08389 10.1875L8.51791 13.3922C8.84092 13.6937 8.8584 14.1999 8.55695 14.5229C8.2555 14.8459 7.74927 14.8634 7.42626 14.5619L3.95463 11.3221C3.54648 10.9413 3.18179 10.601 2.92647 10.2871C2.64873 9.94573 2.41671 9.53755 2.41672 9.01769C2.41672 8.49783 2.64874 8.08965 2.92648 7.74824C3.18181 7.43439 3.54649 7.09412 3.95465 6.7133L7.46869 3.43394Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
                                            </button>
                                            <button onClick={handleScrollRight} className="scroll-right flex justify-center cursor-pointer">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><path d="M10.5164 3.43418C10.1934 3.13273 9.68714 3.15022 9.3857 3.47324C9.08425 3.79626 9.10174 4.30249 9.42476 4.60394L12.9012 7.84819C13.04 7.97772 13.1626 8.09234 13.2709 8.19527L2.89142 8.19527C2.44959 8.19527 2.09142 8.55344 2.09142 8.99527C2.09142 9.4371 2.44959 9.79527 2.89142 9.79527L13.3186 9.79527C13.1988 9.90964 13.0607 10.0388 12.9012 10.1877L9.46718 13.3924C9.14416 13.6939 9.12668 14.2001 9.42813 14.5231C9.72958 14.8462 10.2358 14.8636 10.5588 14.5622L14.0304 11.3224C14.4386 10.9415 14.8033 10.6012 15.0586 10.2874C15.3364 9.94598 15.5684 9.5378 15.5684 9.01793C15.5684 8.49807 15.3363 8.08989 15.0586 7.74849C14.8033 7.43463 14.4386 7.09437 14.0304 6.71354L10.5164 3.43418Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92"></path></svg>
                                            </button>
                                        </div>

                                        <div className="foodCategory overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-hide 2xl:max-w-[1500px]">
                                            <div className="flex md:gap-6 px-3 md:px-0">
                                                {
                                                    FoodCategories?.map((category) => (
                                                        <div key={category?.id} className="cursor-pointer">
                                                            <div className="md:w-[144px] w-[120px]">
                                                                <img src={CATEGORY_IMG + category?.imageId} alt="img" className="w-full h-full object-contain" />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )

                            }

                            <h2 className="font-GrotBlack text-xl sm:text-2xl pt-10 pb-5 text-center 2xl:text-left">Restaurants with online food delivery in Kanchrapara</h2>

                            <div className="buttons flex items-center justify-center 2xl:justify-between 2xl:pr-24 mb-5 font-GrotReg xl:flex-row flex-col gap-5 xl:gap-0">
                                <div className="flex items-center gap-3 md:flex-nowrap flex-wrap md:justify-start justify-center">
                                    <button className="filterBtn text-sm md:text-[15px]" onClick={handleTopRated}>Ratings 4.0+</button>
                                    <button className="filterBtn text-sm md:text-[15px]" onClick={handleFastDelivery}>Fast Delivery</button>
                                    <button className="filterBtn text-sm md:text-[15px]" onClick={handleOffer}>Offers</button>
                                    <button className="filterBtn text-sm md:text-[15px]" onClick={handleRange300to600}>Rs. 300-Rs. 600</button>
                                    <button className="filterBtn text-sm md:text-[15px]" onClick={handleRangelessThan300}>Less than Rs. 300</button>
                                </div>
                                <div className="flex items-center pl-0 2xl:pl-0 xl:pl-32">
                                    <input type="text" onChange={(e) => setSearchText(e.target.value)} value={SearchText} onKeyUp={handleSearch} className="filterBtn text-sm md:text-[15px] searchInput" placeholder="Search" />
                                </div>
                            </div>

                            {ErrorMessage && <div className="text-center mb-3 mt-5 font-ProximaNovaBlack text-2xl">{ErrorMessage}</div>}

                            <div className="flex flex-wrap items-center gap-10 justify-center 2xl:justify-start">
                                {
                                    FilteredRestaurants?.map((res) => (
                                        <Link key={res?.info?.id} to={`/restaurants/${res?.info?.id}`} className="relative group">
                                            {

                                                res?.info?.aggregatedDiscountInfoV3 || res?.info?.aggregatedDiscountInfoV2 ? <RestaurantCardwithOffer resInfo={res?.info} /> : <RestaurantCard resInfo={res?.info} />
                                            }
                                        </Link>
                                    ))
                                }
                            </div>
                        </>
                        :
                        <div className="text-center flex justify-center items-center mx-auto flex-col max-w-sm">
                            <div className="mt-16 ml-auto mr-auto mb-7">
                                <img className="block mx-auto" src="/images/location_unserviceable.webp" alt="service_unavailable" width={238} height={238} />
                            </div>
                            <h2 className="text-xl font-GrotBlack text-customblack-1 text-center leading-6">Location Unserviceable</h2>
                            <p className="mt-2 mb-2 ml-8 mr-8 font-GrotMed tracking-tight text-customblack-2 leading-5">We don’t have any services here till now. Try changing location.</p>
                        </div>
                }

            </div>


        </>


    )
}

export default Home