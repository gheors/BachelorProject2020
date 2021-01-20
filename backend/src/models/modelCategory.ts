import mongoose from 'mongoose';


// typescript, extends mongoose.. because Video will have an ID that we wanna access
export interface  ICategory extends  mongoose.Document{
    name: string,
    tags:[string],
}
// mongo
const CategorySchema = new mongoose.Schema({
    name: String,
    tags: [String],
})

export const Category = mongoose.model<ICategory>("categories",CategorySchema);