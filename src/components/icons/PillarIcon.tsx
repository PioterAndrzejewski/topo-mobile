import { Circle, Line, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const PillarIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 19 18' fill='none'>
      <Path
        d='M16.5 2L16.5 16L12.3 16'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M16.5 2L12.3 2L12.3 16'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M6.7 2L6.7 16L2.5 16'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M6.7 2L2.5 2L2.5 16'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Circle cx='9.65' cy='5.4' r='1.4' fill={colorToUse} />
      <Line
        x1='9.65002'
        y1='6.2002'
        x2='9.65002'
        y2='11.8002'
        stroke={colorToUse}
      />
      <Line
        x1='9.27639'
        y1='8.00298'
        x2='12.0764'
        y2='6.60298'
        stroke={colorToUse}
      />
      <Line
        x1='6.92356'
        y1='6.45269'
        x2='9.72356'
        y2='7.85269'
        stroke={colorToUse}
      />
      <Line
        x1='9.24209'
        y1='11.1766'
        x2='12.3921'
        y2='13.9766'
        stroke={colorToUse}
      />
      <Line
        x1='6.52195'
        y1='14.2227'
        x2='9.80557'
        y2='11.3684'
        stroke={colorToUse}
      />
    </Svg>
  );
};
