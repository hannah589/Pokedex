import { useState, useEffect } from 'react'
import { LuSun, LuMoon } from "react-icons/lu";
import './DarkModeBtn.css'

function DarkModeBtn() {

  //Current state light mode is true, if false dark mode 
  const [isLightModeBtn, setIsLightModeBtn] = useState(true);

  //function when click button toggle:
  //flip from light to dark mode, current to previous value of isLightModeBtn button state
  function toggle(){
    setIsLightModeBtn(prev => !prev);
  }

  //Apply theme to document every time isLightmodeBtn changes
  useEffect(() => {
    //if light mode is active 
    if (isLightModeBtn) { //remove dark class
      document.documentElement.classList.remove("dark");
    } else { //else add dark class 
      document.documentElement.classList.add("dark");
    }
  }, [isLightModeBtn]); //run when state changes

  return (
    <>
      <button onClick={toggle} className='light-mode' aria-label="toggle theme">
        {/*If light mode is true, show light mode button, sun icon. If not show dark mode button, moon icon*/}
        {isLightModeBtn 
          ? <LuSun className='icon' aria-label="light mode"/> 
          : <LuMoon className='icon' aria-label="dark mode"/>}
      </button>
      

    </>
  )
}

export default DarkModeBtn
