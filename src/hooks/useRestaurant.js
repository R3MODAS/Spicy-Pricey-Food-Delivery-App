import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useRestaurant = () => {
    const [ImageCarousel, setImageCarousel] = useState([]);
    const [TopChains, setTopChains] = useState([]);
    const [AllRestaurants, setAllRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
    const userLocation = useSelector(store => store.location.userLocation);

    const lat = userLocation?.lat ? userLocation?.lat : 12.9715987;
    const lng = userLocation?.lng ? userLocation?.lng : 77.5945627;

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BASE_URL +
                        `api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
                );
                if (!response.ok) {
                    const err = response.status;
                    throw new Error(err);
                } else {
                    const json = await response.json();

                    const restaurants = json?.data?.cards?.find(x =>
                        x?.card?.card?.id?.includes("restaurant_grid"),
                    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

                    const imgCarousel = json?.data?.cards?.find(card =>
                        card?.card?.card?.id?.includes("mind"),
                    )?.card?.card?.gridElements?.infoWithStyle?.info;

                    const topChains = json?.data?.cards?.find(x =>
                        x?.card?.card?.id?.includes("top_brands"),
                    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

                    setImageCarousel(imgCarousel);
                    setTopChains(topChains);
                    setAllRestaurants(restaurants);
                    setFilteredRestaurants(restaurants);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchRestaurantData();
    }, [lat, lng]);

    return {
        ImageCarousel,
        setImageCarousel,
        TopChains,
        setTopChains,
        AllRestaurants,
        setAllRestaurants,
        FilteredRestaurants,
        setFilteredRestaurants,
    };
};

export default useRestaurant;
