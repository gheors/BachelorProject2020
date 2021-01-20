import express from "express"
import videoRoutes from "./routeVideos"
import imageRoutes from "./routeImages"
import croppedCardsRoutes from "./routeCroppedCards"
import categoriesRoutes from "./routeCategory"

import folderRoutes from "./routeFolders"

const router = express.Router()

router.use('/api/videos', videoRoutes)
router.use('/api/folders', folderRoutes)
router.use('/api/images', imageRoutes)
router.use('/api/croppedCards', croppedCardsRoutes)
router.use('/api/categories', categoriesRoutes)

export default router