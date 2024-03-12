import { Canvas } from "@react-three/fiber/native";
import useControls from "r3f-native-orbitcontrols";
import React from "react";
import { View } from "react-native";

import ModelRock from "./ModelRock";

import { RockData } from "src/services/rocks";

type ModelViewProps = {
  rock?: RockData;
};
const ModelViewerInternal = (props: ModelViewProps) => {
  const { rock } = props;
  const [OrbitControls, events] = useControls();
  return (
    <View {...events} style={{ flex: 1 }}>
      <Canvas
        onCreated={(state) => {
          const _gl = state.gl.getContext();
          const pixelStorei = _gl.pixelStorei.bind(_gl);
          _gl.pixelStorei = function (...args: any[]) {
            const [parameter] = args;
            switch (parameter) {
              case _gl.UNPACK_FLIP_Y_WEBGL:
                return pixelStorei(...args);
            }
          };
        }}
      >
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
            rock?.attributes.model_rock?.data.attributes.model_main?.data
              .attributes.url
          }
          materialUrl={
            rock?.attributes.model_rock?.data.attributes.model_txt?.data
              .attributes.url
          }
        />
        <ambientLight />
      </Canvas>
    </View>
  );
};

export default ModelViewerInternal;
