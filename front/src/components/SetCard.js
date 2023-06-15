import React from 'react'
import {useNavigate} from "react-router";

const WorkoutCard = ({ planId, workout, index }) => {
  const difficulty = 'easy'

  const navigate = useNavigate();

  const viewWorkout = () => {
    navigate(`/plan/${planId}/workout/${workout.id}`)
  }

  return (
    <div onClick={viewWorkout} className="hover:scale-105 flex flex-col cursor-pointer items-center justify-center px-5 py-5 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
        <span className="text-sm font-semibold uppercase text-gray-500 mb-2">Day {index}</span>
        <h2 className="font-semibold mb-2">Workout title</h2>
        <span className="flex items-center px-2 rounded-full font-medium text-gray-700 text-xs">
          <i className="fa-regular fa-clock mr-1"/>40 minutes
        </span>
      <span className={`mt-2 py-1 px-2 rounded-full text-xs font-medium uppercase border ${difficulty === 'easy' ? 'border-emerald-400 text-emerald-400 bg-emerald-50' : difficulty === 'medium' ? 'border-yellow-400 text-yellow-500 bg-yellow-50' : 'border-red-400 text-red-400 bg-red-50'}`}>{difficulty}</span>
    </div>
  )
}

export default WorkoutCard