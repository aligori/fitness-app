import React from 'react';
import Layout from "../hoc/Layout";
import PlanCard from "../components/PlanCard";
import useData from "../hooks/useData";
import {useParams} from "react-router";

const CategoryPage = () => {
  const { id } = useParams();
  const category = useData(`/categories/${id}`);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-5/6 my-10">
          <div className="text-xl text-gray-700 font-semibold leading-6 mb-2">{category?.name}</div>
          {/*<div className="text-gray-600 mb-8">{category?.description}</div>*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {category?.plans && category.plans.length && category.plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage
