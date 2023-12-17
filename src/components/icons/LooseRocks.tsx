import { Circle, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const LooseRocksIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Circle cx='17' cy='8' r='4' stroke={colorToUse} />
      <Circle cx='12' cy='17' r='3' stroke={colorToUse} />
      <Circle cx='6.5' cy='9.5' r='2.5' stroke={colorToUse} />
    </Svg>
  );
};

<svg
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  xmlns='http://www.w3.org/2000/svg'
></svg>;
