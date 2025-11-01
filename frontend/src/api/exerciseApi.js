const EXERCISE_API_URL = "https://exercisedb.p.rapidapi.com";
const API_KEY = "c37c285b57msh1ed3dff2f78b632p1bfa76jsnc1c9d5623454"; // Replace with your actual RapidAPI key

const headers = {
  "x-rapidapi-key": API_KEY,
  "x-rapidapi-host": "exercisedb.p.rapidapi.com",
};

/**
 * Helper function to fetch JSON data from ExerciseDB API
 */
const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${EXERCISE_API_URL}${endpoint}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Exercise API error:", error);
    return [];
  }
};

/**
 * ✅ Get all exercises (recommended to limit results)
 */
export const getAllExercises = async (limit = 20) => {
  const data = await fetchFromApi(`/exercises`);
  return data.slice(0, limit);
};

/**
 * ✅ Get exercises by body part
 */
export const getExercisesByBodyPart = async (bodyPart) => {
  return await fetchFromApi(`/exercises/bodyPart/${bodyPart}`);
};

/**
 * ✅ Get exercises by equipment
 */
export const getExercisesByEquipment = async (equipment) => {
  return await fetchFromApi(`/exercises/equipment/${equipment}`);
};

/**
 * ✅ Get exercise by ID
 */
export const getExerciseById = async (id) => {
  return await fetchFromApi(`/exercises/exercise/${id}`);
};
