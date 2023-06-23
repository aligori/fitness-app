import React, {useState} from 'react';
import Tabs from "../core/tabs/Tabs";
import Report1 from "../components/Report1";
import Report2 from "../components/Report2";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('Report 1')

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1">
        <div className="bg-white flex items-center justify-between border-b shadow-lg rounded py-5 px-5 lg:px-20">
          <div className="flex flex-1 items-center">
            <div className="text-2xl mr-5">
              <span className="text-indigo-500">FITNESS</span>
              <span className="text-orange-500 font-semibold">APP</span>
            </div>
          </div>
          <div className="">Logout</div>
        </div>
        <div className="flex justify-center py-16 bg-gray-100">
          <div className="flex flex-col shadow-sm bg-white w-3/4 pt-5 pb-10">
            <Tabs
              options={['Report 1', 'Report 2']}
              selectedOptionState={[activeTab, setActiveTab]}
              className="mx-auto w-1/3 mt-8 bg-white rounded-lg"
            />
            {
              activeTab === 'Report 1' ? <Report1/> : <Report2/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
