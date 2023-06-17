import React from 'react'
import {useNavigate} from "react-router";

const WorkoutCard = ({ planId, planTitle, isSubscribed, workout }) => {
  const {id: workoutId, difficulty, scheduledDay, title, duration } = workout

  const navigate = useNavigate();

  const viewWorkout = () => {
    navigate(`/plans/${planId}/workouts/${workoutId}`, {state: { planTitle, isSubscribed }})
  }

  return (
    <div onClick={viewWorkout} className="transition duration-500 hover:scale-105 flex flex-col cursor-pointer items-center justify-center px-5 py-5 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
        <div className="flex-1 flex-col">
          <span className="flex justify-center text-center text-sm font-semibold uppercase text-gray-500 mb-2">Day {scheduledDay}</span>
          <div className="flex justify-center">
            <span className={`my-2 py-1 px-2 rounded-full text-xs font-medium uppercase border ${
              difficulty === 'easy' ? 'border-emerald-400 text-emerald-400 bg-emerald-50'
                : difficulty === 'medium' ? 'border-yellow-400 text-yellow-500 bg-yellow-50'
                : 'border-red-400 text-red-400 bg-red-50'}`
            }>
            {difficulty}
          </span>
          </div>
          <h2 className="font-semibold mb-2 text-center">{title}</h2>
        </div>
        <span className="flex items-center px-2 rounded-full font-medium text-gray-700 text-xs">
          <i className="fa-regular fa-clock mr-1"/>{duration} minutes
        </span>
    </div>
  )
}

export default WorkoutCard