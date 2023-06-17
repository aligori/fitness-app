import React from 'react';
import Layout from "../hoc/Layout";
import CategoryCard from "../components/CategoryCard";
import useData from "../hooks/useData";

const Dashboard = () => {
  const categories = useData('/categories');

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-5/6 my-10">
          <div className="text-xl text-gray-700 font-semibold leading-6 mb-4">Categories</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories?.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
