import React, { FC, createRef, useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions, Platform } from "react-native";
import {
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
import { getRingsCoords } from "../../../utils/getRingsCoords";
import { getRingsToOmit } from "../../../utils/getRingsToOmit";
import { getRouteColor } from "../../../utils/getRouteColor";

const CANVAS_BOUNDARY = 40;

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
  const image = useImageFile(imageUrl);
  const skImage = useImage(image);
  const font = useFont(
    require("../../../assets/fonts/PoppinsBold.ttf"),
    skImage ? skImage.width() / 30 : 70,
  );

  const TouchableCircle = withTouchableHandler(Circle);
  const TouchablePath = withTouchableHandler(Path);

  const getOpacity = (id: string) => {
    if (!activeId) return 0.85;
    if (id === activeId) return 1;
    return 0.3;
  };

  const getInboundY = (y: number, offset: number, isText: boolean) => {
    if (!skImage) return 0;
    if (y + offset > skImage.height() - CANVAS_BOUNDARY)
      return isText
        ? skImage.height() - CANVAS_BOUNDARY + 20
        : skImage.height() - CANVAS_BOUNDARY;
    return y + offset;
  };

  const getInboundX = (x: number, offset: number) => {
    if (!skImage) return 0;
    if (x + offset > skImage.width() - CANVAS_BOUNDARY)
      return skImage.width() - CANVAS_BOUNDARY;
    if (x + offset < CANVAS_BOUNDARY) return CANVAS_BOUNDARY;
    return x + offset;
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
                      color={getRouteColor(route.attributes.grade)}
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
                            r={skImage?.width() / 100}
                            style='stroke'
                            color='#000'
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
                    <Circle
                      cx={getInboundX(points.start.x, -10)}
                      cy={getInboundY(points.start.y, 68, false)}
                      r={skImage.width() / 30}
                      style='fill'
                      color='#767676f8f'
                      opacity={0.3}
                    />
                    <Text
                      x={getInboundX(points.start.x, -30)}
                      y={getInboundY(points.start.y, 100, true)}
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
