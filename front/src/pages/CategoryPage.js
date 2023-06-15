import React, {useEffect, useState} from 'react';
import Layout from "../hoc/Layout";
import PlanCard from "../components/PlanCard";

const CategoryPage = () => {
  const [category, setCategory] = useState({});
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // get category
  }, []);

  const workoutPlans = [
    { title: 'Workout Plan 1', description: 'Description...', goal: 'Lose weight', duration: 30, createdAt: '2023-06-15', categoryId: 1, influencerName: 'John Doe' },
    { title: 'Workout Plan 2', description: 'Description...', goal: 'Gain muscle', duration: 45, createdAt: '2023-06-20', categoryId: 2, influencerName: 'John Doe' },
    { title: 'Workout Plan 3', description: 'Description...', goal: 'Increase stamina', duration: 60, createdAt: '2023-07-01', categoryId: 3, influencerName: 'John Doe' },
    { title: 'Workout Plan 3', description: 'Description...', goal: 'Increase stamina', duration: 60, createdAt: '2023-07-01', categoryId: 3, influencerName: 'John Doe' },
    { title: 'Workout Plan 3', description: 'Description...', goal: 'Increase stamina', duration: 60, createdAt: '2023-07-01', categoryId: 3, influencerName: 'John Doe' },
    // Add more workout plans as needed
  ];

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-5/6 my-10">
          <div className="text-xl text-gray-700 font-semibold leading-6 mb-2">{category.name || 'Category'}</div>
          <div className="text-gray-600 mb-8">This is some random description for the category ...</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workoutPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage
