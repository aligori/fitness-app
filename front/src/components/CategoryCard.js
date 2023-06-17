import React from 'react'
import placeholder from '../assets/images/placeholder.jpg'
import DefaultButton from "../core/buttons/DefaultButton";
import {useNavigate} from "react-router";

const CategoryCard = ({ category = {} }) => {
  const navigate = useNavigate();

  const viewCategory = () => {
    navigate(`/categories/${category.id}`)
  }

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-6 transition duration-400 hover:scale-105 justify-between">
       <div>
         <img src={placeholder} alt="" className="mb-4 rounded-lg object-cover"/>
         <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">{category.name}</h2>
         <p className="mt-1 max-w-2xl text-xs text-gray-500 text-justify">{category.description}</p>
       </div>
      <DefaultButton label="View Plans" className="mt-4" onClick={viewCategory} />
    </div>
  )
}

export default CategoryCard;