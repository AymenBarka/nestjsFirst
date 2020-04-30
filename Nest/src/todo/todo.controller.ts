import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService:TodoService){}

    @Post('/addTodo')
    async addTodo(@Body() obj:Todo):Promise<Todo>{
        return await this.todoService.insertTodo(obj);
    }
     
    @Get('/getAllTodos')
    async getAllTodos(){
        const todos=await this.todoService.getTodos();
        return todos;
    }
    @Get('/getTodo/:id')
    async getTodo(@Param('id')todId:string){
        return await this.todoService.getOneTodo(todId);
    }
    @Post('update/:id')
    async updateTodo(
        @Param('id')todId:string,
        @Body('comment')todoComment:string){
            const data={comment:todoComment}
            await this.todoService.updateTodo(todId,data);
            return data;
        }
    @Delete('/delete/:id')
    async removeTodo(@Param('id')todId:string){
        await this.todoService.deleteTodo(todId);
        return null;
    }
    
}
