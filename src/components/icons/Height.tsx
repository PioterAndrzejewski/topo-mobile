import { Path, Rect, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const HeightIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M15 7L17.5 2L20 7'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M20 17L17.5 22L15 17'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M17.5 3V21'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <Rect
        x='5'
        y='2'
        width='6'
        height='20'
        rx='1'
        fill='#D9D9D9'
        stroke='black'
        stroke-width='1.5'
      />
      <Path
        d='M5 6H7'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <Path
        d='M5 14H7'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <Path
        d='M5 10H9'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <Path
        d='M5 18H9'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
      />
    </Svg>
  );
};

<svg
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  xmlns='http://www.w3.org/2000/svg'
></svg>;
