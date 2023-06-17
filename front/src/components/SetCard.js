import React, {useState} from 'react'

const SetCard = ({ set }) => {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="cursor-pointer items-center justify-center px-5 py-5 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div className="flex items-center">
        <div className="flex-1">
          <span className="font-semibold uppercase text-indigo-500 mb-2">Exercise {set?.setNo}</span>
          <h2 className="font-semibold mb-2">{set?.exerciseName || 'Set Name'}</h2>
          <span className="flex items-center rounded-full text-gray-700 text-sm">
          <i className="fa-solid fa-dumbbell mr-1"/> Equipment: {set?.equipment}
        </span>
        </div>
        <div className="flex">
          <div className="flex flex-col mx-4">
            <span className="text-2xl">{set?.reps}</span>
            <span className="uppercase text-gray-500 text-sm">Reps</span>
          </div>
          <div className="flex flex-col mx-4">
            <span className="text-2xl">{set?.breakTime}</span>
            <span className="uppercase text-gray-500 text-sm">Rest</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm">
        View Details
      </div>
    </div>
  )
}

export default SetCard