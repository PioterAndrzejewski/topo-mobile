import { useTheme } from "@shopify/restyle";
import { Path, Svg } from "react-native-svg";
import { Theme } from "src/styles/theme";

type Props = {
  size?: number;
  color?: string;
};

export const ParkingIcon = ({ size = 20, color }: Props): JSX.Element => {
  const { colors } = useTheme<Theme>();
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path d='M2 2L22 2L22 22' stroke={colorToUse} />
      <Path d='M2 2L2 22L22 22' stroke={colorToUse} />
      <Path
        d='M12.792 13.2881H10.2012V11.9277H12.792C13.2432 11.9277 13.6077 11.8548 13.8857 11.709C14.1637 11.5632 14.3665 11.3626 14.4941 11.1074C14.6263 10.8477 14.6924 10.5514 14.6924 10.2188C14.6924 9.9043 14.6263 9.61035 14.4941 9.33691C14.3665 9.05892 14.1637 8.83561 13.8857 8.66699C13.6077 8.49837 13.2432 8.41406 12.792 8.41406H10.7275V17H9.01172V7.04688H12.792C13.5622 7.04688 14.2161 7.18359 14.7539 7.45703C15.2962 7.72591 15.7087 8.09961 15.9912 8.57812C16.2738 9.05208 16.415 9.5944 16.415 10.2051C16.415 10.8477 16.2738 11.3991 15.9912 11.8594C15.7087 12.3197 15.2962 12.6729 14.7539 12.9189C14.2161 13.165 13.5622 13.2881 12.792 13.2881Z'
        fill={colors.secondary}
      />
    </Svg>
  );
};
