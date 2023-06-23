import React, {useState} from 'react'
import CSelectInput from "../core/select/CSelect";

const Report2 = () => {
  const [user, setUser] = useState()

  return <div className="flex flex-col mx-15 my-10">
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium">Most successful plan for Gym Goer</div>
      <div className="flex items-center">
        <span className="text-sm mr-2">User</span>
        <CSelectInput
          selectedOptionState={[user, setUser]}
          options={[{label: '1', value: '1'}]}
          placeholder="Select Category"
          className="w-52"
        />
      </div>
    </div>
    <div className="border rounded-md mt-4">
      <div className="flex border-b text-gray-500 text-sm font-semibold">
        <div className="flex-1 px-3 py-2"> Plan Title </div>
        <div className="flex-1 px-3 py-2"> Username </div>
        <div className="flex-1 px-3 py-2"> Total Calories</div>
      </div>
      <div className="flex border-b last:border-b-0">
        <div className="flex-1 px-3 py-3 hover:bg-gray-50"> Title</div>
        <div className="flex-1 px-3 py-3 hover:bg-gray-50"> Name</div>
        <div className="flex-1 px-3 py-3 hover:bg-gray-50"> Creator</div>
      </div>
    </div>
  </div>
}

export default Report2