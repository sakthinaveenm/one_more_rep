import React from "react";
import { ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const data = [
    { value: 30, label: "W1", frontColor: "#34d399" },
    { value: 45, label: "W2", frontColor: "#34d399" },
    { value: 50, label: "W3", frontColor: "#34d399" },
    { value: 60, label: "W4", frontColor: "#34d399" },
    // Add more weeks if needed
  ];

  // Calculate current progress & change
  const lastValue = data[data.length - 1].value;
  const previousValue = data[data.length - 2]?.value || 0;
  const progressChange = lastValue - previousValue;

  return (
    <ScrollView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold text-emerald-600 mb-4">
        Your Progress
      </Text>

      {/* Summary Card */}
      <View className="bg-white p-4 rounded-2xl shadow mb-6">
        <Text className="text-gray-700 text-lg mb-1">Current Progress</Text>
        <Text className="text-2xl font-bold text-emerald-600 mb-1">{lastValue}</Text>
        <Text
          className={`text-sm ${
            progressChange >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {progressChange >= 0 ? `+${progressChange}` : progressChange} since last week
        </Text>
      </View>

      {/* Line Chart */}
      <LineChart
        data={data}
        curved
        color="#10b981"
        thickness={3}
        showDataPoints
        dataPointsColor="#059669"
        dataPointsWidth={6}
        showLineGradient
        gradientColor="#6ee7b7"
        yAxisLabelTextStyle={{ color: "#4b5563", fontSize: 12 }}
        xAxisLabelTextStyle={{ color: "#4b5563", fontSize: 12 }}
        yAxisColor="#d1d5db"
        xAxisColor="#d1d5db"
        yAxisInterval={10}
        maxValue={100}
        animateOnDataChange
        initialSpacing={0}
        spacing={50}
      />
    </ScrollView>
  );
}
