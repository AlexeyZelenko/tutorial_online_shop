
const Vision = require('@google-cloud/vision');
const vision = new Vision();
const spawn = require('child-process-promise').spawn;

const path = require('path');
const os = require('os');
const fs = require('fs');

// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const protoLoader = require('@grpc/proto-loader');
admin.initializeApp();



let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: 'women.ck.ua@gmail.com',
        pass: 'qaz0983267431qaz'
    }
});

//Creating a Firebase Cloud Function
exports.sendMail = functions.firestore.document('messages/{messageId}').onCreate((snapshot, context) => {
    const dest = 'zelenko.75@ukr.net';

    //Defining mailOptions
    const mailOptions = {
        from: 'women.ck.ua@gmail.com', //Добавление электронной почты отправителя
        to: dest, //Получение электронной почты получателя по строке запроса
        subject: 'Новый заказ в "women.ck.ua"', //Email тема
        html: '<b>В онлайн магазине "women.ck.ua" появился новый заказ!</b></br> Войдите в раздел Администрация - Заказы', //Email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions).then(() => {
        console.log('Письмо отправлено на ', dest);
    });
});


