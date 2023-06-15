import React from 'react'
import DefaultButton from "../core/buttons/DefaultButton";
import {useNavigate} from "react-router";
import placeholder from "../assets/images/placeholder.jpg";

const PlanCard = ({ plan = {} }) => {
  const navigate = useNavigate();

  const viewPlan = () => {
    navigate(`/plans/${plan.id}`)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg transition duration-400 hover:scale-105 group">
      <img src={placeholder} alt="" className="rounded-t-lg object-cover h-40 w-full"/>
      <div className="p-6">
        <h2 className="group-hover:text-indigo-500 transition duration-500 text-lg leading-6 font-bold text-gray-900 text-center">{plan.title}</h2>
        <div className="text-orange-500 uppercase text-xs text-center font-medium mb-3">Workout Plan</div>
        <div className="flex items-center justify-center text-gray-400 text-sm">
          <i className="fa-solid fa-calendar-days mr-1" aria-hidden="true"/>
          {plan.duration} days
        </div>
        <div className="flex items-center justify-center text-gray-400 text-sm">
          <i className="fa-solid fa-trophy mr-1" aria-hidden="true" />
          {plan.goal}
        </div>
        <div className="flex items-center justify-center text-gray-700 text-sm mt-1">
          By <span className="font-medium ml-1">{plan.influencerName}</span>
        </div>
        <DefaultButton label="View Plan" onClick={viewPlan} className="mt-3" />
      </div>
    </div>
  )
}

export default PlanCard;