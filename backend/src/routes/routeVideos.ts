import express from 'express'
import {addVideo, getVideo, getVideos, deleteVideo} from "../controllers/controllerVideos";
import shell from 'shelljs'
import path from "path";
import {unlinkSync} from "fs";
const router = express.Router();
const multer = require('multer')

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();
// add single video
router.post('/',upload.single('file'), async (req, res) => {
    const extArray = [".mov", ".mp4",".flv", ".avi",".webm", ".wmv",".mkv", ".avchd"]
    const file = req.file;
    const name = req.body.name;
    // check video types
    //  @ts-ignore
    if (!extArray.includes(file.detectedFileExtension)) next(new Error("Invalid file type"));

    await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../../storage/videos/${name}`)
    );
    // add video to database
    addVideo(name,false).then((video) => {
        res.status(200).send(video)
    }).catch(() => {
        res.status(501).send();
    })
})

router.get('/', async (req, res) => {
    const videos = await getVideos()
    res.send(videos)
})

router.delete('/', async (req,res)=>{
    console.log("in")
    const name = req.query.name as string

    deleteVideo(name).then((video) => {
        fs.unlinkSync(`${__dirname}/../../storage/videos/${name}`)
        res.status(200).send(video)
    }).catch(() => {
        res.status(501).send();
    })

})



// run fragmentation on given video
router.get('/:name', async (req, res) => {

    getVideo(req.params.name).then((video) => {
        let name = req.params.name
        let pathScript = path.join(__dirname,'../../scripts','framing_script.py')
        let inputPath = path.join(__dirname, '../../storage/videos', name)
        let outputPath = path.join(__dirname, '../../storage/frames', name.split('.')[0])
        let frameRate = parseFloat(req.query.frameRate as string);
        frameRate = 1/frameRate;
        let fullCommand = pathScript+ ' ' + inputPath + ' ' + frameRate + ' ' + outputPath
        shell.exec('python3 ' + fullCommand,{silent:false, async:true}, (code, output,stderr) => {
            console.log(output)

            res.status(200).send( {message: "Fragmentation finished"})
        });

    })
})

export default router

