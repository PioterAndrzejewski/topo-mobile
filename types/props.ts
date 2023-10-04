import { ReactNode } from "react";
import { IMessage } from "react-native-gifted-chat";

export type Credentials =
  | "email"
  | "firstName"
  | "lastName"
  | "password"
  | "passwordConfirmation";

export type CredentialsState = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

export type ChatBoxProps = {
  roomId: string;
};

export type CustomInputProps = {
  containerStyle?: any;
  loading: boolean;
  onSend: (text: string | undefined) => void;
};

export type CustomTextInputProps = {
  label: string;
  secure?: boolean;
  onChange: (newValue: string, field?: Credentials | undefined) => void;
  value: string;
  field?: Credentials | undefined;
  error?: string;
  isTouched?: boolean;
};

export type LoginTitleProps = {
  title: string;
};