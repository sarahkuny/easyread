import { useState } from 'react';

export default function BionicReadingToggle({toggleText}) {
  const [toggle, setToggle] = useState(false);
  const darkStyle = {
    toggle: {
        transform: 'translateX(1.5em)',
        
    }
  }

  const lightStyle = {
    toggle: {}
  }

  const toggleMode = (e) =>{
    setToggle(!toggle);
    toggleText(e);
    
  }
  return (
    <div
      className="md:w-14 md:h-7 w-12 h-6 bg-slate-50 flex items-center rounded-full p-1 cursor-pointer mt-2" 
      
      onClick={toggleMode}
    >
      <div
        className =" md:w-6 md:h-6 h-5 w-5 rounded-full bg-zinc-700 shadow-md transform duration-300 ease-in-out" 
        style={(toggle ? darkStyle.toggle : lightStyle.toggle)}
      ></div>
    </div>
  );
}

