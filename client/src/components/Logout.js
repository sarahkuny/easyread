import { Link, useNavigate } from 'react-router-dom';

export default function Logout({logOut}) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        Logout();
        navigate('/')
    }
    return(
    <>
        <Link to="/"><h1 className="text-5xl ml-3 my-6 font-louisgeorge">easy<b>Read</b></h1></Link>
        <div className="flex flex-col m-auto h-screen bg-zinc-900 ">
            <div className="shadow-lg p-5 m-auto bg-slate-100 rounded-md flex flex-col justify-between content-center h-1/3">
               <div>
                    <h3 className="font-bold text-center text-2xl mt-10">Click the button below to log out.</h3>
                    <h5 className='italic text-xs px-20 text-center'>You will not be able to access your saved documents <br/>or settings until you log back in.</h5>
               </div> 
                <form onSubmit={handleLogOut} className="text-center mt-10">
                    <button className="bg-black text-white text-5xl p-2 rounded-md w-96 h-20 hover:bg-blue-300 hover:text-black font-louisgeorge">Log Out</button>
                </form> 
                <h6 className="italic text-s px-3 text-center m-5">Here by mistake? <Link to="/convert"><b>Back to Converter</b></Link> </h6>
            </div> 
        </div> 
    </>
    )
}