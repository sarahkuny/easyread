import { useState } from 'react';

function Toggle({toggleDarkMode}) {
  const [toggle, setToggle] = useState(true);
  const darkStyle = {
    toggle: {
        transform: 'translateX(1.5em)',
        backgroundColor: '#f8fafc'
    },
    container: {
        backgroundColor: 'black'
    }
  }

  const lightStyle = {
    toggle: {
        backgroundColor: '#3f3f46'
    },
    container: {
        backgroundColor: '#f8fafc'

    }
  }

  const toggleMode = () =>{
    setToggle(!toggle);
    toggleDarkMode();
  }
  return (
    <div
      className="md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer mt-2" 
      style={(toggle ? lightStyle.container : darkStyle.container)}
      onClick={toggleMode}
    >
      <div
        className =" md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" 
        style={(toggle ? lightStyle.toggle : darkStyle.toggle)}
      ></div>
    </div>
  );
}

export default Toggle;