import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { VRCanvas, DefaultXRControllers } from '@react-three/xr'
import './scene.css'

import { ControlLockContext } from '../global-context/global-context';

import Movement from '../movement/movement';
import ShopLuxe from '../../models /shop_luxe';
import Product from '../product / product';
import { Suspense, useContext } from 'react';
import { Plane, OrbitControls } from '@react-three/drei';
import { MeshBasicMaterial, TextureLoader } from 'three';
import { DirectionalLight } from 'three';


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
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    frontCenter: {
        position: [0, 0, midFrontDepth],
        rotation: 0,
        model: 'table',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    frontLeft: {
        position: [leftSide, 0, frontDepth],
        rotation: Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    midRight: {
        position: [rightSide, 0, 0],
        rotation: -Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    midCenter: {
        position: [0, 0, 0],
        rotation: 0,
        model: 'table',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    midLeft: {
        position: [leftSide, 0, 0],
        rotation: Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    rearRight: {
        position: [rightSide, 0, rearDepth],
        rotation: -Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    rearCenter: {
        position: [0, 0, midRearDepth],
        rotation: 0,
        model: 'table',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    rearLeft: {
        position: [leftSide, 0, rearDepth],
        rotation: Math.PI / 2,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    backRight: {
        position: [midRightSide, 0, backDepth],
        rotation: 0,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    backCenter: {
        position: [0, 0, backDepth],
        rotation: 0,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
    },
    backLeft: {
        position: [midLefttSide, 0, backDepth],
        rotation: 0,
        model: 'shelf',
        product: '/models/Shelf01.gltf',
        lightmap: '/textures/shelf/Lightmap_Shelf_FrontLeft.png'
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



function Scene(props) {

    const { isLocked, setLocked } = useContext(ControlLockContext)

    const brandLogo = useLoader(TextureLoader, props.brandLogo);

    const brandMaterial = new MeshBasicMaterial();
    brandMaterial.map = brandLogo;
    brandMaterial.transparent = true;


    return (
        
        <VRCanvas shadows={true}>
            <DefaultXRControllers />
            {/* <OrbitControls /> */}
            <Movement isLocked={isLocked} setLocked={setLocked} />

            <spotLight position={[0, 5, shopDepth]} castShadow intensity={0.1} />
            
            {boxConfiguration.map((slotPosition, index) => {
                return (
                    <Product 
                        key={`productSlot_${index}`} 
                        position={slotPosition.position} 
                        rotation={slotPosition.rotation} 
                        model={slotPosition.model} 
                        product={products[index].model}
                        lightmap={slotPosition.lightmap}
                    />
                )
            })}

            <Plane args={[3, 3]} material={brandMaterial} position={[0, 3, -shopDepth / 2 + 0.1]} />

            <Suspense fallback={null}>
                <ShopLuxe />
            </Suspense>

        </VRCanvas>
      );
}

export default Scene;