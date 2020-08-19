#### The Mediator pattern provides central authority over a group of objects by encapsulating how these objects interact. 

```js
const Participant = function(name) {
  this.name = name;
  this.chatroom = null;

  this.send = function(message, to) {
    this.chatroom.send(message, this, to);
  }

  this.receive = function(message, from) {
    Logger.add(from.name + " to " + this.name + ": " + message);
  }
};

const Chatroom = function() {
  const participants = {};

  return {
    register: function(participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },

    send: function(message, from, to) {
      // single message
      if (to) {
        to.receive(message, from);

      // broadcast message
      } else {

        for (key in participants) {   
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    }
  };
};


// log helper
const Logger = (function() {
  let log = ';'

  return {
    add: function(msg) {
      log += msg + '\n';
    },

    show: function() {
      console.log(log);
      log = '';
    }
  }
})();

function run() {
  const userA = new Participant("User_A");
  const userB = new Participant("User_B");
  const userC = new Participant("User_C");
  const userD = new Participant("User_D");

  const chatroom = new Chatroom();
  chatroom.register(userA);
  chatroom.register(userB);
  chatroom.register(userC);
  chatroom.register(userD);

  userA.send("All you need is love.");
  userA.send("I love you John.");
  userB.send("Hey, no need to broadcast", userA);
  userC.send("Ha, I heard that!");
  userD.send("Paul, what do you think?", userC);

  Logger.show();
}
```
