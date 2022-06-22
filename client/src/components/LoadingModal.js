import React from 'react';

export default function LoadingModal({ loading }) {
    
    return(
    <>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="my-3 text-center">
                    <h3 className="mb-5 font-bold">Loading...</h3>
                    <div className="flex items-center justify-center space-x-2 animate-pulse">
                        <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                        <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                        <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                    </div>
	            </div>
            </div>
        </div>
    </>
    )
}