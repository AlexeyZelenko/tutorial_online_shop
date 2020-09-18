/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
exports.sendMail = functions.firestore.document('messages/{messageId}').onCreate((snapshot, context) =>{
    const dest = 'zelenko.75@ukr.net';

    //Defining mailOptions
    const mailOptions = {
        from: 'women.ck.ua@gmail.com', //Добавление электронной почты отправителя
        to: dest, //Получение электронной почты получателя по строке запроса
        subject: 'Email Sent via Firebase', //Email тема
        html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions).then(() => {
        console.log('Mail sent to ', dest);
    });
});


// Отправляет уведомления всем пользователям, когда публикуется новое сообщение.
exports.sendNotifications = functions.firestore.document('messages/{messageId}').onCreate(
    async (snapshot) => {
        // Детали уведомления.
        const text = snapshot.data().text;
        const payload = {
            notification: {
                title: `${snapshot.data().name} добавил ${text ? 'сообщение' : 'изображение'}`,
                body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
                icon: snapshot.data().profilePicUrl || '/images/profile_placeholder.png',
                click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
            }
        };

        // Получить список токенов устройства.
        const allTokens = await admin.firestore().collection('fcmTokens').get();
        const tokens = [];
        allTokens.forEach((tokenDoc) => {
            tokens.push(tokenDoc.id);
            console.log('Токены полученны');
        });


        if (tokens.length > 0) {
            // Отправлять уведомления всем токенам.
            const response = await admin.messaging().sendToDevice(tokens, payload);
            await cleanupTokens(response, tokens);
            console.log('Уведомления отправлены, токены очищены.');
        }

    });

// Cleans up the tokens that are no longer valid.
function cleanupTokens(response, tokens) {
    // For each notification we check if there was an error.
    const tokensDelete = [];
    response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
            console.error('Не удалось отправить уведомление', tokens[index], error);
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
                const deleteTask = admin.firestore().collection('fcmTokens').doc(tokens[index]).delete();
                tokensDelete.push(deleteTask);
            }
        }
    });
    return Promise.all(tokensDelete);
}

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Получено фоновое сообщение ', payload);
//     // Настройте уведомление здесь
//     const notificationTitle = 'Заголовок фонового сообщения';
//     const notificationOptions = {
//         body: 'Тело фонового сообщения.',
//         icon: '/firebase-logo.png'
//     };
//
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });