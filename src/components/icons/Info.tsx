import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const InfoIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 14 14' fill='none'>
      <G clip-path='url(#clip0_1222_37317)'>
        <Path
          d='M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M5.5 10H8.5'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M7 10V6.5H6'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M7 4.25C6.86193 4.25 6.75 4.13807 6.75 4C6.75 3.86193 6.86193 3.75 7 3.75'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M7 4.25C7.13807 4.25 7.25 4.13807 7.25 4C7.25 3.86193 7.13807 3.75 7 3.75'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_1222_37317'>
          <Rect width='14' height='14' fill='white' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
