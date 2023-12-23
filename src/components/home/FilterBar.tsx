import { Controller, useForm } from "react-hook-form";

import CustomTextInput from "src/components/common/CustomTextInput";
import OverlayCardView from "src/components/ui/OverlayCardView";
import View from "src/components/ui/View";

import { useSetAtom } from "jotai";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchIcon } from "src/components/icons/Search";
import { searchTextAtom } from "src/store/search";

const FilterBar = () => {
  const setSearchText = useSetAtom(searchTextAtom);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const onSubmitHandler = (data: { search: string }) => {
    setSearchText(data.search.toLowerCase())
  };

  return (
    <View
      backgroundColor='backgroundScreen'
      paddingTop='3xl'
      paddingBottom='m'
      paddingHorizontal='m'
      flexDirection='row'
      gap='m'
      borderBottomColor='backgroundSecondary'
      borderBottomWidth={1}
    >
      <View flex={1} justifyContent='center' alignItems='center'>
        <Controller
          control={control}
          name='search'
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              hookBlurHandler={onBlur}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmitHandler)}>
        <OverlayCardView borderRadius={20}>
          <SearchIcon size={32} />
        </OverlayCardView>
      </TouchableOpacity>
    </View>
  );
};

export default FilterBar;
