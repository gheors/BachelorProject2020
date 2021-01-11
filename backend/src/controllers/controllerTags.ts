import * as mongoose from "mongoose";
import {IImageCropped, ImageCropped} from "../models/modelCroppedImage";

//get all Images controller
export async function getImagesCropped(): Promise<IImageCropped[]> {
    return new Promise<IImageCropped[]>((resolve, reject) => {
        ImageCropped.find({}, (err, imagesCropped) => {
            if (err) {
                reject(err)
            } else {
                resolve(imagesCropped)
            }
        })
    })
}

export async function getImageCropped(name: string): Promise<IImageCropped> {
    return new Promise<IImageCropped>((resolve, reject) => {
        ImageCropped.findOne({name}, (err, imageCropped) => {
            if (err) {
                reject(err)
            } else {
                resolve(imageCropped || undefined)
            }
        })
    })
}

export async function getImageCroppedByFolderId(tag: string): Promise<IImageCropped> {
    return new Promise<IImageCropped>((resolve, reject) => {
        ImageCropped.findOne({tags: [tag]}, (err, image) => {
            if (err) {
                reject(err)
            } else {
                resolve(image || undefined)
            }
        })
    })
}


export async function addImageCropped(folderId: mongoose.Types.ObjectId, name: string, tags: string, width: number, height: number) {
    return new Promise((resolve, reject) => {
        const newImage = new ImageCropped({name, tags, width, height})
        newImage.save().then(resolve).catch(reject)
    })
}

