import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";


import Shelf from "../../models /shelf01";
import Table from "../../models /table";




function Product(props) {

    const { scene } = useGLTF(props.product)
    const modelInstance = useMemo(() => scene.clone(), [scene])
    const productGroup = useRef(null);
    const floatHeight = 0.1;

    useFrame(() => {
        if (productGroup.current) {
            // console.log(productGroup)
            productGroup.current.rotation.y += 0.001;
        }
    })


    return (
        <group position={props.position} rotation={[0, props.rotation, 0]} >
            {props.model == 'table' &&
                <Table />
            }
            {props.model == 'shelf' &&
                <Shelf />
            }
            <Suspense fallback={null}>
                <primitive object={modelInstance} position={[0, 1 + floatHeight, 0]} ref={productGroup} />
            </Suspense>
        </group>
    );
}




export default Product;