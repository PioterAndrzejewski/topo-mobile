import { Circle, Line, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const OverhangIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 15 16' fill='none'>
      <Path
        d='M0.500003 1L14.5 1L14.5 15'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M0.500003 1L7.5 8L14.5 15'
        stroke='black'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Circle
        cx='2.4799'
        cy='6.76074'
        r='1.4'
        transform='rotate(-45 2.4799 6.76074)'
        fill='black'
      />
      <Line
        x1='3.08097'
        y1='7.26461'
        x2='7.04077'
        y2='11.2244'
        stroke='black'
      />
      <Line
        x1='4.10629'
        y1='8.99703'
        x2='6.18518'
        y2='6.91814'
        stroke='black'
      />
      <Line
        y1='-0.5'
        x2='3.85'
        y2='-0.5'
        transform='matrix(0.999913 -0.0131567 -0.0131567 0.999913 6.68713 11.5776)'
        stroke='black'
      />
    </Svg>
  );
};
