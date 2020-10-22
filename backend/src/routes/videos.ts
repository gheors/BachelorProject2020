import express from 'express'
import {addVideo, getVideo, getVideos} from "../controllers/videos";
import {exec} from "child_process";
import shell from 'shelljs'
import path from "path";
const router = express.Router();

router.get('/', async (req, res) => {
    const videos = await getVideos()
    res.send(videos)
})

router.post('/', async (req, res) => {
    addVideo(req.query.name as string).then((video) => {
        res.status(200).send(video)
    }).catch(() => {
        res.status(501).send()
    })
})


router.get('/:name', async (req, res) => {
    getVideo(req.params.name).then((video) => {
        let name = req.params.name
        let pathScript = '/Users/sergiogheorghita/Desktop/Bachelor_Project_2.0/bachelor_project_app/backend/python/scripts/framing_script.py'
        let inputPath = path.join(__dirname, '../../media/videos', name)
        let outputPath = path.join(__dirname, '../../media/frames', name.split('.')[0])
        let frameRate = parseFloat(req.query.frameRate as string);
        let fullCommand = pathScript+ ' ' + inputPath + ' ' + frameRate + ' ' + outputPath
        shell.exec('python3 ' + fullCommand,{silent:false, async:true}, (code, output,stderr) => {
            console.log(output)

            res.status(200).send( {message: "Fragmentation finished"})
        });

    })
})

export default router