 function CInterface(){
    var _oAudioToggle;
    var _oButExit;
    var _oMoneyText;
    var _oWinText;
    var _oTotBetText;
    var _oCoinText;
    var _oButPlay;
    var _oButBuyCards;
    var _oButPaytable;
    var _oAreYouSurePanel;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosMoney;
    var _pStartPosTotBet;
    var _pStartPosWin;
    var _pStartPosPlay;
    var _pStartPosBuy;
    var _pStartPosCoin;
    var _pStartPosPaytable;
    
    this._init = function(){                
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite,true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var iOffsetX = 10;
        if(s_bMobile && !isTablet()){
            iOffsetX = 30;
        }
        
        oSprite = s_oSpriteLibrary.getSprite('but_paytable');
        _pStartPosPaytable = {x: _pStartPosExit.x-oSprite.width -iOffsetX, y: _pStartPosExit.y};
        _oButPaytable = new CGfxButton(_pStartPosPaytable.x, _pStartPosPaytable.y, oSprite,true);
        _oButPaytable.addEventListener(ON_MOUSE_UP, this._onPaytable, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:_pStartPosPaytable.x - oSprite.width-iOffsetX,y:_pStartPosPaytable.y};
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        _pStartPosMoney = {x:300,y:CANVAS_HEIGHT - 90};
        _oMoneyText = new CDisplayText(_pStartPosMoney.x,_pStartPosMoney.y,s_oSpriteLibrary.getSprite('plus_display'),TEXT_CURRENCY +START_PLAYER_MONEY,TEXT_MONEY,40,s_oStage);
        
        _pStartPosTotBet = {x:530,y:CANVAS_HEIGHT - 90};
        _oTotBetText = new CDisplayText(_pStartPosTotBet.x,_pStartPosTotBet.y,s_oSpriteLibrary.getSprite('plus_display'),"",TEXT_TOT_BET,40,s_oStage);
        
        _pStartPosCoin = {x:760,y:CANVAS_HEIGHT - 90};
        _oCoinText = new CDisplayText(_pStartPosCoin.x,_pStartPosCoin.y,s_oSpriteLibrary.getSprite('display_small'),"",TEXT_COIN,37,s_oStage);
        
        _pStartPosWin = {x:894,y:CANVAS_HEIGHT - 90};
        _oWinText = new CDisplayText(_pStartPosWin.x,_pStartPosWin.y,s_oSpriteLibrary.getSprite('plus_display'),"0"+TEXT_CURRENCY,TEXT_WIN,40,s_oStage);

        _pStartPosPlay = {x:1530,y:CANVAS_HEIGHT-50};
        _oButPlay = new CTextButton(_pStartPosPlay.x,_pStartPosPlay.y,s_oSpriteLibrary.getSprite('but_gui'),TEXT_START,PRIMARY_FONT,"#ffffff",50,BUTTON_Y_OFFSET,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlay, this);
        
        _pStartPosBuy = {x:1290,y:CANVAS_HEIGHT-50};
        _oButBuyCards = new CTextButton(_pStartPosBuy.x,_pStartPosBuy.y,s_oSpriteLibrary.getSprite('but_gui'),TEXT_BUY_CARDS,PRIMARY_FONT,"#ffffff",36,BUTTON_Y_OFFSET,s_oStage);
        _oButBuyCards.addEventListener(ON_MOUSE_UP, this._onButBuy, this);
        
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
       this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        _oButExit.unload();
        s_oInterface = null; 
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        _oButPaytable.setPosition(_pStartPosPaytable.x - iNewX,_pStartPosPaytable.y + iNewY);
        _oButPlay.setPosition(_pStartPosPlay.x , _pStartPosPlay.y - iNewY);
        _oButBuyCards.setPosition(_pStartPosBuy.x , _pStartPosBuy.y - iNewY);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        _oMoneyText.setPosition(_pStartPosMoney.x, _pStartPosMoney.y - iNewY);
        _oTotBetText.setPosition(_pStartPosTotBet.x, _pStartPosTotBet.y - iNewY);
        _oWinText.setPosition(_pStartPosWin.x, _pStartPosWin.y - iNewY);
        _oCoinText.setPosition(_pStartPosCoin.x, _pStartPosCoin.y - iNewY);
    };

    this.refreshMoney = function(szValue){
        _oMoneyText.changeText( szValue + TEXT_CURRENCY);
    };
    
    this.refreshTotBet = function(iTotBet,iCoin){
        _oTotBetText.changeText(iTotBet+TEXT_CURRENCY);
        _oCoinText.changeText(iCoin+TEXT_CURRENCY);
    };
    
    this.refreshWin = function(iWin){
        _oWinText.changeText( iWin + TEXT_CURRENCY);
    };
    
    this.enableGUI = function(){
        _oButPlay.enable();
        _oButBuyCards.enable();
    };
    
    this.disableGUI = function(){
        _oButPlay.disable();
        _oButBuyCards.disable();
    };
    
    this._onButPlay = function(){
        this.disableGUI();
        _oWinText.changeText("0"+TEXT_CURRENCY);
        s_oGame.startGame();
    };
    
    this._onButBuy = function(){
        s_oGame.onBuyNewCards();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        _oAreYouSurePanel.show(); 
    };
    
    this._onPaytable = function(){
        s_oGame.onPaytable();
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;