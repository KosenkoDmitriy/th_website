function CHelpPanel(){
    var _oText1;
    var _oText1Back;
    var _oText2;
    var _oText2Back;
    var _oText3;
    var _oText3Back;
    var _oText1BackPage2;
    var _oText1Page2;
    
    var _oText2BackPage2;
    var _oText2Page2;
    var _oTextLosePage2;
    var _oTextLosePage2Back;
    

    var _oHelpBg;
    var _oHelpBgPage2;
    var _oArrow;
    var _oArrowPage2;
    var _oGroup;
    var _oGroupPage2;
    var _oParent;

    this._init = function(){
        var oParent = this;
        _oHelpBg = createBitmap(s_oSpriteLibrary.getSprite('bg_help'));
  
        var oText1Pos = {x: CANVAS_WIDTH/2 +50, y: (CANVAS_HEIGHT/2)-240}
  
        _oText1Back = new createjs.Text(TEXT_HELP1," 24px "+PRIMARY_FONT, "#000000");
        _oText1Back.x = oText1Pos.x+2;
        _oText1Back.y = oText1Pos.y+2;
        _oText1Back.textAlign = "center";
        _oText1Back.lineWidth = 400;
  
        _oText1 = new createjs.Text(TEXT_HELP1," 24px "+PRIMARY_FONT, "#ffffff");
        _oText1.x = oText1Pos.x;
        _oText1.y = oText1Pos.y;
        _oText1.textAlign = "center";
        _oText1.lineWidth = 400;                
  
        var oText2Pos = {x: CANVAS_WIDTH/2 -130, y: (CANVAS_HEIGHT/2)-40}
  
        _oText2Back = new createjs.Text(TEXT_HELP2," 24px "+PRIMARY_FONT, "#000000");
        _oText2Back.x = oText2Pos.x +2;
        _oText2Back.y = oText2Pos.y +2;
        _oText2Back.textAlign = "center";
        _oText2Back.lineWidth = 280;
  
        _oText2 = new createjs.Text(TEXT_HELP2," 24px "+PRIMARY_FONT, "#ffffff");
        _oText2.x = oText2Pos.x;
        _oText2.y = oText2Pos.y;
        _oText2.textAlign = "center";
        _oText2.lineWidth = 280;
        
        var oText3Pos = {x: CANVAS_WIDTH/2 +190, y: (CANVAS_HEIGHT/2) +100}
        
        _oText3Back = new createjs.Text(TEXT_HELP3," 24px "+PRIMARY_FONT, "#000000");
        _oText3Back.x = oText3Pos.x +2;
        _oText3Back.y = oText3Pos.y +2;
        _oText3Back.textAlign = "center";
        _oText3Back.lineWidth = 230;
  
        _oText3 = new createjs.Text(TEXT_HELP3," 24px "+PRIMARY_FONT, "#ffffff");
        _oText3.x = oText3Pos.x;
        _oText3.y = oText3Pos.y;
        _oText3.textAlign = "center";
        _oText3.lineWidth = 230;
        
        _oGroup = new createjs.Container();
        _oGroup.addChild(_oHelpBg, _oText1Back,  _oText1, _oText2Back, _oText2, _oText3Back, _oText3);
        _oGroup.alpha=0;
        s_oStage.addChild(_oGroup);

        createjs.Tween.get(_oGroup).to({alpha:1}, 700);        
        
        _oGroup.on("pressup",function(){oParent._onExitHelp();});
        
        _oHelpBgPage2 = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
  
        _oText1BackPage2 = new createjs.Text(TEXT_HELP1_PAGE2," 30px "+PRIMARY_FONT, "#000000");
        _oText1BackPage2.x = CANVAS_WIDTH/2 +2;
        _oText1BackPage2.y = (CANVAS_HEIGHT/2)-200;
        _oText1BackPage2.textAlign = "center";
        _oText1BackPage2.lineWidth = 400;
  
        _oText1Page2 = new createjs.Text(TEXT_HELP1_PAGE2," 30px "+PRIMARY_FONT, "#ffffff");
        _oText1Page2.x = CANVAS_WIDTH/2;
        _oText1Page2.y = (CANVAS_HEIGHT/2)-202;
        _oText1Page2.textAlign = "center";
        _oText1Page2.lineWidth = 400;              
        
        _oText2BackPage2 = new createjs.Text(TEXT_HELP2_PAGE2 + START_SCORE + TEXT_HELP3_PAGE2," 30px "+PRIMARY_FONT, "#000000");
        _oText2BackPage2.x = CANVAS_WIDTH/2 +2;
        _oText2BackPage2.y = (CANVAS_HEIGHT/2)-100;
        _oText2BackPage2.textAlign = "center";
        _oText2BackPage2.lineWidth = 400;
  
        _oText2Page2 = new createjs.Text(TEXT_HELP2_PAGE2 + START_SCORE +TEXT_HELP3_PAGE2," 30px "+PRIMARY_FONT, "#ffffff");
        _oText2Page2.x = CANVAS_WIDTH/2;
        _oText2Page2.y = (CANVAS_HEIGHT/2)-102;
        _oText2Page2.textAlign = "center";
        _oText2Page2.lineWidth = 400;       
        
        _oTextLosePage2Back = new createjs.Text(TEXT_LOSE1_PAGE2 + POINTS_TO_LOSE + TEXT_LOSE2_PAGE2," 28px "+PRIMARY_FONT, "#000000");
        _oTextLosePage2Back.x = CANVAS_WIDTH/2 -328;
        _oTextLosePage2Back.y = (CANVAS_HEIGHT/2) +32;
        _oTextLosePage2Back.textAlign = "left";
        _oTextLosePage2Back.lineWidth = 670;

        _oTextLosePage2 = new createjs.Text(TEXT_LOSE1_PAGE2 + POINTS_TO_LOSE + TEXT_LOSE2_PAGE2," 28px "+PRIMARY_FONT, "#ffffff");
        _oTextLosePage2.x = CANVAS_WIDTH/2 -330;
        _oTextLosePage2.y = (CANVAS_HEIGHT/2) +30;
        _oTextLosePage2.textAlign = "left";
        _oTextLosePage2.lineWidth = 670;
        
        _oGroupPage2 = new createjs.Container();
        _oGroupPage2.addChild(_oHelpBgPage2, _oText1BackPage2,  _oText1Page2, _oText2BackPage2, _oText2Page2,
                            _oTextLosePage2Back, _oTextLosePage2);
        _oGroupPage2.visible=0;
        s_oStage.addChild(_oGroupPage2);
        
        _oGroupPage2.on("pressup",function(){oParent._onExitHelp();});

        createjs.Tween.get(_oGroupPage2).to({alpha:1}, 700);
        
        
        _oArrow = createBitmap(s_oSpriteLibrary.getSprite('arrow'));
        _oArrow.x = 1232;
        _oArrow.y = 564 ;
        _oArrow.alpha=0;
        _oArrow.on("click", oParent._changePageTo2);
        s_oStage.addChild(_oArrow);
        
        _oArrowPage2 = createBitmap(s_oSpriteLibrary.getSprite('arrow'));
        _oArrowPage2.scaleX = -1;
        _oArrowPage2.x = 382;
        _oArrowPage2.y = 564;
        _oArrowPage2.visible=false;
        _oArrowPage2.on("click", oParent._changePageTo1);
        s_oStage.addChild(_oArrowPage2);
        
        createjs.Tween.get(_oArrow).to({alpha:1}, 700);
        
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup, _oGroupPage2, _oArrow, _oArrowPage2);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
        _oGroupPage2.off("pressup",function(){oParent._onExitHelp();});
    };

    this._changePageTo1 = function(){ 
        _oGroupPage2.visible=false;
        _oArrowPage2.visible=false;

        _oGroup.visible=true;
        _oArrow.visible=true;

    };

    this._changePageTo2 = function(){        
        _oGroup.visible=false;
        _oArrow.visible=false;

        _oGroupPage2.visible=true;
        _oArrowPage2.visible=true;
        
    };

    this._onExitHelp = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        
        _oParent.unload();
        s_oGame._onExitHelp();
    };

    _oParent=this;
    this._init();

}
