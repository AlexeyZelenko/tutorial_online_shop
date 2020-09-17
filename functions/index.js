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
admin.initializeApp();



/**
 * Здесь мы используем Gmail для отправки
 */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'women.ck.ua@gmail.com',
        pass: 'qaz0983267431qaz'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // получение целевой электронной почты по строке запроса
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Имя вашей учетной записи <zelenkooleksii75@gmail.com>', // Что-то вродеe: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Новый заказ', // email тема
            html: `<p style="font-size: 16px;">Вы получили новый заказ!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };

        // возвращение результата
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            console.log('Отправлено')
            return res.send('Отправлено');
        });
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