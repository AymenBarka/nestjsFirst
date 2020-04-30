import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.interface';

@Injectable()
export class UsersService {constructor(@InjectModel('Users') private readonly usersModel:Model<Users>){}

async insertUser(obj:Users){
    return await this.usersModel.create(obj);
}
async getUsers(){
    return await this.usersModel.find();
}
async getUserss(){
    
    return await this.usersModel.find().populate('todos').exec();
}
async getOneUser(userId:string){
    return await this.usersModel.findById(userId);
}
async getUserByUsername(username: string) {
    return await this.usersModel.findOne({username:username});
}
async updateUser(userId:string,data){
    return await this.usersModel.findByIdAndUpdate({_id:userId},data);
}
async deleteUser(userId:string){
    return await this.usersModel.findByIdAndDelete(userId);
}
async affectTodoToUser(userId:String,todoId:String){
    return await this.usersModel.findByIdAndUpdate(userId,{$push:{todos:todoId}});
}
async deleteTodoFromUser(userId:String,todoId:String){
    return await this.usersModel.findByIdAndUpdate(userId,{$pull:{todos:todoId}});
}
async validateUserJWT(payload): Promise<any> {
    return await this.usersModel.findOne({username: payload.data.username}).exec();
  }
}
