import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const TickIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#13B86B";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <G clip-path='url(#clip0_1222_36854)'>
        <Path
          d='M18 0.857178H6.00003C3.15972 0.857178 0.857178 3.15972 0.857178 6.00003V18C0.857178 20.8404 3.15972 23.1429 6.00003 23.1429H18C20.8404 23.1429 23.1429 20.8404 23.1429 18V6.00003C23.1429 3.15972 20.8404 0.857178 18 0.857178Z'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <Path
          d='M17.0008 8.14294L10.1437 16.7144L6.71509 14.1429'
          stroke={colorToUse}
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_1222_36854'>
          <Rect width='24' height='24' fill='white' />
        </ClipPath>
      </Defs>
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
