import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const HandIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 14 14' fill='none'>
      <Path
        d='M13.4783 11.8321L13.0181 9.07506C12.7842 7.67341 11.4583 6.72678 10.0567 6.96071L7.88573 7.32303L7.2032 3.23345C7.09468 2.58319 6.47956 2.14403 5.8293 2.25255C5.17904 2.36108 4.73988 2.97619 4.84841 3.62645L5.7431 8.98729L5.38021 9.12032C4.21569 9.54724 3.87521 11.0308 4.73706 11.9228L4.92093 12.1131L5.87456 13.1011'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />

      <Path
        d='M10.25 0.5L11.5 1.75L10.25 3'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M11.5 1.75H8.5'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
