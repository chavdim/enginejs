function StageCreator() {
    console.log(master);
    this.menuObj = [
        new Button(1, "menu", 5, 5, 80, 50, function func() {
            master.loopCollection.changeActiveLoop(0)
        })
    ];
    this.generators =
        [
            new TimedGenerator(
                40,
                function () {
                    // TODO get width from better place. config?
                    return new EnemyShip(
                        new RandomRangeGenerator(0,master.canvas.width ,1),
                        -50, -40, 6, "")
                },
                function () {
                    return master.loopCollection["loops"][1].dynamicObjects["enemyShips"]
                })// TODO way to not have to index loops
        ];

    this.visualObj = [];
    this.dynamicObj = {
        "ships": [
            new PlayerShip(100, 590, 30, 1.0, "")
        ],
        "enemyShips": []
    };
    this.collisionHandlers = [
        new CollisionHandler("enemyShipToBullet",
            function () {
                return master.loopCollection["loops"][1].dynamicObjects["enemyShips"]
            },
            function () {
                return master.loopCollection["loops"][1].dynamicObjects["ships"][0]
                    .collections[0].objects
            },                           // TODO fix dangerous indexing
            function () {
                return master.loopCollection["loops"][1]
            }, // TODO better way to indicate parent
            killBothObjectsOnCollision,
            rectCollision),

        new CollisionHandler("playerToEnemy",
            function () {
                return master.loopCollection["loops"][1].dynamicObjects["ships"]
            },
            function () {
                return master.loopCollection["loops"][1].dynamicObjects["enemyShips"]
            },
            function () {
                return master.loopCollection["loops"][1]
            },
            killFirstObjectOnCollision,
            rectCollision)
    ];


    // getters
    this.getMenuObjects = function () {
        return this.menuObj
    };
    this.getVisualObjects = function () {
        return this.visualObj
    };
    this.getDynamicObjects = function () {
        return this.dynamicObj
    };
    this.getGenerators = function () {
        return this.generators;
    };
    this.getCollisionHandlers = function () {
        return this.collisionHandlers;
    }

}
