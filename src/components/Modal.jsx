import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleModal } from '../utils/toggleSlice';
import { useNavigate } from 'react-router-dom';

const Modal = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleMenu = () => {
        dispatch(toggleModal());
    }
    
    const handleChangeLocation = () => {
        navigate("/");
        localStorage.clear();
        window.location.reload();
        dispatch(toggleModal());
    }

    return (
        <div className="modal-wrapper fixed top-0 left-0 right-0 bottom-0 bg-customblack-1 z-10">
            <div className="modal-container flex justify-center items-center h-full font-ProximaNovaSemiBold" >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to change the Location?
                            </h3>
                            <button
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                onClick={handleChangeLocation}
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={handleMenu}
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal