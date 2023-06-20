export const workoutMapper = (workout) => {
  if (workout.length === 0) return {}
  const {title, difficulty, duration, scheduledDay, completion, sets} = workout[0];
  return {
    title,
    difficulty,
    duration,
    scheduledDay,
    completedAt: completion?.dateCompleted,
    sets: sets.map(({exercise, ...rest}) => { return {...rest, ...exercise}})
  }
}