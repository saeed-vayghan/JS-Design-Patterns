// remote-server.js

const app  = require('express')();
const port = 3000;


const handler = (req, res) => {
  if ( Math.round(Math.random()) ) {

    console.log('==> Success Response!')
    res.status( 200 ).send('Good Job!');

  } else {

    console.log('==> Failed Response!')
    res.status( 400 ).send('Failed!');
  }
}


app.get( '/', handler);
app.listen(port, () => console.log(`Server Is Available On http://localhost:${port}`));




// CircuitBreaker.js (Module)

const axios = require('axios');


const STATES = {
  GREEN: 'GREEN',
  YELLOW: 'YELLOW',
  RED: 'RED'
};

function CircuitBreaker (req, options) {
  const request = req;

  let nextAttempt  = Date.now();
  let state        = STATES.GREEN;
  let successCount = 0;
  let failureCount = 0;

  let failureThreshold   = options.failureThreshold;
  let successThreshold   = options.successThreshold;
  let timeout            = options.timeout;

  return {
    log: function (result) {
      console.table({
        'Result': result,
        'Now': Date.now(),
        'Successes': successCount,
        'Failures': failureCount,
        'State': state,
        'ToBecomGreen': ( state === STATES.GREEN ) ? 0 : options.successThreshold
      })
    },

    success: function (msg) {
      failureCount = 0;

      if ( state === STATES.YELLOW ) {
        successCount++;

        if ( successCount > successThreshold ) {
          successCount = 0;
          state = STATES.GREEN;
        }
      }

      return this.log(`Res: Success, Msg: ${msg}`);
    },

    failure: function (msg) {
      failureCount++;

      if ( failureCount >= failureThreshold ) {
        state = STATES.RED;
        nextAttempt = Date.now() + timeout;
      }

      return this.log(`Res: Failure, Msg: ${msg}`);
    },

    exec: async function () {

      if ( state === STATES.RED ) {

        if ( nextAttempt > Date.now() ) {
          throw new Error(`Circuit Failure! Wait ${Math.ceil((nextAttempt - Date.now()) / 1000)} Seconds!`);
        }

        state = STATES.YELLOW;
      }

      try {
        const response = await axios(request);

        if ( response.status === 200 ) {
          return this.success(response.data);
        }

        return this.failure(response.data);

      } catch (ex) {

        return this.failure(ex.message);
      }
    }
  }
};


module.exports = CircuitBreaker



// debug.js
const CircuitBreaker = require('./circuit-breaker');

const options = {
  failureThreshold: 2,
  successThreshold: 3,
  timeout: 5000 // Milliseconds
};

const circuitBreaker = CircuitBreaker({ method: 'get', url: 'http://localhost:3000' }, options);


async function debug () {
  try {
    await circuitBreaker.exec();
    
  } catch (ex) {

    console.log('Ex:', ex);
  }
}

setInterval(() => { debug() }, 1000);
