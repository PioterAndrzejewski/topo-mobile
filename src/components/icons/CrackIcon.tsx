import { Circle, Line, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const CrackIcon = ({ size = 20, color }: Props): JSX.Element => {
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
        d='M14.5 1L0.499998 1L0.5 15'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M7.50005 1L8.55005 3.45L7.15005 6.95L8.55005 10.1L6.80005 15'
        stroke={colorToUse}
      />
      <Circle cx='4.80002' cy='4.5001' r='1.4' fill={colorToUse} />
      <Line
        x1='4.8501'
        y1='5.2002'
        x2='4.8501'
        y2='10.8002'
        stroke={colorToUse}
      />
      <Line
        x1='4.3501'
        y1='7.1499'
        x2='7.2901'
        y2='7.1499'
        stroke={colorToUse}
      />
      <Line
        y1='-0.5'
        x2='3.85'
        y2='-0.5'
        transform='matrix(0.716349 0.697742 -0.716349 0.697742 4.3501 10.8003)'
        stroke={colorToUse}
      />
    </Svg>
  );
};
