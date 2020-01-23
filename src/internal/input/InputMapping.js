//TODO maps inputs to object methods
function InputMapping(inputMap, parentFunction) {
  this.inputMap = inputMap;
  this.parentFunction = parentFunction;
  this.update = function(input) {
      const keyStates = input[2].keyStates; // TODO call like input.getKeyEvent
      let p = this.parentFunction();
      for (let key in this.inputMap) {
        if (keyStates[key] === 'pressed') {
          p[inputMap[key][0]]();
        }
        // else if (keyStates[key] === 'unpressed') {
        //     p[inputMap[key][1]]()
        // }
      }
      // TODO remove when decelerate figured out
      // if (keyStates['a'] !== 'pressed' &&
      //     keyStates['d'] !== 'pressed') {
      //     p[inputMap['a'][1]]()
      // }
    };
}
