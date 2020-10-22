import {IVideo, Video} from "../models/videos";
import {rejects} from "assert";

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
export async function getVideo(name:string): Promise<IVideo>{
    return new Promise<IVideo>((resolve, reject) =>{
        Video.findOne({name},(err,video)=>{
            if(err){
                reject(err)
            }else{
                resolve(video||undefined)
            }
        })
    })
}


// add new video controller
export async function addVideo(name: string) {
    return new Promise((resolve, reject) => {
        const video = new Video({name})
        video.save().then(resolve).catch(reject)
    })
}