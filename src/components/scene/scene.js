import { Canvas, useFrame } from '@react-three/fiber'
import './scene.css'

import { Box, FirstPersonControls, OrbitControls, PointerLockControls, useGLTF } from '@react-three/drei';
import Movement from '../movement/movement';
import ShopLuxe from '../../models /shop_luxe';
import Shelf from '../../models /shelf01';
import Table from '../../models /table';
import Product from '../product / product';
import { Suspense } from 'react';

// Position Helpers
const shopWidth = 12;
const rightSide = shopWidth / 2;
const leftSide = -shopWidth / 2;
const midRightSide = shopWidth / 4;
const midLefttSide = -shopWidth / 4;

const shopDepth = 20;
const frontDepth = shopDepth / 4;
const midFrontDepth = shopDepth / 8;
const midRearDepth = -shopDepth / 8;
const rearDepth = -shopDepth / 4;
const backDepth = -shopDepth / 2;

// Products
const products = [
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    },
    {
        name: 'Jordans',
        model: '/models/Jordans.gltf'
    }
]

// products.forEach((product) => {
    
// })

const productCount = products.length;

// Product Objects
const slotPositions = {
    frontRight: {
        position: [rightSide, 0, frontDepth],
        rotation: -Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    frontCenter: {
        position: [0, 0, midFrontDepth],
        rotation: 0,
        model: 'table',
        product: '/models/Shelf01.gltf'
    },
    frontLeft: {
        position: [leftSide, 0, frontDepth],
        rotation: Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    midRight: {
        position: [rightSide, 0, 0],
        rotation: -Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    midCenter: {
        position: [0, 0, 0],
        rotation: 0,
        model: 'table',
        product: '/models/Shelf01.gltf'
    },
    midLeft: {
        position: [leftSide, 0, 0],
        rotation: Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    rearRight: {
        position: [rightSide, 0, rearDepth],
        rotation: -Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    rearCenter: {
        position: [0, 0, midRearDepth],
        rotation: 0,
        model: 'table',
        product: '/models/Shelf01.gltf'
    },
    rearLeft: {
        position: [leftSide, 0, rearDepth],
        rotation: Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    backRight: {
        position: [midRightSide, 0, backDepth],
        rotation: 0,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    backCenter: {
        position: [0, 0, backDepth],
        rotation: 0,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    },
    backLeft: {
        position: [midLefttSide, 0, backDepth],
        rotation: 0,
        model: 'shelf',
        product: '/models/Shelf01.gltf'
    }
}

let boxConfiguration;

// Position Products 
switch (productCount) {
    case 1:
        boxConfiguration = [
            slotPositions.midCenter
        ];
        break;
    case 2:
        boxConfiguration = [
            slotPositions.midCenter,
            slotPositions.backCenter
        ];
        break;
    case 3:
        boxConfiguration = [
            slotPositions.frontCenter,
            slotPositions.rearLeft,
            slotPositions.rearRight
        ];
        break;
    case 4:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontRight,
            slotPositions.rearLeft,
            slotPositions.rearRight
        ];
        break;
    case 5:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontRight,
            slotPositions.rearLeft,
            slotPositions.rearRight,
            slotPositions.backCenter
        ];
        break;
    case 6:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontRight,
            slotPositions.rearLeft,
            slotPositions.rearRight,
            slotPositions.backCenter,
            slotPositions.midCenter
        ];
        break;
    case 7:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontRight,
            slotPositions.rearLeft,
            slotPositions.rearRight,
            slotPositions.backCenter,
            slotPositions.frontCenter,
            slotPositions.rearCenter
        ];
        break;
    case 8:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontRight,
            slotPositions.midLeft,
            slotPositions.midCenter,
            slotPositions.midRight,
            slotPositions.rearLeft,
            slotPositions.rearRight,
            slotPositions.backCenter
        ];
        break;
    case 9:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontRight,
            slotPositions.midLeft,
            slotPositions.midCenter,
            slotPositions.midRight,
            slotPositions.rearLeft,
            slotPositions.rearRight,
            slotPositions.backLeft,
            slotPositions.backRight
        ];
        break;
    case 10:
        boxConfiguration = [
            slotPositions.frontLeft,
            slotPositions.frontCenter,
            slotPositions.frontRight,
            slotPositions.midLeft,
            slotPositions.midRight,
            slotPositions.rearLeft,
            slotPositions.rearCenter,
            slotPositions.rearRight,
            slotPositions.backLeft,
            slotPositions.backRight
        ];
        break;
}

// const models = [];

// boxConfiguration.forEach((item) => {
//     const { nodes, materials } = useGLTF(item.product);
// })



function Scene() {
    return (
        
        <Canvas>
            {/* <OrbitControls /> */}
            {/* <PointerLockControls /> */}
            <Movement />

            <pointLight position={[0, -1, 6]} intensity={0.1}/>
            
            {boxConfiguration.map((slotPosition, index) => {
                return (
                    <Product 
                        key={`productSlot_${index}`} 
                        position={slotPosition.position} 
                        rotation={slotPosition.rotation} 
                        model={slotPosition.model} 
                        product={products[index].model}
                    />
                )
            })}

            <Suspense fallback={null}>
                <ShopLuxe />
            </Suspense>

        </Canvas>
      );
}

export default Scene;