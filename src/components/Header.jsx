import { Link } from "react-router-dom"
import { LOGO_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toggleMenu, toggleModal } from "../utils/toggleSlice";
import { CiLocationOn } from "react-icons/ci";

const Header = () => {

  const cartItems = useSelector((store) => store.cartData.items);
  const UserLocation = useSelector((store) => store.locationData.userLocation);
  const MenuOpen = useSelector((store) => store.toggleData.isOpen);

  const dispatch = useDispatch();

  const handleMenu = () => {
    dispatch(toggleMenu());
  }

  const handleModal = () => {
    dispatch(toggleModal());
  }

  return (
    <>
      <header className="p-3 shadow-lg fixed w-full z-10 bg-white h-[85px]">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src={LOGO_URL} alt="logo" className="h-[60px] rounded-full border border-black" />
            </Link>
            <Link to="/" className="ml-4 cursor-pointer text-lg font-ProximaNovaBold text-black hidden xl:block">
              Spicy Pricey
            </Link>
            {
              UserLocation?.address && <button type="button" className="hidden xl:block text-sm ml-2 sm:ml-5 cursor-pointer text-[#686b78] font-ProximaNovaThin w-2/4 sm:w-auto text-center" onClick={handleModal}>{UserLocation?.address}</button>
            }
            {
              UserLocation?.address && <button type="button" className="xl:hidden text-sm ml-2 sm:ml-5 cursor-pointer text-[#686b78] font-ProximaNovaThin text-center flex gap-1" onClick={handleModal}>
                <div className="text-xl">
                  <CiLocationOn />
                </div>
                Location

              </button>
            }
          </div>

          <ul className="xl:flex gap-16 items-center text-customblack-1 font-GrotMed hidden">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className="ml-6 relative">
              <Link to="/cart">
                {
                  cartItems.length > 0 ? <>
                    <span className="absolute top-1/2 -translate-y-1/2 -left-[26px]">
                      <svg className="fill-[#60b246] stroke-0 stroke-[#60b246] overflow-hidden" viewBox="-1 0 37 32" height="20" width="20" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-ProximaNovaSemiBold text-white">{cartItems.length}</span>
                    </span>
                  </> : <>
                    <span className="absolute top-1/2 -translate-y-1/2 -left-7">
                      <svg className="fill-white stroke-2 stroke-[#282c3f] overflow-hidden" viewBox="-1 0 37 32" height="20" width="20" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-ProximaNovaSemiBold">{cartItems.length}</span>
                    </span>
                  </>
                }
                <span className="font-ProximaNovaMed text-base">Cart</span>
              </Link>
            </li>
          </ul>

          <div className="text-2xl cursor-pointer mr-1 xl:hidden" onClick={handleMenu}>
            <MdOutlineRestaurantMenu />
          </div>

        </nav>
      </header>

      <div className={`h-screen w-full z-[99999] bg-white fixed top-0 ${MenuOpen ? "left-0" : "-left-full"} right-0 transition-all duration-500`}>
        <div className="text-3xl cursor-pointer absolute right-5 top-6" onClick={handleMenu}>
          <IoMdCloseCircleOutline />
        </div>

        <ul className="flex gap-16 items-center text-customblack-1 font-GrotBlack flex-col justify-center text-2xl h-full">
          <li onClick={handleMenu} className="nav-items"><Link to="/">Home</Link></li>
          <li onClick={handleMenu} className="nav-items"><Link to="/about">About</Link></li>
          <li onClick={handleMenu} className="relative ml-10 nav-items">
            <Link to="/cart">
              {
                cartItems.length > 0 ? <>
                  <span className="absolute top-1/2 -translate-y-1/2 -left-10">
                    <svg className="fill-[#60b246] stroke-0 stroke-[#60b246] overflow-hidden" viewBox="-1 0 37 32" height="50" width="30" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-GrotBlack text-white">{cartItems.length}</span>
                  </span>
                </> : <>
                  <span className="absolute top-1/2 -translate-y-1/2 -left-10">
                    <svg className="fill-white stroke-2 stroke-[#282c3f] overflow-hidden" viewBox="-1 0 37 32" height="50" width="30" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-GrotBlack">{cartItems.length}</span>
                  </span>
                </>
              }
              <span className="font-GrotBlack text-2xl">Cart</span>
            </Link>
          </li>
        </ul>
      </div>

    </>
  )
}

export default Header