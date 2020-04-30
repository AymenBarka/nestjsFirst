import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {Todo} from './todo.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo')private readonly todoModel: Model<Todo>){}
        async insertTodo(obj:Todo){
            return await this.todoModel.create(obj);
        }
        async getTodos(){
            return await this.todoModel.find();
        }
        async getOneTodo(todoId:string){
            return await this.todoModel.findById(todoId);
        }
        async updateTodo(todoId:string,data){
            return await this.todoModel.findByIdAndUpdate({_id:todoId},data);
        }
        async deleteTodo(todoId:string){
            return await this.todoModel.findByIdAndDelete(todoId);
        }
}       

