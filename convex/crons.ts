import { cronJobs } from "convex/server";
import { internal } from './_generated/api'

const crons = cronJobs()

crons.interval(
    'clear old rooms',
    {minutes: 5},
    internal.plans.clearOldRooms
)

export default crons