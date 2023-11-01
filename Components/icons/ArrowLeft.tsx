import { Svg, Path, Circle } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export const ChevronRightIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#000";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z'
        fill={colorToUse}
      />
      <Path
        d='M7 12L6.61589 11.6799L6.34915 12L6.61589 12.3201L7 12ZM17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5V12.5ZM9.94922 7.67991L6.61589 11.6799L7.38411 12.3201L10.7174 8.32009L9.94922 7.67991ZM6.61589 12.3201L9.94922 16.3201L10.7174 15.6799L7.38411 11.6799L6.61589 12.3201ZM7 12.5H17V11.5H7V12.5Z'
        fill={colorToUse}
      />

      <Circle cx='12' cy='12' r='3.5' stroke='#222222' />
    </Svg>
  );
};
