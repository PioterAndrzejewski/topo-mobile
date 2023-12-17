import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const VerticalIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path d='M2 2L22 2L22 22' stroke={colorToUse} />
      <Path d='M2 2L2 22L22 22' stroke={colorToUse} />
    </Svg>
  );
};
