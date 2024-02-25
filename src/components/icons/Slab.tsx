import { Circle, Line, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const SlabIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 15 16' fill='none'>
      <Path
        d='M14.5 1L14.5 15L0.5 15'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M14.5 1L7.5 8L0.5 15'
        stroke='black'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Circle
        cx='8.62463'
        cy='2.9799'
        r='1.4'
        transform='rotate(45 8.62463 2.9799)'
        fill='black'
      />
      <Line
        x1='8.23576'
        y1='3.58109'
        x2='4.27596'
        y2='7.54089'
        stroke='black'
      />
      <Line x1='6.50333' y1='4.60641' x2='8.58223' y2='6.6853' stroke='black' />
      <Line
        y1='-0.5'
        x2='3.85'
        y2='-0.5'
        transform='matrix(0.0131567 0.999913 -0.999913 -0.0131567 3.92236 7.18701)'
        stroke='black'
      />
    </Svg>
  );
};
