import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IFolder extends  mongoose.Document{
    name:string,
    tags:string,
}
// mongo
const FolderSchema = new mongoose.Schema({
    name:String,
    tags:[String],

})

export const Folder = mongoose.model<IFolder>("images",FolderSchema);