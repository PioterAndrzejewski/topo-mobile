import { Path, Svg } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const CrossIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#496520";

  return (
    <Svg width={size} height={size} viewBox='0 0 24 24 ' fill='none'>
      <Path
        d='M19 5L5 19'
        stroke='#496520'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M5 5L19 19'
        stroke='#496520'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
