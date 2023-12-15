import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const SunIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z'
        stroke={colorToUse}
      />
      <Path d='M12 3V5' stroke={colorToUse} />
      <Path d='M12 19V21' stroke={colorToUse} />
      <Path d='M6 6L7 7' stroke={colorToUse} />
      <Path d='M17 17L18 18' stroke={colorToUse} />
      <Path d='M3 12H5' stroke={colorToUse} />
      <Path d='M19 12H21' stroke={colorToUse} />
      <Path d='M6 18L7 17' stroke={colorToUse} />
      <Path d='M17 7L18 6' stroke={colorToUse} />
    </Svg>
  );
};

