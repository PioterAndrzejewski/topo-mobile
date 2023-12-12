import { ReactNode } from "react";

import Height from "src/components/rock/details/Height";
import View from "src/components/ui/View";

import { RockData } from "src/services/rocks";

type InformationRowProps = {
  rock: RockData;
  inCard?: boolean;
};

const InformationRow = ({ rock, inCard }: InformationRowProps) => {
  return (
    <View
      flexDirection='row'
      alignItems='center'
      justifyContent='flex-end'
      gap='m'
      flexWrap='wrap'
    >
      {inCard ? (
        <RenderWrapper>
          <Height height={rock.attributes.height} />
        </RenderWrapper>
      ) : (
        <Height height={rock.attributes.height} />
      )}
    </View>
  );
};

const RenderWrapper = ({ children }: { children: ReactNode }) => (
  <View
    borderRadius={12}
    backgroundColor='mainBackgroundFaded'
    p='s'
    paddingTop='m'
    shadowOffset={{ width: 0, height: 5 }}
    shadowRadius={4}
    shadowOpacity={0.5}
  >
    {children}
  </View>
);

export default InformationRow;
