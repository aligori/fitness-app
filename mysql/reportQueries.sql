select plan.title, sum(calories) as total_calories
    from completes join workout on completes.workout_id = workout.id
    join plan on workout.plan_id = plan.id
    where completes.goer_id = 1244323942308
        and completes.date in --date range
    group by plan.id
    order by total_calories desc
    limit 1;

select plan.title, count(goer_id) as total_subscribers
    from subscription join plan on subscription.plan_id = plan.id
    join category on plan.category_id = category.id
    where category = "leg days"
        and subscription.date in --date range
    group by plan.id
    order by total_subscribers desc
    limit 1;