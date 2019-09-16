const master={
	init:function  (mode,param) {
		//CANVAS CONTEXT DECLARATION
		master.canvas=document.getElementById('gamecanvas');
		master.ctx=master.canvas.getContext('2d');
		//CONTEXT2
		master.canvas2=document.getElementById('gamecanvas2');
		master.ctx2=master.canvas2.getContext('2d');
		//TRANSITION //TODO are transitions global?
		master.transition=new RectClearTransition(master.canvas.width,master.canvas.height);

		//GAME MECHANICAL VARIABLES
		master.mode=mode;
		master.isGameMode=0;
		master.clearTimeOutsOnce=1;
		master.param=param;
		master.updateDelay=22;
		inputHandler.processed=1;
		mainTimeout=0;
		master.clearTimeouts();


		//INIT
		master.prepareObjects(master.mode,param);
		master.mainLoop();


	},
	prepareObjects:function  (mode,param) {
		//AUDIO
		sounds.playSound("button");
		//TRANSITION ACTIVATION
		master.transition.activate();
		//GAME OBJECTS
		master.currentVisualObjects=[];
		master.currentGameObjects=[];
		master.currentMenuObjects=[];
		//END
		if (mode==="main_menu") {
			master.isGameMode=0;
			master.currentVisualObjects=getMainMenuBG();
			master.currentMenuObjects=getMainMenuMenuObjects();
		}
		else if (mode==="explination") {
			master.isGameMode=0;
			master.currentVisualObjects=getExplinationBG();
			master.currentMenuObjects=getExplinationMenuObjects();
		}
		else if (mode==="stage_mode") {
			master.prepareGame(param);
		}
		else if (mode==="mad_run") {} else if (mode == "result_screen") {
		}
	},
	prepareGame:function  (param) {
		//Game (stage,attributes,objects)
		master.game=new Game(param,getGameAttributes(),getGameObjects());
		master.isGameMode=1;
		//master.currentGameObjects=getStageGameObjects(master.param);
		//master.currentVisualObjects=getStageBG(master.param);
		//master.currentMenuObjects=getStageMenuObjects(master.param);
	},
	mainLoop:function  () {
		master.updateGame(inputHandler.getMouseInput());
		master.updateView();
		//MAINLOOP TIMEOUT
		mainTimeout=window.setTimeout(master.mainLoop,master.updateDelay);
	},
	updateGame:function  (input) {
		//UPDATE ALL OBJECTS
		try{
            loopFor(master.currentGameObjects, "update", input);
            loopFor(master.currentMenuObjects, "update", input);
            loopFor(master.currentVisualObjects, "update", input);
		} catch (e) {
		}
		//UPDATE GAME AGENT
		if (master.isGameMode===1) {
			master.game.update(input,inputHandler.processed);
		}
		//INPUT HAS BEEN PROCESSED
		inputHandler.processed=1;

	},
	updateView:function  () {
		let i;
//CLEAR ALL CONTEXT
		master.clearView();
		//END
		for (let i = master.currentVisualObjects.length - 1; i >= 0; i--) {
			master.currentVisualObjects[i].draw(master.ctx);
		}
		for (let i = master.currentGameObjects.length - 1; i >= 0; i--) {
			master.currentGameObjects[i].draw(master.ctx);
		}
		for (let i = master.currentMenuObjects.length - 1; i >= 0; i--) {
			master.currentMenuObjects[i].draw(master.ctx);
		}
		//DRAW GAME AGENT
		if (master.isGameMode===1) {
		master.pakupakumaster.draw(master.ctx);
		}
		//TRANSITION UPDATE
		master.transition.draw(master.ctx2);

	},
	clearView:function  () {
		master.ctx.clearRect(0,0,master.canvas.width,master.canvas.height);
	},
	clearTimeouts:function  () {
		clearTimeout(mainTimeout);
	},

};
$(window).load(function () {
	master.init("main_menu","none");
});





