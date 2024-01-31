import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import Button from "src/components/common/Button";
import CustomTextInput from "src/components/common/CustomTextInput";
import OverlayCardView from "src/components/ui/OverlayCardView";
import View from "src/components/ui/View";

import { changePass } from "src/services/auth";
import { palette } from "src/styles/theme";
import { ArrowLeft } from "../icons/ArrowLeft";

export default function ChangePasswordPanel() {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { mutate: changePasswordMutation, isLoading } = useMutation({
    mutationKey: ["changePass"],
    mutationFn: (data: ChangePasswordData) => changePass(data),
    onError: () => {
      Toast.show({
        type: "error",
        text2: "Coś poszło nie tak. Spróbuj ponownie później.",
      });
    },
    onSuccess: async () => {
      navigation.goBack();
    },
  });
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: ChangePasswordData) => {
    changePasswordMutation(data);
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View
        height={height}
        backgroundColor='backgroundScreen'
        paddingHorizontal='m'
      >
        <View marginTop='xl' justifyContent='space-between' flexGrow={1}>
          <View>
            <Controller
              control={control}
              name='oldPassword'
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  hookBlurHandler={onBlur}
                  onChange={(value) => onChange(value)}
                  value={value}
                  label='Stare hasło'
                  error={error}
                />
              )}
            />
            <View marginTop='l'>
              <Controller
                control={control}
                name='newPassword'
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <CustomTextInput
                    hookBlurHandler={onBlur}
                    onChange={(value) => onChange(value)}
                    value={value}
                    label='Nowe hasło'
                    error={error}
                  />
                )}
              />
              <Controller
                control={control}
                name='confirmPassword'
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <CustomTextInput
                    hookBlurHandler={onBlur}
                    onChange={(value) => onChange(value)}
                    value={value}
                    label='Potwierdź hasło'
                    error={error}
                    secure
                  />
                )}
              />
            </View>
            <View marginTop='m'>
              <Button
                label='Resetuj hasło'
                onClick={handleSubmit(onSubmitHandler)}
                isLoading={isLoading}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const schema = yup.object().shape({
  oldPassword: yup.string().required("Wpisz stare hasło"),
  newPassword: yup.string().required("Wpisz stare hasło"),
  confirmPassword: yup.string().required("Wpisz stare hasło"),
});

export type ChangePasswordData = yup.InferType<typeof schema>;
