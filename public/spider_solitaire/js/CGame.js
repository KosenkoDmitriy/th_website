function CGame(oData){
    var _bStartGame=false;
    var _bTouchActive;
    var _bBlock;
    var _bInitGame;
    
    var _iScore;
    var _iMoves;
    var _iCurTouchX;
    var _iCurTouchY;
    var _iContTouchMS;
    var _iStartCont;
    var _iStackOffsetBack;
    var _iDepth;
    var _iContAnim;
    var _iCurPos;
    var _iMouseOffset;
    var _iStackCardOffset;
    var _iDeckButtPos;
    var _iDeckCardPlaced;
    var _iTurnCardCont;
    var _iLastCol;
    var _iCheckEndGame;
    var _iCurIndexCardMovingToSuit;
         
    var _aCardStartPos;
    var _aSuitPos;
    var _aDeckPos;
    var _aCard;
    var _aDeckCard;
    var _aGridMatrix;
    var _aStackCard;
    var _aCardsToMoveSuit;
         
    var _oInterface;
    var _oEndPanel = null;
    var _oCardContainer;
    var _oStartLogicCardPos;
    var _oParent;
    var _oDeckArea;
    var _oDenyClickArea;
    var _oAudioCard;
    var _oHintArea;

    
    this._init = function(){
		
        _iStackOffsetBack = 10;
        _iStackCardOffset = 23;
        _iDepth=0;
        _iContAnim=0;
        _iDeckButtPos=0;
        _iDeckCardPlaced=0;
        _iTurnCardCont=0;
        _iCheckEndGame=0;
        _iScore=POINTS_TO_START;
        _iMoves=0;
        
        _bTouchActive=false;
        _bInitGame=true;
        _bBlock=true;
 
        _oStartLogicCardPos=null;        
        _oInterface = new CInterface();
        
        
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
                _oAudioCard = createjs.Sound.play("card_dealing" ,{loop:-1});
        }
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); //Draws on canvas

        _oInterface = new CInterface();
        _oInterface.refreshScore(_iScore);

        _aCard =  new Array();
        _aDeckCard = new Array();
        _aStackCard = new Array();

        _iStartCont = 0;
        _aCardStartPos = new Array();
        for (var i=0; i<7; i++){
            for (var j=0; j<10; j++){                
                _aCardStartPos[_iStartCont]={x: 299+j*81, y:220+i*_iStackOffsetBack};
                if(j>4){
                    _aCardStartPos[_iStartCont]={x: 300+j*81, y:220+i*_iStackOffsetBack};
                }
                _iStartCont++;
            }            
        }

        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        _aSuitPos = new Array();        
        _aSuitPos[SUIT_HEARTS]={x: 1212, y:220};
        _aSuitPos[SUIT_SPADES]={x: 1302, y:220};
        _aSuitPos[SUIT_DIAMONDS]={x: 1212, y:350};
        _aSuitPos[SUIT_CLUBS]={x: 1302, y:350};
                
        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(_aSuitPos[SUIT_HEARTS].x - CARD_WIDTH/2, _aSuitPos[SUIT_HEARTS].y - CARD_HEIGHT/2, 170, 250);
        _oDenyClickArea = new createjs.Shape(graphics);
        _oDenyClickArea.on("click", this._denyClick);
        s_oStage.addChild(_oDenyClickArea);
                
        
        var oDeckPos = {x:1212, y:614, offset:22};
        _aDeckPos = new Array();
        for(var i=0; i<5; i++){
            _aDeckPos[i] = {x: oDeckPos.x + i*oDeckPos.offset, y: oDeckPos.y};
        }

        _aGridMatrix = new Array();
        for (var i=0; i<40; i++){
            _aGridMatrix[i]= new Array();
            for (var j=0; j<10; j++){
                _aGridMatrix[i][j]= {status:LABEL_EMPTY, oCard:null};
            }
        }


        var oCardInfo
        switch(s_iMode){
            
            case 1:{
                    oCardInfo = this._initCards(0);
                    break;
            }
            
            case 2:{
                    oCardInfo = this._initCards(1);
                    break;
            }
            
            case 3:{
                    oCardInfo = this._initCards(2);
                    break;
            }
        }
        
        
        
    
        
        this._shuffleCard(oCardInfo, true);//True to shuffle
        this._setBoard();
    

        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(_aDeckPos[_iDeckButtPos].x - CARD_WIDTH/2, _aDeckPos[_iDeckButtPos].y - CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);
        _oDeckArea = new createjs.Shape(graphics);
        _oDeckArea.on("click", this._turnDeck);
        _oDeckArea.visible=false;
        s_oStage.addChild(_oDeckArea);
        
        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(_aDeckPos[_iDeckButtPos].x - CARD_WIDTH/2, _aDeckPos[_iDeckButtPos].y - CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);
        _oHintArea = new createjs.Shape(graphics);
        _oHintArea.on("click", this._hintForDeck);
        _oHintArea.visible=false;
        s_oStage.addChild(_oHintArea);
    
        //TOUCH EVENTS
       
        s_oStage.addEventListener( 'stagemousemove', this.dragCard, false );
        s_oStage.addEventListener( 'stagemouseup', this.releaseCard, false );
        
		$(s_oMain).trigger("start_level",1);
		
    };
    
    this._initCards = function(iGameMode) {
        
        var iFotoStart;
        var iFotoLimit; 
        var iSuitStart;
        
        if(iGameMode === 0){
            iFotoStart= 13;
            iFotoLimit= 25;
            iSuitStart=1;
            
        } else if (iGameMode === 1){
            iFotoStart= 0;
            iFotoLimit= 25;
            iSuitStart=0;
        } else {
            iFotoStart= 0;
            iFotoLimit= 51;
            iSuitStart=0;
        }
        
        var iSuit = iSuitStart;
        var iFoto = iFotoStart;
        var aCardDeck=new Array();
        for(var j=0;j<104;j++){
            var iRest=(j+1)%13;
            if(iRest === 0){
                iRest = 13;
            }            
            aCardDeck.push({fotogram:iFoto,rank:iRest,suit:iSuit});
            
            if(iRest === 13){
                iSuit++;
            }
            
            iFoto++;
            if(iFoto > iFotoLimit){
                iFoto = iFotoStart;
                iSuit = iSuitStart;
            }            
        }
       
       return aCardDeck;
       
    };
    
    this._shuffleCard = function(aCardDeck,bVal){
        
        var aTmpDeck=new Array();

        for(var i=0;i<aCardDeck.length;i++){
                aTmpDeck[i]=aCardDeck[i];
        }

        var aShuffledCardDecks = new Array();
        while (aTmpDeck.length > 0) {
                aShuffledCardDecks.push(aTmpDeck.splice(Math.round(Math.random() * (aTmpDeck.length - 1)), 1)[0]);
        }
        
        
        if(bVal){
            for(var i=0; i<aShuffledCardDecks.length; i++){
                _aCard[i] = new CCard (_aDeckPos[0].x, _aDeckPos[0].y, _oCardContainer, 
                                                    aShuffledCardDecks[i].fotogram,aShuffledCardDecks[i].rank,aShuffledCardDecks[i].suit);
            }
            
        } else {
            for(var i=0; i<aShuffledCardDecks.length; i++){
                _aCard[i] = new CCard (_aDeckPos[0].x, _aDeckPos[0].y, _oCardContainer, 
                                                    aCardDeck[i].fotogram, aCardDeck[i].rank, aCardDeck[i].suit);
            }
        }        
                      
    };
    
    this._setBoard = function(){
        
        var iDelay=0;
        var iTimeMove = 150;
        var iDelayIncr = 50;
        var iCont=_aCard.length-1;

        
        for(var i=_aCard.length-1; i>=50; i--){
            _aCard[i].moveCard(_aCardStartPos[_aCard.length-1-i].x, _aCardStartPos[_aCard.length-1-i].y, iTimeMove, iDelay);
            iDelay+=iDelayIncr;
        }
        
        for (var i=0; i<6; i++){
            for (var j=0; j<10; j++){                
                _aGridMatrix[i][j].oCard = _aCard[iCont];
                _aGridMatrix[i][j].status = LABEL_HIDDEN;                               
                iCont--;      
                if(i===5 && j===3){
                    break;
                }
                
            }            
        }    
        
        
        for(var i=54; i<_aCard.length; i++){
            _aDeckCard[_aCard.length-1-i] = _aCard[_aCard.length-1-i];
        }        
        
    };
    
    this.scaleDepth = function(oCard){        
        _oCardContainer.setChildIndex(oCard,_iDepth);
        _iDepth++;     
    }; 
    
    this.pickCard = function(oCard, event){
        if(_aStackCard.length!==0 || _bBlock){ //do not allow more then one pick on mobile.
            return;
        }
        _bBlock=true;        

        _iCurPos = {x: oCard.getPos().x, y: oCard.getPos().y };
        _iMouseOffset = {x : event.stageX - _iCurPos.x, y : event.stageY - _iCurPos.y};
        
        //Check all card stack under picked one.                                  
        for(var j=0; j<10; j++){
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].oCard===oCard){
                    _oStartLogicCardPos = {row: i, column: j};
                }                
            }
        }    

        /* Debug Mode
        var iCont=0;
        for (var i=_oStartLogicCardPos.row; i<_aGridMatrix.length; i++){
            if(_aGridMatrix[i][_oStartLogicCardPos.column].status === LABEL_SHOWN){
                iCont++;
            }
        }
        */

        var iCont = 0;
        var iRank = oCard.getRank();
        for (var i=_oStartLogicCardPos.row; i<_aGridMatrix.length; i++){
            if(_aGridMatrix[i][_oStartLogicCardPos.column].status === LABEL_SHOWN && 
                    _aGridMatrix[i][_oStartLogicCardPos.column].oCard.getSuit() === oCard.getSuit()){
                if(_aGridMatrix[i][_oStartLogicCardPos.column].oCard.getRank() === iRank){
                    iCont++;
                    iRank--;
                } else {
                    iCont=0;
                    break;
                }    
                    
                
            } else if (_aGridMatrix[i][_oStartLogicCardPos.column].status === LABEL_EMPTY){
                break;
                
            } else if (_aGridMatrix[i][_oStartLogicCardPos.column].oCard.getSuit() !== oCard.getSuit()){                
                iCont=0;
                break;
                
            }
        }

        var aInfo = new Array();
        for (var i=0; i<iCont; i++){
            aInfo[i] = _aGridMatrix[_oStartLogicCardPos.row + i][_oStartLogicCardPos.column].oCard.saveInfo();
            _aStackCard[i] = new CCard(_iCurPos.x, _iCurPos.y + i*_iStackCardOffset, _oCardContainer, aInfo[i].szFotogram, aInfo[i].iRank, aInfo[i].iSuit);
            _aGridMatrix[_oStartLogicCardPos.row + i][_oStartLogicCardPos.column].oCard.unload();
            _aStackCard[i].instantShow();
        }
        ////////////////////////////////////////
        
       
    };
    
    this.dragCard = function(event){

        if(!_bInitGame && _bBlock){
           for(var i=0; i<_aStackCard.length; i++){
               _aStackCard[i].setPos(event.stageX - _iMouseOffset.x , event.stageY - _iMouseOffset.y +i*_iStackCardOffset);
           }
          
        }     
    };
    
    this.releaseCard = function(event){
        if(_bInitGame === false && _aStackCard.length > 0){
            _bBlock=false;
        }else{
            _bBlock=false;
            return;
        }

        _oParent._checkCardCollision(_aStackCard);

        _oStartLogicCardPos=null;
        _aStackCard = [];

    };    
    
    this._checkCardCollision = function(oCard){
        
        var iCont=0;
        var aRect = new Array();
        var oLastCard = new Array();        
        
        for(var j=0; j<10; j++){
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].status===LABEL_SHOWN){
                    aRect[iCont] = _aGridMatrix[i][j].oCard.getLogicRect();
                    oLastCard[iCont] = {oCard:_aGridMatrix[i][j].oCard,
                                        x: _aGridMatrix[i][j].oCard.getPos().x, y: _aGridMatrix[i][j].oCard.getPos().y, 
                                        row: i, column: j};
                    iCont++;                    
                    break;
                } else if (i===0){
                    aRect[iCont] = new createjs.Rectangle(
                        _aCardStartPos[j].x - CARD_WIDTH/2,_aCardStartPos[j].y - CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
                        iCont++;
                }                                     
            }
        }
        
        var iMaxArea=0;
        var iColIntersect=-1;
        var rCurRect = oCard[0].getLogicRect();
        
        
        
        for (var i=0; i<aRect.length; i++){
            var rAppRect = rCurRect.intersection(aRect[i]);
            if(rAppRect!== null){
                if(iMaxArea < (rAppRect.width*rAppRect.height)){
                   
                    iMaxArea = (rAppRect.width*rAppRect.height);
                    iColIntersect = i;
                }              
            }                                    
        }

        if(iColIntersect<0){//Not collide
            for(var i=0; i<oCard.length; i++){
                oCard[i].stackInPlace(_iCurPos.x, _iCurPos.y + i*_iStackCardOffset, 200);
                _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].oCard=oCard[i];               
            }      
         
           //Collide with an empty space 
        } else if(_aGridMatrix[0][iColIntersect].status === LABEL_EMPTY){
            
            for(var i=0; i<oCard.length; i++){
                oCard[i].stackInPlace(_aCardStartPos[iColIntersect].x, _aCardStartPos[iColIntersect].y + i*_iStackCardOffset,200);
                _aGridMatrix[i][iColIntersect].status=LABEL_SHOWN;
                _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].status=LABEL_EMPTY;
                _aGridMatrix[i][iColIntersect].oCard=oCard[i];

            }   
                this._updateMoves();
                this._removeScore();
            
            this._checkBoard(oCard[0], iColIntersect);
            this._checkMoves();
            
            //Collide with a card
        } else if(oLastCard[iColIntersect].oCard.getRank()- oCard[0].getRank() === 1) {

                for(var i=0; i<oCard.length; i++){
                    oCard[i].stackInPlace(oLastCard[iColIntersect].x, oLastCard[iColIntersect].y + _iStackCardOffset + i*_iStackCardOffset,200);
                    _aGridMatrix[oLastCard[iColIntersect].row+1+i][oLastCard[iColIntersect].column].status=LABEL_SHOWN;
                    _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].status=LABEL_EMPTY;
                    _aGridMatrix[oLastCard[iColIntersect].row+1+i][oLastCard[iColIntersect].column].oCard=oCard[i];                    
                }
            
                this._updateMoves();
                this._removeScore();
            
            this._checkBoard(oCard[0], iColIntersect);
            this._checkMoves();
            
            
        } else {//case that collide with a rect, but not match
            for(var i=0; i<oCard.length; i++){
                oCard[i].stackInPlace(_iCurPos.x, _iCurPos.y + i*_iStackCardOffset, 200);
                _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].oCard=oCard[i];               
            }      
        }
        
        
    };
    
    
    
    this._checkBoard = function(oCard, iStackColumn){
         
        
        //Turn a card in stack        
        this._turnCard(_oStartLogicCardPos.column);
        
        //Check if a scale is completed
        _iLastCol = iStackColumn;
        var iCont=1;
        var iKingIndex;
        _aCardsToMoveSuit = new Array();
        
        for(var i=_aGridMatrix.length-1; i>=0; i--){
            
            if(_aGridMatrix[i][iStackColumn].status===LABEL_EMPTY){
                iKingIndex=i;
                
            } else if(_aGridMatrix[i][iStackColumn].oCard.getRank() === iCont && 
                        _aGridMatrix[i][iStackColumn].oCard.getSuit() === oCard.getSuit() &&
                            _aGridMatrix[i][iStackColumn].status===LABEL_SHOWN){
                iCont++;
                iKingIndex=i;
		_aCardsToMoveSuit.push(_aGridMatrix[i][iStackColumn].oCard);
            } else {
                break;
            }                                   
        }
        
        var iSuit = oCard.getSuit();
        //trace("_aCardsToMoveSuit.length: "+_aCardsToMoveSuit.length);
        if(_aCardsToMoveSuit.length === 13){
            _bBlock=true;
            _iCurIndexCardMovingToSuit = 0;
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
                        createjs.Sound.play("snap");
            }
            
            for(var i=0; i<13; i++){
                _aGridMatrix[iKingIndex+12-i][iStackColumn].status = LABEL_EMPTY;                
                _aGridMatrix[iKingIndex+12-i][iStackColumn].oCard = null;
            }
            _aCardsToMoveSuit[_iCurIndexCardMovingToSuit].moveToSuit(_aSuitPos[iSuit].x, _aSuitPos[iSuit].y,210);
        }
        
        this._checkIfActiveDeck();
        
    };
    
    this._turnCard = function (iCol){

        //Turn a card in stack
        for(var i=_aGridMatrix.length-1; i>=0; i--){
            if ( _aGridMatrix[i][iCol].status===LABEL_SHOWN){

                break;

            } else if ( _aGridMatrix[i][iCol].status===LABEL_HIDDEN){

                _aGridMatrix[i][iCol].oCard.showCard();
                _aGridMatrix[i][iCol].status = LABEL_SHOWN;

                break;
            }           
        } 
    };
    
    this.stackInSuit = function(oCard){
		
	_iCurIndexCardMovingToSuit++;

        if(_iCurIndexCardMovingToSuit <13){
            var iSuit = _aCardsToMoveSuit[_iCurIndexCardMovingToSuit].getSuit();
            if(_iCurIndexCardMovingToSuit > 1){
                _aCardsToMoveSuit[_iCurIndexCardMovingToSuit - 2].setVisible(false);
            }
            _oCardContainer.swapChildren( _aCardsToMoveSuit[_iCurIndexCardMovingToSuit].getSprite(),_aCardsToMoveSuit[_iCurIndexCardMovingToSuit-1].getSprite() );
            _aCardsToMoveSuit[_iCurIndexCardMovingToSuit].moveToSuit(_aSuitPos[iSuit].x, _aSuitPos[iSuit].y,0);

        }else{
            _iCheckEndGame++;
            _iTurnCardCont=0;
            _bBlock=false;

            this._turnCard(_iLastCol);
            this._calculateScore(oCard, POINTS_TO_WIN);
            
            if(_iCheckEndGame === 8){
                    this.gameOver(); 
            }else{
                    _bBlock = false;
            }
			
	}
    };
    
    this._checkIfActiveDeck = function(){
        
        var iCont=0;
        for(var j=0; j<10; j++){
            if(_aGridMatrix[0][j].status === LABEL_EMPTY){
                iCont++;
            }
        }
        
        if(iCont>0){
            _oDeckArea.visible=false;
            _oHintArea.visible=true;
            if(_iDeckButtPos === 5){
                _oHintArea.visible.false;
            }

            
        } else {
            _oHintArea.visible=false;
            _oDeckArea.visible=true;
            
        }
    };
    
    this._hintForDeck = function(){
        _oInterface.showHint("deck");
        
    };
    
    this._turnDeck = function(){
        if(_bBlock || _iDeckButtPos===5){
            return;
        }
        
        _bBlock=true;
        _oParent.activeDeck();
        _iDeckButtPos++;
        
        _oDeckArea.x = _iDeckButtPos*22;
        _oHintArea.x = _iDeckButtPos*22;
        
        var oPlaceAvailable = new Array();
        for(var j=0; j<10; j++){
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].status===LABEL_SHOWN){
                    oPlaceAvailable[j] = {x: _aGridMatrix[i][j].oCard.getPos().x, y: _aGridMatrix[i][j].oCard.getPos().y + _iStackCardOffset,
                                            row: i+1, column: j};                                    
                    break;
                } else if (i===0){
                    oPlaceAvailable[j] = {row: 0, column: j};
                }                                     
            }
        }
        
        
        var iTime=200;
        var iDelay=100;
        var iDelayIncrease=100;
        
        var aInfo = new Array();
        var oCard = new Array();
        
        for (var i=0; i<10; i++){ //Create and order depth of view of cards
            aInfo[i] = _aDeckCard[_aDeckCard.length-10+i].saveInfo();
            _aDeckCard[_aDeckCard.length-10+i].unload();
            _aDeckCard.splice(_aDeckCard.length-10+i,1);

            oCard[i] = new CCard(_aDeckPos[_iDeckButtPos-1].x, _aDeckPos[_iDeckButtPos-1].y, _oCardContainer, aInfo[i].szFotogram, aInfo[i].iRank, aInfo[i].iSuit);
        }
        
        for (var i=0; i<10; i++){ //Move Cards in Board       
            _aGridMatrix[oPlaceAvailable[i].row][i].oCard = oCard[10-1-i];
            _aGridMatrix[oPlaceAvailable[i].row][i].status = LABEL_SHOWN;
            oCard[10-1-i].moveDeckCard(oPlaceAvailable[i].x, oPlaceAvailable[i].y, iTime, iDelay);           
            iDelay+=iDelayIncrease;
        }

        
        _oParent._checkMoves();
    };
    
    this.activeDeck = function(){
        _iDeckCardPlaced++;
        
        if(_iDeckCardPlaced===11){
            _bBlock=false;
            _oDeckArea.visible=true;
            _iDeckCardPlaced=0;
            this._checkScaleAllColumn();
        } else {
            _oDeckArea.visible=false;
            
            
        }
    };
    
    this._checkScaleAllColumn = function(){
        for(var j=0; j<10; j++){
            
            var iCont=1;
            var iKingIndex=_aGridMatrix.length-1;
            var iColor;
            var row;
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].status===LABEL_SHOWN){
                    iColor=_aGridMatrix[i][j].oCard.getSuit();
                    row = i;
                    break;
                }
            }
            
            for(var i=row; i>=0; i--){
                if(_aGridMatrix[i][j].oCard.getRank() === iCont && 
                            _aGridMatrix[i][j].oCard.getSuit() === iColor &&
                                _aGridMatrix[i][j].status===LABEL_SHOWN){
                    iCont++;
                } else {
                    
                    break;
                }                                   
            }

            var iTime=100;
            var iDelay=300;
            var iDelayIncrease=100;
           
            if(iCont===14){
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
                            createjs.Sound.play("snap");
                }
                _iLastCol=j;
                iKingIndex=row-12;
                var iSuit = _aGridMatrix[iKingIndex][j].oCard.getSuit();
                for(var i=0; i<13; i++){

                    _aGridMatrix[iKingIndex+12-i][j].oCard.moveToSuit(_aSuitPos[iSuit].x, _aSuitPos[iSuit].y, iTime, iDelay);
                    _aGridMatrix[iKingIndex+12-i][j].status = LABEL_EMPTY;                
                    _aGridMatrix[iKingIndex+12-i][j].oCard = null;
                    iDelay+=iDelayIncrease;
                }
            }            
        }
        
        this._checkIfActiveDeck();
    };
    
    this._denyClick = function(){
        //trace("you shall not click!!");
    };
    
    this._checkMoves = function(){
        if(_iDeckButtPos<5){
            return;
        }                
        
        //Set bottom card of each column
        var aBotBoardCard = new Array();
        var oLastCardPos = new Array();
        for(var j=0; j<10; j++){
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].status===LABEL_SHOWN){
                    aBotBoardCard.push(_aGridMatrix[i][j].oCard);
                    oLastCardPos.push({row:i, column:j});
                    break;
                }                                   
            }
        }
        
        //Set top card pickable of each column
        var aTopBoardCard = new Array();
        for(var j=0; j<oLastCardPos.length; j++){
            var iCol = oLastCardPos[j].column;
            var iRow = oLastCardPos[j].row;
            var iRank = _aGridMatrix[iRow][iCol].oCard.getRank();
            var iSuit = _aGridMatrix[iRow][iCol].oCard.getSuit();
            //trace(iRank);
            for(var i=iRow; i>=0; i--){
                if(_aGridMatrix[i][iCol].oCard.getSuit()===iSuit && 
                        _aGridMatrix[i][iCol].oCard.getRank()===iRank &&
                            _aGridMatrix[i][iCol].status===LABEL_SHOWN){
                    aTopBoardCard[j] = _aGridMatrix[i][iCol].oCard;
                    iRank++;
                } else {
                    break;
                }                                  
            }
        }     
        
        
        //////////////////////////Begin all control!!///////////////////////////
        
        if(oLastCardPos.length < 10){
            return;
        }
        
        for(var i=0; i<aBotBoardCard.length; i++){
            for (var j=0; j<aTopBoardCard.length; j++){                
                if(aBotBoardCard[i].getRank() - aTopBoardCard[j].getRank() === 1){
                    return;
                }                
            }                                    
        }
        
        _oInterface.showHint("nomoves");
        
    };
    
    
    this.onTouchMove = function(event) {
        event.preventDefault(); 

        
        
        if(!_bInitGame && _bBlock){
            
            _iCurTouchX = parseInt((event.touches[0].pageX  -s_oCanvasLeft) / s_iScaleFactor);
            _iCurTouchY = parseInt((event.touches[0].pageY - s_oCanvasTop) / s_iScaleFactor);
            
            for(var i=0; i<_aStackCard.length; i++){
                _aStackCard[i].setPos(_iCurTouchX - _iMouseOffset.x , _iCurTouchY - _iMouseOffset.y +i*_iStackCardOffset);
            }
          
        }  
    };

    
    this.onTouchMoveMS = function(event) {
        if (window.navigator.msPointerEnabled && !event.isPrimary){
                return;
        }
        
        event.preventDefault(); 

        if(!_bInitGame && _bBlock){
            
            _iCurTouchX = parseInt(((event.pageX || event.targetTouches[0].pageX) -s_oCanvasLeft )/ s_iScaleFactor);
            _iCurTouchY = parseInt(((event.pageY || event.targetTouches[0].pageY) -s_oCanvasTop)/ s_iScaleFactor);
            
            for(var i=0; i<_aStackCard.length; i++){
                _aStackCard[i].setPos(_iCurTouchX - _iMouseOffset.x , _iCurTouchY - _iMouseOffset.y +i*_iStackCardOffset);
            }
          
        }          
    };
    
    this.unload = function(){
        _bStartGame = false;
        
        for(var i=0; i<_aCard.length; i++){
            _aCard[i].unload();
        }
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
                _oAudioCard.stop();
        }
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
           
    };
    
    
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
    };
    
    this._onExitHelp = function () {
         _bStartGame = true;         
    };
    
    this.gameOver = function(){  
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("game_over");
        }
        
        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show(_iScore);
    };

    this.restartGame = function () {
        
        this.unload();
        this._init();
    };

    this.pauseGame = function (){
        _bStartGame = !_bStartGame;                              
    };
    
    this._calculateScore = function(oCard, iPoint){
        //alert("_calculateScore"+iPoint);

        var oScore = new CScore();
        oScore.showScore(oCard.getPos(), iPoint);
    };
    
    this._removeScore = function(){
        //alert("removeScore");
        _iScore--;
        if(_iScore<0){
            _iScore=0;
        }
        var iTime=750;
        var oScore = new CScore();
        oScore.removeScore(_iScore,iTime);
        _oInterface.fadeScore(_iScore, iTime);
    };
        
    this.updateScore = function(iPoint){

        //alert("updateScore"+iPoint);
        _iScore += iPoint * s_iMode;
        oData.points_to_start = _iScore;
        var url = "/set2";
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'text',
            data: {
                base64data: "testdata",
                a: _iScore,
                k: "",
            }
        });
    };
    
    this.updateVisualScore = function(){
        //alert("updateVisScore");
        _oInterface.refreshScore(_iScore);
    };
    
    this._updateMoves = function(){
        _iMoves++;
        var iTime=750;
        var oScore = new CScore();
        oScore.displayMoves(_iMoves,iTime);
        _oInterface.fadeMove(_iMoves, iTime);
    };
    
    this.update = function(){
        if(_bInitGame){
            
            
            
            if(_aCard[51].getPlaced()){ 
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
                        _oAudioCard.stop();
                }

                _iContAnim++;
                var iDelay=4;                

                if(_iContAnim===iDelay){
                    _aCard[59].showCard();
                    _aGridMatrix[4][4].status=LABEL_SHOWN;
                } else if(_iContAnim===2*iDelay){
                    _aCard[58].showCard();
                    _aGridMatrix[4][5].status=LABEL_SHOWN;
                } else if(_iContAnim===3*iDelay){
                    _aCard[57].showCard();
                    _aGridMatrix[4][6].status=LABEL_SHOWN;
                } else if(_iContAnim===4*iDelay){
                    _aCard[56].showCard();
                    _aGridMatrix[4][7].status=LABEL_SHOWN;
                } else if(_iContAnim===5*iDelay){
                    _aCard[55].showCard();
                    _aGridMatrix[4][8].status=LABEL_SHOWN;
                } else if(_iContAnim===6*iDelay){
                    _aCard[54].showCard();
                    _aGridMatrix[4][9].status=LABEL_SHOWN;
                } else if(_iContAnim===7*iDelay){
                    _aCard[53].showCard();
                    _aGridMatrix[5][0].status=LABEL_SHOWN;
                } else if(_iContAnim===8*iDelay){
                    _aCard[52].showCard();
                    _aGridMatrix[5][1].status=LABEL_SHOWN;
                } else if(_iContAnim===9*iDelay){
                    _aCard[51].showCard();
                    _aGridMatrix[5][2].status=LABEL_SHOWN;
                } else if(_iContAnim===10*iDelay){
                    _aCard[50].showCard();
                    _aGridMatrix[5][3].status=LABEL_SHOWN;
                                       
                                                           
                } else if(_iContAnim===11*iDelay) {
                    
                    for(var i=0; i<10; i++){
                        _aDeckCard[39-i].stackAndDeactive(_aDeckPos[1].x, _aDeckPos[1].y,1000);
                    }
                    
                } else if(_iContAnim===14*iDelay) {
                    
                    for(var i=0; i<10; i++){
                        _aDeckCard[29-i].stackAndDeactive(_aDeckPos[2].x, _aDeckPos[2].y,1000);
                    }
                    
                } else if(_iContAnim===17*iDelay) {
                    
                    for(var i=0; i<10; i++){
                        _aDeckCard[19-i].stackAndDeactive(_aDeckPos[3].x, _aDeckPos[3].y,1000);
                    }
                    
                }  else if(_iContAnim===20*iDelay) {
                    
                    for(var i=0; i<10; i++){
                        _aDeckCard[9-i].stackAndDeactive(_aDeckPos[4].x, _aDeckPos[4].y,1000);
                    }
                    
                    _bInitGame=false;
                    _bBlock = false;
                    _oDeckArea.visible=true;
                    _oInterface.setVisibleButHelp(); 
                    
                    
                }                                                                        
            }   
        }
       
    };

    s_oGame=this;
    
    POINTS_TO_LOSE = oData.points_to_lose;
    POINTS_TO_WIN = oData.points_to_win;
    POINTS_TO_START = oData.points_to_start;
    _oParent = this;    
    
    this._init();
}

var s_oGame;
