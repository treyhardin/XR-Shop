import React, { useRef } from "react";
import { ContactShadows, Shadow, useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Shelf(props) {

  const diffuseTexture = useLoader(TextureLoader, '/textures/shelf/wood_diffuse.jpg');
  diffuseTexture.flipY = false;

  const lightmapTexture = useLoader(TextureLoader, props.lightmap);
  lightmapTexture.flipY = false;

  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Shelf01.gltf");

  const material = nodes.Shelf01.material;
  material.map = diffuseTexture;
  material.lightMap = lightmapTexture;
  material.lightMapIntensity = 1;


  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shelf01.geometry}
        material={material}
      />
      <Shadow
        position={[0, 0.01, 0]}
        color="black"
        colorStop={0}
        opacity={0.6}
        scale={3}
        fog={false} // Reacts to fog (default=false)
      />
    </group>
  );
}

useGLTF.preload("/Shelf01.gltf");
