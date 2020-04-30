import  { Document } from 'mongoose';


export interface Users extends Document{
    _id:String,
    username: string,
    email: String,
    password:String,
   
   }