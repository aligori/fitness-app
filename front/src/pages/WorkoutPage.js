import React, {useState} from 'react';
import Layout from "../hoc/Layout";
import animation from "../assets/animations/workout.json";
import Lottie from "../core/Lottie";
import DefaultButton from "../core/buttons/DefaultButton";
import SetCard from "../components/SetCard";
import {useLocation, useParams} from "react-router";
import useData from "../hooks/useData";
import {API} from "../utils/plugins/API";
import {showError, showSuccess} from "../utils/helpers";
import moment from "moment";

const WorkoutPage = ({}) => {
  const [completed, setCompleted] = useState(0);

  const { workoutId } = useParams();
  const workout = useData(`/workouts/${workoutId}`, [completed]);

  const location = useLocation();

  const complete = async () => {
    try {
      const response = await API.post(`/workouts/${workoutId}/complete`);
      showSuccess(response.message)
      setCompleted(prev => prev+1)
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <Layout>
      <div className="flex items-center px-40 py-8 bg-gradient-to-r from-blue-100 shadow-inner">
        <div className="flex flex-1 flex-col">
          <span className="font-semibold text-4xl uppercase tracking-tight text-orange-500">Day {workout?.scheduledDay}</span>
          <span className="font-semibold text-2xl uppercase tracking-tight text-gray-900">{workout?.title || 'This is the name of the workout'}</span>
          <span className="uppercase text-lg text-gray-500 mt-1 tracking-tight">Plan: {location.state?.planTitle || 'Workout Plan'}</span>
          {location.state?.isSubscribed && (
            <>
            {
              workout?.completedAt
                ?
                <span className="mt-4 text-center bg-emerald-100 text-emerald-400 px-2 py-1 rounded-lg w-32 font-medium text-sm border border-emerald-400">
                  Completed on {moment(workout.completedAt).format('DD/MM/YYYY')}
                </span>
                : <DefaultButton onClick={complete} label="Complete workout" className="w-52 mt-4" xs />
            }
            </>
          )
          }
        </div>
        <div>
          <Lottie itemKey="loadingItem" animationData={animation} width={250} />
        </div>
      </div>
      <div className="flex items-center border-t border-b px-40 py-6 uppercase tracking-tight font-medium">
        <div className="pr-4 border-r border-r-[2px] border-r-gray-400">
          Program Overview
        </div>
        <div className="px-4 border-r border-r-[2px] border-r-gray-400">
          Previous Workout
        </div>
        <div className="px-4">
          Next Workout
        </div>
      </div>
      <div className="px-40 pb-20 pt-10">
          <div className="grid grid-cols-1 gap-y-4">
            {workout?.sets && workout.sets.length && workout.sets.map((set, index) => (
              <SetCard key={index} set={set} />
            ))}
          </div>
      </div>
    </Layout>
  )
}

export default WorkoutPage
