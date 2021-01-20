import {IVideo, Video} from "../models/modelVideos";
import {db} from '../server';

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
        Video.deleteMany({name}).then(resolve).catch(reject)
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