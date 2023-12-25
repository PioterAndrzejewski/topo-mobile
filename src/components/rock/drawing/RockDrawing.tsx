import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import {
  Blur,
  Circle,
  DashPathEffect,
  Group,
  Image,
  ImageSVG,
  Paint,
  Path,
  Skia,
  Text,
  useFont,
  useImage,
} from "@shopify/react-native-skia";
import { useAtom } from "jotai";
import { FC, createRef } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Touchable, { withTouchableHandler } from "react-native-skia-gesture";

import AppLoading from "src/components/common/AppLoading";

import { useImageFile } from "src/hooks/useImageFile";
import { Route } from "src/services/rocks";
import { rockActiveRoute } from "src/store/rock";
import { palette } from "src/styles/theme";
import { getRingsCoords } from "src/utils/getRingsCoords";
import { getRouteColor } from "src/utils/getRouteColor";
import { ChainAnchor, RescueRing, Ring, TwoRings } from "./DrawingIcons";

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

  const ringWidth = Ring()?.width();
  const ringHeight = Ring()?.height();

  const elementsScale = 1;

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
            padding: 100,
            position: "absolute",
            top: 0,
            height: height / 2,
          }}
          ref={zoomable}
          bindToBorders={true}
          doubleTapZoomToCenter
          contentHeight={skImage.height()}
          contentWidth={skImage.width()}
          panBoundaryPadding={300}
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
                const anchor = () => {
                  if (route.attributes.anchor === "two_rings") return TwoRings;
                  if (route.attributes.anchor === "rescue_ring")
                    return RescueRing;
                  return ChainAnchor;
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
                      strokeWidth={15 + elementsScale}
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
                        intervals={[35 * elementsScale, 35 * elementsScale]}
                      />
                    </TouchablePath>
                    <Group
                      layer={
                        <Paint>
                          <Blur
                            blur={
                              !activeId || route.attributes.uuid === activeId
                                ? 0
                                : 6
                            }
                          />
                        </Paint>
                      }
                    >
                      <ImageSVG
                        svg={anchor()(elementsScale)}
                        x={
                          points.anchor.x -
                          (anchor()(elementsScale)?.width()
                            ? anchor()(elementsScale)!.width() / 2
                            : 0)
                        }
                        y={
                          points.anchor.y -
                          (anchor()(elementsScale)?.height()
                            ? anchor()(elementsScale)!.height() / 2
                            : 0)
                        }
                      />
                    </Group>
                    {points.rings &&
                      points.rings.map((ring) => {
                        const touchableCirclePath = Skia.Path.Make().addCircle(
                          ring.x,
                          ring.y,
                          20,
                        );

                        return (
                          <Group
                            layer={
                              <Paint>
                                <Blur
                                  blur={
                                    !activeId ||
                                    route.attributes.uuid === activeId
                                      ? 0
                                      : 6
                                  }
                                />
                              </Paint>
                            }
                          >
                            <TouchableCircle
                              key={JSON.stringify(ring)}
                              cx={ring.x}
                              cy={ring.y}
                              r={ringWidth ? ringWidth : skImage?.width() / 100}
                              opacity={0}
                              touchablePath={touchableCirclePath}
                              onStart={() =>
                                setActiveRoute(
                                  route.attributes.uuid === activeRoute
                                    ? null
                                    : route.attributes.uuid,
                                )
                              }
                            />
                            <ImageSVG
                              svg={Ring(elementsScale)}
                              x={ring.x - (ringWidth ? ringWidth / 2 : 0)}
                              y={ring.y - (ringHeight ? ringHeight / 2 : 0)}
                              opacity={1}
                            />
                          </Group>
                        );
                      })}
                    <Circle
                      cx={getInboundX(points.start.x, -10)}
                      cy={getInboundY(points.start.y, 68, false)}
                      r={70 * elementsScale}
                      style='fill'
                      color='#fffffff'
                      opacity={0.5}
                    />
                    <Text
                      x={getInboundX(points.start.x, -30 * elementsScale)}
                      y={getInboundY(points.start.y, 100 * elementsScale, true)}
                      text={(index + 1).toString()}
                      font={font}
                      color={palette.green}
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
