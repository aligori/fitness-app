import React, {useEffect, useState} from 'react'
import CSelectInput from "../core/select/CSelect";
import useData from "../hooks/useData";
import {API} from "../utils/plugins/API";

const Report2 = () => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const report = useData(`/users/${user?.value}/report`, [user])

  useEffect(() => {
      let ignore = false;
      API.get('/users', { type: 'goer' })
        .then(response => {
          if (!ignore) {
            const userOptions = response.data.map((u) => { return { label: u.username, value: u.id }})
            setUsers(userOptions);
            setUser(userOptions[0]);
          }
        });
      return () => {
        ignore = true;
      };
  }, []);

  return <div className="flex flex-col mx-15 my-10">
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium">Most successful plan for Gym Goer</div>
      <div className="flex items-center">
        <span className="text-sm mr-2">User</span>
        <CSelectInput
          selectedOptionState={[user, setUser]}
          options={users}
          placeholder="Select Category"
          className="w-52"
        />
      </div>
    </div>
    {
      !user && (
        <div className="flex justify-center">
          <div className="mr-1 mt-10">
            <div
              style={{ borderTopColor: 'transparent' }}
              className="w-18 h-18 border-2 border-indigo-200 border-dotted rounded-full animate-spin"
            />
          </div>
        </div>
      )
    }
    {
      user && (
        <div className="border rounded-md mt-4">
          <div className="flex border-b text-gray-500 text-sm font-semibold">
            <div className="flex-1 px-3 py-2"> Plan Title </div>
            <div className="flex-1 px-3 py-2"> Username </div>
            <div className="flex-1 px-3 py-2"> Total Calories</div>
          </div>
          <div className="flex border-b last:border-b-0">
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> {report?.title}</div>
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> {report?.username}</div>
            <div className="flex-1 px-3 py-3 hover:bg-gray-50"> {report?.total_calories}</div>
          </div>
        </div>
      )
    }
  </div>
}

export default Report2