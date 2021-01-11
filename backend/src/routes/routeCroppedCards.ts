import express from 'express'

const multer = require('multer')

const fs = require("fs");
const sizeOf = require('image-size');
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
const {getVideoDurationInSeconds} = require('get-video-duration')
const upload = multer();
import {ImageCropped} from "../models/modelCroppedImage";
import {addImageCropped, getImageCropped, getImagesCropped} from "../controllers/controllerImagesCropped";
import {addVideo, updateVideoFragmented} from "../controllers/controllerVideos";
import path from "path";
import {updateImageUsage} from "../controllers/controllerImages";
import {deleteTagByCategoryName} from "../controllers/controllerCategories";

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


router.post('/addCroppedImage', upload.array('file', 1), async (req, res) => {
    const image = req.files as Express.Multer.File[];
    let framesPath = path.join(__dirname, `../../storage/`, 'croppedImages');
    const tags = JSON.parse(req.body.tags)
    const name = req.body.name
    const folderId = req.body.folderId
    const fullImageName = req.body.fullImageName
    console.log(folderId)
    await pipeline(
        image[0].stream,
        fs.createWriteStream(`${framesPath}/${name}`)
    );

    const {width, height} = await sizeOf(framesPath + "/" + name);

    //@ts-ignore
    try {
        fs.mkdirSync(framesPath);
    } catch (error) {
        console.log("Already exist")
    }
    await updateImageUsage(folderId,fullImageName, true)
    const imageAdded = await addImageCropped(name, tags, width, height)
    res.status(200).send(imageAdded)

})

router.delete("/:name/:tag", async (req, res) => {
    let name = req.params.name
    let tag = '#' + req.params.tag
    const category =  await deleteTagByCategoryName(name, tag)
    console.log(category)
    res.status(200).send(category)
});
export default router


