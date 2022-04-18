// import { PointerLockControls } from "@react-three/drei";
import { useCallback, useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { Vector2, Vector3, Raycaster, ArrowHelper } from "three";



function Movement(props) {

    const camera = useThree((state) => state.camera)
    camera.layers.enableAll();
    const scene = useThree((state) => state.scene)
    const controls = new PointerLockControls( camera, document.body );
    controls.getObject().position.y = 1.8;
    controls.pointerSpeed = 0.25;

    let raycaster;
    raycaster = new Raycaster( new Vector3(), new Vector3( 0, 0, -1 ), 0, 10 );
    raycaster.layers.set(1);

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    let prevTime = performance.now();
    const velocity = new Vector3();
    const direction = new Vector3();

    animate();


    useEffect(() => {

        if (props.isLocked) {
            console.log('lock')
            return controls.lock();            
        }
        console.log('unlock')
        return controls.unlock();


    }, [props.isLocked] )

    controls.addEventListener('unlock', (e) => {
        props.setLocked(false);
    })


    document.addEventListener('keydown', (e) => {
        if (e.key == 'w' || e.key == 'ArrowUp') {
            moveForward = true;
        }
        if (e.key == 's' || e.key == 'ArrowDown') {
            moveBackward = true;
        }
        if (e.key == 'a' || e.key == 'ArrowLeft') {
            moveLeft = true;
        }
        if (e.key == 'd' || e.key == 'ArrowRight') {
            moveRight = true;
        }
    })

    document.addEventListener('keyup', (e) => {
        if (e.key == 'w' || e.key == 'ArrowUp') {
            moveForward = false
        }
        if (e.key == 's' || e.key == 'ArrowDown') {
            moveBackward = false
        }
        if (e.key == 'a' || e.key == 'ArrowLeft') {
            moveLeft = false
        }
        if (e.key == 'd' || e.key == 'ArrowRight') {
            moveRight = false
        }
    })

    function animate() {

        requestAnimationFrame( animate );

        const time = performance.now();

        if ( controls.isLocked === true ) {

            // Move Character
            const delta = ( time - prevTime ) / 1000;
            const movementSpeed = 10;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            direction.z = Number( moveForward ) - Number( moveBackward );
            direction.x = Number( moveRight ) - Number( moveLeft );
            direction.normalize(); // this ensures consistent movements in all directions

            if ( moveForward || moveBackward ) velocity.z -= direction.z * movementSpeed * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * movementSpeed * delta;

            controls.moveRight( - velocity.x * delta );
            controls.moveForward( - velocity.z * delta );


            // Collision Detection
            raycaster.ray.origin.copy( camera.position );
            raycaster.ray.origin.y = 0.9;
            raycaster.ray.direction = new Vector3(0, 0, -1);
            raycaster.ray.direction.applyQuaternion( controls.getObject().quaternion );
            
            // scene.add(new ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 1, Math.random() * 0xffffff ));

            const intersections = raycaster.intersectObjects( scene.children );

            const onObject = intersections.length > 0;

            // console.log(intersections)

            // if (onObject) {
            //     console.log(intersections)
            // } else {
            //     console.log('empty')
            // }


            if ( controls.getObject().position.x > 6 ) {
                velocity.x = 0;
            }

        }

        prevTime = time;

    }
}

export default Movement;