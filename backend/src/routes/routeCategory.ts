import express from 'express'

import {
    getCategory,
    getCategories,
    addCategory,
    addTagToCategory,
    deleteTagByCategoryName, getCategoryByTag
} from "../controllers/controllerCategories";
import path from "path";
import ErrnoException = NodeJS.ErrnoException;

const fs = require("fs");


const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await getCategories()
    res.send(categories)
})

router.get('/:name', async (req, res) => {
    let name = req.params.name
    const category = await getCategory(name)
    res.send(category)
})


router.post('/addCategory/:name/:tag', async (req, res) => {
    let name = req.params.name
    let tag = '#' + req.params.tag

    let framesPath = path.join(__dirname, `../../`, 'DATASETS');
    try {
        fs.mkdirSync(framesPath);
    } catch (error) {
        console.log("Already exist")
    }
    const singleDataSet = name + '_dataset'


    let dataPath = path.join(__dirname, `../../DATASETS/`, singleDataSet);
    try {
        fs.mkdirSync(dataPath);
    } catch (error) {
        console.log("Already exist")
    }

    let current = path.join(__dirname, `../../DATASETS/${singleDataSet}/`, name);
    try {
        fs.mkdirSync(current);
    } catch (error) {
        console.log("Already exist")
    }

    let namesClasses = path.join(__dirname, `../../DATASETS/${singleDataSet}/`, 'classes.names');
    let trainTxt = path.join(__dirname, `../../DATASETS/${singleDataSet}/`, 'train.txt');
    let testTxt = path.join(__dirname, `../../DATASETS/${singleDataSet}/`, 'test.txt');
    fs.open(namesClasses, 'w', function (err: ErrnoException, file: number) {
        if (err) throw err;
    });
    const classesNamesPath = path.join(__dirname, `../../DATASETS/${name}_dataset/`, 'classes.names');

    fs.appendFile(classesNamesPath, req.params.tag + "\n", function (err: ErrnoException) {
        if (err) {
            throw err;
        }
    })
    fs.open(trainTxt, 'w', function (err: ErrnoException, file: number) {
        if (err) throw err;
    });
    fs.open(testTxt, 'w', function (err: ErrnoException, file: number) {
        if (err) throw err;
    });
    const category = await addCategory(name, [tag])
    res.status(200).send(category)
})

router.post('/addTagToCategory/:name/:tag', async (req, res) => {
    let name = req.params.name
    let tag = '#' + req.params.tag
    await addTagToCategory(name, tag)
    const classesNamesPath = path.join(__dirname, `../../DATASETS/${name}_dataset/`, 'classes.names');

    fs.appendFile(classesNamesPath, req.params.tag + "\n", function (err: ErrnoException) {
        if (err) {
            throw err;
        }
    })
    const category = await getCategory(name)
    res.status(200).send(category)
})

router.delete("/:name/:tag", async (req, res) => {
    let name = req.params.name
    let tag = '#' + req.params.tag
    const category = await deleteTagByCategoryName(name, tag)

    res.status(200).send(category)
});
export default router


