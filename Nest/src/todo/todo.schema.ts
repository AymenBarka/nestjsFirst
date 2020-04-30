import { Schema } from "mongoose";

export const TodoSchema= new Schema({
    
    comment:{type: String, required:true},

})