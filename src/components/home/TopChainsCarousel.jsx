import { Link } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import RestaurantCard, { withOfferLabel } from "../common/RestaurantCard";

const TopChainsCarouselSection = ({ TopChains, userLocation }) => {
    const RestaurantCardwithOffer = withOfferLabel(RestaurantCard);

    return (
        <>
            {TopChains && TopChains?.length != 0 && (
                <>
                    <section id="top-chain" className="relative">
                        <h2 className="font-GrotBlack text-2xl pb-5 pt-5">
                            Top restaurant chains in{" "}
                            {userLocation?.city
                                ? userLocation?.city
                                : "Bangalore"}
                        </h2>
                        <Carousel>
                            <CarouselPrevious className="-top-8 right-10" />
                            <CarouselNext className="-top-8 right-0" />
                            <CarouselContent>
                                {TopChains?.map(res => (
                                    <CarouselItem
                                        key={res?.info?.id}
                                        className="basis-1/7"
                                    >
                                        <Link
                                            className="relative transition-all hover:scale-95"
                                            to={`/restaurants/${res?.info?.id}`}
                                        >
                                            {res?.info
                                                ?.aggregatedDiscountInfoV3 ? (
                                                <RestaurantCardwithOffer
                                                    info={res?.info}
                                                />
                                            ) : (
                                                <RestaurantCard
                                                    info={res?.info}
                                                />
                                            )}
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </section>

                    <div className="divider"></div>
                </>
            )}
        </>
    );
};

export default TopChainsCarouselSection;
