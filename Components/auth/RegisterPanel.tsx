import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { validate } from "../../utils/validate";
import { styleGuide } from "../../styles/guide";
import { HomeScreenNavigationProp } from "../../types/type";
import { Credentials } from "../../types/props";

import AppLoading from "../common/AppLoading";
import Button from "../common/Button";
import CustomTextInput from "../common/CustomTextInput";

export default function RegisterPanel() {
  const [credentials, setCredentials] = useState({
    email: "prefilled@email.com",
    firstName: "prefilled name",
    lastName: "prefilled surname",
    password: "prefilled password",
    passwordConfirmation: "prefilled password",
  });
  const [validation, setValidation] = useState({
    email: {
      isTouched: false,
      error: "",
    },
    firstName: {
      isTouched: false,
      error: "",
    },
    lastName: {
      isTouched: false,
      error: "",
    },
    password: {
      isTouched: false,
      error: "",
    },
    passwordConfirmation: {
      isTouched: false,
      error: "",
    },
  });
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const updateCredentials = (
    newValue: string,
    field: Credentials | undefined,
  ) => {
    let { validationError, clearPasswordError } = validate(
      field,
      newValue,
      credentials,
    );

    setButtonDisabled(false);
    setCredentials((prevValue) => {
      const newCredentials = JSON.parse(JSON.stringify(prevValue));
      if (field) {
        newCredentials[field] = newValue;
      }
      return newCredentials;
    });
    setValidation((prevValidation) => {
      const newValidation = JSON.parse(JSON.stringify(prevValidation));
      newValidation[field!].isTouched = true;
      if (clearPasswordError) {
        newValidation.password.error = "";
        newValidation.passwordConfirmation.error = "";
      }
      if (
        validationError === "Passwords are not the same" &&
        newValidation.password.isTouched &&
        newValidation.passwordConfirmation.isTouched
      ) {
        newValidation.password.error = validationError;
        newValidation.passwordConfirmation.error = validationError;
        return newValidation;
      } else if (validationError === "Passwords are not the same") {
        newValidation.password.error = "";
        newValidation.passwordConfirmation.error = "";
        return newValidation;
      }
      newValidation[field!].error = validationError;
      return newValidation;
    });
  };

  const inputs = [
    {
      label: "e-mail address",
      value: credentials.email,
      field: "email",
      error: validation.email.error,
      touched: validation.email.isTouched,
    },
    {
      label: "first name",
      value: credentials.firstName,
      field: "firstName",
      error: validation.firstName.error,
      touched: validation.firstName.isTouched,
    },
    {
      label: "last name",
      value: credentials.lastName,
      field: "lastName",
      error: validation.lastName.error,
      touched: validation.lastName.isTouched,
    },
    {
      label: "password",
      value: credentials.password,
      field: "password",
      others: { secure: true },
      error: validation.password.error,
      touched: validation.password.isTouched,
    },
    {
      label: "password confirmation",
      value: credentials.passwordConfirmation,
      field: "passwordConfirmation",
      others: { secure: true },
      error: validation.passwordConfirmation.error,
      touched: validation.passwordConfirmation.isTouched,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {inputs.map((input) => (
            <CustomTextInput
              label={input.label}
              onChange={updateCredentials}
              value={input.value}
              field={input.field as Credentials}
              {...input.others}
              error={input.error}
              isTouched={input.touched}
              key={input.label}
            />
          ))}
          <ActivityIndicator size='large' />
          <Button
            label='Sign up'
            onClick={() => console.log("register")}
            disabled={buttonDisabled}
          />
        </View>
        <View style={styles.privacy}>
          <View style={styles.privacyRow}>
            <Text style={styles.caption}>By signing up you agree with </Text>
          </View>
          <View style={styles.privacyRow}>
            <TouchableOpacity
              onPress={() => console.log("open terms")}
              hitSlop={20}
            >
              <Text style={styles.captionLink}>Terms and Conditions</Text>
            </TouchableOpacity>

            <Text style={styles.caption}> and </Text>
            <TouchableOpacity
              onPress={() => console.log("open privacy")}
              hitSlop={20}
            >
              <Text style={styles.captionLink}>Privacy Policy.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.hasAccount}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            hitSlop={20}
          >
            <Text style={styles.signIn}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.lime["300"],
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  privacy: {
    marginTop: 16,
  },
  privacyRow: {
    ...(styleGuide.center as ViewStyle),
  },
  caption: {
    color: styleGuide.color.white,
    ...styleGuide.text.caption,
  },
  captionLink: {
    textDecorationLine: "underline",
    color: styleGuide.color.lime["500"],
    ...styleGuide.text.caption,
  },
  hasAccount: {
    color: styleGuide.color.white,
    ...styleGuide.text.body,
  },
  signUpContainer: {
    marginTop: 20,
    ...(styleGuide.center as ViewStyle),
  },
  signIn: {
    marginLeft: 12,
    color: styleGuide.color.blue["500"],
    ...styleGuide.text.body,
  },
  documentTitle: {
    marginBottom: 30,
    ...styleGuide.text.heading["3"],
  },
  documentBody: {
    ...styleGuide.text.body,
  },
});
