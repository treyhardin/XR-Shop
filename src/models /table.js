import React, { useRef } from "react";
import { ContactShadows, Shadow, useGLTF } from "@react-three/drei";

export default function Table(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Table01.gltf");

  const material = nodes.Table01.material;
  console.log(nodes.Table01.geometry)


  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder012.geometry}
          material={materials.Metal01}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder012_1.geometry}
          material={materials.Wood}
        />
      <Shadow
        position={[0, 0.1, 0]}
        color="black"
        colorStop={0}
        opacity={0.4}
        scale={2}
        fog={false} // Reacts to fog (default=false)
      />
    </group>
  );
}

useGLTF.preload("/models/Table01.gltf");

