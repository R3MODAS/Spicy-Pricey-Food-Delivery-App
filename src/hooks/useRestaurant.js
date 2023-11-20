import { useEffect, useState } from 'react'


const useRestaurant = (RES_API) => {
    const [AllRestaurants, setAllRestaurants] = useState([]);
    const [FilteredRestaurants, setFilteredRestaurants] = useState([]);
    const [BannerInfo, setBannerInfo] = useState([]);
    const [FoodCategories, setFoodCategories] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, [])

    const fetchRestaurants = async () => {
        try {
            const response = await fetch(RES_API);
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

    return [AllRestaurants, FilteredRestaurants, setAllRestaurants, setFilteredRestaurants, BannerInfo, setBannerInfo, FoodCategories, setFoodCategories];
}

export default useRestaurant