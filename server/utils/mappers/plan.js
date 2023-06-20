import moment from "moment";

export const planMapper = (results = []) => {
  if (!results.length) return {}
  const { plan_id, plan_title, description, image, goal ,plan_duration, created_at, subscribe_date, influencer_name } = results[0]
  return {
    id: plan_id,
    title: plan_title,
    description,
    image,
    goal,
    duration: plan_duration,
    createdAt: moment(created_at),
    subscribeDate: moment(subscribe_date),
    influencerName: influencer_name,
    workouts: results.map((row) => {
      return {
        id: row.workout_id,
        title: row.workout_title,
        difficulty: row.difficulty,
        duration: row.workout_duration,
        scheduledDay: row.scheduled_day,
      }
    })
  }
}