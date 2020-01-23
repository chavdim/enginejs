class LoopCollection {
  constructor() {
  }

  init() {
    this.stageCreator = new StageCreator();
    this.nextLoop = 0;
    this.activeLoop = 0;
    this.loops = [
        new StageSelectLoop(),
        new StageLoop(this.stageCreator)
    ];
  }

  reset() {
    this.stageCreator = new StageCreator();
    this.loops[1] = new StageLoop(this.stageCreator);
  }

  changeActiveLoop(newLoopIndex) {
    this.nextLoop = newLoopIndex;
    master.transition.activate(this, 'updateCurrentActiveLoop');

  }

  updateCurrentActiveLoop() {
    this.reset();
    this.activeLoop = this.nextLoop;
  }

  start() {
    loopFor(this.loops, 'init');
  }

  update(input, param) {
    this.loops[this.activeLoop].update(input);
    //TODO improve
    input[2]['markAsProcessed']();
  }

  draw(ctx) {
    this.loops[this.activeLoop].draw(ctx);
  }

}
