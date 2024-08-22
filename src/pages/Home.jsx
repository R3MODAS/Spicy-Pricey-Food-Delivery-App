import { useSelector } from "react-redux";
import FoodImageCarouselSection from "@/components/home/FoodImageCarousel";
import TopChainsCarouselSection from "@/components/home/TopChainsCarousel";
import RestaurantSection from "@/components/home/RestaurantSection";
import ShimmerHome from "@/components/shimmer/ShimmerHome";
import useRestaurant from "@/hooks/useRestaurant";

const Home = () => {
    const {
        ImageCarousel,
        TopChains,
        AllRestaurants,
        FilteredRestaurants,
        setFilteredRestaurants,
    } = useRestaurant();

    const userLocation = useSelector(state => state.location.userLocation);

    if (AllRestaurants.length <= 0) {
        return <ShimmerHome />;
    }

    return (
        <div className="container mx-auto mt-24 mb-10 px-2 sm:px-10 overflow-x-hidden">
            <FoodImageCarouselSection ImageCarousel={ImageCarousel} />

            <TopChainsCarouselSection
                TopChains={TopChains}
                userLocation={userLocation}
            />

            <RestaurantSection
                AllRestaurants={AllRestaurants}
                userLocation={userLocation}
                FilteredRestaurants={FilteredRestaurants}
                setFilteredRestaurants={setFilteredRestaurants}
            />
        </div>
    );
};

export default Home;
