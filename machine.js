const createFSM = (initFSM) => {
  const machine =  {
    curState: initFSM.intialState, 
    transition: (curState, action) => {
      if(initFSM.states[curState]) {
        const actions = initFSM.states[curState].transitions;
        if(actions[action]) {
          initFSM.states[curState].actions.onExit();
          const tmpActionObj = actions[action];
          tmpActionObj.action();
          const nextState = tmpActionObj.nextState;
          initFSM.states[nextState].actions.onEnter();
          return tmpActionObj.nextState;
        } else return curState;
      } else {
        console.log("Unexistent state given");
      }
    }
  }
  return machine;
}

const TrafficMachine = createFSM({
  intialState: 'IDLE',
  states: {
    IDLE: {
      actions: {
        onEnter: () => {
          console.log('Entered idle state');
        },
        onExit: () => {
          console.log('Exited Idle state');
        }
      },
      transitions: {
        SUBMIT: {
          nextState: 'LOADING',
          action: () => {
            console.log('Going form Idle to loading when submit is clicked');
          }
        }
      }
    },

    LOADING: {
      actions: {
        onEnter: () => {
          console.log('Entered loading state');
        },
        onExit: () => {
          console.log('Exited loading state');
        }
      },
      transitions: {
        PAYMENT_RECEIVED: {
          nextState: 'SUCCESS',
          action:  () => {
            console.log("Going from loading to sucesss");
          }
        },
        FAILED: {
          nextState: 'ERROR',
          action: () => {
            console.log("Going from loading to failed state");
          } 
        }
      }
    },
    SUCCESS: {
      actions: {
        onEnter: () => {
          console.log('Entered success state');
        },
        onExit: () => {
          console.log('Exited success state');
        }
      },
      transitions: {

      }
    },
    ERROR: {
            actions: {
        onEnter: () => {
          console.log('Entered error state');
        },
        onExit: () => {
          console.log('Exited error state');
        }
      },
      transitions: {
        SUBMIT: {
          nextState: 'LOADING',
          action: () => {
            console.log("Going from error to loading");
          } 
        }
      }
    }
  }
});
let nxtState = TrafficMachine.curState;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
let action;
console.log("Currently in the " + nxtState + " state\n");
while(1) {
const prompt = require('prompt-sync')();

const name = prompt('Enter the action?');
nxtState = TrafficMachine.transition(nxtState, name);
console.log("Currently in the " + nxtState + " state\n");

}