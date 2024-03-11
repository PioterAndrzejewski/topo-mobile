import { Canvas } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import React from "react";
import { View } from "react-native";

import ModelRock from "./ModelRock";
import ModelRoute from "./ModelRoute";

import { RockData } from "src/services/rocks";

type ModelViewProps = {
  id?: string;
  rock?: RockData;
};
const ModelViewInternal = (props: ModelViewProps) => {
  const [OrbitControls, events] = useControls();
  return (
    <View {...events} style={{ flex: 1 }}>
      <Canvas>
        <OrbitControls
          enabled
          enableZoom
          enablePan
          dampingFactor={0.5}
          enableRotate
          {...OrbitControls}
        />
        <ModelRock
          modelUrl={
            props.rock?.attributes.model_rock?.data.attributes.model_main?.data
              .attributes.url
          }
          materialUrl={
            props.rock?.attributes.model_rock?.data.attributes.model_txt?.data
              .attributes.url
          }
        />
        {props.rock?.attributes.routes.data.map((route) => (
          <ModelRoute route={route} />
        ))}
        <ambientLight />
      </Canvas>
    </View>
  );
};

export default ModelViewInternal;

type BoxProps = {
  position: [number, number, number];
};
