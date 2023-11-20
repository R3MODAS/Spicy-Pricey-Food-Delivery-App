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
                setResInfo(json?.data?.cards[0]?.card?.card?.info);
                const RestaurantType = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
                const categories = json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((item) => item?.card?.card["@type"] === RestaurantType)
                setResMenuInfo(categories);
            }
        } catch (err) {
            console.log(err);
            setResMenuInfo([]);
            setResInfo(null);
        }

    }

    return [ResInfo, setResInfo, ResMenuInfo, setResMenuInfo];
}

export default useRestaurantMenu;