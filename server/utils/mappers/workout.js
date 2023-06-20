export const workoutMapper = (results = []) => {
  if (!results.length) return []
  const { plan_id, title, difficulty, duration, scheduled_day, completed_date } = results[0]
  return {
    id: plan_id,
    title: title,
    difficulty,
    duration,
    scheduledDay: scheduled_day,
    completedAt: completed_date,
    sets: results.map((row) => {
      return {
        setNo: row.set_no,
        description: row.exercise_desc,
        reps: row.reps,
        breakTime: row.break_time,
        calories: row.calories,
        exerciseName: row.exercise_name,
        equipment: row.equipment,
        muscleGroups: row.muscle_groups,
        image: row.exercise_image
      }
    })
  }
}