function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgTextBack;
    var _oMsgText;
    var _oScoreTextBack;
    var _oScoreText;
    var _oWinScoreText;
    var _oHelpText;

    this._init = function(oSpriteBg){
        
        _oBg = createBitmap(oSpriteBg);
        
	    _oMsgTextBack = new createjs.Text("","bold 60px "+PRIMARY_FONT, "#000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +1;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-160;
        _oMsgTextBack.textAlign = "center";

        _oMsgText = new createjs.Text("","bold 60px "+PRIMARY_FONT, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2)-162;
        _oMsgText.textAlign = "center";

        _oWinScoreText = new createjs.Text("","bold 60px "+PRIMARY_FONT, "#ffffff");
        _oWinScoreText.x = CANVAS_WIDTH/2;
        _oWinScoreText.y = (CANVAS_HEIGHT/2) - 58;
        _oWinScoreText.textAlign = "center";


        _oScoreTextBack = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +1;
        _oScoreTextBack.y = (CANVAS_HEIGHT/2) + 50;
        _oScoreTextBack.textAlign = "center";
        
        _oScoreText = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 52;
        _oScoreText.textAlign = "center";


        _oHelpText = new createjs.Text("","bold 30px "+PRIMARY_FONT, "#ffffff");
        _oHelpText.x = CANVAS_WIDTH/2;
        _oHelpText.y = (CANVAS_HEIGHT/2) + 142;
        _oHelpText.textAlign = "center";


        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oGroup.addChild(_oBg, _oHelpText, _oWinScoreText, _oScoreTextBack,_oScoreText,_oMsgTextBack,_oMsgText);

        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iScore){

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
	        createjs.Sound.play("game_over");
	    }
        
        _oMsgTextBack.text = TEXT_GAMEOVER;
        _oMsgText.text = TEXT_GAMEOVER;

        _oWinScoreText.text = POINTS_TO_WIN + " credits";

        //_oScoreTextBack.text = TEXT_SCORE +": "+(iScore+POINTS_TO_WIN);
        //_oScoreText.text = TEXT_SCORE +": "+(iScore+POINTS_TO_WIN);

        // uncomment two lines below if calculate() method was disabled
        _oScoreTextBack.text = TEXT_SCORE +": "+(iScore);
        _oScoreText.text = TEXT_SCORE +": "+(iScore);

        _oHelpText.text = "please click anywhere to continue ...";
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        $(s_oMain).trigger("save_score",[POINTS_TO_WIN, iScore, s_iMode]);
        $(s_oMain).trigger("end_level",1);
      
        $(s_oMain).trigger("share_event",[iScore]);
    };
    
    this._onExit = function(){
        
        $(s_oMain).trigger("show_interlevel_ad");
		$(s_oMain).trigger("end_session",1);
        
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg);
    
    return this;
}
