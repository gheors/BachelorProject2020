import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IFolder extends  mongoose.Document{
    name:string,
    videoName:string,
    totalImages:number;
}

// mongo
const FolderSchema = new mongoose.Schema({
    name:String,
    videoName:String,
    totalImages:Number,
})

export const Folder = mongoose.model<IFolder>("folders",FolderSchema);