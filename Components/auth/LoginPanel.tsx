import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

import Button from "../common/Button";
import CustomTextInput from "../common/CustomTextInput";

import { styleGuide } from "../../styles/guide";
import { HomeScreenNavigationProp } from "../../types/type";
import { login } from "../../services/auth";
import { saveJWT, setUserToStorage } from "../../services/store";

export default function LoginPanel() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      saveJWT(data.jwt);
      setUserToStorage(data.user);
      navigation.navigate("Main");
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topo na wyciągnięcie ręki</Text>
      <View style={styles.innerContainer}>
        <View>
          <CustomTextInput
            label='Adres e-mail'
            onChange={(val) => setEmail(val)}
            value={email}
          />
          <CustomTextInput
            label='Hasło'
            onChange={(val) => setPassword(val)}
            value={password}
            secure
          />
          <Button
            label='Zaloguj'
            onClick={() => mutate()}
            isLoading={isLoading}
          />
          <Text style={styles.noAccount}>Nie masz konta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            hitSlop={20}
          >
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.primary["200"],
  },
  title: {
    color: styleGuide.color.white,
    ...styleGuide.text.heading["2"],
  },
  innerContainer: {
    marginTop: 36,
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  signUpContainer: {
    ...(styleGuide.center as ViewStyle),
  },
  noAccount: {
    color: styleGuide.color.white,
    ...styleGuide.text.body,
  },
  signUp: {
    marginLeft: 12,
    color: styleGuide.color.primary["300"],
    ...styleGuide.text.body,
  },
});
