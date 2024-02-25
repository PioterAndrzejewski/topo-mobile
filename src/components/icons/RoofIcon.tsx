import { Ellipse, Line, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const RoofIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 15 15' fill='none'>
      <Path
        d='M0.499992 0.999999L14.5 1L14.5 8'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M0.499992 0.999999L0.499992 8L14.5 8'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Ellipse
        cx='3.99998'
        cy='10.6503'
        rx='1.4'
        ry='1.4'
        transform='rotate(-90 3.99998 10.6503)'
        fill={colorToUse}
      />
      <Line
        x1='4.69995'
        y1='10.6504'
        x2='10.3'
        y2='10.6504'
        stroke={colorToUse}
      />
      <Line
        x1='6.65002'
        y1='11.1504'
        x2='6.65002'
        y2='8.21039'
        stroke={colorToUse}
      />
      <Line
        y1='-0.5'
        x2='3.85'
        y2='-0.5'
        transform='matrix(0.697742 -0.716349 0.697742 0.716349 10.2999 11.1504)'
        stroke={colorToUse}
      />
    </Svg>
  );
};
