import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const SunnyIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M4 4L7.29412 6.30769L8.11765 10.3462L17.1765 16.1154L18 19H4'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M13.998 7.99596C15.1014 7.99596 15.9959 7.10143 15.9959 5.99798C15.9959 4.89453 15.1014 4 13.998 4C12.8945 4 12 4.89453 12 5.99798C12 7.10143 12.8945 7.99596 13.998 7.99596Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M13.6 1V2'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M14 11V12'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M19 7H18'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M18.2 2.8999L17.49 3.6099'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M17.71 10.71L17 10'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M9.71 3.6099L9 2.8999'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
