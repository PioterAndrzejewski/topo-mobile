import { Svg, Path, Circle } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const SearchIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Circle cx='11' cy='11' r='6' stroke={colorToUse} />
      <Path d='M20 20L17 17' stroke={colorToUse} stroke-linecap='round' />
    </Svg>
  );
};