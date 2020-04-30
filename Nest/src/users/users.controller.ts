import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { AuthGuard } from 'src/passport/auth.guard';
@UseInterceptors(LoggingInterceptor)

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post('/addUser')
    async addUser(@Body() obj:Users):Promise<Users>{
        return await this.usersService.insertUser(obj);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/getAllUsers')
    async getAllUsers(){
        const users=await this.usersService.getUsers();
        return users;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/getAll')
    async getALL(){
        const userss=await this.usersService.getUserss();
        return userss;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/getUser/:id')
    async getUser(@Param('id')UserId:string){
        return await this.usersService.getOneUser(UserId);
    }
    @Post('update/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(
        @Param('id') UserId: string,
        @Body('username') userUsername: string, 
        @Body('email') userEmail:string,
        @Body('password') userPassword:string)
        
        {
            const data={username:userUsername,email:userEmail,password:userPassword }
            await this.usersService.updateUser(UserId,data);
            return data;
        }
        @UseGuards(AuthGuard('jwt'))
        @Post('/affectTodoToUser/:userId/:todoId')
        async affectTodoToUser(
            @Param('userId')userId:string,
            @Param('todoId')todoId:string
        )
        {
            await this.usersService.affectTodoToUser(userId,todoId)
        }
        @UseGuards(AuthGuard('jwt'))   
        @Delete('/delete/:id')
        async removeUser(@Param('id')UserId:string){
        await this.usersService.deleteUser(UserId);
        return null;
    }
        @UseGuards(AuthGuard('jwt'))
        @Post('/deleteTodoFromUser/:userId/:todoId')
        async deleteTodoFromUser(
        @Param('userId')userId:string,
            @Param('todoId')todoId:string
    )
    {
        await this.usersService.deleteTodoFromUser(userId,todoId)
    }
    
}
