import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import {
  Canvas,
  Circle,
  DashPathEffect,
  Group,
  Image,
  ImageSVG,
  Paint,
  Path,
  Shadow,
  Text,
  useFont,
  useImage,
} from "@shopify/react-native-skia";
import { FC, createRef } from "react";
import { useWindowDimensions } from "react-native";

import AppLoading from "src/components/common/AppLoading";
import View from "src/components/ui/View";

import { useImageFile } from "src/hooks/useImageFile";
import { Route } from "src/services/rocks";
import { palette } from "src/styles/theme";
import { getRouteColor } from "src/utils/getRouteColor";
import { ChainAnchor, RescueRing, Ring, TwoRings } from "./DrawingIcons";

type RockDrawingProps = {
  imageUrl: string;
  routes: Route[];
  activeId: string | null;
  activeImage: number;
  elementsScale: number;
};

const RockDrawing: FC<RockDrawingProps> = ({
  imageUrl,
  routes,
  activeId,
  activeImage,
  elementsScale = 1,
}) => {
  const zoomable = createRef<ReactNativeZoomableView>();
  const { width, height } = useWindowDimensions();
  const image = useImageFile(imageUrl);
  const skImage = useImage(image);
  const font = useFont(
    require("src/assets/fonts/Outfit-Medium.ttf"),
    60 * elementsScale,
  );

  const ringWidth = Ring()?.width();
  const ringHeight = Ring()?.height();

  const getOpacity = (id: string) => {
    if (!activeId) return 0.85;
    if (id === activeId) return 1;
    return 0.3;
  };

  if (!font || !skImage || !skImage.width()) return <AppLoading />;

  return (
    <View flex={1}>
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
          doubleTapZoomToCenter={false}
          contentHeight={skImage.height()}
          contentWidth={skImage.width()}
          panBoundaryPadding={300}
        >
          <Canvas
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

                const anchor = () => {
                  if (route.attributes.anchor === "two_rings") return TwoRings;
                  if (route.attributes.anchor === "rescue_ring")
                    return RescueRing;
                  return ChainAnchor;
                };

                const shouldRenderAnchor = () => {
                  if (!activeId) return true;
                  if (route.attributes.uuid === activeId) return true;
                  return false;
                };

                return (
                  <Group
                    opacity={getOpacity(route.attributes.uuid)}
                    key={route.attributes.uuid}
                  >
                    <Path
                      path={route.attributes.path}
                      strokeWidth={15 * elementsScale}
                      color={getRouteColor(route.attributes.grade)}
                      style='stroke'
                      strokeCap='round'
                    >
                      <DashPathEffect
                        intervals={[35 * elementsScale, 35 * elementsScale]}
                      />
                    </Path>

                    {shouldRenderAnchor() && (
                      <Group>
                        <ImageSVG
                          svg={anchor()(elementsScale)}
                          x={
                            route.attributes.anchor_coords.x -
                            (anchor()(elementsScale)?.width()
                              ? anchor()(elementsScale)!.width() / 2
                              : 0)
                          }
                          y={
                            route.attributes.anchor_coords.y -
                            (anchor()(elementsScale)?.height()
                              ? anchor()(elementsScale)!.height() / 2
                              : 0)
                          }
                        />
                      </Group>
                    )}

                    {route?.attributes?.rings_coords?.length > 0 &&
                      route?.attributes?.rings_coords.map((ring) => {
                        if (activeId && route.attributes.uuid !== activeId)
                          return;
                        return (
                          <Group key={ring.id + ring.x + ring.y}>
                            <Circle
                              key={JSON.stringify(ring)}
                              cx={ring.x}
                              cy={ring.y}
                              r={ringWidth ? ringWidth : skImage?.width() / 100}
                              opacity={0}
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
                      cx={route.attributes.number_coords.x}
                      cy={route.attributes.number_coords.y}
                      r={70 * elementsScale}
                      style='fill'
                      opacity={0.3}
                    >
                      <Paint color={palette.green} opacity={0.3} />
                    </Circle>
                    <Text
                      x={route.attributes.number_coords.x - 17 * elementsScale}
                      y={route.attributes.number_coords.y + 25 * elementsScale}
                      text={(index + 1).toString()}
                      font={font}
                      color={palette.white}
                    >
                      <Shadow dx={0} dy={0} blur={25} color={palette.blue700} />
                    </Text>
                  </Group>
                );
              })}
          </Canvas>
        </ReactNativeZoomableView>
      )}
    </View>
  );
};

export default RockDrawing;
