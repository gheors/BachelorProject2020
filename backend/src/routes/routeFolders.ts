import express from "express";
import {
    addFolder,
    deleteFolder,
    getFolderByName,
    getFolders,
} from "../controllers/controllerFolders";
import {Image} from "../models/modelmages";
import {
    addImage,
    deleteImagesByFolderId,
    getImage,
    getImageByFolderId,
    getImagesByFolderId,
} from "../controllers/controllerImages";
import path from "path";
import {
    addVideo,
    updateVideoFragmented,
} from "../controllers/controllerVideos";
import ErrnoException = NodeJS.ErrnoException;

const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
const sizeOf = promisify(require("image-size"));
const multer = require("multer");
const upload = multer();
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();
const fs = require("fs");

router.get("/", async (req, res) => {
    const folders = await getFolders();
    const foldersWithCover = await Promise.all(
        folders.map(async (folder) => {
            const image = await Image.findOne({folderId: folder._id});
            return {
                _id: folder._id,
                name: folder.name,
                videoName: folder.videoName,
                totalImages: folder.totalImages,
                cover: image?.name,
            };
        })
    );
    res.send(foldersWithCover);
});

router.post("/addFolder/:name", upload.array("file", 10), async (req, res) => {
    const folderName = req.params.name;
    const files = req.files as Express.Multer.File[];
    let framesPath = path.join(__dirname, `../../storage/frames`, folderName);

    try {
        fs.mkdirSync(framesPath);
    } catch (error) {
        console.log("Already exist")
    }

    for (let i = 0; i < files.length; i++) {
        const name = files.length <= 1 ? req.body.names : req.body.names[i];
        console.log(name);
        //@ts-ignore
        // if (!extArray.includes(file.detectedFileExtension)) next(new Error("Invalid file type"));
        await pipeline(
            files[i].stream,
            fs.createWriteStream(`${framesPath}/${name}`)
        );
    }
    const images = fs.readdirSync(framesPath);
    const newFolder = await addFolder(folderName, "None", images.length);
    for (const image of images) {
        const {width, height} = await sizeOf(framesPath + "/" + image);
        await addImage(newFolder._id, image, width, height, false, []);
    }

    const image = await getImageByFolderId(newFolder._id);
    const collection = {
        _id: newFolder._id,
        name: newFolder.name,
        videoName: newFolder.videoName,
        cover: image.name,
        totalImages: newFolder.totalImages,
    };
    return res.status(200).send(collection);
});

router.post("/addImagesToFolder/:name", upload.array("file", 10), async (req, res) => {
    const folderName = req.params.name;
    const files = req.files as Express.Multer.File[];
    let framesPath = path.join(__dirname, `../../storage/frames`, folderName);

    const folder = await getFolderByName(folderName)

    for (let i = 0; i < files.length; i++) {
        const name = files.length <= 1 ? req.body.names : req.body.names[i];
        await pipeline(
            files[i].stream,
            fs.createWriteStream(`${framesPath}/${name}`)
        );
        const {width, height} = await sizeOf(framesPath + "/" + req.body.names[i]);
        await addImage(folder._id, req.body.names[i], width, height, false, []);
    }
    // TODO: 
    const images = await getImagesByFolderId(folder._id)

    return res.status(200).send(images);
});

router.delete("/", async (req, res) => {
    const folderName = req.query.name as string;
    const videoName = req.query.videoName as string;
    let framesPath = path.join(__dirname, "../../storage/frames", folderName);
    let folderId = req.query.id;
    const answer = await deleteImagesByFolderId(new ObjectId(folderId));
    console.log(answer)
    await deleteFolderChildrenRecursive(framesPath);
    await deleteFolder(folderName);
    updateVideoFragmented(videoName, false)
        .then((folder) => {
            res.status(200).send(folder);
        })
        .catch(() => {
            res.status(501).send();
        });
});

export const deleteFolderChildrenRecursive = (path: string) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file: string) => {
            const filePath = path + "/" + file;
            console.log(filePath, 'deleted')
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteFolderChildrenRecursive(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
        fs.rmdirSync(path);
    }
};

export default router;
