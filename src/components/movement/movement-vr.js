import { DefaultXRControllers, useController, useXR, useXRFrame, XRController,  } from "@react-three/xr";
import { useEffect, useRef, } from "react";
import { Scene } from "three";
import { Group } from "three";



function MovementVR() {

    const { player, camera, controllers } = useXR()
    const leftController = useController('left')
    const rightController = useController('right')

    const cameraGroup = useRef(null);

    const controllerDeadzone = 0.3;
    const playerSpeed = 0.02;
    const lookSpeed = 0.015;

    const playerMove = (input) => {
        const movementX = input[2]
        const movementZ = input[3]

        if(Math.abs(movementX) > controllerDeadzone) {
            player.translateX(movementX * playerSpeed)
        }
        if(Math.abs(movementZ) > controllerDeadzone) {
            player.translateZ(movementZ * playerSpeed)
        }
        
    }

    const playerLook = (input) => {
        const lookX = input[2]

        if(Math.abs(lookX) > controllerDeadzone) {
            player.rotation.y -= lookX * lookSpeed;
        }
        
    }

    useXRFrame(() => {
        playerMove(leftController.inputSource.gamepad.axes)
        playerLook(rightController.inputSource.gamepad.axes)
    })
    

    console.log(leftController)

    useEffect(() => {
        cameraGroup.current.add(camera)
        console.log(camera)
        // cameraGroup.current.position.set(0, 2, 0)
    // camera.position.y = 1.8;
    }, [])




    return (  
        <>
        <DefaultXRControllers />
        <group name="camera" ref={cameraGroup} />
        </>
    );
}

export default MovementVR;