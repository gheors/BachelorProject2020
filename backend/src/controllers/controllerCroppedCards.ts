import * as mongoose from "mongoose";
import {IImageCropped, ImageCropped} from "../models/modelCroppedImage";
import {Category} from "../models/modelCategory";

//get all Images controller
export async function getCroppedCards(): Promise<IImageCropped[]> {
    return new Promise<IImageCropped[]>((resolve, reject) => {
        ImageCropped.find({}, (err, croppedCards) => {
            if (err) {
                reject(err)
            } else {
                resolve(croppedCards)
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


export async function addImageCropped(name: string, tags: string, width: number, height: number) {
    return new Promise((resolve, reject) => {
        const newImage = new ImageCropped({name, tags, width, height})
        newImage.save().then(resolve).catch(reject)
    })
}

export async function deleteTagByCategoryName(name: string, tag: string) {
    return new Promise((resolve, reject) => {
        ImageCropped.updateOne({name}, {$pull: {'tags': tag}}, (err, message) => {
            if (err) {
                reject(err)
            } else {
                resolve(message)
            }
        })
    })
}

