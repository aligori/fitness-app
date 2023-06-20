export const planMapper = (plan) => {
  if (plan.length === 0) return {}
  const {_id, workouts, createdBy, category, subscription, ...rest} = plan[0];
  return {
    id: _id,
    ...rest,
    subscribeDate: subscription?.subscribeDate,
    influencerName: `${createdBy.firstName} ${createdBy.lastName}`,
    workouts: workouts.map(({_id, ...rest}) => { return { id: _id, ...rest }})
  }
}