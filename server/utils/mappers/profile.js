
export const profileMapper = (gymGoer, friends, following, subscriptions) => {
  return {
    _id: gymGoer.id,
    email: gymGoer.email,
    password: gymGoer.password,
    username: gymGoer.username,
    avatar: gymGoer.avatar,
    gymGoer: {
      weight: gymGoer.weight,
      height: gymGoer.height,
      age: gymGoer.age,
      birthday: gymGoer.birthday,
      membershipType: gymGoer.membership_type
    },
    subscriptions: subscriptions.map(row => {
      return {
        _id: row.id,
        title: row.title,
        duration: row.duration,
        goal: row.goal
      }
    }),
    friends: friends.map(friend => {
      return {
        _id: friend.id,
        username: friend.username
      }
    }),
    following: following.map(influencer => {
      return {
        _id: influencer.id,
        username: influencer.username
      }
    })
  }
}