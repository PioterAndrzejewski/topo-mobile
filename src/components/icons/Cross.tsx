import { Circle, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const CrossIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Circle cx='12' cy='12' r='9' stroke={colorToUse} />
      <Path d='M9.00009 14.9997L15.0001 8.99966' stroke={colorToUse} />
      <Path d='M15 15L9 9' stroke={colorToUse} />
    </Svg>
  );
};
