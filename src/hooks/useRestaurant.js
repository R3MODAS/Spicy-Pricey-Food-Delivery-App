import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CORSPROXY } from "../utils/constants";

const useRestaurant = () => {
    const [ImageCarousel, setImageCarousel] = useState([]);
    const [TopChains, setTopChains] = useState([]);
    const [AllRestaurants, setAllRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([])
    const userLocation = useSelector(store => store.location.userLocation);

    const lat = userLocation?.lat ? userLocation?.lat : 12.9715987
    const lng = userLocation?.lng ? userLocation?.lng : 77.5945627

    const RES_API = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`

    useEffect(() => {
        fetchRestaurantData()
    }, [])

    const fetchRestaurantData = async () => {
        try {
            const response = await fetch(CORSPROXY + encodeURIComponent(RES_API));
            if (!response.ok) {
                const err = response.status;
                throw new Error(err)
            }
            else {
                const json = await response.json();

                const restaurants = json?.data?.cards?.find((x) => x?.card?.card?.id === "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants

                const imgCarousel = json?.data?.cards?.find(x => x?.card?.card?.id === "whats_on_your_mind")?.card?.card?.gridElements?.infoWithStyle?.info

                const topChains = json?.data?.cards?.find(x => x?.card?.card?.id === "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants

                setImageCarousel(imgCarousel)
                setTopChains(topChains)
                setAllRestaurants(restaurants)
                setFilteredRestaurants(restaurants)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return [ImageCarousel, setImageCarousel, TopChains, setTopChains, AllRestaurants, setAllRestaurants, FilteredRestaurants, setFilteredRestaurants]
}

export default useRestaurant