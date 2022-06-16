import React from 'react';

export default function Header(props) {

    return (
        <>
            <div className="flex justify-between items-center h-24">
                <h1 className="text-5xl ml-3">easyRead</h1>
                <div className="mr-3">
                    <button className="font-medium text-lg bg-black text-white m-1 py-2 px-5 rounded-md shadow-md hover:bg-blue-500">{props.buttonOne}</button>
                    <button className="font-medium text-lg bg-black text-white m-1 py-2 px-5 rounded-md shadow-md hover:bg-blue-500">{props.buttonTwo}</button>
                </div>
            </div>
        </>
    )
}