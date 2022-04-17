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

'use strict';

const functions = require('firebase-functions');
const { google } = require('googleapis');
const { WebhookClient } = require('dialogflow-fulfillment');

// Enter your calendar ID and service account JSON below.
const calendarId = {
    'oficina1': '4hd6j7deblufm0u1cvfc2mkajk@group.calendar.google.com',
    'oficina2':'qt0v1lov4h5qnl9a106hvphu74@group.calendar.google.com'
};


const serviceAccount = {
    "type": "service_account",
    "project_id": "turnosmedicos-mcfwaf",
    "private_key_id": "2e0402276f2529df44cd917ac9c5f3e6fd382e6f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjaLNeDkkrFY5L\n81XtXvTcrHJxzeOAdn9GTR25wFgj18OZa6zibGoYGkUYkkVZ6kbIHzVo/JdvRsIv\nGsToWIZ2rQpj5jQy2EkQtCCbnK7aKBjHc816XhTrQg59UIIpqi8aBoAK/j+4XuBx\nHQUA4odiy5b4KxGHzP9vxJ56ipIDJ53hrhG+uwHzWbX4cwWkV04wJTjeUERACb7n\nlTmBwJuWNcFfSeAriF3lrsx9ezTH7tR9hkcXof55qRGIki1VMr08OHsBV1jKsacY\no5cgM+kToMDUnas54yd1iRUAdJ91VmdoTFLPSYsVqU/Ua6BVZIgtuyu2n+DDANl0\nQW1q0vqZAgMBAAECgf9tgPeyJsUzzFUKma+klHj5VhaSI8/w73etO5u9oyMkdBvI\nyu0CTsAA8Ad5D9VgeZnsHSJo/QCQcUy4zWCv96La7ZGo6Y2su8zxqTGMOtNNHj9Y\nIEbNouwhzYJxXEa5CZc0lPjUrjpXfDz0tJ2zdYgWsSojUbk7Z+AgnO/NgOEFxECT\nVpOOFN5tb1i2t/wIDtuyyU5C2nRlksdsvJibBTtkmD4liIRZE43OW0QCPDquZhnH\nWZrQGDSA8WU2EjfvWLtte8JgNjNie5eJu/a9E6sx6MbxLcGjcM/9OmInJOKr/qqI\nbEfjfE++Y/2vmvqkdM0s7EiSfrmzKRuHb1D3q9ECgYEA5CXSEaShQfMyyG5ke8WX\n1YC8ldhU32cD4PnvIcD445TFPi1bUX7i9M0HQdVMoOHXauKDWzBtae+S43H1xJk/\nyMtTqeasEIMR53Aafcp2MYJWLlFl9uUa8wsAL/ck42HSmY/zGQZjI337tFz+XUJK\nxWV7iI3+E/dO5AneHtJJSckCgYEAt1uibcgO1Oe+KxzCUyLtk23vF7h+jKHEnKwL\n6Eo2afqA25+gV+ewuN3zdYpPGvcI15SHnLRODgmV/2KvfKFq9ujblZkFLrblQLuw\nFMP5LBA6mVfEvsGwNy+BAr04Hw1g0XRXen+6l1Jp3cHXjSg/mo+9xEL/NRhlbA8q\nHPAeklECgYEA47rgwh2rnVHtaeXPRUDJuyLCm2wR4+FHHOU+Dlo51aklbVgG5AUc\n9DBHwy3vTFPCG/24Emj3fhvWalPRd4llAr/6ZghLzjuWvobG2rMiYW7xKVC0z8qG\nqP1dFYPDfXiiqAfpJxyaDs5tVe7RNDO8wOb4dSkO6c0dIUC8R9WttAkCgYEAtWy4\nBUQkWMmMwv/Lz5MJ3Ay0vJXSsbgG4LbjeU6lFKvHAIirkQ8xL1p94NmfeCDi4NyY\napeFfCJEBtRQq1LUkcbKLvWfyR8zK6AKlCFs1Qqh0MSladIgWBpq3pj3hNIp8FXb\nkNv9dmkXU1LPw14FwRtlO2LHPnQLNqaylruIpGECgYAiPO49KrJjiJKTpqaV2ZIk\nWVzZ1+JUZqK37cPyfPCrdUFcCq1h9rbSyQZD8+LA/NDDlR1ZofVTdkU+quszZDzH\ntaWMZA0XHzzYBWBkeEoE3LukI9nfdHdkqQ1jh2XJyy17QWjItXdZI8VYQEFpRRmh\nx7bB5L9o2QsZTHkyIF/Bfg==\n-----END PRIVATE KEY-----\n",
    "client_email": "bike-shop-calendar@turnosmedicos-mcfwaf.iam.gserviceaccount.com",
    "client_id": "100452189336071299378",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bike-shop-calendar%40turnosmedicos-mcfwaf.iam.gserviceaccount.com"
  }; // The JSON object looks like: { "type": "service_account", ... }

// Set up Google Calendar service account credentials
const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // It enables lib debugging statements

const timeZone = 'America/Argentina/Buenos_Aires';  // Change it to your time zone
const timeZoneOffset = '-03:00';         // Change it to your time zone offset

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });

    function makeAppointment(agent) {
        // Use the Dialogflow's date and time parameters to create Javascript Date instances, 'dateTimeStart' and 'dateTimeEnd',
        // which are used to specify the appointment's time.
        const appointmentDuration = 1;// Define the length of the appointment to be one hour.
        const dateTimeStart = convertParametersDate(agent.parameters.date, agent.parameters.time);
        const dateTimeEnd = addHours(dateTimeStart, appointmentDuration);
        const appointmentTimeString = getLocaleTimeString(dateTimeStart);
        const appointmentDateString = getLocaleDateString(dateTimeStart);
        
        if (dateTimeStart.getHours() >= 13 && dateTimeEnd.getHours() <= 18) {
            // Check the availability of the time slot and set up an appointment if the time slot is available on the calendar
            return createCalendarEvent(dateTimeStart, dateTimeEnd, agent.parameters.Oficina).then(() => {
                agent.add(`Su turno se reservó para ${appointmentDateString} a las ${appointmentTimeString}. Hasta luego.`);
            }).catch(() => {
                agent.add(`Lo siento, ya tenesmos una reserva para ${appointmentDateString} a las ${appointmentTimeString}. Podría reservar para otro momento?`);
            });
        } else {
            agent.add('El horario seleccionado no es posible. Solo los Médicos trabajan entre las 9AM y 15PM.');
            return new Error('Los horarios son entre 10 am y 15 pm.');
        }
        
    }
    let intentMap = new Map();
    intentMap.set('Make Appointment', makeAppointment);  // It maps the intent 'Make Appointment' to the function 'makeAppointment()'
    agent.handleRequest(intentMap);
});

function createCalendarEvent(dateTimeStart, dateTimeEnd, oficina) {
    return new Promise((resolve, reject) => {
        calendar.events.list({  // List all events in the specified time period
            auth: serviceAccountAuth,
            calendarId: calendarId[oficina],
            timeMin: dateTimeStart.toISOString(),
            timeMax: dateTimeEnd.toISOString()
        }, (err, calendarResponse) => {
            // Check if there exists any event on the calendar given the specified the time period
            if (err || calendarResponse.data.items.length > 0) {
                reject(err || new Error('Conflicto entre reservas'));
            } else {
                // Create an event for the requested time period
                calendar.events.insert({
                    auth: serviceAccountAuth,
                    calendarId: calendarId[oficina],
                    resource: {
                        summary: `${calendarId[oficina]}: Turno Reservado`,
                        start: { dateTime: dateTimeStart },
                        end: { dateTime: dateTimeEnd }
                    }
                }, (err, event) => {
                    err ? reject(err) : resolve(event);
                }
                );
            }
        });
    });
}

// A helper function that receives Dialogflow's 'date' and 'time' parameters and creates a Date instance.
function convertParametersDate(date, time) {
    return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + timeZoneOffset));
}

// A helper function that adds the integer value of 'hoursToAdd' to the Date instance 'dateObj' and returns a new Data instance.
function addHours(dateObj, hoursToAdd) {
    return new Date(new Date(dateObj).setHours(dateObj.getHours() + hoursToAdd));
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this time in English.
function getLocaleTimeString(dateObj) {
    return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, timeZone: timeZone });
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this date in English.
function getLocaleDateString(dateObj) {
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: timeZone });
}
