import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import RestaurantCard, { withOfferLabel } from "../common/RestaurantCard";

const RestaurantSection = ({
    AllRestaurants,
    userLocation,
    FilteredRestaurants,
    setFilteredRestaurants,
}) => {
    const RestaurantCardwithOffer = withOfferLabel(RestaurantCard);

    const handleFastDelivery = () => {
        setFilteredRestaurants(
            AllRestaurants.filter(
                res =>
                    res?.info?.sla?.deliveryTime >= 30 &&
                    res?.info?.sla?.deliveryTime <= 50,
            ),
        );
    };

    const handleRating = () => {
        setFilteredRestaurants(
            AllRestaurants.filter(res => res?.info?.avgRating > 4.0),
        );
    };

    const handlePureVeg = () => {
        setFilteredRestaurants(
            AllRestaurants.filter(res => res?.info?.badges?.imageBadges),
        );
    };

    const handleOffers = () => {
        setFilteredRestaurants(
            AllRestaurants.filter(
                res =>
                    res?.info?.aggregatedDiscountInfoV3?.header ||
                    res?.info?.aggregatedDiscountInfoV3?.subHeader,
            ),
        );
    };

    const handlePriceRange300to600 = () => {
        const MinPrice = "300",
            MaxPrice = "600";
        setFilteredRestaurants(
            AllRestaurants.filter(
                res =>
                    res?.info?.costForTwo?.slice(1, 4) >= MinPrice &&
                    res?.info?.costForTwo?.slice(1, 4) <= MaxPrice,
            ),
        );
    };

    const handlePriceRangeLessthan300 = () => {
        const MinPrice = "300";
        setFilteredRestaurants(
            AllRestaurants.filter(
                res => res?.info?.costForTwo?.slice(1, 4) <= MinPrice,
            ),
        );
    };

    const handleActive = e => {
        e.target.classList.add("active");
    };

    return (
        <>
            {AllRestaurants && AllRestaurants?.length != 0 && (
                <>
                    <section id="restaurants">
                        <h2 className="font-GrotBlack text-2xl pb-5 pt-5 2xl:text-start text-center sm:px-0 px-2">
                            Restaurants with online food delivery in{" "}
                            {userLocation?.city
                                ? userLocation?.city
                                : "Bangalore"}
                        </h2>

                        <div
                            className="filter-btns flex gap-3 2xl:justify-start justify-center md:flex-nowrap flex-wrap"
                            onClick={handleActive}
                        >
                            <button
                                className="filter-btn font-GrotMed text-color-3 text-sm tracking-tight"
                                onClick={handleFastDelivery}
                            >
                                Fast Delivery
                                <span
                                    className="text-lg ml-1 mb-[2px] hidden"
                                    onClick={() => window.location.reload()}
                                >
                                    <IoClose />
                                </span>
                            </button>
                            <button
                                className="filter-btn font-GrotMed text-color-3 text-sm tracking-tight"
                                onClick={handleRating}
                            >
                                Rating 4.0+
                                <span
                                    className="text-lg ml-1 mb-[2px] hidden"
                                    onClick={() => window.location.reload()}
                                >
                                    <IoClose />
                                </span>
                            </button>
                            <button
                                className="filter-btn font-GrotMed text-color-3 text-sm tracking-tight"
                                onClick={handlePureVeg}
                            >
                                Pure Veg
                                <span
                                    className="text-lg ml-1 mb-[2px] hidden"
                                    onClick={() => window.location.reload()}
                                >
                                    <IoClose />
                                </span>
                            </button>
                            <button
                                className="filter-btn font-GrotMed text-color-3 text-sm tracking-tight"
                                onClick={handleOffers}
                            >
                                Offers
                                <span
                                    className="text-lg ml-1 mb-[2px] hidden"
                                    onClick={() => window.location.reload()}
                                >
                                    <IoClose />
                                </span>
                            </button>
                            <button
                                className="filter-btn font-GrotMed text-color-3 text-sm tracking-tight"
                                onClick={handlePriceRange300to600}
                            >
                                Rs. 300-Rs. 600
                                <span
                                    className="text-lg ml-1 mb-[2px] hidden"
                                    onClick={() => window.location.reload()}
                                >
                                    <IoClose />
                                </span>
                            </button>
                            <button
                                className="filter-btn font-GrotMed text-color-3 text-sm tracking-tight"
                                onClick={handlePriceRangeLessthan300}
                            >
                                Less than Rs. 300
                                <span
                                    className="text-lg ml-1 mb-[2px] hidden"
                                    onClick={() => window.location.reload()}
                                >
                                    <IoClose />
                                </span>
                            </button>
                        </div>

                        <div className="flex gap-8 flex-wrap mt-10 justify-center">
                            {FilteredRestaurants?.map(res => (
                                <Link
                                    className="relative transition-all hover:scale-95"
                                    key={res?.info?.id}
                                    to={`/restaurants/${res?.info?.id}`}
                                >
                                    {res?.info?.aggregatedDiscountInfoV3 ? (
                                        <RestaurantCardwithOffer
                                            info={res?.info}
                                        />
                                    ) : (
                                        <RestaurantCard info={res?.info} />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default RestaurantSection;
