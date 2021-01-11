import express from 'express'

import {ImageCropped} from "../models/modelCroppedImage";
import {getImageCropped, getImagesCropped} from "../controllers/controllerImagesCropped";

const router = express.Router();

router.get('/', async (req, res) => {
    const imagesCropped = await getImagesCropped()
    res.send(imagesCropped)
})

router.get('/:name', async (req, res) => {
    let name = req.params.name
    const imageCropped = await getImageCropped(name)
    res.send(imageCropped)
})


router.post('/', async (req, res) => {

})
export default router


