import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { VRCanvas, DefaultXRControllers, useXR } from '@react-three/xr'
import './scene.css'

import { ControlLockContext } from '../global-context/global-context';

import Movement from '../movement/movement';
import ShopLuxe from '../../models /shop_luxe';
import { Suspense, useContext } from 'react';
import { Plane, OrbitControls } from '@react-three/drei';
import { MeshBasicMaterial, TextureLoader } from 'three';
import ProductDisplays from '../product-displays/product-displays';
import MovementVR from '../movement/movement-vr';


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


function Scene(props) {

    const { isLocked, setLocked } = useContext(ControlLockContext)

    const brandLogo = useLoader(TextureLoader, props.brandLogo);


    const brandMaterial = new MeshBasicMaterial();
    brandMaterial.map = brandLogo;
    brandMaterial.transparent = true;


    return (
        
        <>
        {props.vr && 
            <VRCanvas>

                <MovementVR />

                <spotLight position={[0, 5, shopDepth]} castShadow intensity={0.1} />

                <ProductDisplays />

                <Plane args={[3, 3]} material={brandMaterial} position={[0, 3, -shopDepth / 2 + 0.1]} />

                <Suspense fallback={null}>
                    <ShopLuxe />
                </Suspense>

            </VRCanvas>
        }

        {!props.vr && 
            <Canvas>

                <Movement isLocked={isLocked} setLocked={setLocked} />

                <spotLight position={[0, 5, shopDepth]} castShadow intensity={0.1} />

                <ProductDisplays />

                <Plane args={[3, 3]} material={brandMaterial} position={[0, 3, -shopDepth / 2 + 0.1]} />

                <Suspense fallback={null}>
                    <ShopLuxe />
                </Suspense>

            </Canvas>
        }
        
        </>
      );
}

export default Scene;