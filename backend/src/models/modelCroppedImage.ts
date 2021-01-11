import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IImage extends  mongoose.Document{
    folderId: mongoose.Types.ObjectId,
    name: string,
    width:number,
    height:number,
}
// mongo
const ImageSchema = new mongoose.Schema({
    folderId: {type: mongoose.Schema.Types.ObjectId, ref: 'folders'},
    name: String,
    width: Number,
    height: Number,
})

export const Image = mongoose.model<IImage>("images",ImageSchema);