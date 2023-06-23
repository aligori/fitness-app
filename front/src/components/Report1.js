import React, {useEffect, useState} from 'react'
import CSelectInput from "../core/select/CSelect";
import useData from "../hooks/useData";
import {API} from "../utils/plugins/API";

const Report1 = () => {
  const [category, setCategory] = useState()
  const [categories, setCategories] = useState([])
  const report = useData(`/categories/${category?.value}/report`, [category])

  useEffect(() => {
    let ignore = false;
    API.get('/categories')
      .then(response => {
        if (!ignore) {
          console.log('response.data', response.data)
          const categoryOptions = response.data?.map((c) => { return { label: c.name, value: c.id }});
          console.log(categoryOptions, 'categoryOptions')
          setCategories(categoryOptions)
          setCategory(categoryOptions[0])
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  return <div className="flex flex-col mx-15 my-10">
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium">Top 3 most subscribed Plans by Category</div>
      <div className="flex items-center">
        <span className="text-sm mr-2">Category</span>
        <CSelectInput
          selectedOptionState={[category, setCategory]}
          options={categories}
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
      { category &&
          report?.map((row) =>
            <div className="flex border-b last:border-b-0 text-gray-800">
              <div className="flex-1 px-3 py-3 hover:bg-gray-50"> {row?.planTitle}</div>
              <div className="flex-1 px-3 py-3 hover:bg-gray-50"> {row?.categoryName}</div>
              <div className="flex-1 px-3 py-3 hover:bg-gray-50">  {row?.firstName} {report?.lastName}</div>
              <div className="flex-1 px-3 py-3 hover:bg-gray-50">  {row?.firstName} {report?.lastName}</div>
            </div>)
      }
    </div>
  </div>
}

export default Report1