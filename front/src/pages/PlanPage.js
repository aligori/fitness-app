import React, {useEffect, useState} from 'react';
import Layout from "../hoc/Layout";
import animation from "../assets/animations/workout.json";
import Lottie from "../core/Lottie";
import WorkoutCard from "../components/WorkoutCard";
import DefaultButton from "../core/buttons/DefaultButton";
import {useNavigate} from "react-router";


const PlanPage = () => {
  const navigate = useNavigate()
  const [plan, setPlan] = useState({});

  useEffect(() => {
    // get plan
  }, []);

  const workouts = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]

  return (
    <Layout>
      <div className="flex items-center px-40 py-8 bg-gradient-to-r from-blue-100 shadow-inner">
        <div className="flex flex-1 flex-col">
          <span className="font-semibold text-3xl uppercase tracking-tight text-gray-900">Workout Plan Title</span>
          <span className="uppercase text-lg text-gray-500 mt-1 tracking-tight">Workout Plan</span>
          <DefaultButton label="Subscribe" className="w-32 mt-4" xs />
        </div>
        <div>
          <Lottie itemKey="loadingItem" animationData={animation} width={250} />
        </div>
      </div>
      <div className="flex items-center border-t border-b px-40 py-6 uppercase tracking-tight font-medium">
        <div className="pr-4 border-r border-r-[2px] border-r-gray-400 text-indigo-500">
          Program Overview
        </div>
        <div className="px-4 cursor-pointer hover:text-indigo-500 transition duration-500" onClick={() => navigate(`/plan/{planId}/workouts/1`)}>
          Get Started
        </div>
      </div>
      <div className="px-40 pb-20">
        <div className="my-10">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </div>
        <div>
          <span className="font-semibold text-lg uppercase">Workouts</span>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-x-4">
            {workouts.map((plan, index) => (
              <>
                {(index) % 7 === 0 && index !== workouts.length - 1 && (
                  <div className="bg-gray-200 col-span-full mt-5 mb-2 rounded-sm py-1 text-center font-semibold">Week {Math.ceil((index + 1) / 7)}</div>
                )}
                <WorkoutCard index={index + 1} />
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PlanPage
