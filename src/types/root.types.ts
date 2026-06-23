import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeNavProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MainApp">;
};

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Detail: { id: string; name: string };
  Profile: undefined;
  Analytics: undefined;
  Activity: undefined;
  EditProfile: { user: any };
};

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Analytics: undefined;
  Activity: undefined;
};
