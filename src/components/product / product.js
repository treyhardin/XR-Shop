import { ContactShadows, Shadow, SpotLight, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";


import Shelf from "../../models /shelf01";
import Table from "../../models /table";




function Product(props) {

    const { scene } = useGLTF(props.product)
    const modelInstance = useMemo(() => scene.clone(), [scene])
    const productGroup = useRef(null);
    const spotLight = useRef(null);
    const floatHeight = 0.1;

    useFrame(() => {
        if (productGroup.current) {
            // console.log(productGroup)
            productGroup.current.rotation.y += 0.001;
        }
    })

    useEffect(() => {
        spotLight.current.target = productGroup.current;
    })


    return (
        <group position={props.position} rotation={[0, props.rotation, 0]} name={'product-group'} layers={1}>
            <spotLight 
                distance={4}
                angle={0.85}
                attenuation={5}
                penumbra={0.9}
                anglePower={5}
                ref={spotLight}
                position={[0, 3, 0.25]}
                intensity={2}
                decay={2}
            />
            {props.model == 'table' &&
                <Table lightmap={props.lightmap} />
            }
            {props.model == 'shelf' &&
                <Shelf lightmap={props.lightmap} />
            }
            <Suspense fallback={null}>
                <primitive object={modelInstance} position={[0, 1 + floatHeight, 0.25]} ref={productGroup} castShadow />
                <Shadow position={[0, 1.01, 0.25]} opacity={0.2} scale={0.5} colorStop={0} />
            </Suspense>
        </group>
    );
}




export default Product;