import {IImage, Image} from "../models/modelmages";
import {IFolder, Folder} from "../models/modelFolders";

//get all Images controller
export async function getFolders(): Promise<IFolder[]> {
    return new Promise<IFolder[]>((resolve, reject) => {
        Folder.find({}, (err, folders) => {
            if (err) {
                reject(err)
            } else {
                resolve(folders)
            }
        })
    })
}

// get single video controller
export async function getFolderByName(name: string): Promise<IFolder> {
    return new Promise<IFolder>((resolve, reject) => {
        Folder.findOne({name}, (err, folder) => {
            if (err) {
                reject(err)
            } else {
                resolve(folder || undefined)
            }
        })
    })
}

// get single video controller
export async function getFolderById(folderId: string): Promise<IFolder> {
    return new Promise<IFolder>((resolve, reject) => {
        Folder.findOne({_id: folderId}, (err, folder) => {
            if (err) {
                reject(err)
            } else {
                resolve(folder || undefined)
            }
        })
    })
}




// add new video controller
export async function addFolder(name: string, videoName: string,totalImages:number): Promise<IFolder> {
    return new Promise((resolve, reject) => {
        const folder = new Folder({name, videoName,totalImages})
        folder.save().then(resolve).catch(reject)
    })
}

export async function deleteFolder(name: string) {
    return new Promise((resolve, reject) => {
        Folder.deleteMany({name}).then(resolve).catch(reject)
    })
}
