```js
const pubsub = {};
 
(function(myObject) {

  // Storage for topics that can be broadcast or listened to
  const topics = {};

  // A topic identifier
  let subUid = -1;

  myObject.publish = function(topic, args) {

    if ( !topics[topic] ) {
      return false;
    }

    const subscribers = topics[topic];
    let len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  };

  myObject.subscribe = function(topic, func) {

    if (!topics[topic]) {
      topics[topic] = [];
    }

    const token = (++subUid).toString();

    topics[topic].push({
      token: token,
      func: func
    });

    return token;
  };

  myObject.unsubscribe = function(token) {
    for ( let m in topics ) {
      if ( topics[m] ) {
        for ( let i = 0, j = topics[m].length; i < j; i++ ) {
          if ( topics[m][i].token === token ) {
            topics[m].splice( i, 1 );

            return token;
          }
        }
      }
    }

    return this;
  };
}(pubsub));



const messageLogger = function (topics, data) {
  console.log(`Logging: ${topics}: ${data}`)
};
 
const subscription = pubsub.subscribe('inbox/event', messageLogger);
 
pubsub.publish('inbox/event', 'hello world!');
pubsub.publish('inbox/event', ['test', 'a', 'b', 'c']);
pubsub.publish('inbox/event', { sender: 'hello@home.com', body: 'Hey again!' });
 
pubsub.unsubscribe(subscription);
 
pubsub.publish( 'inbox/event', 'Hello again!');
```
