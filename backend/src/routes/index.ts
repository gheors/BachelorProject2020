import express from "express"
import videoRautes from "./videos"
const router = express.Router()

router.use('/api/videos', videoRautes)

export default router