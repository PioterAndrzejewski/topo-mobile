import React, { FC, useEffect, useRef, useState, createRef } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Canvas,
  useImage,
  Image,
  DashPathEffect,
  Circle,
  Path,
  Group,
} from "@shopify/react-native-skia";

import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

import BackArrow from "../common/BackArrow";

import { styleGuide } from "../../styles/guide";
import { useNavigation } from "@react-navigation/native";

const BOTTOM_BAR_PADDING = 40;

type RockDrawingProps = {
  url: string;
};

const getRingsCoords = (path: string) => {
  const rings = path.split(/[^0-9.]+/).filter((element) => element.length > 0);
  const result = [];

  for (let i = 2; i < rings.length; i += 2) {
    const x = parseFloat(rings[i]);
    const y = parseFloat(rings[i + 1]);

    if (!isNaN(x) && !isNaN(y)) {
      result.push({ x, y });
    }
  }

  return result;
};

<svg
  width='2325'
  height='1744'
  viewBox='0 0 2325 1744'
  fill='none'
  xmlns='http://www.w3.org/2000/svg'
>
  <rect x='0.5' y='0.5' width='2324' height='1743' stroke='black' />
  <path d='' stroke='black' stroke-width='10' />
</svg>;

const path = "M889.5 1484.5L984 1225L842.5 888L984 540.5L936.5 240.5";
const RockDrawing: FC<RockDrawingProps> = ({ url }) => {
  const navigation = useNavigation();
  const zoomable = createRef<ReactNativeZoomableView>();
  const { width, height } = useWindowDimensions();
  const image = useImage(require("../../assets/rock.jpeg"));

  const rings = getRingsCoords(path);
  console.log(rings);

  return (
    <View style={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      {image?.width() && (
        <ReactNativeZoomableView
          maxZoom={10}
          minZoom={0.05}
          zoomStep={0.5}
          initialZoom={(width / image?.width()) * 2}
          initialOffsetX={rings[0].x - width / 2}
          style={{
            padding: 10,
            position: "absolute",
            top: 0,
            height: height / 2,
          }}
          disablePanOnInitialZoom={false}
          bindToBorders={false}
          ref={zoomable}
        >
          <Canvas
            style={{
              width: image?.width(),
              height: image?.height(),
            }}
          >
            <Image
              image={image}
              fit='contain'
              x={0}
              y={0}
              width={image?.width() || width}
              height={image?.height() || height}
            />
            <Group opacity={0.7}>
              <Path
                path={path}
                strokeWidth={image.width() / 70}
                color='black'
                style='stroke'
                strokeCap='round'
                opacity={0.5}
              >
                <DashPathEffect
                  intervals={[image.width() / 40, image.width() / 40]}
                />
              </Path>
              {rings.map((ring) => (
                <Circle
                  key={JSON.stringify(ring)}
                  cx={ring.x}
                  cy={ring.y}
                  r={30}
                  opacity={0.8}
                  style='stroke'
                  color='red'
                  strokeWidth={10}
                />
              ))}
            </Group>
          </Canvas>
        </ReactNativeZoomableView>
      )}
    </View>
  );
};

export default RockDrawing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleGuide.color.primary["100"],
  },
});
