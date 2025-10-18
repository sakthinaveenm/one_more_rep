import { setUser } from "@/src/store/slices/userSlice";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

GoogleSignin.configure();

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const user = {
        name: userInfo.data?.user.name,
        email: userInfo.data?.user.email,
        picture: userInfo.data?.user.photo
      }
      // You can dispatch to Redux here
      dispatch(setUser(user));

      // Navigate to dashboard
      router.replace("/(tabs)/dashboard");
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign in in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play services not available or outdated");
      } else {
        Alert.alert("Something went wrong", error.message);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Image
        source={require("../../assets/images/icon.png")}
        className="w-36 h-36 mb-2"
      />
      <Text className="text-2xl font-bold text-emerald-600 mb-8">
        Welcome to Gym AI
      </Text>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="flex-row items-center bg-emerald-600 px-5 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
