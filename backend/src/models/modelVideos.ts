import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  IVideo extends  mongoose.Document{
    name: string,
    fragmented: boolean,
    duration: number


}
// mongo
const VideoSchema = new mongoose.Schema({
    name: String,
    fragmented: Boolean,
    duration: Number
})

export const Video = mongoose.model<IVideo>("videos",VideoSchema);