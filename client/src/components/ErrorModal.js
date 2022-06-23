
import React from 'react';

export default function ErrorModal({closeError, title, message}) {
    
    return(
    <>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
            <div className="relative top-1/3 mx-auto p-5 border w-2/6 h-2/6 shadow-lg rounded-md bg-white flex flex-col justify-center">
                <div className="mt-3 text-center ">
		            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#000000" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
		            </div>
                    <h3 className="text-2xl leading-6 font-medium text-gray-900 mt-4">{title}</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-md italic text-gray-800">
                            {message}
                        </p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-3/6 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={closeError}>
                            OK
                        </button>
                    </div>
	            </div>
            </div>
        </div>
    </>
    )
}