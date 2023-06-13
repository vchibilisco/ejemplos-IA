const express =  require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const moment = require('moment')

dotenv.config();

const app = express();
app.use(bodyParser.json())
const port = process.env.ENVIRONMENT_PORT;

app.post('/webhook', (req, res) => {
  console.log(req.body.sessionInfo);
  const tag = req.body.fulfillmentInfo.tag;

  if (!!tag) {
    switch (tag) {
      case 'verificar_reserva':
        const persona = req.body.sessionInfo.parameters['given-name'];
        const prepaga = req.body.sessionInfo.parameters.prepaga;
        let estado = 'invalid';
        if (persona.toUpperCase() === 'MARIA' && ['DASUTEN', 'OSDE', 'PRENSA', 'SWISS MEDICAL'].includes(prepaga.toUpperCase())) {
          estado = 'valid';
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

