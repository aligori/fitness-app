import React, {useState} from 'react';
import Layout from "../hoc/Layout";
import animation from "../assets/animations/workout.json";
import Lottie from "../core/Lottie";
import WorkoutCard from "../components/WorkoutCard";
import DefaultButton from "../core/buttons/DefaultButton";
import {useNavigate, useParams} from "react-router";
import useData from "../hooks/useData";
import {API} from "../utils/plugins/API";
import {showError, showSuccess} from "../utils/helpers";


const PlanPage = () => {
  const [subscribed, setSubscribed] = useState(0);

  const navigate = useNavigate()
  const { id } = useParams();
  const plan = useData(`/plans/${id}`, [subscribed]);

  const subscribe = async () => {
    try {
      const response = await API.post(`/plans/${id}/subscribe`);
      showSuccess(response.message)
      setSubscribed(prev => prev+1)
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <Layout>
      <div className="flex items-center px-40 py-8 bg-gradient-to-r from-blue-100 shadow-inner">
        <div className="flex flex-1 flex-col">
          <span className="font-semibold text-3xl uppercase tracking-tight text-gray-900">{plan?.title}</span>
          <span className="uppercase text-lg text-gray-500 mt-1 tracking-tight">Workout Plan</span>
          {plan?.subscribeDate
            ? <span className="mt-4 text-center bg-emerald-100 text-emerald-400 px-2 py-1 rounded-lg w-32 font-semibold border border-emerald-400">
                Subscribed
              </span>
            : <DefaultButton label="Subscribe" onClick={subscribe} className="w-32 mt-4" xs />
          }
        </div>
        <div>
          <Lottie itemKey="loadingItem" animationData={animation} width={250} />
        </div>
      </div>
      <div className="flex items-center border-t border-b px-40 py-6 uppercase tracking-tight font-medium">
        <div className="pr-4 border-r border-r-[2px] border-r-gray-400 text-indigo-500">
          Program Overview
        </div>
        <div className="px-4 cursor-pointer hover:text-indigo-500 transition duration-500" onClick={() => navigate(`/plan/${plan?.id}/workouts/${plan?.workouts[0]}`)}>
          Get Started
        </div>
      </div>
      <div className="px-40 pb-20">
        <div className="my-10">{plan?.description}</div>
        <div>
          <span className="font-semibold text-lg uppercase">Workouts</span>
          {
            plan && (
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-x-4">
                <div className="bg-gray-200 col-span-full mt-5 mb-2 rounded-sm py-1 text-center font-semibold">Week 1</div>
                {plan.workouts?.length && plan.workouts.map((workout, index) => {
                  const lastIndex = plan.workouts?.length - 1

                  return (
                    <>
                      <WorkoutCard
                        planId={plan?.id}
                        planTitle={plan?.title}
                        isSubscribed={plan?.subscribeDate}
                        key={index}
                        workout={workout}
                      />
                      {(index + 1) % 7 === 0 && index !== lastIndex && (
                        <div className="bg-gray-200 col-span-full mt-5 mb-2 rounded-sm py-1 text-center font-semibold">Week {Math.floor((index + 2) / 7) + 1}</div>
                      )}
                    </>
                  )
                })}
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default PlanPage
