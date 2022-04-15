import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Scene from './components/scene/scene'

import './App.css'

export default function App() {
  return (
    <div className='App'>
      <Scene />
    </div>
  )
}
