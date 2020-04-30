import { Controller, Get, UseInterceptors, Post,Request, UploadedFile, UploadedFiles, Param, Res, Body, UseGuards} from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './multer/multer';
import { diskStorage } from 'multer';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './passport/auth.guard';

@UseInterceptors(LoggingInterceptor)

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async  uploadFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
  )
  async  uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }


  @Get('upload/:filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    return res.sendFile(file, { root: './upload' });
  }
 
}
