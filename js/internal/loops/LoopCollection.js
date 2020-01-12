function LoopCollection() {
    this.activeLoop = 0;
    this.loops = [
    ];
    this.changeActiveLoop = function (newLoopIndex) {
        this.activeLoop = newLoopIndex;
        master.transition.activate();
    };

    this.init = function () {
        loopFor(this.loops, 'init');
    };

    this.update = function (input, param) {
        this.loops[this.activeLoop].update(input);
        //TODO improve
        input[2]['markAsProcessed']();
    };
    this.draw = function (ctx) {
        this.loops[this.activeLoop].draw(ctx);
    };
}
