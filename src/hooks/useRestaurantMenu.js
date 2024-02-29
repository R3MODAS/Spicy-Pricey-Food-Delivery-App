import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { CORSPROXY } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [RestaurantInfo, setRestaurantInfo] = useState({});
    const [RestaurantMenu, setRestaurantMenu] = useState([]);

    const userLocation = useSelector(store => store.location.userLocation)
    const lat = userLocation?.lat ? userLocation?.lat : 22.51800
    const lng = userLocation?.lng ? userLocation?.lng : 88.38320

    const RES_MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`

    useEffect(() => {
        fetchRestaurantMenu();
    }, [])

    const fetchRestaurantMenu = async () => {
        try {
            const response = await fetch(CORSPROXY + encodeURIComponent(RES_MENU_API))
            if (!response.ok) {
                const err = response.status;
                throw new Error(err)
            }
            else {
                const json = await response.json();
                const RestaurantType = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                const RestaurantMenuData = json?.data?.cards?.find((x) => x?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((item) => item?.card?.card["@type"] === RestaurantType);
                const RestaurantInfo = json?.data?.cards.find(x => (x?.card?.card?.info))?.card?.card?.info
                setRestaurantInfo(RestaurantInfo)
                setRestaurantMenu(RestaurantMenuData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return [RestaurantInfo, setRestaurantInfo, RestaurantMenu, setRestaurantMenu]
}

export default useRestaurantMenu