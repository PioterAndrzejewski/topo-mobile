import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const CartIcon = ({
  size = 20,
  color,
  strokeWidth = 1,
}: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M0.869995 0.857178H5.05658L6.548 15.6857C6.60999 16.0945 6.81763 16.4671 7.13266 16.7349C7.44768 17.0027 7.84887 17.1475 8.26229 17.1429H19.0623C19.4362 17.1624 19.8061 17.059 20.1155 16.8485C20.4251 16.638 20.6573 16.332 20.7766 15.9772L23.0566 9.12003C23.1416 8.86224 23.1642 8.58792 23.1224 8.3197C23.0807 8.05147 22.9758 7.79698 22.8166 7.57718C22.6506 7.34349 22.4286 7.15514 22.1711 7.02934C21.9137 6.90357 21.6286 6.84437 21.3423 6.85718H5.65658'
        stroke={colorToUse}
        strokeWidth={strokeWidth}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M18.7708 23.143C18.2975 23.143 17.9137 22.7592 17.9137 22.2859C17.9137 21.8125 18.2975 21.4287 18.7708 21.4287C19.2442 21.4287 19.628 21.8125 19.628 22.2859C19.628 22.7592 19.2442 23.143 18.7708 23.143Z'
        stroke={colorToUse}
        strokeWidth={strokeWidth}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M7.62802 23.143C7.15462 23.143 6.77087 22.7592 6.77087 22.2859C6.77087 21.8125 7.15462 21.4287 7.62802 21.4287C8.1014 21.4287 8.48516 21.8125 8.48516 22.2859C8.48516 22.7592 8.1014 23.143 7.62802 23.143Z'
        stroke={colorToUse}
        strokeWidth={strokeWidth}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
