import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchma = new Schema(
    {
       videoFile: {
        type: String,
        required: true,

       },
       thumbnail: {
        type: String,
        required: true,
       },
       title: {
        type: String,
        required: true,
       },
       description: {
        type: String,
        required: true,
       },
       duration: {
        type: String,
        required: true,
       },
       views:{
        type: Number,
        default: 0,
       },
       isPublished: {
        type: Boolean,
        default: true,

       },
       owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
       }
    },
    {
        timestamps: true
    }
)

videoSchma.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchma);