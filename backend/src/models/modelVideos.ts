import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IVideo extends  mongoose.Document{
    name: string,
}
// mongo
const VideoSchema = new mongoose.Schema({
    name: String,
    fragmented: Boolean
})

export const Video = mongoose.model<IVideo>("videos",VideoSchema);