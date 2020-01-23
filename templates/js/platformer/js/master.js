let master;
master = {
    init: function(mode, param) {
        //CANVAS CONTEXT DECLARATION
        master.canvas = document.getElementById('gamecanvas');
        master.ctx = master.canvas.getContext('2d');
        //CONTEXT2
        master.canvas2 = document.getElementById('gamecanvas2');
        master.ctx2 = master.canvas2.getContext('2d');
        //TRANSITION //TODO are transitions global?
        master.transition = new FadeTransition(master.canvas.width, master.canvas.height, 0.1, 0.2);

        //GAME MECHANICAL VARIABLES
        master.mode = mode;
        master.isGameMode = 0;
        master.clearTimeOutsOnce = 1;
        master.param = param;
        master.updateDelay = 15;
        inputHandler.processed = 1;
        mainTimeout = 0;
        master.clearTimeouts();

        //INIT
        master.prepareObjects(master.mode, param);
        master.mainLoop();

      },
    prepareObjects: function(mode, param) {
        master.loopCollection = new LoopCollection();
        master.loopCollection.init();
        master.loopCollection.start();
        master.transition.activate();
      },
    mainLoop: function() {
        master.updateLoops(inputHandler.getInput());
        master.drawLoops();
        //MAINLOOP TIMEOUT
        mainTimeout = window.setTimeout(master.mainLoop, master.updateDelay);
      },
    updateLoops: function(input) {
        master.loopCollection.update(input);
        //INPUT HAS BEEN PROCESSED
        inputHandler.processed = 1;
      },
    drawLoops: function() {
        //CLEAR ALL CONTEXT
        master.clearView();
        master.loopCollection.draw(master.ctx);
        //TRANSITION UPDATE
        master.transition.draw(master.ctx2);

      },
    clearView: function() {
        master.ctx.clearRect(0, 0, master.canvas.width, master.canvas.height);
        master.ctx2.clearRect(0, 0, master.canvas.width, master.canvas.height);
      },
    clearTimeouts: function() {
        clearTimeout(mainTimeout);
      },

  };
$(window).load(function() {
    master.init('main_menu', 'none');
  });

