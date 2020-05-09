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

// Ingresar los id's de los calendarios correspondiente a cada calendario
// creado en google calendar.
const calendarId = {
    'clinico': 'ID del calendario de clinico',
    'nutricionista': 'ID del calendario de nutricionista',
    'psicologo': 'ID del calendario de psicologo',
    'urologia': 'ID del calendario de urologia'
};

// JSON otorgado cuando se crea la credencial
// en google platform al configurar la API de 
// google calendar
const serviceAccount = {}; 

// Set up Google Calendar service account credentials
const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // It enables lib debugging statements

const timeZone = 'America/Argentina/Buenos_Aires';
const timeZoneOffset = '-03:00';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function makeAppointment(agent) {
    // Usa los paramatros 'date' and 'time' de Dialogflow para crear una instancia Date de Javascript,
    // 'dateTimeStart' y 'dateTimeEnd' son usado para crear la reserva
    const appointmentDuration = 1;// Define the length of the appointment to be one hour.
    const dateTimeStart = convertParametersDate(agent.parameters.date, agent.parameters.time);
    const dateTimeEnd = addHours(dateTimeStart, appointmentDuration);
    const appointmentTimeString = getLocaleTimeString(dateTimeStart);
    const appointmentDateString = getLocaleDateString(dateTimeStart);
    
    if (dateTimeStart.getHours() >= 13 && dateTimeEnd.getHours() <= 18) {

      // 'Especialidad' es el parametro de Dialogflow que representa
      // la especialidad elegida por el usuario,
      // el campo es requerido y los valores pueden ser:
      // 'clinico', 'nutricionista', 'psicologo' y 'urologia'
      return createCalendarEvent(
        dateTimeStart,
        dateTimeEnd,
        agent.parameters.Especialidad.toLowerCase()
      ).then(() => {
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
  // 'Hacer Reserva' es el nombre del Intent definido en DialogFlow y se asocia la funcion 'makeAppointment()'
  // si usas otro nombre de Intent, debes cambiar el primer parametro de la funcion intentMap.set()
  intentMap.set('Hacer Reserva', makeAppointment);
  agent.handleRequest(intentMap);
});

function createCalendarEvent(dateTimeStart, dateTimeEnd, especialidad) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth,
      calendarId: calendarId[especialidad],
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Verifica si tiene un evento en esa hora para el calendario seleccionado
      if (err || calendarResponse.data.items.length > 0) {
          reject(err || new Error('Conflicto entre reservas'));
      } else {
        // Crea un nuevo evento
        calendar.events.insert({
          auth: serviceAccountAuth,
          calendarId: calendarId[especialidad],
          resource: {
            summary: `${calendarId[especialidad]}: Turno Reservado`,
            start: { dateTime: dateTimeStart },
            end: { dateTime: dateTimeEnd }
          }
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        });
      }
    });
  });
}

// Crea un Date basado en los parametros de DialogFlow
function convertParametersDate(date, time) {
  return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + timeZoneOffset));
}

// Agrega 1 hora, para definir el fin del evento
function addHours(dateObj, hoursToAdd) {
  return new Date(new Date(dateObj).setHours(dateObj.getHours() + hoursToAdd));
}

// Convierte time en string.
function getLocaleTimeString(dateObj) {
  return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, timeZone: timeZone });
}

// Convierte date en string.
function getLocaleDateString(dateObj) {
  return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: timeZone });
}
