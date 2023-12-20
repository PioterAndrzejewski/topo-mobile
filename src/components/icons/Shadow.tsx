import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const ShadowIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M5.57143 8L8.14286 4L10.7143 8L9.42857 8L12 12H10.7143L13.2857 16H8.46429H3L5.57143 12H4.28571L6.85714 8L5.57143 8Z'
        fill={colorToUse}
      />
      <Path
        d='M15.2143 11.1111L17.1429 8L19.0714 11.1111H18.1071L20.0357 14.2222H19.0714L21 17.3333H13.2857L15.2143 14.2222H14.25L16.1786 11.1111H15.2143Z'
        fill={colorToUse}
      />
      <Path
        d='M8.46429 16H3L5.57143 12H4.28571L6.85714 8L5.57143 8L8.14286 4L10.7143 8L9.42857 8L12 12H10.7143L13.2857 16H8.46429ZM8.46429 16V20M17.4643 17.3333V20M17.1429 8L15.2143 11.1111H16.1786L14.25 14.2222H15.2143L13.2857 17.3333H21L19.0714 14.2222H20.0357L18.1071 11.1111H19.0714L17.1429 8Z'
        stroke={colorToUse}
        stroke-linecap='round'
      />
    </Svg>
  );
};
