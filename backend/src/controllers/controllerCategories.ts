import {Category, ICategory} from "../models/modelCategory";
import {IVideo, Video} from "../models/modelVideos";
import {Folder} from "../models/modelFolders";

//get all Images controller
export async function getCategories(): Promise<ICategory[]> {
    return new Promise<ICategory[]>((resolve, reject) => {
        Category.find({}, (err, categories) => {
            if (err) {
                reject(err)
            } else {
                resolve(categories)
            }
        })
    })
}

export async function getCategory(name: string): Promise<ICategory> {
    return new Promise<ICategory>((resolve, reject) => {
        Category.findOne({name}, (err, category) => {
            if (err) {
                reject(err)
            } else {
                resolve(category || undefined)
            }
        })
    })
}

export async function getCategoryByTag(tag: string): Promise<ICategory> {
    return new Promise<ICategory>((resolve, reject) => {
        Category.findOne({tags: tag}, (err, category) => {
            if (err) {
                reject(err)
            } else {
                resolve(category || undefined)
            }
        })
    })
}


export async function addCategory(name: string, tags: [string]) {
    return new Promise((resolve, reject) => {
        const category = new Category({name, tags})
        category.save().then(resolve).catch(reject)
    })
}

export async function addTagToCategory(name: string, tag: string) {
    return new Promise<ICategory>((resolve, reject) => {
        Category.updateOne(
            {name},
            {$push: {tags: tag}},
            (err, category) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(category)
                }
            }
        );
    })
}

export async function deleteTagByCategoryName(name: string, tag: string) {
    return new Promise((resolve, reject) => {
        Category.updateOne({name}, {$pull: {'tags': tag}}, (err, message) => {
            if (err) {
                reject(err)
            } else {
                resolve(message)
            }
        })
    })
}

export async function getTagIndexInCategory(categoryName: string, tag: string): Promise<String[]> {
    return new Promise<String[]>((resolve, reject) => {
        Category.findOne({name: categoryName, tags: tag}, (err, category) => {
            if (err) {
                reject(err)
            } else {

                resolve(category?.tags || undefined)
            }
        })
    })
}

