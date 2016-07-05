function CCard(iX,iY,oParentContainer,szFotogram,iRank,iSuit){
    var _bPlaced=false;
    var _bValue=true;        
    var _bTurned;
    
    var _szType;
    var _szColor;
    var _szFotogram;
    var _iRank;
    
    var _iSuit;
    var _iFirstDrag;
    var _iDepth;
    
      
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oCardSprite;
    var _oHitArea;
    var _oContainer;
    var _oParentContainer;   
    var _oThisCard;
    var _oParent;
    var _oOldPos;
    

    
    this._init = function(iX,iY,oParentContainer,szFotogram,iRank,iSuit){
        _oParentContainer = oParentContainer;
        _szFotogram = szFotogram;
        _iRank = iRank;
        _iSuit = iSuit;
        _iFirstDrag = 0;
        _bTurned = false;
        _szType = "deck";
        
        if(_iSuit===0 || _iSuit=== 2){
            _szColor = "red";
        } else {
            _szColor = "black";
        }
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('card_spritesheet');
        var oData = {   // image to use
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CARD_WIDTH, height: CARD_HEIGHT,regX:CARD_WIDTH/2,regY:CARD_HEIGHT/2}, 
                        animations: {  card_1_1: [0],card_1_2:[1],card_1_3:[2],card_1_4:[3],card_1_5:[4],card_1_6:[5],card_1_7:[6],card_1_8:[7],
                                       card_1_9:[8],card_1_10:[9],card_1_J:[10],card_1_Q:[11],card_1_K:[12],
                                       card_2_1: [13],card_2_2:[14],card_2_3:[15],card_2_4:[16],card_2_5:[17],card_2_6:[18],card_2_7:[19],
                                       card_2_8:[20], card_2_9:[21],card_2_10:[22],card_2_J:[23],card_2_Q:[24],card_2_K:[25],
                                       card_3_1: [26],card_3_2:[27],card_3_3:[28],card_3_4:[29],card_3_5:[30],card_3_6:[31],card_3_7:[32],
                                       card_3_8:[33], card_3_9:[34],card_3_10:[35],card_3_J:[36],card_3_Q:[37],card_3_K:[38],
                                       card_4_1: [39],card_4_2:[40],card_4_3:[41],card_4_4:[42],card_4_5:[43],card_4_6:[44],card_4_7:[45],
                                       card_4_8:[46], card_4_9:[47],card_4_10:[48],card_4_J:[49],card_4_Q:[50],card_4_K:[51],back:[52]}
                        
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oCardSprite = createSprite(oSpriteSheet,"back",0,0,CARD_WIDTH,CARD_HEIGHT);
        _oCardSprite.stop();
        _oContainer.addChild(_oCardSprite);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);
        _oHitArea.on("mousedown",this._mouseDown);
        _oContainer.addChild(_oHitArea);
       
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
    };
    
    this.unload = function(){
        _oHitArea.off("mousedown",this._mouseDown);
        _oParentContainer.removeChild(_oContainer);
        
    };
    
    this.saveInfo = function(){
        return {szFotogram : _szFotogram, iRank: _iRank, iSuit: _iSuit, bValue:_bValue}; 
    };
    
    this.changeInfo = function(szFotogram,iRank,iSuit){
        _szFotogram = szFotogram;
        _iRank = iRank;
        _iSuit = iSuit;
    };
    
    this.instantShow = function (){
        _oCardSprite.gotoAndStop(_szFotogram);
    };
    
    this.setValue = function(bUnblock){
        _oCardSprite.gotoAndStop(_szFotogram);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
                createjs.Sound.play("card");
        }
        
        var oParent = this;
        createjs.Tween.get(_oContainer).to({scaleX:1}, 200);
    };
    
    this.setActive = function(bVar){
        if(bVar){
            _oContainer.addChild(_oHitArea);
        } else {
            _oContainer.removeChild(_oHitArea);
        }
    };
    
    this.setVisible = function(bVar){
        if(bVar===true){
            _oContainer.visible=true;
        } else {
            _oContainer.visible=false;
        }
        
    };
    
    this.moveCard = function(iX, iY, iTime,iDelay){        
        createjs.Tween.get(_oContainer).wait(iDelay).to({x:iX, y:iY}, iTime, createjs.Ease.linear).call(function(){_oParent.setPlaced()});
    };

    this.moveDeckCard = function(iX, iY, iTime,iDelay){        
        createjs.Tween.get(_oContainer).wait(iDelay).to({x:iX, y:iY}, iTime, createjs.Ease.linear).call(function(){s_oGame.activeDeck(); _oParent.showCard();});
    };

    this.moveToSuit = function(iX, iY,iDelay){        
        
	createjs.Tween.get(_oContainer).wait(iDelay).to({x:iX, y:iY}, 200, createjs.Ease.cubicOut).call(function(){s_oGame.stackInSuit(_oParent);});
    };

    this.setPlaced = function(){
        _bPlaced=true;
        s_oGame.scaleDepth(this.getSprite());
    };

    this.stackInPlace = function (iX, iY, iTime){
            createjs.Tween.get(_oContainer).to({x:iX, y:iY}, iTime, createjs.Ease.cubicOut).call(function(){_bTurned=true});       
    };

    this.stackAndDeactive = function (iX, iY, iTime){
            createjs.Tween.get(_oContainer).to({x:iX, y:iY}, iTime, createjs.Ease.cubicOut);       
    };

    this._mouseDown = function(event){
        if(_bTurned=== false){
            return;
        }
        _oOldPos = {x: _oContainer.x , y: _oContainer.y };
        _iDepth = _oParentContainer.getChildIndex(_oContainer);
        s_oGame.pickCard(_oParent,event);
    };
    
    this.getPlaced = function(){
        return _bPlaced;
    };
        
    this.showCard = function(){
        var oParent = this;
        createjs.Tween.get(_oContainer ).to({scaleX:0.1}, 200).call(function(){oParent.setValue()}).call(function(){_bTurned=true});
    };
		
    this.hideCard = function(){
        var oParent = this;
        createjs.Tween.get(_oContainer).to({scaleX:0.1}, 200).call(function(){oParent.setBack()});
    };
    
    this.setPos = function(iX, iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
    };
    
    this.setBack = function(){
        _bTurned=false;
        _oCardSprite.gotoAndStop("back");
        var oParent = this;
        createjs.Tween.get(_oContainer).to({scaleX:1}, 200).call(function(){oParent.cardHidden()});
    };
    
    this.cardHidden = function(){
        if(_aCbCompleted[ON_CARD_HIDE]){
            _aCbCompleted[ON_CARD_HIDE].call(_aCbOwner[ON_CARD_HIDE],this);
        }
    };
    
    this.getRank = function(){
        return _iRank;
    };
		
    this.getSuit = function(){
        return _iSuit;
    };

    this.getColor = function(){
        return _szColor;
    };
    
    this.getFotogram = function(){
        return _szFotogram;
    };
    
    this.getPos = function(){
        return {x: _oContainer.x, y: _oContainer.y};
    };
    
    this.getSprite = function(){
        return _oContainer;
    };
    
    this.getLogicRect = function(){
        return new createjs.Rectangle(_oContainer.x - CARD_WIDTH/2,_oContainer.y - CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
    };
    
    _oThisCard = this;
    
    _oParent=this;
    this._init(iX,iY,oParentContainer,szFotogram,iRank,iSuit);
                
}