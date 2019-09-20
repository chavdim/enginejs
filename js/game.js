function Game(stage, attributes, objects) {
    //OBJECTS
    this.currentVisualObjects = getStageBG(stage);
    this.currentMenuObjects = getStageMenuObjects(stage);
    //mechanical variables for map
    this.repeated = 0;
    this.timeStep = 0;
    this.stage = stage;
    //ADD STAGE IF EXISTS
    if (stage !== "") {
        this.stageData = mapData[stage];
    }
    //TIMERS
    this.timers = [];
    //this.timers.push(new TimedEvent (time,countDownBy,parent,onZero) );

    //GAME ATTRIBUTES DIC & GAME OBJECTS DIC
    this.gameAttributes = attributes;
    this.gameObjects = objects;
    this.update = function (input, param) {
        //UPDATE OBJECTS
        for (var i = this.currentMenuObjects.length - 1; i >= 0; i--) {
            this.currentMenuObjects[i].update(input);
        }
        for (var i = this.currentVisualObjects.length - 1; i >= 0; i--) {
            this.currentVisualObjects[i].update();
        }
        //UPDATE OBJECTS IN DICT
        for (var key in this.gameObjects) {
            for (var i = this.gameObjects[key].length - 1; i >= 0; i--) {
                this.gameObjects[key][i].update(this.gameAttributes);
                //REMOVE IF DEAD
                if (this.gameObjects[key][i].dead == 1) {
                    this.gameObjects[key].splice(i, 1);

                }
            }
        }
        //UPDATE TIMED EVENTS
        for (var i = this.timers.length - 1; i >= 0; i--) {
            this.timers[i].update();
        }
        //GAME SPECIFIC////////////////////////////////////////////////////////////////////////////////////////

        //COLLISION EVENTS
        /*CollisionHandler ("playerToEnemy",this.dynamicObjects["players"],this.dynamicObjects["enemies"],
            this,"collidedWithEnemy",rectCollision);
        */
        //EventTrigger (1,">",0,this.func)
    };
    this.draw = function (ctx) {
        for (let i = this.currentVisualObjects.length - 1; i >= 0; i--) {
            this.currentVisualObjects[i].draw(ctx);
        }
        //DRAW OBJECTS IN DICT
        for (let key in this.gameObjects) {
            for (let i = this.gameObjects[key].length - 1; i >= 0; i--) {
                this.gameObjects[key][i].draw(ctx);
            }
        }
        for (let i = this.currentMenuObjects.length - 1; i >= 0; i--) {
            this.currentMenuObjects[i].draw(ctx);
        }
    };

}
