import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useRestaurantMenu = resId => {
    const [RestaurantMenuDetails, setRestaurantMenuDetails] = useState([]);

    const userLocation = useSelector(store => store.location.userLocation);
    const lat = userLocation?.lat ? userLocation?.lat : 22.518;
    const lng = userLocation?.lng ? userLocation?.lng : 88.3832;

    useEffect(() => {
        const fetchRestaurantMenu = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BASE_URL +
                        `api/proxy/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`,
                );
                if (!response.ok) {
                    const err = response.status;
                    throw new Error(err);
                } else {
                    const json = await response.json();
                    const ResInfo = json?.data?.cards?.find(card =>
                        card?.card?.card["@type"]?.includes(
                            "food.v2.Restaurant",
                        ),
                    );
                    const ResMenu = json?.data?.cards?.find(card =>
                        card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                            menu =>
                                menu?.card?.card["@type"]?.includes(
                                    "food.v2.ItemCategory",
                                ),
                        ),
                    );
                    setRestaurantMenuDetails({ ResInfo, ResMenu });
                }
            } catch (err) {
                console.log(err);
                setRestaurantMenuDetails(null);
            }
        };

        fetchRestaurantMenu();
    }, [lat, lng, resId]);

    return RestaurantMenuDetails;
};

export default useRestaurantMenu;
