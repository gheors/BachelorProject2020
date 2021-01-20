import express from "express";

const multer = require("multer");

const fs = require("fs");
const exec = require('child_process').exec;
const sharp = require('sharp')
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();
import {
    addImageCropped,
    getImageCropped,
    getCroppedCards,
    deleteCardTagByCardName,
    deleteCroppedCard,
    getImagesCroppedByFullImageId,
} from "../controllers/controllerCroppedCards";
import path from "path";
import {
    getImageByImageId,
    updateImageDataSetPath,
    updateImageUsage,
} from "../controllers/controllerImages";
import {getCategoryByTag, getTagIndexInCategory} from "../controllers/controllerCategories";
import {getFolderById} from "../controllers/controllerFolders";
import ErrnoException = NodeJS.ErrnoException;
import {ExecException} from "child_process";

const ObjectId = require("mongodb").ObjectID;
const resizeImg = require('resize-img');
const router = express.Router();

let cardsPath = path.join(__dirname, `../../storage/`, "croppedImages");

router.get("/", async (req, res) => {
    try {
        fs.mkdirSync(cardsPath);
    } catch (error) {
        console.log("Already exist");
    }
    const croppedCards = await getCroppedCards();
    res.send(croppedCards);
});

router.get("/:fullImageId", async (req, res) => {
    let fullImageId = req.params.fullImageId;
    const croppedImages = await getImagesCroppedByFullImageId(
        ObjectId(fullImageId)
    );
    res.send(croppedImages);
});

router.get("/:name", async (req, res) => {
    let name = req.params.name;
    const imageCropped = await getImageCropped(name);
    res.send(imageCropped);
});

router.post("/addCroppedImage", upload.array("file", 1), async (req, res) => {
    const images = req.files as Express.Multer.File[];
    const tags = JSON.parse(req.body.tags);
    const coordinates = JSON.parse(req.body.coordinates);
    const name = req.body.name;
    const folderId = req.body.folderId;
    const folderName = (await getFolderById(folderId)).name;

    const fullImageName = req.body.fullImageName;
    const fullImageId = req.body.fullImageId;
    const fullImageDataSetPath = (await getImageByImageId(fullImageId)).imageDataSet;
    await pipeline(images[0].stream, fs.createWriteStream(`${cardsPath}/${name}`));

    const srcFullImage = path.join(__dirname, `../../storage/frames/${folderName}`, fullImageName);

    const categoriesAndTag: [string, string][] = [];
    for (let tag of tags) {
        categoriesAndTag.push([(await getCategoryByTag(tag)).name, tag]);
    }

    for (let categoryTag of categoriesAndTag) {
        const datasetImages = path.join(__dirname, `../../DATASETS/${categoryTag[0]}_dataset/`, categoryTag[0]);
        let tags = await getTagIndexInCategory(categoryTag[0], categoryTag[1])
        let index = tags.indexOf(categoryTag[1])
        let txtData = [index, ...coordinates].join(' ')

        fs.readdir(datasetImages, async (err: ErrnoException, files: string[]) => {

            const imageDataSet = fullImageDataSetPath.find((e) => e.dataset === categoryTag[0])
            const fullImageTxt = !imageDataSet ? (files.length / 2).toString().padStart(4, "0") + ".txt" : (imageDataSet.txt)
            const txtPath = path.join(__dirname, `../../DATASETS/${categoryTag[0]}_dataset/${categoryTag[0]}`, fullImageTxt);

            if (!imageDataSet) {
                const newFullImageName = (files.length / 2).toString().padStart(4, "0") + ".jpg";
                const dataPath = datasetImages + "/" + newFullImageName;
                txtData = [index, ...coordinates].join(' ')
                // fs.copyFile(srcFullImage, dataPath, (err: ErrnoException) => {
                //     if (err) {
                //         console.log(err)
                //     } else {
                //         console.log('image dataSet creates sucessfully')
                //     }
                // });

                const image = await resizeImg(fs.readFileSync(srcFullImage), {
                    width: 416,
                    height: 416
                });
                fs.writeFileSync(dataPath, image);

            }

            fs.appendFile(txtPath, txtData + "\n", function (err: ErrnoException) {
                if (err) {
                    throw err;
                } else {
                    updateImageDataSetPath(folderId, fullImageName, {
                        dataset: categoryTag[0],
                        txt: fullImageTxt,
                    });
                }
            });
        });
    }

    await updateImageUsage(folderId, fullImageName, true);
    const imageAdded = await addImageCropped(
        name,
        tags,
        coordinates,
        fullImageId
    );
    res.status(200).send(imageAdded);
});
router.delete("/:name/:folderId/:fullImageName", async (req, res) => {
    let name = req.params.name;
    console.log(req.params.folderId);
    console.log(req.params.fullImageName);

    let folderId = new ObjectId(req.params.folderId);
    let fullImageName = req.params.fullImageName;
    await deleteCroppedCard(name);
    await updateImageUsage(folderId, fullImageName, false);
    res.status(200).send("cardDeleted");
});
router.delete("/:name/:tag", async (req, res) => {
    let name = req.params.name;
    let tag = "#" + req.params.tag;
    const message = await deleteCardTagByCardName(name, tag);
    // await updateImageUsage(folderId, fullImageName, true)
    res.status(200).send(message);
});

export default router;
