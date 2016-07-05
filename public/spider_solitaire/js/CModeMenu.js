function CModeMenu(){
    var _oBg;
    var _oContainerEasy;
    var _oContainerNormal;
    var _oContainerHard;
    var _oTextMode1;
    var _oTextEasy;
    var _oTextMode2;
    var _oTextNormal;
    var _oTextMode3;
    var _oTextHard;
    var _oEasyButton;
    var _oNormalButton;
    var _oHardButton;
    var _oTextTop;
    
    var _oParent;
    
    var _oFade;
    var _oAudioToggle;
    
    var _pStartPosAudio;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_layout'));
        s_oStage.addChild(_oBg);

        
        _oTextTop = new createjs.Text(TEXT_TOP_MODE,"bold 60px "+PRIMARY_FONT, "#ffffff");
        _oTextTop.x = CANVAS_WIDTH/2;
        _oTextTop.y = (CANVAS_HEIGHT/2)-170;
	_oTextTop.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextTop.textAlign = "center";
        _oTextTop.lineWidth = 800;
        s_oStage.addChild(_oTextTop);

        _oContainerEasy = new createjs.Container();
        _oContainerEasy.x = CANVAS_WIDTH/2 - 440;
        _oContainerEasy.y = 369;
        
        _oContainerNormal = new createjs.Container();
        _oContainerNormal.x = CANVAS_WIDTH/2 -120;
        _oContainerNormal.y = 369;
        
        _oContainerHard = new createjs.Container();
        _oContainerHard.x = CANVAS_WIDTH/2 + 200;
        _oContainerHard.y = 369;


        _oTextMode1 = new createjs.Text(TEXT_MODE_1,"bold 28px "+PRIMARY_FONT, "#01ff8f");
        _oTextMode1.x = 122;
        _oTextMode1.y = 88;
		_oTextMode1.shadow = new createjs.Shadow("#000000", 3, 3, 3);
	_oTextMode1.textBaseline = "alphabetic";
        _oTextMode1.textAlign = "center";
        _oTextMode1.lineWidth = 300;
        _oContainerEasy.addChild(_oTextMode1);

        _oTextEasy = new createjs.Text(TEXT_EASY,"bold 34px "+PRIMARY_FONT, "#ffffff");
        _oTextEasy.x = 122;
        _oTextEasy.y = 35;
		_oTextEasy.shadow = new createjs.Shadow("#000000", 3, 3, 3);
	_oTextEasy.textBaseline = "alphabetic";
        _oTextEasy.textAlign = "center";
        _oTextEasy.lineWidth = 300;
        _oContainerEasy.addChild(_oTextEasy);
        
        _oTextMode2 = new createjs.Text(TEXT_MODE_2,"bold 28px "+PRIMARY_FONT, "#01ff8f");
        _oTextMode2.x = 122;
        _oTextMode2.y = 88;
		_oTextMode2.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextMode2.textBaseline = "alphabetic";
        _oTextMode2.textAlign = "center";
        _oTextMode2.lineWidth = 300;
        _oContainerNormal.addChild(_oTextMode2);
        
        _oTextNormal = new createjs.Text(TEXT_NORMAL,"bold 34px "+PRIMARY_FONT, "#ffffff");
        _oTextNormal.x = 125;
        _oTextNormal.y = 35;
		_oTextNormal.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextNormal.textBaseline = "alphabetic";
        _oTextNormal.textAlign = "center";
        _oTextNormal.lineWidth = 300;
        _oContainerNormal.addChild(_oTextNormal);
        
        _oTextMode3 = new createjs.Text(TEXT_MODE_3,"bold 28px "+PRIMARY_FONT, "#01ff8f");
        _oTextMode3.x = 122;
        _oTextMode3.y = 88;
		_oTextMode3.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextMode3.textBaseline = "alphabetic";
        _oTextMode3.textAlign = "center";
        _oTextMode3.lineWidth = 300;
        _oContainerHard.addChild(_oTextMode3);
        
        _oTextHard = new createjs.Text(TEXT_HARD,"bold 34px "+PRIMARY_FONT, "#ffffff");
        _oTextHard.x = 125;
        _oTextHard.y = 35;
		_oTextHard.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextHard.textBaseline = "alphabetic";
        _oTextHard.textAlign = "center";
        _oTextHard.lineWidth = 300;
        _oContainerHard.addChild(_oTextHard);
        
        s_oStage.addChild(_oContainerEasy);
        s_oStage.addChild(_oContainerNormal);
        s_oStage.addChild(_oContainerHard);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }


        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(4, 0, 240, 250);
		
        _oEasyButton = new createjs.Shape(graphics);
        _oContainerEasy.addChild(_oEasyButton);
        _oEasyButton.on("pressup", this._selectEasy);

        _oNormalButton = new createjs.Shape(graphics);
        _oContainerNormal.addChild(_oNormalButton);
        _oNormalButton.on("pressup", this._selectNormal);     

        _oHardButton = new createjs.Shape(graphics);
        _oContainerHard.addChild(_oHardButton);
        _oHardButton.on("pressup", this._selectHard);


        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
    };
    
    this._selectEasy = function(){
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }
        _oParent.unload();
        s_oMain.gotoGame(1);
    };
    
    
    this._selectNormal = function(){
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }
        _oParent.unload();
        s_oMain.gotoGame(2);
    };

    this._selectHard = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }
        _oParent.unload();
        s_oMain.gotoGame(3);
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        _oEasyButton.off("pressup", this._selectEasy);
        _oNormalButton.off("pressup", this._selectNormal);
        _oHardButton.off("pressup", this._selectHard);
        
        s_oStage.removeAllChildren();
        _oBg = null;
        
        s_oModeMenu = null;
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }
        
        s_oMain.gotoGame();
    };

    _oParent=this;
    s_oModeMenu = this;
    this._init();
}

var s_oModeMenu = null;