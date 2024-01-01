import { Svg, Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const ItemIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M1.5 12C1.5 6.20102 6.20102 1.5 12 1.5C17.7989 1.5 22.5 6.20102 22.5 12C22.5 17.7989 17.7989 22.5 12 22.5C6.20102 22.5 1.5 17.7989 1.5 12Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M12 1.5V4.29999'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M22.5 12H19.7001'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M12 22.4999V19.7'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M1.5 12H4.29999'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M9.25073 12H14.7492'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M12 9.25073V14.7492'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
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
