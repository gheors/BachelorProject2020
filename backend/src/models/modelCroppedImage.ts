import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IImageCropped extends  mongoose.Document{
    name: string,
    tags:[string],
    coordinates: [number],
    fullImageId: mongoose.Types.ObjectId,

}
// mongo
const ImageCroppedSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    coordinates: [Number],
    fullImageId: {type: mongoose.Schema.Types.ObjectId, ref: 'images'},

})

export const ImageCropped = mongoose.model<IImageCropped>("croppedCards",ImageCroppedSchema);