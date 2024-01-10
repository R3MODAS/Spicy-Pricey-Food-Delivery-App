import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { CORSPROXY } from '../utils/constants';

const useRestaurantMenu = (resId) => {
    const [ResInfo, setResInfo] = useState({});
    const [ResMenuInfo, setResMenuInfo] = useState([]);
    const UserLocation = useSelector((store) => store.locationData.userLocation);

    useEffect(() => {
        fetchRestaurantMenu();
    }, [])

    const fetchRestaurantMenu = async () => {
        try {
            const {lat,lng} = UserLocation;
            const url = CORSPROXY + encodeURIComponent(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`)
            const response = await fetch(url);
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