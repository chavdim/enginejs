$(window).load(function() {
    inputHandler.init();
  });
onKey = function(key) {
    //DEBUG LOG
    // console.log(key)

    inputHandler.keyInputObj = key;
    inputHandler.processed = 0;
    //END
  };
onClickOrTouch = function(mouse) {
    inputHandler.mouseInputObj = mouse;
    inputHandler.mouseProcessed = 0;
    /*
    game.mouse=mouse;
    game.mouseX=mouse.pageX;
    game.mouseY=mouse.pageY;
    clicked=1;
    if (game.started==1) {
        game.jump();
    }
    else{
        if (game.onMenu!=1) {
        game.started=1;
        };
        if (game.onMenu==1) {

        };
    };

        if(mouse.touches.length == 1){ // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            var node = touch.target; // Find the node the drag started from
            node.style.position = "absolute";
            node.style.left = touch.pageX + "px";
            node.style.top = touch.pageY + "px";
            game.mouseX=touch.pageX;
            game.mouseY=touch.pageY;
        };*/
  };
var inputHandler = {
    init: function() {
        function onKeyDown(keyEvent) {
          inputHandler.keyStates[keyEvent.key] = 'pressed';
          inputHandler.keyInputObj = keyEvent;
          inputHandler.processed = 0;
        }
        function onKeyUp(keyEvent) {
          inputHandler.keyStates[keyEvent.key] = 'unpressed';
          inputHandler.keyInputObj = keyEvent;
          inputHandler.processed = 0;
        }

        document.getElementById('gamebody').addEventListener('keydown', onKeyDown, true);
        document.getElementById('gamebody').addEventListener('keyup', onKeyUp, true);
        document.getElementById('gamebody').addEventListener('click', onClickOrTouch, true);
        document.getElementById('gamebody').addEventListener('touchstart', onClickOrTouch, true);
        inputHandler.mouseInputObj = 'NONE';
        inputHandler.keyInputObj = 'NONE';
        inputHandler.processed = 1;
        inputHandler.mouseProcessed = 1;

        inputHandler.keyStates = {};
      },
    getMouseInput: function() {
        return ([inputHandler.mouseInputObj, inputHandler.processed]);
      },
    getKeyInput: function() {
        return ([inputHandler.keyInputObj, inputHandler.processed]);
      },
    getInput: function() {
        return ([inputHandler.mouseInputObj, inputHandler.keyInputObj, inputHandler]);
      },

    markAsProcessed: function() {
        inputHandler.processed = 1;
        inputHandler.mouseProcessed = 1;
      }

  };
