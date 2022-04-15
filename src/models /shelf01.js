import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Shelf(props) {

    const diffuseTexture = useLoader(TextureLoader, '/textures/shelf/wood_diffuse.jpg');
    diffuseTexture.flipY = false;

  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Shelf01.gltf");

  const material = nodes.Shelf01.material;
  material.map = diffuseTexture;


  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shelf01.geometry}
        material={nodes.Shelf01.material}
      />
    </group>
  );
}

useGLTF.preload("/Shelf01.gltf");
