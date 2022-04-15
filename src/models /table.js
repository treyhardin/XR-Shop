import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Table(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Table01.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table01.geometry}
        material={nodes.Table01.material}
        scale={[0.98, 1, 0.98]}
      />
    </group>
  );
}

useGLTF.preload("/models/Table01.gltf");

