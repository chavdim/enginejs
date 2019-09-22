function StageSelectLoop() {
    //OBJECTS
    this.creator = new StageSelectCreator();

    this.currentVisualObjects = [];
    this.currentMenuObjects = [];
    this.gameAttributes = {}; //TODO
    this.dynamicObjects = {};
    //TIMERS
    this.timers = [];
    //this.timers.push(new TimedEvent (time, countDownBy, parent, onZero) );

    this.init = function () {
        this.loadBaseData();
        this.loadPlayerData();
    };

    // Todo loads saved files (progression) ect
    this.loadPlayerData = function () {
    };

    this.loadBaseData = function () {
        this.currentVisualObjects = this.creator.getVisualObjects();
        this.currentMenuObjects = this.creator.getMenuObjects();
        // this.gameAttributes = attributes;
        this.dynamicObjects = this.creator.getDynamicObjects();
    };

    this.update = function (input, param) {
        //UPDATE OBJECTS
        loopFor(this.currentMenuObjects, 'update', input);
        //UPDATE OBJECTS IN DICT
        for (let key in this.dynamicObjects) {
            for (let i = this.dynamicObjects[key].length - 1; i >= 0; i--) {
                this.dynamicObjects[key][i].update(input);
                //REMOVE IF DEAD
                if (this.dynamicObjects[key][i].dead === true) {
                    this.dynamicObjects[key].splice(i, 1);
                }
            }
        }
        //UPDATE TIMED EVENTS
        loopFor(this.timers, 'update');
        //GAME SPECIFIC////////////////////////////////////////////////////////////////////////////////////////

        //COLLISION EVENTS
        /*CollisionHandler ("playerToEnemy",this.dynamicObjects["players"],this.dynamicObjects["enemies"],
            this,"collidedWithEnemy",rectCollision);
        */
        //EventTrigger (1,">",0,this.func)
    };
    this.draw = function (ctx) {
        loopFor(this.currentVisualObjects, 'draw', ctx);
        loopFor(this.currentMenuObjects, 'draw', ctx);
        //DRAW OBJECTS IN DICT
        for (let key in this.dynamicObjects) {
            loopFor(this.dynamicObjects[key], 'draw', ctx);
        }
    };

}
