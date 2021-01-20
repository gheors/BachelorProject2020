import express from 'express'

import {Image} from "../models/modelmages";
import {
    deleteSelectedImageByImageId, getImageByImageId,
    getImagesByFolderId
} from "../controllers/controllerImages";
import {deleteFolder, getFolderById} from "../controllers/controllerFolders";
import path from "path";
import {updateVideoFragmented} from "../controllers/controllerVideos";

const fs = require("fs");

const router = express.Router();

router.get('/folder/:folderId', async (req, res) => {
    const folderId = req.params.folderId
    const images = await Image.find({folderId})
    res.send(images)
})

router.get('/folder/:name', async (req, res) => {
    const name = req.params.name
    const images = await Image.find({name})
    res.send(images)
})

router.post('/folder/:folderId', async (req, res) => {
    const folderId = req.params.folderId
    const _ids = req.body
    const folder = await getFolderById(folderId)
    let framesPath = path.join(__dirname, "../../storage/frames", folder.name);

    for (let id of _ids) {
        const image = await getImageByImageId(id)
        await deleteSelectedImageByImageId(id)
        await fs.unlinkSync(framesPath + '/' + image.name);
    }
    const images = await getImagesByFolderId(folderId)
    if (images.length === 0) {
        await deleteFolder(folder.name)
        await updateVideoFragmented(folder.videoName, false)
        fs.rmdirSync(framesPath);
    }
    res.send(images)

})

export default router
