import React, {useState} from 'react'
import CSelectInput from "../core/select/CSelect";

const Report1 = () => {
  const [category, setCategory] = useState()

  return <div className="flex flex-col mx-15 my-10">
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium">Top 3 most subscribed Plans by Category</div>
      <div className="flex items-center">
        <span className="text-sm mr-2">Category</span>
        <CSelectInput
          selectedOptionState={[category, setCategory]}
          options={[{label: '1', value: '1'}]}
          placeholder="Select Category"
          className="w-52"
        />
      </div>
    </div>
    <div className="border rounded-md mt-4">
      <div className="flex border-b text-gray-500 text-sm font-semibold">
        <div className="flex-1 px-3 py-2"> Plan Title</div>
        <div className="flex-1 px-3 py-2"> Category Name</div>
        <div className="flex-1 px-3 py-2"> Creator</div>
        <div className="flex-1 px-3 py-2"> Number of Subscribers</div>
      </div>
      {
        [1,2,3].map((data) =>
          <div className="flex border-b last:border-b-0 text-gray-800">
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> Title</div>
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> Name</div>
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> Creator</div>
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> 23</div>
          </div>)
      }
    </div>
  </div>
}

export default Report1