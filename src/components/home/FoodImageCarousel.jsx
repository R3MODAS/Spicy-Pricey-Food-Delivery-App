import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { IMG_CAROUSEL } from "@/utils/constants";

const FoodImageCarouselSection = ({ ImageCarousel }) => {
    return (
        <>
            {ImageCarousel && ImageCarousel.length > 0 && (
                <>
                    <section id="img-carousel" className="relative">
                        <h2 className="font-GrotBlack text-2xl pb-5">
                            What&apos;s on your mind?
                        </h2>
                        <Carousel>
                            <CarouselPrevious className="-top-8 right-10" />
                            <CarouselNext className="-top-8 right-0" />
                            <CarouselContent>
                                {ImageCarousel?.map(item => (
                                    <CarouselItem
                                        key={item?.id}
                                        className="basis-1/8"
                                    >
                                        <div className="cursor-pointer">
                                            <div className="w-36">
                                                <img
                                                    src={
                                                        IMG_CAROUSEL +
                                                        item?.imageId
                                                    }
                                                    alt={
                                                        item?.accessibility
                                                            ?.altText
                                                    }
                                                />
                                            </div>
                                        </div>
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

export default FoodImageCarouselSection;
