import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearUser } from "../../store/slices/userSlice";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user.info);
  const dispatch = useDispatch();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    dispatch(clearUser());
    router.replace("/auth/login");
  };

  if (!user) return null;

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1 bg-gray-50 p-6 items-center">
      <Image
        source={{ uri: user.picture }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-xl font-bold text-gray-800">{user.name}</Text>
      <Text className="text-gray-500 mb-8">{user.email}</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-5 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
