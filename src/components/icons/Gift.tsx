import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const GiftIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 14 14' fill='none'>
      <Path
        d='M12.2756 12.2345V6.39258H1.72412V12.2345C1.72412 12.7868 2.17184 13.2345 2.72412 13.2345H11.2756C11.8279 13.2345 12.2756 12.7868 12.2756 12.2345Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M7 13.2344V6.39062'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M13.1379 4.79175V5.39256C13.1379 5.94484 12.6902 6.39256 12.1379 6.39256H1.86206C1.30978 6.39256 0.862061 5.94484 0.862061 5.39256V4.79175C0.862061 4.23947 1.30978 3.79175 1.86206 3.79175H12.1379C12.6902 3.79175 13.1379 4.23947 13.1379 4.79175Z'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M7.00007 3.79167C7.00007 2.91667 5.97924 0.875 4.44799 0.875C1.95688 0.875 2.86433 3.79167 4.05664 3.79167'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M7 3.79167C7 2.91667 8.02083 0.875 9.55208 0.875C12.0432 0.875 11.1357 3.79167 9.94343 3.79167'
        stroke={colorToUse}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
