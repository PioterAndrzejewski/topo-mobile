import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const SlabIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path d='M22 2L22 22L2 22' stroke={colorToUse} />
      <Path d='M22 2L12 12L2 22' stroke={colorToUse} />
    </Svg>
  );
};
