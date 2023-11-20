import { useDispatch, useSelector } from "react-redux";
import { MENU_IMG } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const RestaurantMenuList = (props) => {
    const { items } = props;
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState("");

    const handleAddItem = (item) => {
        setCurrentId(item?.card?.info?.id);
        if(currentId != item?.card?.info?.id){
            dispatch(addItem(item))
            toast.success('Added to the Cart', {
                className : "font-ProximaNovaSemiBold",
                position : "top-center",
                duration : 1500
            });
        }
        else{
            toast.error('Already added to the Cart', {
                className : "font-ProximaNovaSemiBold",
                position : "top-center",
                duration : 1500
            });
        }
    }

    return (
        <>
            {
                items?.map((item) => (
                    <div key={item?.card?.info?.id} className="menuItem">
                        <div className="flex justify-between pb-12 pt-6">
                            <div className="categoryLeft w-[600px]">
                                {
                                    item?.card?.info?.isVeg ? <img src="/images/veg.png" alt="icon" /> :
                                        <img src="/images/nonveg.png" alt="icon" />
                                }
                                <h3 className="text-base font-ProximaNovaMed">{item?.card?.info?.name}</h3>
                                <span className="rupee font-ProximaNovaThin text-sm text-customblack-3">{item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}</span>
                                {
                                    item?.card?.info?.description && <p className="md:w-full w-9/12 mt-2 tracking-tight text-customcolor-4 text-sm">{item?.card?.info?.description}</p>
                                }

                            </div>
                            <div className="categoryRight relative w-[150px] h-[96px]">
                                {
                                    item?.card?.info?.imageId && <img src={MENU_IMG + item?.card?.info?.imageId} alt="menu-img" className="object-cover w-[150px] h-[96px] rounded-lg" />
                                }
                                <button className="w-16 h-7 text-xs md:w-24 md:h-9 text-[#60b246] rounded addBtn font-ProximaNovaBold uppercase md:text-sm bg-white cursor-pointer absolute bottom-0 left-1/2 -translate-x-1/2" 
                                onClick={() => handleAddItem(item)}>Add</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Toaster />
        </>
    )
}

export default RestaurantMenuList