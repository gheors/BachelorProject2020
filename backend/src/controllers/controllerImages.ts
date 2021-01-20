import { IImage, Image } from "../models/modelmages";
import * as mongoose from "mongoose";

//get all Images controller
export async function getImages(): Promise<IImage[]> {
  return new Promise<IImage[]>((resolve, reject) => {
    Image.find({}, (err, images) => {
      if (err) {
        reject(err);
      } else {
        resolve(images);
      }
    });
  });
}

export async function getImagesByFolderId(folderId: string): Promise<IImage[]> {
  return new Promise<IImage[]>((resolve, reject) => {
    Image.find({ folderId }, (err, images) => {
      if (err) {
        reject(err);
      } else {
        resolve(images || []);
      }
    });
  });
}

// get single video controller
export async function getImage(name: string): Promise<IImage> {
  return new Promise<IImage>((resolve, reject) => {
    Image.findOne({ name }, (err, image) => {
      if (err) {
        reject(err);
      } else {
        resolve(image || undefined);
      }
    });
  });
}

// get single video controller
export async function getImageByImageId(id: string): Promise<IImage> {
  return new Promise<IImage>((resolve, reject) => {
    Image.findOne({ _id: id }, (err, image) => {
      if (err) {
        reject(err);
      } else {
        resolve(image || undefined);
      }
    });
  });
}

// get single video controller
export async function getImageByFolderId(folderId: string): Promise<IImage> {
  return new Promise<IImage>((resolve, reject) => {
    Image.findOne({ folderId }, (err, image) => {
      if (err) {
        reject(err);
      } else {
        resolve(image || undefined);
      }
    });
  });
}

// add new video controller
export async function addImage(
  folderId: mongoose.Types.ObjectId,
  name: string,
  width: number,
  height: number,
  used: boolean,
  imageDataSet: []
) {
  return new Promise((resolve, reject) => {
    const image = new Image({
      folderId,
      name,
      width,
      height,
      used,
      imageDataSet,
    });
    image.save().then(resolve).catch(reject);
  });
}

// add new video controller
export async function deleteImagesByFolderId(
  folderId: mongoose.Types.ObjectId
) {
  return new Promise((resolve, reject) => {
    Image.deleteMany({ folderId: folderId }).then(resolve).catch(reject);
  });
}

export async function deleteSelectedImageByImageId(
  imageId: mongoose.Types.ObjectId
) {
  return new Promise((resolve, reject) => {
    Image.deleteOne({ _id: imageId }).then(resolve).catch(reject);
  });
}

export async function updateImageUsage(
  folderId: mongoose.Types.ObjectId,
  name: string,
  usage: boolean
) {
  return new Promise<IImage>((resolve, reject) => {
    Image.updateOne(
      { folderId: folderId, name: name },
      { used: usage },
      (err, image) => {
        if (err) {
          reject(err);
        } else {
          resolve(image || undefined);
        }
      }
    );
  });
}

export async function updateImageDataSetPath(
  folderId: mongoose.Types.ObjectId,
  name: string,
  newCategory: {
      dataset: string,
      txt: string
  }
) {
  return new Promise<IImage>((resolve, reject) => {
    Image.updateOne(
      { folderId: folderId, name: name },
      { $push: { imageDataSet: newCategory } },
      (err, image) => {
        if (err) {
          reject(err);
        } else {
          resolve(image || undefined);
        }
      }
    );
  });
}
