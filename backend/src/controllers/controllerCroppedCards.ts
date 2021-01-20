import * as mongoose from "mongoose";
import {IImageCropped, ImageCropped} from "../models/modelCroppedImage";
import {Category} from "../models/modelCategory";
import {Video} from "../models/modelVideos";

//get all Images controller
export async function getCroppedCards(): Promise<IImageCropped[]> {
    return new Promise<IImageCropped[]>((resolve, reject) => {
        ImageCropped.find({}, (err, croppedCards) => {
            if (err) {
                reject(err)
            } else {
                resolve(croppedCards || [])
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

export async function getImagesCroppedByFullImageId(fullImageId: mongoose.Types.ObjectId): Promise<IImageCropped[]> {
    return new Promise<IImageCropped[]>((resolve, reject) => {
        ImageCropped.find({fullImageId}, (err, images) => {
            if (err) {
                reject(err)
            } else {
                resolve(images || [])
            }
        })
    })
}


export async function addImageCropped(name: string, tags: string, coordinates: number, fullImageId: mongoose.Types.ObjectId) {
    return new Promise((resolve, reject) => {
        const newImage = new ImageCropped({name, tags, coordinates, fullImageId})
        newImage.save().then(resolve).catch(reject)
    })
}

export async function deleteCardTagByCardName(name: string, tag: string) {
    console.log(name, tag)
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

export async function deleteCroppedCard(name: string) {
    return new Promise((resolve, reject) => {
        ImageCropped.deleteMany({name}).then(resolve).catch(reject)
    })
}
