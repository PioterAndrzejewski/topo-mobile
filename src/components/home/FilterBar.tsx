import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";

import CustomTextInput from "src/components/common/CustomTextInput";
import OverlayCardView from "src/components/ui/OverlayCardView";
import View from "src/components/ui/View";

import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchIcon } from "src/components/icons/Search";
import { searchTextAtom } from "src/store/search";

const FilterBar = () => {
  const setSearchText = useSetAtom(searchTextAtom);
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const onSubmitHandler = (data: { search: string }) => {
    setSearchText(data.search.toLowerCase());
  };

  useEffect(() => {
    const closeHandler = () => {
      onSubmitHandler(getValues());
    };
    Keyboard.addListener("keyboardDidHide", closeHandler);
    return () => Keyboard.removeAllListeners("keyboardDidHide");
  });

  return (
    <View
      backgroundColor='backgroundScreen'
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
      <OverlayCardView borderRadius={20} zIndex={99}>
        <TouchableOpacity onPress={handleSubmit(onSubmitHandler)}>
          <SearchIcon size={32} />
        </TouchableOpacity>
      </OverlayCardView>
    </View>
  );
};

export default FilterBar;
