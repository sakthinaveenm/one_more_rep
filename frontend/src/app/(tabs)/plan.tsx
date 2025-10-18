import React, { useState } from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setPlan } from "../../store/slices/planSlice";

export default function PlanScreen() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const existingPlan = useSelector((state: RootState) => state.plan.plan);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("Build Muscle");
  const [equipment, setEquipment] = useState("Home (Bodyweight)");

  const [bmi, setBmi] = useState<number | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmiValue = w / (h * h);
    setBmi(parseFloat(bmiValue.toFixed(1)));
  };

  const generatePlan = () => {
    calculateBMI();
    const mockPlan = [
      { id: 1, day: "Monday", workouts: [{ name: "Push-ups", sets: 3, reps: 12 }, { name: "Squats", sets: 3, reps: 15 }] },
      { id: 2, day: "Tuesday", workouts: [{ name: "Pull-ups", sets: 3, reps: 10 }, { name: "Lunges", sets: 3, reps: 12 }] },
    ];
    dispatch(setPlan(mockPlan));
    setIsGenerated(true);
  };

  const renderOption = (options: string[], selected: string, setSelected: (val: string) => void) => (
    <FlatList
      horizontal
      data={options}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelected(item)}
          className={`px-5 py-3 rounded-full ${selected === item ? "bg-emerald-500" : "bg-gray-200"}`}
        >
          <Text className={`${selected === item ? "text-white font-semibold" : "text-gray-700"}`}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1 bg-gray-50">
      <ScrollView className="p-5">
        <Text className="text-2xl font-bold text-emerald-600 mb-6">Create Your Fitness Plan</Text>

        {/* Body Details */}
        <View className="bg-white p-5 rounded-2xl shadow mb-5">
          <Text className="text-gray-700 font-semibold mb-3">Body Details</Text>
          <TextInput
            placeholder="Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            className="border border-gray-300 rounded-xl p-4 mb-3"
          />
          <TextInput
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            className="border border-gray-300 rounded-xl p-4 mb-3"
          />
          {bmi && (
            <Text className="text-gray-600 font-medium">
              Your BMI: <Text className="font-bold">{bmi}</Text>
            </Text>
          )}
        </View>

        {/* Goal */}
        <View className="bg-white p-5 rounded-2xl shadow mb-5">
          <Text className="text-gray-700 font-semibold mb-3">Fitness Goal</Text>
          {renderOption(["Build Muscle", "Lose Fat", "Stay Fit"], goal, setGoal)}
        </View>

        {/* Equipment */}
        <View className="bg-white p-5 rounded-2xl shadow mb-5">
          <Text className="text-gray-700 font-semibold mb-3">Available Equipment</Text>
          {renderOption(["Home (Bodyweight)", "Dumbbells", "Full Gym"], equipment, setEquipment)}
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          onPress={generatePlan}
          className="bg-emerald-600 p-5 rounded-2xl mt-2 mb-8"
        >
          <Text className="text-center text-white font-semibold text-lg">Generate My Plan</Text>
        </TouchableOpacity>

        {/* Generated Plan */}
        {isGenerated && (
          <View className="mb-8">
            <Text className="text-xl font-semibold text-emerald-600 mb-4">Your Personalized Plan</Text>
            {existingPlan.map((day) => (
              <View
                key={day.id}
                className="mb-3 bg-white p-4 rounded-2xl shadow border-l-4 border-emerald-500"
              >
                <Text className="text-lg font-semibold mb-2">{day.day}</Text>
                {day.workouts.map((w, i) => (
                  <Text key={i} className="text-gray-700 ml-2 mb-1">
                    • {w.name} — {w.sets}x{w.reps}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
