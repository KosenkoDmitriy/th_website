function CGame(oData){
    var _bTouchActive;
    var _bBlock;
    var _bInitGame;
    var _bFreeCellSnap;
    var _bSuitSnap;
    
    var _iScore;
    var _iMoves;    
    var _iStackOffset;
    var _iDepth;
    var _iCurPos;
    var _iMouseOffset;
    var _iMaxCardDraggable;

    var _aSuitPos;
    var _aCurRank;
    var _aSuitRect;
    var _aFreeCellPos;
    var _aFreeCell;
    var _aCardStartPos;
    var _aCard;
    var _aGridMatrix;
    var _aStackCard;

    var _oInterface;
    var _oEndPanel = null;
    var _oCardContainer;
    var _oStartDeckPos;
    var _oStartLogicCardPos;
    var _oParent;
    
    this._init = function(){
        
        _bTouchActive=false;
        _bBlock=true;
        _bInitGame=true;
        _bFreeCellSnap=false;
        _bSuitSnap=false;
 
        _iStackOffset=25;
        _iDepth=0;
        _iMaxCardDraggable=5;
        _iScore=START_SCORE;
        _iMoves=0;
        _isDebug=IS_DEBUG;
        
        _aCard = new Array();
        _aStackCard = new Array();
        
        _aFreeCell = new Array();
        for(var i=0; i<4; i++){
            _aFreeCell[i]=null;
        }        
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); //Draws on canvas
                
        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        _oInterface = new CInterface();
        _oInterface.refreshScore(_iScore);

        _aCurRank = new Array();
        for(var i=0; i<4; i++){
            _aCurRank[i]=1;
        }
        _aSuitPos = new Array();           
        _aSuitPos[SUIT_HEARTS]={x: 1294, y:211};
        _aSuitPos[SUIT_SPADES]={x: 1294, y:349};
        _aSuitPos[SUIT_DIAMONDS]={x: 1294, y:483};
        _aSuitPos[SUIT_CLUBS]={x: 1294, y:618};
        _aSuitRect = new Array();
        for(var i=0; i<4; i++){
            _aSuitRect[i] = new createjs.Rectangle(_aSuitPos[i].x - CARD_WIDTH/2, _aSuitPos[i].y - CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
        }
        
        _aFreeCellPos = new Array();
        _aFreeCellPos[0]={x: 304, y:211};
        _aFreeCellPos[1]={x: 304, y:349};
        _aFreeCellPos[2]={x: 304, y:483};
        _aFreeCellPos[3]={x: 304, y:618};
        
        _oStartDeckPos = {x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT-164};
        
        var iStartCont=0;
        _aCardStartPos = new Array();
        for (var i=0; i<7; i++){
            for (var j=0; j<8; j++){                
                _aCardStartPos[iStartCont]={x: 449+j*100, y:212+i*_iStackOffset};
                iStartCont++;
            }            
        }
    
        _aGridMatrix = new Array();
        for (var i=0; i<25; i++){
            _aGridMatrix[i]= new Array();
            for (var j=0; j<8; j++){
                _aGridMatrix[i][j]= {status:LABEL_EMPTY, oCard:null};
            }
        }
    
    
        this._shuffleCard(true);
        this._setBoard();    
    
        
        s_oStage.addEventListener( 'stagemousemove', this.dragCard, false );
            s_oStage.addEventListener( 'stagemouseup', this.releaseCard, false );

    };
    
    this._shuffleCard = function(bVal){
        
        var iSuit = -1;
        var aCardDeck=new Array();
        for(var j=0;j<52;j++){
            var iRest=(j+1)%13;
            if(iRest === 1){
                iSuit++;
            }else if(iRest === 0){
                iRest = 13;
            }
            aCardDeck.push({fotogram:j,rank:iRest,suit:iSuit});
        }
        
        
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
                _aCard[i] = new CCard (_oStartDeckPos.x, _oStartDeckPos.y, _oCardContainer, 
                                                    aShuffledCardDecks[i].fotogram,aShuffledCardDecks[i].rank,aShuffledCardDecks[i].suit);
                
            }
            
        } else {
            for(var i=0; i<aShuffledCardDecks.length; i++){
                _aCard[i] = new CCard (_oStartDeckPos.x, _oStartDeckPos.y, _oCardContainer, 
                                                    aCardDeck[i].fotogram, aCardDeck[i].rank, aCardDeck[i].suit);
            }
        }       
        
    };
    
    this._setBoard = function(){
        var iDelay=0;
        var iTimeMove = 100;
        var iDelayIncr = 100;
        var iCont=_aCard.length-1;
        
        for(var i=0; i<52; i++){
            _aCard[51-i].moveCard(_aCardStartPos[i].x, _aCardStartPos[i].y, iTimeMove,iDelay);    
            _aCard[51-i].setType("board");
            iDelay+=iDelayIncr;            
        }
        
        
        for (var i=0; i<7; i++){
            for (var j=0; j<8; j++){                
                _aGridMatrix[i][j].oCard = _aCard[iCont];
                _aGridMatrix[i][j].status = LABEL_SHOWN;               
                iCont--;
                if(iCont<0){
                    break;
                }
            }            
        }        
        

    };
    
    this.scaleDepth = function(oCard){        
        _oCardContainer.setChildIndex(oCard.getSprite(),_iDepth);
        _iDepth++;
        oCard.showCard();
        
        if(_iDepth===52){
            _bBlock=false;
            _bInitGame = false;
            _oInterface.setVisibleButHelp();
        }
    }; 
    
    this.pickCard = function(oCard, event){
        if(_aStackCard.length!==0 || _bBlock){ //do not allow more then one pick on mobile.
            return;
        }       
        
        var bDebug=false;
        _bBlock=true;        

        _iCurPos = {x: oCard.getPos().x, y: oCard.getPos().y };
        _iMouseOffset = {x : event.stageX - _iCurPos.x, y : event.stageY - _iCurPos.y};
        
        //Check all card stack under picked one.                                  
        for(var j=0; j<8; j++){
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].oCard===oCard){
                    _oStartLogicCardPos = {row: i, column: j};
                }                
            }
        }    

        if(oCard.checkType()==="freecell"){//FreeCell Card
            
            var oInfo = oCard.saveInfo();
            _aStackCard[0] = new CCard(_iCurPos.x, _iCurPos.y, _oCardContainer, oInfo.szFotogram, oInfo.iRank, oInfo.iSuit);
            _aStackCard[0].setType("freecell");
            _aStackCard[0].instantShow();
            oCard.unload();
            
        } else if (oCard.checkType()==="board"){//Board Card
            
            if(bDebug){
            
            var iCont = 0;
            for (var i=_oStartLogicCardPos.row; i<_aGridMatrix.length; i++){

                if(_aGridMatrix[i][_oStartLogicCardPos.column].status === LABEL_SHOWN){
                    iCont++;
                } else {
                    break;
                }
                    
            }        
            
            }else {

                var iCont = 1;
                var iRank = oCard.getRank();
                var iColor = oCard.getColor();
                var iMaxCard = _oStartLogicCardPos.row + _iMaxCardDraggable;
                var bShowHint = false;
                if(_aGridMatrix[iMaxCard][_oStartLogicCardPos.column].status === LABEL_SHOWN){//Control if hint shown
                    
                    for (var i=_oStartLogicCardPos.row; i<_aGridMatrix.length-1; i++){
                        if(_aGridMatrix[i+1][_oStartLogicCardPos.column].status === LABEL_EMPTY){
                            break;
                        }
                        if(_aGridMatrix[i+1][_oStartLogicCardPos.column].oCard.getColor() !== iColor &&
                                _aGridMatrix[i+1][_oStartLogicCardPos.column].oCard.getRank() === iRank -1){                    
                            bShowHint=true;
                            iRank--;
                            iColor = _aGridMatrix[i+1][_oStartLogicCardPos.column].oCard.getColor();
                        } else {
                            bShowHint=false;
                            break;
                        }
                    }
                    if(bShowHint){
                        _oInterface.showHint("drag", _iMaxCardDraggable);
                    }
                    return;
                }    
                
                iRank = oCard.getRank();
                iColor = oCard.getColor();
                for (var i=_oStartLogicCardPos.row; i<iMaxCard; i++){

                    if(_aGridMatrix[i+1][_oStartLogicCardPos.column].status === LABEL_SHOWN && 
                            _aGridMatrix[i+1][_oStartLogicCardPos.column].oCard.getColor() !== iColor &&
                                _aGridMatrix[i+1][_oStartLogicCardPos.column].oCard.getRank() === iRank -1){

                            iCont++;
                            iRank--;
                            iColor = _aGridMatrix[i+1][_oStartLogicCardPos.column].oCard.getColor();

                    } else if (_aGridMatrix[i+1][_oStartLogicCardPos.column].status === LABEL_EMPTY) {
                        break;
                    } else {
                        return;
                    }
                }            
            }
            
            var aInfo = new Array();
            for (var i=0; i<iCont; i++){
                aInfo[i] = _aGridMatrix[_oStartLogicCardPos.row + i][_oStartLogicCardPos.column].oCard.saveInfo();
                _aStackCard[i] = new CCard(_iCurPos.x, _iCurPos.y + i*_iStackOffset, _oCardContainer, aInfo[i].szFotogram, aInfo[i].iRank, aInfo[i].iSuit);
                _aStackCard[i].setType("board");
                _aGridMatrix[_oStartLogicCardPos.row + i][_oStartLogicCardPos.column].oCard.unload();
                _aStackCard[i].instantShow();
            }
            
        } else {//Foundation Card
            
            var oInfo = oCard.saveInfo();
            _aStackCard[0] = new CCard(_iCurPos.x, _iCurPos.y, _oCardContainer, oInfo.szFotogram, oInfo.iRank, oInfo.iSuit);
            _aStackCard[0].setType("suit");
            _aStackCard[0].instantShow();
            oCard.unload();
            
        }
        ////////////////////////////////////////
        
       
    };
    
    this.dragCard = function(event){

        if(!_bInitGame && _bBlock){
           for(var i=0; i<_aStackCard.length; i++){
               _aStackCard[i].setPos(event.stageX - _iMouseOffset.x , event.stageY - _iMouseOffset.y +i*_iStackOffset);
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
        
        _oParent._checkFreeCellCollision(_aStackCard);
        
        if(!_bFreeCellSnap){
            _oParent._checkSuitCollision(_aStackCard);
        }
        
        if(!_bFreeCellSnap && !_bSuitSnap){
            _oParent._checkCardCollision(_aStackCard);
        }
        
        _oParent._controlBoard();
        _oStartLogicCardPos=null;
        _aStackCard = new Array();
        _bFreeCellSnap=false;
        _bSuitSnap=false;

    };
    
    this._checkCardCollision = function(oCard){
        
        var iCont=0;
        var aRect = new Array();
        var oLastCard = new Array();        
        
        for(var j=0; j<8; j++){
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
            if(oCard[0].checkType()==="freecell"){
                oCard[0].stackInPlace(_iCurPos.x, _iCurPos.y, 200);
            }else if (oCard[0].checkType()==="board"){
                for(var i=0; i<oCard.length; i++){
                    oCard[i].stackInPlace(_iCurPos.x, _iCurPos.y + i*_iStackOffset, 200);
                    _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].oCard=oCard[i];               
                }   
            } else {
                oCard[0].stackInPlace(_iCurPos.x, _iCurPos.y, 200);
            }
               
         
           //Collide with an empty space 
        } else if(_aGridMatrix[0][iColIntersect].status === LABEL_EMPTY){
            
            if(oCard[0].checkType()==="freecell"){
                oCard[0].stackInPlace(_aCardStartPos[iColIntersect].x, _aCardStartPos[iColIntersect].y,200);
                oCard[0].setType("board");
                _aGridMatrix[0][iColIntersect].status=LABEL_SHOWN;
                _aGridMatrix[0][iColIntersect].oCard = oCard[0];
                
                for(var i=0; i<_aFreeCell.length; i++){
                    if(_aFreeCell[i] === null){
                        
                    } else if(oCard[0].getRank() === _aFreeCell[i].getRank() && oCard[0].getSuit() === _aFreeCell[i].getSuit()){
                        _aFreeCell[i] = null;
                    }                    
                }

            }else if(oCard[0].checkType()==="board") {
                for(var i=0; i<oCard.length; i++){
                    oCard[i].stackInPlace(_aCardStartPos[iColIntersect].x, _aCardStartPos[iColIntersect].y + i*_iStackOffset,200);
                    oCard[i].setType("board");
                    _aGridMatrix[i][iColIntersect].status=LABEL_SHOWN;
                    _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].status=LABEL_EMPTY;
                    _aGridMatrix[i][iColIntersect].oCard=oCard[i];
                }
                
            } else {
                
                oCard[0].stackInPlace(_aCardStartPos[iColIntersect].x, _aCardStartPos[iColIntersect].y,200);
                oCard[0].setType("board");
                _aGridMatrix[0][iColIntersect].status=LABEL_SHOWN;
                _aGridMatrix[0][iColIntersect].oCard = oCard[0];
                _aCurRank[oCard[0].getSuit()]--;
            }   
                this._updateMoves();
                this._removeScore();
            
            //Collide with a card
        } else if(oLastCard[iColIntersect].oCard.getRank()- oCard[0].getRank() === 1 && oLastCard[iColIntersect].oCard.getColor() !== oCard[0].getColor()) {
            
                if(oCard[0].checkType()==="freecell"){
                    oCard[0].stackInPlace(oLastCard[iColIntersect].x, oLastCard[iColIntersect].y + _iStackOffset,200);
                    oCard[0].setType("board");
                    _aGridMatrix[oLastCard[iColIntersect].row+1][iColIntersect].status=LABEL_SHOWN;
                    _aGridMatrix[oLastCard[iColIntersect].row+1][iColIntersect].oCard = oCard[0]; 
                    for(var i=0; i<_aFreeCell.length; i++){
                        if(_aFreeCell[i] === null){

                        } else if(oCard[0].getRank() === _aFreeCell[i].getRank() && oCard[0].getSuit() === _aFreeCell[i].getSuit()){
                            _aFreeCell[i] = null;
                        }                    
                    }
                }else if(oCard[0].checkType()==="board"){

                    for(var i=0; i<oCard.length; i++){
                        oCard[i].stackInPlace(oLastCard[iColIntersect].x, oLastCard[iColIntersect].y + _iStackOffset + i*_iStackOffset,200);
                        _aGridMatrix[oLastCard[iColIntersect].row+1+i][oLastCard[iColIntersect].column].status=LABEL_SHOWN;
                        _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].status=LABEL_EMPTY;
                        _aGridMatrix[oLastCard[iColIntersect].row+1+i][oLastCard[iColIntersect].column].oCard=oCard[i];                    
                    }
                } else {
                    
                    oCard[0].stackInPlace(oLastCard[iColIntersect].x, oLastCard[iColIntersect].y + _iStackOffset,200);
                    oCard[0].setType("board");
                    _aGridMatrix[oLastCard[iColIntersect].row+1][iColIntersect].status=LABEL_SHOWN;
                    _aGridMatrix[oLastCard[iColIntersect].row+1][iColIntersect].oCard = oCard[0];
                    _aCurRank[oCard[0].getSuit()]--;
                }
                this._updateMoves();
                this._removeScore();          
            
        } else {//case that collide with a rect, but not match
            if (oCard[0].checkType()==="freecell"){
                
                oCard[0].stackInPlace(_iCurPos.x, _iCurPos.y, 200);
            } else if (oCard[0].checkType()==="board"){
                
                for(var i=0; i<oCard.length; i++){
                    oCard[i].stackInPlace(_iCurPos.x, _iCurPos.y + i*_iStackOffset, 200);
                    _aGridMatrix[_oStartLogicCardPos.row +i][_oStartLogicCardPos.column].oCard=oCard[i];               
                }   
            } else {
                
                oCard[0].stackInPlace(_iCurPos.x, _iCurPos.y, 200); 
           }                          
        }                
    };
    
    this._checkFreeCellCollision = function(oCard){
        if(oCard.length > 1){
            return;
        }
        var aRect = new Array();        
        
        for(var i=0; i<4; i++){            
              if(_aFreeCell[i]===null){
                  aRect[i] = new createjs.Rectangle(_aFreeCellPos[i].x - CARD_WIDTH/2, _aFreeCellPos[i].y - CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
              } else {
                  aRect[i] = new createjs.Rectangle(_aFreeCellPos[i].x - CARD_WIDTH/2, _aFreeCellPos[i].y - CARD_HEIGHT/2,0,0);
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
        
        if(iColIntersect<0){
            return;
        } else {
            if(oCard[0].checkType()==="freecell"){
                
                for(var i=0; i<_aFreeCell.length; i++){
                    if(_aFreeCell[i] === null){
                        
                    } else if(oCard[0].getRank() === _aFreeCell[i].getRank() && oCard[0].getSuit() === _aFreeCell[i].getSuit()){
                        _aFreeCell[i] = null;
                    }                    
                }
                oCard[0].stackInPlace(_aFreeCellPos[iColIntersect].x, _aFreeCellPos[iColIntersect].y,200);
                _aFreeCell[iColIntersect]=oCard[0];
                
            }else if (oCard[0].checkType()==="board"){   
                
                oCard[0].setType("freecell");
                oCard[0].stackInPlace(_aFreeCellPos[iColIntersect].x, _aFreeCellPos[iColIntersect].y,200);
                _aGridMatrix[_oStartLogicCardPos.row][_oStartLogicCardPos.column].status=LABEL_EMPTY;
                _aFreeCell[iColIntersect]=oCard[0];
                
            } else {
                
                oCard[0].setType("freecell");
                oCard[0].stackInPlace(_aFreeCellPos[iColIntersect].x, _aFreeCellPos[iColIntersect].y,200);
                _aFreeCell[iColIntersect]=oCard[0];
            }
            
            _bFreeCellSnap=true;
            this._updateMoves();
            this._removeScore();
        }
        
    };
    
    this._checkSuitCollision = function(oCard){
        
        if(oCard.length > 1 || oCard[0].checkType()==="suit"){
            return;
        }
        
        var iMaxArea=0;
        var iColIntersect=-1;
        var rCurRect = oCard[0].getLogicRect();
                
        
        for (var i=0; i<_aSuitRect.length; i++){
            var rAppRect = rCurRect.intersection(_aSuitRect[i]);
            if(rAppRect!== null){
                if(iMaxArea < (rAppRect.width*rAppRect.height)){                   
                    iMaxArea = (rAppRect.width*rAppRect.height);
                    iColIntersect = i;
                }              
            }                                    
        }
        
        if(iColIntersect<0){
            return;
        } else if (oCard[0].getRank() === _aCurRank[oCard[0].getSuit()] && iColIntersect === oCard[0].getSuit()){
            if(oCard[0].checkType()==="freecell"){
                for(var i=0; i<_aFreeCell.length; i++){
                    if(_aFreeCell[i] === null){
                        
                    } else if(oCard[0].getRank() === _aFreeCell[i].getRank() && oCard[0].getSuit() === _aFreeCell[i].getSuit()){
                        _aFreeCell[i] = null;
                    }                    
                }
                oCard[0].stackInPlace(_aSuitPos[iColIntersect].x, _aSuitPos[iColIntersect].y,200);
                
            }else {    
                oCard[0].stackInPlace(_aSuitPos[iColIntersect].x, _aSuitPos[iColIntersect].y,200);
                _aGridMatrix[_oStartLogicCardPos.row][_oStartLogicCardPos.column].status=LABEL_EMPTY;
                
            }
            
            _aCurRank[oCard[0].getSuit()]++;
            oCard[0].setType("suit");
            _bSuitSnap=true;
            this._updateMoves();
            this._removeScore();
        }
        
        
    };
    
    this._controlBoard = function(){
        ////////////////////////////////////CHECK MULTIPLE DRAG/////////////////////////////
        var iCont=0;
        for(var i=0; i<_aFreeCell.length; i++){
            if(_aFreeCell[i] === null){
                iCont++;
            }
        }
        _iMaxCardDraggable=iCont+1;
        
        /////////////////////////////////CHECK END GAME///////////////////////////////////
        if(_aCurRank[0]===14 && _aCurRank[1]===14 && _aCurRank[2]===14 && _aCurRank[3]===14){
            this.gameOver();
            return;
        }
        
        /////////////////////////////////////CHECK MOVES AVAILABLES//////////////////////////////////
        //Set bottom card of each column
        var aBotBoardCard = new Array();
        var oLastCardPos = new Array();
        for(var j=0; j<8; j++){
            for(var i=_aGridMatrix.length-1; i>=0; i--){
                if(_aGridMatrix[i][j].status===LABEL_SHOWN){
                    aBotBoardCard.push(_aGridMatrix[i][j].oCard);
                    oLastCardPos.push({row:i, column:j});
                    break;
                }                                   
            }
        }
        
        //Check if empty board space
        if(aBotBoardCard.length < 8){
            return;
        }

        //Select all draggable card
        var aAttachBoardCard = new Array();
        var aTopBoardCard = new Array();
        for(var j=0; j<8; j++){
            
            var iRank = aBotBoardCard[j].getRank();
            var iCurColor;            
            if(aBotBoardCard[j].getColor() === "red"){
                iCurColor = "black";
            } else {
                iCurColor = "red";
            }            
            for(var i=oLastCardPos[j].row; i>=oLastCardPos[j].row -_iMaxCardDraggable+1; i--){
                if(i<0){ 
                    aTopBoardCard.push(_aGridMatrix[0][j].oCard);
                    break;
                    
                } else if(_aGridMatrix[i][j].oCard.getRank() === iRank  &&
                                _aGridMatrix[i][j].oCard.getColor() !== iCurColor){
                            
                    aAttachBoardCard.push({oCard: _aGridMatrix[i][j].oCard, row:i, column: j});
                    iCurColor = _aGridMatrix[i][j].oCard.getColor();
                    iRank++;
                } else {
                    aTopBoardCard.push(_aGridMatrix[i+1][j].oCard);
                    break;
                }                                                  
            }
        }                
        
        //Check freecell moves
        for(var i=0; i<_aFreeCell.length; i++){
            if(_aFreeCell[i]===null){
                
                return;
            } else {
                for(var j=0; j<aBotBoardCard.length; j++){
                    if(_aFreeCell[i].getRank() === aBotBoardCard[j].getRank()-1 &&
                            _aFreeCell[i].getColor() !== aBotBoardCard[j].getColor()){
                        

                        return;
                    }
                }

                if(_aFreeCell[i].getRank() === _aCurRank[_aFreeCell[i].getSuit()]){
                   
                    return;
                }
                
            }
        }
        
        //Check Board moves
        for(var i=0; i<aBotBoardCard.length; i++){
            
            if(aBotBoardCard[i].getRank() === _aCurRank[aBotBoardCard[i].getSuit()]){
                return;
            }            
            for( var j=0; j<aAttachBoardCard.length; j++){
                
                if(aBotBoardCard[i].getRank() === aAttachBoardCard[j].oCard.getRank()+1 && 
                        aBotBoardCard[i].getColor() !== aAttachBoardCard[j].oCard.getColor()){
                    
                    if(aAttachBoardCard[j].row === 0){

                        return;
                    }
                    
                    var aStackCard = new Array();
                    var oLastCard = {oCard: _aGridMatrix[aAttachBoardCard[j].row-1][aAttachBoardCard[j].column].oCard, row:aAttachBoardCard[j].row-1};
                    var iRank = oLastCard.oCard.getRank();
                    var iCurColor;
                    if(oLastCard.oCard.getColor() === "red"){
                        iCurColor = "black";
                    } else {
                        iCurColor = "red";
                    }   
                    for(var k=oLastCard.row; k>=oLastCard.row -_iMaxCardDraggable+1; k--){
                        if(k<0){                   
                            break;

                        } else if(_aGridMatrix[k][j].oCard.getRank() === iRank  &&
                                        _aGridMatrix[k][j].oCard.getColor() !== iCurColor){

                            aStackCard.push({oCard: _aGridMatrix[k][j].oCard, row:k, column: j});
                            iCurColor = _aGridMatrix[k][j].oCard.getColor();
                            iRank++;
                        } else {
                            break;
                        }                                                  
                    }
                    
                    for(var k=0; k<aStackCard.length; k++){
                        
                        if(k === 0){
                            for(var x=0; x<aTopBoardCard.length; x++){
                                if(aStackCard[k].oCard.getRank() === aTopBoardCard[x].getRank() +1 && 
                                        aStackCard[k].oCard.getColor() === aTopBoardCard[x].getColor()){

                                    return;
                                }
                            }
                        }
                        
                        if(aStackCard[k].oCard.getRank() === _aCurRank[aStackCard[k].oCard.getSuit()]){

                            return;
                        }
                        
                        for (var x=0; x<aBotBoardCard.length; x++){
                            
                            if(aStackCard[k].oCard.getRank() === aBotBoardCard[x].getRank()-1 && 
                                    aStackCard[k].oCard.getColor() !== aBotBoardCard[x].getColor() && 
                                        i !== x){
                                    
                                return;
                            }
                        }                                                
                    }                    
                }                
            }                                                
        }
        
        //Check Foundation moves
        for (var i=0; i<_aCurRank.length; i++){
            var iRest = i%2;
            var iColor;
            if(iRest === 0){
                iColor = "red";
            } else {
                iColor = "black";
            }             
            for (var j=0; j<aBotBoardCard.length; j++){
                if(_aCurRank[i] === aBotBoardCard[j].getRank() &&
                        iColor !== aBotBoardCard[j].getColor()){
                    return;
                }
            }
        }
        
        _oInterface.showHint("move", _iMaxCardDraggable);
        
    };
    
    this._calculateScore = function(oCard, iPoint){
        //if (_isDebug) alert("_calculateScore"+iPoint);

        var oScore = new CScore();
        oScore.showScore(oCard.getPos(), iPoint);
    };
    
    this._removeScore = function(){
        _iScore-=POINTS_TO_LOSE;

        START_SCORE = oData.starting_points = _iScore;

        var url = "/sub2";
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'text',
            data: {
                base64data: "testdata",
                a: POINTS_TO_LOSE,
                k: "",
            }
        });


        //if(_iScore<0){
        //    _iScore=0;
        //}
        var iTime=750;
        var oScore = new CScore();
        oScore.removeScore(_iScore,iTime);
        _oInterface.fadeScore(_iScore, iTime);

        //if (_isDebug) this.gameOver();
    };
        
    this.updateScore = function(iPoint){
        //if (_isDebug) alert("updateScore");

        _iScore += iPoint;
    };
    
    this.updateVisualScore = function(){
        //(_isDebug) alert("updateVisualScore"+_iScore);
        _oInterface.refreshScore(_iScore);
    };
    
    this._updateMoves = function(){
        //if (_isDebug) alert("_updateMoves");

        _iMoves++;
        var iTime=750;
        var oScore = new CScore();
        oScore.displayMoves(_iMoves,iTime);
        _oInterface.fadeMove(_iMoves, iTime);
    };
        
    this.restartGame = function () {
        this.unload();
        this._init();
    };        
    
    this.unload = function(){
        _bInitGame = false;
        
        
        for(var i=0; i<_aCard.length; i++){
            _aCard[i].unload();
        }
        

        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
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

        _iScore += POINTS_TO_WIN;
        oData.starting_points = _iScore;

        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show(_iScore);
    };

    
    this.update = function(){
        
    };

    s_oGame=this;

    POINTS_TO_WIN = oData.points_to_win;
    POINTS_TO_LOSE = oData.points_to_lose;
    START_SCORE = oData.starting_points;
    IS_DEBUG = oData.is_debug;

    _oParent=this;
    this._init();
}

var s_oGame;
