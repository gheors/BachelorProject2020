import express from "express"
import videoRoutes from "./routeVideos"
const router = express.Router()

router.use('/api/videos', videoRoutes)

export default router