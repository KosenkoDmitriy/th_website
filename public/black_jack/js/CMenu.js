function CMenu(){
    var _pStartPosAudio;
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _oFade;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_menu_bg');
        _oButPlay = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -164,oSprite,TEXT_PLAY,FONT_GAME_1,"#ffffff",40,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
             var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width/4) - 10, y: (oSprite.height/2) + 10};   
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 400).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        s_oMain.gotoGame();
        
        $(s_oMain).trigger("start_session");
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;