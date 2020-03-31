
function StageSelectCreator() {
  this.menuObj = [
   new Button(1,'start stage',125,154,150,60,function func() {
    master.loopCollection.changeActiveLoop(1);})
  ];

  this.visualObj = [
  ];

  this.dynamicObj = [
  ];

  this.getMenuObjects = function() {
    return this.menuObj;
  };
  this.getVisualObjects = function() {
    return this.visualObj;
  };
  this.getDynamicObjects = function() {
    return this.dynamicObj;
  };

}
