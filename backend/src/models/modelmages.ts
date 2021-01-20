import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IImage extends  mongoose.Document{
    folderId: mongoose.Types.ObjectId,
    name: string,
    width:number,
    height:number,
    used: boolean,
    imageDataSet: {
        dataset: string,
        txt: string
    }[]
}

// mongo
const ImageSchema = new mongoose.Schema({
    folderId: {type: mongoose.Schema.Types.ObjectId, ref: 'folders'},
    name: String,
    width: Number,
    height: Number,
    used: Boolean,
    imageDataSet: [Object]
})

export const Image = mongoose.model<IImage>("images",ImageSchema);