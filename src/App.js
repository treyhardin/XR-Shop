import { useState, useEffect } from 'react'
import { ContextProvider } from './components/global-context/global-context'

import Scene from './components/scene/scene'
import Menu from './components/menu / menu'
import brandLogo from './brand_logo.png'

import './App.css'

const supportsVR = window.navigator.xr.isSessionSupported('immersive-vr');


export default function App() {

  const [ isVR, setVR ] = useState(null);

  async function detectVR() {
    const vrSupported = await supportsVR;
    return vrSupported;
  }

  useEffect(() => {
    detectVR().then((supportsVR) => setVR(supportsVR))
  })


  return (
    <div className='App'>
      <ContextProvider>
        <Menu brandLogo={brandLogo} vr={isVR} />
        <Scene brandLogo={brandLogo} vr={isVR} />
      </ContextProvider>
    </div>
  )
}
