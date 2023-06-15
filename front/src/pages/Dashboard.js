import React from 'react';
import Layout from "../hoc/Layout";
import CategoryCard from "../components/CategoryCard";

const Dashboard = () => {

  const categories = [
    {
      "id": 1,
      "name": "Ab Workouts",
      "description": "Workout plans specifically designed to target and strengthen the abdominal muscles."
    },
    {
      "id": 1,
      "name": "Leg Workouts",
      "description": "Workout plans focused on building strength and muscle in the legs."
    },
    {
      "id": 1,
      "name": "Fat Burning Workouts",
      "description": "Workout plans designed to maximize calorie burn and promote fat loss."
    },
    {
      "id": 1,
      "name": "HIIT Workouts",
      "description": "High-intensity interval training (HIIT) workouts that combine short bursts of intense exercise with periods of rest or low-intensity exercise."
    },
    {
      "id": 1,
      "name": "Upper Body Workouts",
      "description": "Workout plans targeting the muscles of the upper body, including the arms, shoulders, chest, and back."
    },
  ];

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-5/6 my-10">
          <div className="text-xl text-gray-700 font-semibold leading-6 mb-4">Categories</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
