import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function IndexScreen() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.info);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) router.replace("/(tabs)/dashboard");
      else router.replace("/auth/login");
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#10b981" />
    </View>
  );
}
