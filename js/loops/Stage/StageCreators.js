function StageCreator() {
    this.menuObj = [
        new Button(1, "menu", 5, 5, 80, 50, function func() {
            master.loopCollection.changeActiveLoop(0)
        })
    ];

    this.visualObj = [];

    this.dynamicObj = {
        "ships": [
            new PlayerShip(100, 590, 30, 1.0, "")
        ]
    };

    this.getMenuObjects = function () {
        return this.menuObj
    };
    this.getVisualObjects = function () {
        return this.visualObj
    };
    this.getDynamicObjects = function () {
        return this.dynamicObj
    }

}
