import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const Parking = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 14 14' fill='none'>
      <Path
        d='M10.5 0.5H3.5C1.84315 0.5 0.5 1.84315 0.5 3.5V10.5C0.5 12.1569 1.84315 13.5 3.5 13.5H10.5C12.1569 13.5 13.5 12.1569 13.5 10.5V3.5C13.5 1.84315 12.1569 0.5 10.5 0.5Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M5.20898 10.5135V7.58553M5.20898 7.58553V3.48633H8.39379C9.22222 3.48633 9.89379 4.1579 9.89379 4.98633V6.08553C9.89379 6.91396 9.22221 7.58553 8.39379 7.58553H5.20898Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
