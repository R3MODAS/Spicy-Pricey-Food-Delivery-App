import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const useRestaurant = () => {
    const [AllRestaurants, setAllRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
    const [BannerInfo, setBannerInfo] = useState([]);
    const [FoodCategories, setFoodCategories] = useState([]);
    const UserLocation = useSelector((store) => store.locationData.userLocation);

    useEffect(() => {
        fetchRestaurants();

    }, [])

    const fetchRestaurants = async () => {
        try {
                const {lat,lng} = UserLocation;
                const response = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
                if (!response.ok) {
                const err = response.status;
                throw new Error(err);
            } else {
                const json = await response.json();
                const CheckJsonStatus = async (jsonData) => {
                    const ResData = jsonData?.data?.cards?.find((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants != undefined)?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                    const BannerData = jsonData?.data?.cards?.find((card) => card?.card?.card?.id === "topical_banner")?.card?.card?.gridElements?.infoWithStyle?.info;
                    const CategoryData = jsonData?.data?.cards?.find((card) => card.card.card.id === "whats_on_your_mind")?.card?.card?.imageGridCards?.info;
                    return [ResData, BannerData, CategoryData];
                }
                const [ResData, BannerData, CategoryData] = await CheckJsonStatus(json);
                setAllRestaurants(ResData);
                setFilteredRestaurants(ResData);
                setBannerInfo(BannerData);
                setFoodCategories(CategoryData);
            }

        }
        catch (err) {
            console.log(err)
        }

    }

    return [AllRestaurants, FilteredRestaurants, setAllRestaurants, setFilteredRestaurants, BannerInfo, setBannerInfo, FoodCategories, setFoodCategories, Location];
}

export default useRestaurant