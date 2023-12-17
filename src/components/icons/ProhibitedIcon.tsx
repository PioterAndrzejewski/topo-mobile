import { useTheme } from "@shopify/restyle";
import { Circle, Path, Svg } from "react-native-svg";
import { Theme } from "src/styles/theme";

type Props = {
  size?: number;
  color?: string;
};

export const ProhibitedIcon = ({ size = 20, color }: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const { favoriteRed } = theme.colors;
  const colorToUse = color || favoriteRed;

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Circle cx='12' cy='12' r='9' stroke={colorToUse} />
      <Path d='M18 18L6 6' stroke={colorToUse} />
    </Svg>
  );
};
