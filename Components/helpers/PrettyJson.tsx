import { FC } from "react";
import { Text } from "react-native";

type PrettyJsonProps = {
  json: any;
};

const PrettyJson: FC<PrettyJsonProps> = ({ json }) => {
  if (!json) return <Text>Waiting for data</Text>;
  return <Text>{JSON.stringify(json, null, 2)}</Text>;
};

export default PrettyJson;
