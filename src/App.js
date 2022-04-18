import { useRef, useState, createContext } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Scene from './components/scene/scene'
import Menu from './components/menu / menu'
import { ContextProvider } from './components/global-context/global-context'

import './App.css'
import brandLogo from './brand_logo.png'


export default function App() {

  return (
    <div className='App'>
      <ContextProvider>
        <Menu brandLogo={brandLogo} />
        <Scene brandLogo={brandLogo} />
      </ContextProvider>
    </div>
  )
}
