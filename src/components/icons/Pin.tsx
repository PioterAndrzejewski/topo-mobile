import { Circle, Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const Pin = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M19.5 12C19.5 17.018 14.0117 20.4027 12.4249 21.2764C12.1568 21.424 11.8432 21.424 11.5751 21.2764C9.98831 20.4027 4.5 17.018 4.5 12C4.5 7.5 8.13401 4.5 12 4.5C16 4.5 19.5 7.5 19.5 12Z'
        stroke={colorToUse}
      />
      <Circle cx='12' cy='12' r='3.5' stroke='#222222' />
    </Svg>
  );
};
