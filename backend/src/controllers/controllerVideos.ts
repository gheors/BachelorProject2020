import {IVideo, Video} from "../models/modelVideos";
import {db} from '../server';
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
const {getVideoDurationInSeconds} = require('get-video-duration')
//get all videos controller
export async function getVideos(): Promise<IVideo[]> {
    return new Promise<IVideo[]>((resolve, reject) => {
        Video.find({}, (err, videos) => {
            if (err) {
                reject(err)
            } else {
                resolve(videos)
            }
        })
    })
}

// get single video controller
export async function getVideo(name: string): Promise<IVideo> {
    return new Promise<IVideo>((resolve, reject) => {
        Video.findOne({name}, (err, video) => {
            if (err) {
                reject(err)
            } else {

                resolve(video || undefined)
            }
        })
    })
}


// add new video controller
export async function addVideo(name: string, fragmented: boolean, duration: number) {
    return new Promise((resolve, reject) => {
        const video = new Video({name, fragmented, duration})
        video.save().then(resolve).catch(reject)
    })
}

// add new video controller
export async function deleteVideo(name: string) {
    return new Promise((resolve, reject) => {
        Video.deleteMany({name:name}).then(resolve).catch(reject)
    })
}

export async function updateVideoFragmented(name: string, value: boolean) {
    return new Promise<IVideo>((resolve, reject) => {

        Video.updateOne({name}, {fragmented: value}, (err, video) => {
            if (err) {
                reject(err)
            } else {
                resolve(video || undefined)
            }
        })
    })
}

export async function postVideos (files:Express.Multer.File[],names: string){
    const extArray = [".mov", ".mp4", ".flv", ".avi", ".webm", ".wmv", ".mkv", ".avchd"]

    return  Promise.all(files.map(async (file, i) => {
        const name = files.length > 1 ? names[i] : names;
        //@ts-ignore
        if (!extArray.includes(file.detectedFileExtension)) next(new Error("Invalid file type"));
        // await command in async function wait until the promise pipeline is resolved
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../../storage/videos/${name}`)
        );
        const duration = await getVideoDurationInSeconds(`${__dirname}/../../storage/videos/${name}`)
        let intDuration = Math.ceil(duration)
        return await addVideo(name, false, intDuration)
    }));}