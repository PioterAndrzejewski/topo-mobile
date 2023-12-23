import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const SettingsIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 14 14' fill='none'>
      <G clip-path='url(#clip0_1222_38112)'>
        <Path
          d='M0.5 1.5V12.5C0.5 13.0523 0.947715 13.5 1.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V1.5C13.5 0.947715 13.0523 0.5 12.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5Z'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M4.5 11V6'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M9.5 3V6'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M9.5 9V11'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9Z'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_1222_38112'>
          <Rect width='14' height='14' fill='white' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
