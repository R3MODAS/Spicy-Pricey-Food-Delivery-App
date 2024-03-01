import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoginSidebar } from '../utils/toggleSlice'
import { auth, provider } from "../config/firebase.js"
import { signInWithPopup, signOut } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userAuthSlice.js'
import { clearCart } from "../utils/cartSlice.js"

const LoginSidebar = () => {
  const dispatch = useDispatch()
  const isLoginSidebarOpen = useSelector(state => state.toggle.isLoginSidebarOpen);
  const userDetails = useSelector(state => state.user.userDetails)

  const handleCloseSidebar = () => {
    dispatch(toggleLoginSidebar())
    document.body.classList.remove("overflow-hidden")
  }

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const userDetails = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
        token: result?.user?.accessToken
      }
      dispatch(addUser(userDetails))
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(removeUser())
      dispatch(clearCart())
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className={`login-sidebar fixed top-0 right-0 h-full overflow-y-scroll bg-white transition-all duration-500 z-20 sm:px-20 px-5 py-5 w-full sm:py-10 flex flex-col sm:w-[500px] ${isLoginSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className='text-3xl mb-5' onClick={handleCloseSidebar}>
          <IoIosCloseCircleOutline />
        </button>
        <div className="relative left-0">
          {
            !userDetails ?
              <>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-color-1 text-3xl font-ProximaNovaMed'>Login</h2>
                    <p className='font-ProximaNovaThin mt-1'>and <span className='text-color-2 font-ProximaNovaMed'>Enjoy your time</span></p>
                  </div>
                  <div>
                    <img className='h-24' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" alt="img" />
                  </div>
                </div>

                <button onClick={handleLogin} className='w-full bg-color-2 py-4 uppercase text-base text-white font-ProximaNovaSemiBold cursor-pointer mt-5'>Login with Google</button>
                <p className='text-[#686b78] mt-2 font-ProximaNovaMed text-sm pr-5'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
              </>
              :
              <>
                {userDetails?.name && <h2 className='font-ProximaNovaSemiBold text-2xl flex items-center'>Welcome {userDetails?.name} </h2>}
                <button onClick={handleLogout} className='w-full bg-color-2 py-4 uppercase text-base text-white font-ProximaNovaSemiBold cursor-pointer mt-5'>Logout</button>
                <div>
                  <p className='text-[#686b78] mt-2 font-ProximaNovaMed text-sm pr-5'>Thank you for your time and patience. Come back soon !</p>
                </div>
              </>
          }


        </div>

      </div>

      <div className={`login-sidebar-overlay ${isLoginSidebarOpen ? "fixed" : "hidden"} z-10 top-0 left-0 right-0 bottom-0 bg-color-1 opacity-[0.7] overflow-hidden`}></div>

    </>
  )
}

export default LoginSidebar