import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../common/Button";
import CustomTextInput from "../common/CustomTextInput";

import { styleGuide } from "../../styles/guide";
import { HomeScreenNavigationProp } from "../../types/type";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const updateEmail = (newValue: string) => setEmail(newValue);
  const updatePassword = (newValue: string) => setPassword(newValue);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topo na wyciągnięcie ręki</Text>
      <View style={styles.innerContainer}>
        <View>
          <CustomTextInput
            label='e-mail address'
            onChange={updateEmail}
            value={email}
          />
          <CustomTextInput
            label='password'
            onChange={updatePassword}
            value={password}
            secure
          />
          <Button label='Zaloguj' onClick={() => console.log("login")} />
          <ActivityIndicator size='large' />
          <Text style={styles.noAccount}>Don't have an account?</Text>
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
