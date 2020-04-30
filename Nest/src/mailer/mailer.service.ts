import { Injectable, HttpService } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    //constructor(private readonly httpService: HttpService) { }
    async  sendMail() {
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'xxxxxx@gmail.com',
            pass: 'xxxxxxx'
          }
        });
        const mailOptions = {
            from: 'xxxxxxx@gmail.com',
            to: 'xxxxxx@gmail.com',
            subject: 'Sending Email using Node.js package nodemailer',
            html: '<a href="#" alt="just an example">This is Your Link :)</a>'
          };
        
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
}
