import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const ArrowLeft = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <G clip-path='url(#clip0_1222_37448)'>
        <Path
          d='M16.2857 18V21.4286C16.2857 21.8832 16.1051 22.3193 15.7837 22.6408C15.4622 22.9622 15.0261 23.1429 14.5715 23.1429H2.57146C2.1168 23.1429 1.68077 22.9622 1.35928 22.6408C1.03779 22.3193 0.857178 21.8832 0.857178 21.4286V2.57146C0.857178 2.1168 1.03779 1.68077 1.35928 1.35928C1.68077 1.03779 2.1168 0.857178 2.57146 0.857178H14.5715C15.0261 0.857178 15.4622 1.03779 15.7837 1.35928C16.1051 1.68077 16.2857 2.1168 16.2857 2.57146V6.00003'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M23.1429 12H9.42859'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M12.8572 8.57153L9.42859 12.0001L12.8572 15.4287'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_1222_37448'>
          <Rect width='24' height='24' fill='white' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
