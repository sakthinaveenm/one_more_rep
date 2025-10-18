import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function DashboardScreen() {
  const router = useRouter();
  const plan = useSelector((state: RootState) => state.plan.plan);
  const user = useSelector((state: RootState) => state.user.info);
  const insets = useSafeAreaInsets();


  // Calculate BMI if user has weight and height
  const bmi =
    user?.weight && user?.height
      ? +(user.weight / ((user.height / 100) ** 2)).toFixed(1)
      : null;

  // Get today’s workout (if plan exists)
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const todayWorkout = plan.find((p) => p.day === today);

  // Count completed workouts (mock example: assume 2 workouts done)
  const completedWorkouts = plan.length ? 2 : 0;
  const totalWorkouts = plan.length;

  return (
    <ScrollView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1 bg-gray-50 p-6">
      {/* Greeting */}
      <Text className="text-2xl font-bold text-emerald-600 mb-2">
        Hi, {user?.name || "there"}!
      </Text>
      <Text className="text-gray-600 mb-6">Here’s your fitness overview</Text>

      {/* Summary Cards */}
      <View className="flex-row justify-between mb-6">
        <View className="bg-white p-4 rounded-xl shadow w-1/3 items-center">
          <Text className="text-gray-500 text-sm">BMI</Text>
          <Text className="font-bold text-lg">{bmi || "--"}</Text>
        </View>
        <View className="bg-white p-4 rounded-xl shadow w-1/3 items-center">
          <Text className="text-gray-500 text-sm">Workouts</Text>
          <Text className="font-bold text-lg">
            {completedWorkouts}/{totalWorkouts || "--"}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-xl shadow w-1/3 items-center">
          <Text className="text-gray-500 text-sm">Goal</Text>
          <Text className="font-bold text-lg">{user?.goal || "Build Muscle"}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/plan")}
          className="bg-emerald-600 p-4 rounded-xl mb-3"
        >
          <Text className="text-white text-center font-semibold">
            View Workout Plan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-emerald-500 p-4 rounded-xl mb-3">
          <Text className="text-white text-center font-semibold">
            Start Workout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-emerald-400 p-4 rounded-xl">
          <Text className="text-white text-center font-semibold">
            Track Progress
          </Text>
        </TouchableOpacity>
      </View>

      {/* Today’s Workout */}
      <View className="bg-white p-4 rounded-2xl shadow mb-6">
        <Text className="text-gray-700 font-semibold mb-2">Today's Workout</Text>
        {todayWorkout ? (
          todayWorkout.workouts.map((w, i) => (
            <Text key={i} className="text-gray-600 ml-2 mb-1">
              • {w.name} — {w.sets}x{w.reps}
            </Text>
          ))
        ) : (
          <Text className="text-gray-500">No workout scheduled for today.</Text>
        )}
      </View>

      {/* Motivational Quote */}
      <View className="bg-emerald-50 p-4 rounded-2xl shadow">
        <Text className="text-gray-700 italic text-center">
          “Push yourself because no one else is going to do it for you.”
        </Text>
      </View>
    </ScrollView>
  );
}
