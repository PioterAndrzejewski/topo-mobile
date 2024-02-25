import { Ellipse, Line, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const VerticalIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 19 18' fill='none'>
      <Path
        d='M11.4999 1L11.4999 15L4.60339 15'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M11.4999 1L4.60339 1L4.60339 15'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Ellipse
        cx='1.99491'
        cy='4.5001'
        rx='1.37931'
        ry='1.4'
        fill={colorToUse}
      />
      <Line x1='2' y1='5.2002' x2='2' y2='10.8002' stroke={colorToUse} />
      <Line x1='1.5' y1='7.1499' x2='4.39655' y2='7.1499' stroke={colorToUse} />
      <Line
        y1='-0.5'
        x2='3.82091'
        y2='-0.5'
        transform='matrix(0.711136 0.703055 -0.711136 0.703055 1.5 10.8003)'
        stroke={colorToUse}
      />
    </Svg>
  );
};
