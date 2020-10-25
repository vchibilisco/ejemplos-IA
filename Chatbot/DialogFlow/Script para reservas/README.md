Configuración de Api Google Calendar y como agregar nuevos calendarios en https://codelabs.developers.google.com/codelabs/chatbots-dialogflow-fulfillment/#5

En DialogFlow:
- Pre requisitos
En DialogFlow debe tener 3 parametros definidos para usar este script:
    -date
    -time
    -Especialidad

Pasos:
* Ingresar en Fullfillment
* Habilitar 'Inline Editor' 
    (Si no tiene cuenta asociada en Google Platform, debera crear y registrar una tarjeta de credito,
    Google regala credito para cuenta gratuita y no factura sin consentimiento del dueño de cuenta)
* En el tab index.js borrar contenido, y copiar el contenido del archivo script.js.
* En el objeto 'calendarId' agregar el 'ID del calendario' de cada calendario creado en Google Calendar.
* En el objeto 'serviceAccount' copiar el contenido del archivo JSON que posee las credenciales
    de API Google Calendar.
* En la linea 'intentMap.set('Hacer Reserva', makeAppointment);', reemplazar 'Hacer Reserva' por el nombre
    del Intent en DialogFlow encargado de obtener los valores del usuario para registrar el turno.
* En el tab package.json borrar contenido, y copiar el contenido del archivo package.son de esta carpeta.
* Click en Deploy.


