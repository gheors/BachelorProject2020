import express from 'express'
import {
    addVideo,
    getVideo,
    getVideos,
    deleteVideo,
    updateVideoFragmented,
    postVideos
} from "../controllers/controllerVideos";
import {addImage, getImage} from "../controllers/controllerImages";
import {addFolder, deleteFolder, getFolderByName} from "../controllers/controllerFolders";
import {deleteFolderChildrenRecursive} from './routeFolders'
import shell from 'shelljs'
import path from "path";
import {Image} from "../models/modelmages";

const router = express.Router();
const multer = require('multer')

const fs = require("fs");
const sizeOf = require('image-size');
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
const {getVideoDurationInSeconds} = require('get-video-duration')
const upload = multer();


// add single video
router.post('/', upload.array('file', 10), async (req, res) => {
    const files = req.files as Express.Multer.File[];
    const videos = await postVideos(files,req.body.names)
    res.status(200).send(videos)
})






router.get('/', async (req, res) => {
    const videos = await getVideos()
    res.send(videos)
})









router.delete('/', async (req, res) => {
    const name = req.query.name as string
    let videoPath = path.join(__dirname, '../../storage/videos', name)
    let framesPath = path.join(__dirname, '../../storage/frames', name.split('.')[0])

    // deleteFolderChildrenRecursive(framesPath);
    // await deleteFolder(name.split('.')[0])

    deleteVideo(name).then((video) => {
        res.status(200).send(video)
        fs.unlinkSync(videoPath);
    }).catch(() => {
        res.status(501).send();
    })
})


// run fragmentation on given video
router.get('/:name', async (req, res) => {
    const videoName = req.params.name
    let outputPath = path.join(__dirname, '../../storage/frames', videoName.split('.')[0])
    let frameRate = parseFloat(req.query.frameRate as string);
    frameRate = 1 / frameRate;
    let pathScript = path.join(__dirname, '../../scripts', 'framing_script.py')
    let inputPath = path.join(__dirname, '../../storage/videos', videoName)
    let fullCommand = pathScript + ' ' + inputPath + ' ' + frameRate + ' ' + outputPath
    shell.exec('python3 ' + fullCommand, {silent: false, async: true}, async (code, output, stderr) => {

        const folderName = videoName.split('.')[0]
        const images = fs.readdirSync(outputPath);
        const folder = await addFolder(folderName, videoName, images.length);
        images.forEach((image: string) => {
            const {width, height} = sizeOf(outputPath + '/' + image);

            addImage(folder._id, image, width, height, false, []);
        })
        await updateVideoFragmented(videoName, true)
        const collection = await getFolderByName(folderName)
        const image = await Image.findOne({folderId: collection._id});
        const collectionCover = {
            _id: collection._id,
            name: collection.name,
            videoName: collection.videoName,
            totalImages: collection.totalImages,
            cover: image?.name,
        };
        console.log(collection)
        res.status(200).send(collectionCover)
    });
})

export default router;
