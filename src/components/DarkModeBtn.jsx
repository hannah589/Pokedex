import { useState } from 'react'
import { LuSun, LuMoon } from "react-icons/lu";
import './DarkModeBtn.css'

function DarkModeBtn() {

  //Current state light mode
  const [isLightModeBtn, setIsLightModeBtn] = useState(true);

  //function when click button toggle:
  //light and dark mode button state
  function toggle(){
    setIsLightModeBtn(!isLightModeBtn)
  }

  return (
    <>
      <button onClick={toggle}className='light-mode'>
        {/*If light mode is true, show light mode button, sun icon. If not show moon dark mode button, moon icon*/}
        {isLightModeBtn ? <LuSun className='icon' /> : <LuMoon className='icon' />}
      </button>
      

    </>
  )
}

export default DarkModeBtn
