import { useEffect, useState } from "react"

const useRestaurantMenu = (resId, MENU_API) => {
    const [ResInfo, setResInfo] = useState({});
    const [ResMenuInfo, setResMenuInfo] = useState([]);

    useEffect(() => {
        fetchRestaurantMenu();
    }, [])

    const fetchRestaurantMenu = async () => {
        try {
            const response = await fetch(MENU_API + resId);
            if (!response.ok) {
                const err = response.status;
                throw new Error(err);
            } else {
                const json = await response.json();
                const RestaurantType = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
                const RestaurantMenuData = json?.data?.cards?.find((x) => x?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((item) => item?.card?.card["@type"] === RestaurantType);
                const Resinfo = json?.data?.cards.find(x => (x?.card?.card?.info))?.card?.card?.info
                setResInfo(Resinfo);
                setResMenuInfo(RestaurantMenuData);
            }
        } catch (err) {
            console.log(err);
        }

    }

    return [ResInfo, setResInfo, ResMenuInfo, setResMenuInfo];
}

export default useRestaurantMenu;