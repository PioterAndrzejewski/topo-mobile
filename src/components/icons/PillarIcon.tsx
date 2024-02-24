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
        d='M8.8 16H2.5V2H9.5'
        stroke='#b7b7b7'
        stroke-opacity='0.2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M16.5 2.00001L16.5 16L8.80005 16'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M16.5 2.00001L9.50005 2.00001L10.55 4.45001L9.15005 7.95001L10.55 11.1L8.80005 16'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M9.50005 2L10.55 4.45L9.15005 7.95L10.55 11.1L8.80005 16'
        stroke={colorToUse}
      />
      <Circle cx='6.80002' cy='5.5001' r='1.4' stroke={colorToUse} />
      <Line
        x1='6.8501'
        y1='6.2002'
        x2='6.8501'
        y2='11.8002'
        stroke={colorToUse}
      />
      <Line
        x1='6.3501'
        y1='8.1499'
        x2='9.2901'
        y2='8.1499'
        stroke={colorToUse}
      />
      <Line
        y1='-0.5'
        x2='3.85'
        y2='-0.5'
        transform='matrix(0.716349 0.697742 -0.716349 0.697742 6.3501 11.8003)'
        stroke={colorToUse}
      />
    </Svg>
  );
};
