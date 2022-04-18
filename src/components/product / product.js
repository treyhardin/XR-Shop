import { SpotLight, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";


import Shelf from "../../models /shelf01";
import Table from "../../models /table";




function Product(props) {

    const { scene } = useGLTF(props.product)
    const modelInstance = useMemo(() => scene.clone(), [scene])
    const productGroup = useRef(null);
    // const spotLight = useRef(null);
    const floatHeight = 0.1;

    useFrame(() => {
        if (productGroup.current) {
            // console.log(productGroup)
            productGroup.current.rotation.y += 0.001;
        }
    })

    useEffect(() => {
        // spotLight.current.target = productGroup.current;
    })


    return (
        <group position={props.position} rotation={[0, props.rotation, 0]} name={'product-group'} layers={1}>
            {/* <SpotLight 
                distance={5}
                angle={0.15}
                attenuation={5}
                anglePower={5}
                ref={spotLight}
                position={[0, 2, 0]}
            /> */}
            {props.model == 'table' &&
                <Table />
            }
            {props.model == 'shelf' &&
                <Shelf />
            }
            <Suspense fallback={null}>
                <primitive object={modelInstance} position={[0, 1 + floatHeight, 0.25]} ref={productGroup} />
            </Suspense>
        </group>
    );
}




export default Product;