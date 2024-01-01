import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const DiamondIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M18.2373 2.63989H5.76281C5.47522 2.6478 5.19353 2.72329 4.9405 2.86028C4.68747 2.99727 4.47024 3.19191 4.30632 3.42846L1.18772 7.74846C0.956145 8.07584 0.840496 8.47122 0.859122 8.87185C0.877747 9.2725 1.02958 9.65542 1.29053 9.95989L10.6463 20.7427C10.8065 20.9493 11.0118 21.1164 11.2464 21.2313C11.481 21.3463 11.7388 21.4059 12 21.4059C12.2613 21.4059 12.5191 21.3463 12.7537 21.2313C12.9883 21.1164 13.1935 20.9493 13.3537 20.7427L22.7095 9.95989C22.9704 9.65542 23.1223 9.2725 23.141 8.87185C23.1595 8.47122 23.044 8.07584 22.8124 7.74846L19.6937 3.42846C19.5299 3.19191 19.3127 2.99727 19.0596 2.86028C18.8066 2.72329 18.5248 2.6478 18.2373 2.63989Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M11.1086 2.6228L6.92578 9.1028L12.0001 21.3599'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M12.9429 2.6228L17.1086 9.1028L12 21.3599'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M0.891479 9.10278H23.1086'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
