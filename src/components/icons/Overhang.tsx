import { Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const OverhangIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path d='M2 2L22 2L22 22' stroke={colorToUse} />
      <path d='M2 2L12 12L22 22' stroke={colorToUse} />
    </Svg>
  );
};
