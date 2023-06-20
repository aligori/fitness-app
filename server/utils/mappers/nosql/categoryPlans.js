export const categoryPlansMapper = (results = []) => {
  if (!results.length) return []
  const { category } = results[0]
  return {
    id: category._id,
    name: category.name,
    plans: results.map((plan) => {
      return {
        id: plan._id,
        title: plan.title,
        duration: plan.duration,
        createdAt: plan.created_at,
        goal: plan.goal
      }
    })
  }
}