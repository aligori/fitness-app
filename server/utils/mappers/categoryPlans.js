export const categoryPlansMapper = (results = []) => {
  if (!results.length) return []
  const { category_id, name } = results[0]
  return {
    id: category_id,
    name,
    plans: results.map((row) => {
      return {
        id: row.plan_id,
        title: row.title,
        description: row.description,
        duration: row.duration,
        createdAt: row.created_at,
        goal: row.goal
      }
    })
  }
}