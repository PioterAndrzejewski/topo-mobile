import { Circle, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const RecommendedIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Circle
        cx='12'
        cy='12'
        r='9.5'
        stroke={colorToUse}
        stroke-linecap='round'
      />
      <Path
        d='M8.20857 15.378C8.63044 15.7433 9.20751 16.0237 9.86133 16.2124C10.5191 16.4023 11.256 16.5 12 16.5C12.744 16.5 13.4809 16.4023 14.1387 16.2124C14.7925 16.0237 15.3696 15.7433 15.7914 15.378'
        stroke={colorToUse}
        stroke-linecap='round'
      />
      <Circle
        cx='9'
        cy='10'
        r='1'
        fill='#222222'
        stroke={colorToUse}
        stroke-linecap='round'
      />
      <Circle
        cx='15'
        cy='10'
        r='1'
        fill='#222222'
        stroke={colorToUse}
        stroke-linecap='round'
      />
    </Svg>
  );
};
