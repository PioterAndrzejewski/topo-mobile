import type { FC } from "react";
import { TouchableOpacity } from "react-native";

import { ArrowLeft } from "src/components/icons/ArrowLeft";

type BackArrowProps = {
  onClick: () => void;
};

const BackArrow: FC<BackArrowProps> = ({ onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      hitSlop={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      }}
    >
      <ArrowLeft size={40} />
    </TouchableOpacity>
  );
};

export default BackArrow;
