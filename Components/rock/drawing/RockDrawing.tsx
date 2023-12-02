import React, { FC, createRef, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, useWindowDimensions, Platform } from "react-native";
import {
  Canvas,
  useImage,
  Image,
  DashPathEffect,
  Circle,
  Path,
  Group,
  Text,
  ImageSVG,
  useFont,
  Skia,
} from "@shopify/react-native-skia";
import Touchable, { withTouchableHandler } from "react-native-skia-gesture";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { useAtom } from "jotai";

import AppLoading from "../../common/AppLoading";

import { Route } from "../../../services/rocks";

import { two_rings, chaing_anchor, rescue_ring } from "./Anchor";
import { useImageFile } from "../../../hooks/useImageFile";
import { rockActiveRoute } from "../../../store/rock";

const getRingsCoords = (path: string) => {
  const points = path.split(/[^0-9.]+/).filter((element) => element.length > 0);
  const result = [];

  for (let i = 0; i < points.length; i += 2) {
    const x = parseFloat(points[i]);
    const y = parseFloat(points[i + 1]);

    if (!isNaN(x) && !isNaN(y)) {
      result.push({ x, y });
    }
  }

  const start = result[0];
  const anchor = result.slice(-1)[0];
  const rings = result.slice(1, result.length - 1);

  return { start, anchor, rings };
};

const getRingsToOmit = (ringsToOmit: string) => {
  if (!ringsToOmit) return [];
  return ringsToOmit
    .replace(" ", "")
    .split(",")
    .map((el) => Number(el));
};

type RockDrawingProps = {
  imageUrl: string;
  routes: Route[];
  activeId: string | null;
  activeImage: number;
};

const RockDrawing: FC<RockDrawingProps> = ({
  imageUrl,
  routes,
  activeId,
  activeImage,
}) => {
  const zoomable = createRef<ReactNativeZoomableView>();
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const { width, height } = useWindowDimensions();
  const font = useFont(require("../../../assets/fonts/PoppinsBold.ttf"), 90);
  const image = useImageFile(imageUrl);
  const skImage = useImage(image);

  const TouchableCircle = withTouchableHandler(Circle);
  const TouchablePath = withTouchableHandler(Path);

  const getOpacity = (id: string) => {
    if (!activeId) return 0.85;
    if (id === activeId) return 1;
    return 0.3;
  };

  if (!font) return null;

  return (
    <View style={styles.container}>
      {!skImage?.width() && <AppLoading />}
      {skImage && skImage?.width() && (
        <ReactNativeZoomableView
          maxZoom={10}
          minZoom={0.05}
          zoomStep={0.5}
          initialZoom={width / skImage.width()}
          style={{
            padding: 10,
            position: "absolute",
            top: 0,
            height: height / 2,
          }}
          disablePanOnInitialZoom={false}
          panBoundaryPadding={skImage.width() / 3}
          ref={zoomable}
          doubleTapZoomToCenter={false}
          doubleTapDelay={0}
        >
          <Touchable.Canvas
            style={{
              width: skImage?.width(),
              height: skImage?.height(),
            }}
          >
            <Image
              image={skImage}
              fit='contain'
              x={0}
              y={0}
              width={skImage?.width() || width}
              height={skImage?.height() || height}
            />
            {routes &&
              routes.map((route, index) => {
                if (route.attributes.image_index !== activeImage) return;
                const points = getRingsCoords(route.attributes.path);
                const ringsToOmit = getRingsToOmit(
                  route.attributes.path_omit_rings,
                );
                const anchor = () => {
                  if (route.attributes.anchor === "two_rings") return two_rings;
                  if (route.attributes.anchor === "rescue_ring")
                    return rescue_ring;
                  return chaing_anchor;
                };

                const touchablePath = Skia.Path.MakeFromSVGString(
                  route.attributes.path,
                );

                return (
                  <Group
                    opacity={getOpacity(route.attributes.uuid)}
                    key={route.attributes.uuid}
                  >
                    <TouchablePath
                      path={route.attributes.path}
                      strokeWidth={skImage.width() / 180}
                      color='black'
                      style='stroke'
                      strokeCap='round'
                      touchablePath={touchablePath!}
                      onStart={() =>
                        setActiveRoute(
                          route.attributes.uuid === activeRoute
                            ? null
                            : route.attributes.uuid,
                        )
                      }
                    >
                      <DashPathEffect
                        intervals={[skImage.width() / 80, skImage.width() / 80]}
                      />
                    </TouchablePath>
                    <ImageSVG
                      svg={anchor()}
                      x={points.anchor.x - 20}
                      y={points.anchor.y - 20}
                      width={20}
                      height={20}
                      strokeWidth={1}
                      opacity={0.5}
                    />
                    {points.rings &&
                      points.rings.map((ring, index) => {
                        const touchableCirclePath = Skia.Path.Make().addCircle(
                          ring.x,
                          ring.y,
                          20,
                        );
                        const isOmmited = ringsToOmit.find(
                          (ring) => ring === index,
                        );
                        return (
                          <TouchableCircle
                            key={JSON.stringify(ring)}
                            cx={ring.x}
                            cy={ring.y}
                            r={20}
                            style='stroke'
                            color='red'
                            opacity={isOmmited ? 0 : 1}
                            strokeWidth={4}
                            touchablePath={touchableCirclePath}
                            onStart={() =>
                              setActiveRoute(
                                route.attributes.uuid === activeRoute
                                  ? null
                                  : route.attributes.uuid,
                              )
                            }
                          />
                        );
                      })}
                    <Text
                      x={points.start.x}
                      y={points.start.y + 140}
                      text={(index + 1).toString()}
                      font={font}
                      color='#fff'
                    />
                  </Group>
                );
              })}
          </Touchable.Canvas>
        </ReactNativeZoomableView>
      )}
    </View>
  );
};

export default RockDrawing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  font: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
