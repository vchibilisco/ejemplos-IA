const express =  require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const moment = require('moment')
const ngrok = require('@ngrok/ngrok');

dotenv.config();

const app = express();
app.use(bodyParser.json())
const port = process.env.ENVIRONMENT_PORT;

app.post('/webhook', (req, res) => {
  console.log(req.body.sessionInfo);
  const tag = req.body.fulfillmentInfo.tag;
  console.log(req.body.sessionInfo)

  if (!!tag) {
    switch (tag) {
      case 'verificar_reserva':
        let estado = 'invalid';
        try {
          const persona = req.body.sessionInfo.parameters.person.name;
          const prepaga = req.body.sessionInfo.parameters.prepaga;
          
          if (persona.toUpperCase() === 'MARIA' && ['DASUTEN', 'OSDE', 'PRENSA', 'SWISS MEDICAL'].includes(prepaga.toUpperCase())) {
            estado = 'valid';
          }
        } catch (error) {
          console.error(error);
        }
        
        res.status(200).send({
          sessionInfo: {
            parameters: {
              estado: estado
            }
          }
        });
        break;
      default:
        break;
    }
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

ngrok.connect({ addr: 8080, authtoken_from_env: true })
	.then(listener => console.log(`Ingress established at: ${listener.url()}`));