function CBetBut(a, g, l) {
    var f, k, h, c = [], e;
    this._init = function (a, b, c) {
        f = !1;
        k = [];
        h = [];
        c = s_oSpriteLibrary.getSprite("bet_but");
        var g = new createjs.SpriteSheet({
            images: [c],
            frames: {width: c.width / 2, height: c.height, regX: 0, regY: 0},
            animations: {on: [0, 1], off: [1, 2]}
        });
        e = createSprite(g, "on", 0, 0, c.width / 2, c.height);
        e.stop();
        e.x = a;
        e.y = b;
        e.regX = c.width / 2;
        e.regY = c.height / 2;
        s_oStage.addChild(e);
        this._initListener()
    };
    this.unload = function () {
        e.off("mousedown", this.buttonDown);
        e.off("pressup", this.buttonRelease);
        s_oStage.removeChild(e)
    };
    this.disable = function (a) {
        f = a
    };
    this.setVisible = function (a) {
        e.visible = a
    };
    this.setOn = function () {
        e.gotoAndStop("on")
    };
    this.setOff = function () {
        e.gotoAndStop("off")
    };
    this._initListener = function () {
        e.on("mousedown", this.buttonDown);
        e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, b, c) {
        k[a] = b;
        h[a] = c
    };
    this.addEventListenerWithParams = function (a, b, e, f) {
        k[a] = b;
        h[a] = e;
        c = f
    };
    this.buttonRelease = function () {
        k[ON_MOUSE_UP] && !1 === f && (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but"),
            k[ON_MOUSE_UP].call(h[ON_MOUSE_UP], c))
    };
    this.buttonDown = function () {
        k[ON_MOUSE_DOWN] && !1 === f && k[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], c)
    };
    this.setPosition = function (a, b) {
        e.x = a;
        e.y = b
    };
    this.setX = function (a) {
        e.x = a
    };
    this.setY = function (a) {
        e.y = a
    };
    this.getButtonImage = function () {
        return e
    };
    this.getX = function () {
        return e.x
    };
    this.getY = function () {
        return e.y
    };
    this._init(a, g, l)
}
function CSpriteLibrary() {
    var a, g, l, f, k, h;
    this.init = function (c, e, d) {
        l = g = 0;
        f = c;
        k = e;
        h = d;
        a = {}
    };
    this.addSprite = function (c, e) {
        a.hasOwnProperty(c) || (a[c] = {szPath: e, oSprite: new Image}, g++)
    };
    this.getSprite = function (c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    };
    this._onSpritesLoaded = function () {
        k.call(h)
    };
    this._onSpriteLoaded = function () {
        f.call(h);
        ++l === g && this._onSpritesLoaded()
    };
    this.loadSprites = function () {
        for (var c in a)a[c].oSprite.oSpriteLibrary = this, a[c].oSprite.onload = function () {
            this.oSpriteLibrary._onSpriteLoaded()
        },
            a[c].oSprite.src = a[c].szPath
    };
    this.getNumSprites = function () {
        return g
    }
}
var CANVAS_WIDTH = 1500, CANVAS_HEIGHT = 640, EDGEBOARD_X = 300, EDGEBOARD_Y = 0, FONT_GAME = "adonaisregular", FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !0, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, GAME_STATE_IDLE = 0, GAME_STATE_SPINNING = 1, GAME_STATE_SHOW_ALL_WIN = 2, GAME_STATE_SHOW_WIN = 3, REEL_STATE_START = 0, REEL_STATE_MOVING = 1, REEL_STATE_STOP = 2, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, REEL_OFFSET_X = 380, REEL_OFFSET_Y = 118, NUM_REELS = 5, NUM_ROWS = 3, NUM_SYMBOLS = 10,
    WILD_SYMBOL = 10, BONUS_SYMBOL = 9, NUM_PAYLINES = 5, SYMBOL_SIZE = 140, SPACE_BETWEEN_SYMBOLS = 10, MAX_FRAMES_REEL_EASE = 16, MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE, REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE, TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, MIN_BET, MAX_BET, TOTAL_MONEY, MAX_NUM_HOLD, BONUS_ITEM_WIDTH = 304, BONUS_ITEM_HEIGHT = 250, NUM_PRIZES = 3, NUM_SYMBOLS_FOR_BONUS, PERC_WIN_PRIZE_1, PERC_WIN_PRIZE_2, PERC_WIN_PRIZE_3, SOUNDTRACK_VOLUME = .5, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, BONUS_OCCURRENCE, BONUS_PRIZE =
        [[5, 50, 200], [50, 200, 500], [100, 500, 1E3]];
function CTweenController() {
    this.tweenValue = function (a, g, l) {
        return a + l * (g - a)
    };
    this.easeLinear = function (a, g, l, f) {
        return l * a / f + g
    };
    this.easeInCubic = function (a, g, l, f) {
        f = (a /= f) * a * a;
        return g + l * f
    };
    this.easeBackInQuart = function (a, g, l, f) {
        f = (a /= f) * a;
        return g + l * (2 * f * f + 2 * f * a + -3 * f)
    };
    this.easeInBack = function (a, g, l, f) {
        return l * (a /= f) * a * (2.70158 * a - 1.70158) + g
    };
    this.easeOutCubic = function (a, g, l, f) {
        return l * ((a = a / f - 1) * a * a + 1) + g
    }
}
function CToggle(a, g, l) {
    var f, k, h;
    this._init = function (a, e, d) {
        f = [];
        k = [];
        var b = new createjs.SpriteSheet({
            images: [d],
            frames: {width: d.width / 2, height: d.height, regX: d.width / 2 / 2, regY: d.height / 2},
            animations: {on: [0, 1], off: [1, 2]}
        });
        h = s_bAudioActive ? createSprite(b, "on", d.width / 2 / 2, d.height / 2, d.width / 2, d.height) : createSprite(b, "off", d.width / 2 / 2, d.height / 2, d.width / 2, d.height);
        h.x = a;
        h.y = e;
        h.stop();
        s_oStage.addChild(h);
        this._initListener()
    };
    this.unload = function () {
        h.off("mousedown", this.buttonDown);
        h.off("pressup",
            this.buttonRelease);
        s_oStage.removeChild(h)
    };
    this._initListener = function () {
        h.on("mousedown", this.buttonDown);
        h.on("pressup", this.buttonRelease)
    };
    this.setPosition = function (a, e) {
        h.x = a;
        h.y = e
    };
    this.addEventListener = function (a, e, d) {
        f[a] = e;
        k[a] = d
    };
    this.buttonRelease = function () {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but");
        h.scaleX = 1;
        h.scaleY = 1;
        (s_bAudioActive = !s_bAudioActive) ? h.gotoAndStop("on") : h.gotoAndStop("off");
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(k[ON_MOUSE_UP])
    };
    this.buttonDown =
        function () {
            h.scaleX = .9;
            h.scaleY = .9;
            f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
        };
    this._init(a, g, l)
}
(function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent ||
    navigator.vendor || window.opera);
$(window).resize(function () {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function isIphone() {
    return -1 !== navigator.userAgent.toLowerCase().indexOf("iphone") ? !0 : !1
}
function getSize(a) {
    var g = a.toLowerCase(), l = window.document, f = l.documentElement;
    if (void 0 === window["inner" + a])a = f["client" + a]; else if (window["inner" + a] != f["client" + a]) {
        var k = l.createElement("body");
        k.id = "vpw-test-b";
        k.style.cssText = "overflow:scroll";
        var h = l.createElement("div");
        h.id = "vpw-test-d";
        h.style.cssText = "position:absolute;top:-1000px";
        h.innerHTML = "<style>@media(" + g + ":" + f["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + g + ":7px!important}}</style>";
        k.appendChild(h);
        f.insertBefore(k, l.head);
        a = 7 == h["offset" + a] ? f["client" + a] : window["inner" + a];
        f.removeChild(k)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a;
        a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var g = getSize("Width"), l = Math.min(a / CANVAS_HEIGHT, g / CANVAS_WIDTH), f = CANVAS_WIDTH * l, l = CANVAS_HEIGHT * l, k = 0;
        l < a ? (k = a - l, l += k, f += CANVAS_WIDTH / CANVAS_HEIGHT * k) : f < g && (k = g - f, f += k, l += CANVAS_HEIGHT / CANVAS_WIDTH * k);
        var k = a / 2 - l / 2, h = g / 2 - f / 2, c = CANVAS_WIDTH / f;
        if (h * c < -EDGEBOARD_X || k * c < -EDGEBOARD_Y)l = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), g / (CANVAS_WIDTH - 2 *
            EDGEBOARD_X)), f = CANVAS_WIDTH * l, l *= CANVAS_HEIGHT, k = (a - l) / 2, h = (g - f) / 2, c = CANVAS_WIDTH / f;
        s_iOffsetX = -1 * h * c;
        s_iOffsetY = -1 * k * c;
        0 <= k && (s_iOffsetY = 0);
        0 <= h && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", f + "px");
        $("#canvas").css("height", l + "px");
        0 > k ? $("#canvas").css("top", k + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", h + "px")
    }
}
function createBitmap(a, g, l) {
    var f = new createjs.Bitmap(a), k = new createjs.Shape;
    g && l ? k.graphics.beginFill("#fff").drawRect(0, 0, g, l) : k.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    f.hitArea = k;
    return f
}
function createSprite(a, g, l, f, k, h) {
    a = null !== g ? new createjs.Sprite(a, g) : new createjs.Sprite(a);
    g = new createjs.Shape;
    g.graphics.beginFill("#000000").drawRect(-l, -f, k, h);
    a.hitArea = g;
    return a
}
function randomFloatBetween(a, g, l) {
    "undefined" === typeof l && (l = 2);
    return parseFloat(Math.min(a + Math.random() * (g - a), g).toFixed(l))
}
function shuffle(a) {
    for (var g = a.length, l, f; 0 !== g;)f = Math.floor(Math.random() * g), --g, l = a[g], a[g] = a[f], a[f] = l;
    return a
}
function formatTime(a) {
    a /= 1E3;
    var g = Math.floor(a / 60);
    a = parseFloat(a - 60 * g).toFixed(1);
    var l = "", l = 10 > g ? l + ("0" + g + ":") : l + (g + ":");
    return l = 10 > a ? l + ("0" + a) : l + a
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function (a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    }, onTouchStart: function (a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    }, onTouchMove: function (a) {
        this.moved = !0
    }, onTouchEnd: function (a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 === a.nodeType && (a = a.parentNode);
            var g = document.createEvent("MouseEvents");
            g.initEvent("click", !0, !0);
            a.dispatchEvent(g)
        }
    }
};
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var g = window.location.search.substring(1).split("&"), l = 0; l < g.length; l++) {
        var f = g[l].split("=");
        if (f[0] == a)return f[1]
    }
}
function CTextButton(a, g, l, f, k, h, c) {
    var e, d, b, n, t, p, q, u;
    this._init = function (a, c, f, h, g, k, l) {
        e = !1;
        n = [];
        t = [];
        u = createBitmap(f);
        d = f.width;
        b = f.height;
        q = new createjs.Text(h, "bold " + l + "px " + g, k);
        q.textAlign = "center";
        q.shadow = new createjs.Shadow("#000", 2, 2, 2);
        q.textBaseline = "middle";
        q.lineHeight = 24;
        q.x = f.width / 2;
        q.y = f.height / 2;
        p = new createjs.Container;
        p.x = a;
        p.y = c;
        p.regX = f.width / 2;
        p.regY = f.height / 2;
        p.addChild(u, q);
        s_oStage.addChild(p);
        this._initListener()
    };
    this.unload = function () {
        p.off("mousedown");
        p.off("pressup");
        s_oStage.removeChild(p)
    };
    this.setVisible = function (a) {
        p.visible = a
    };
    this.enable = function () {
        e = !1;
        u.filters = [];
        u.cache(0, 0, d, b)
    };
    this.disable = function () {
        e = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        u.filters = [new createjs.ColorMatrixFilter(a)];
        u.cache(0, 0, d, b)
    };
    this._initListener = function () {
        oParent = this;
        p.on("mousedown", this.buttonDown);
        p.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, b, c) {
        n[a] = b;
        t[a] = c
    };
    this.buttonRelease = function () {
        e || (!1 !== DISABLE_SOUND_MOBILE &&
        !1 !== s_bMobile || createjs.Sound.play("press_but"), p.scaleX = 1, p.scaleY = 1, n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(t[ON_MOUSE_UP]))
    };
    this.buttonDown = function () {
        e || (p.scaleX = .9, p.scaleY = .9, n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(t[ON_MOUSE_DOWN]))
    };
    this.setPosition = function (a, b) {
        p.x = a;
        p.y = b
    };
    this.changeText = function (a) {
        q.text = a
    };
    this.setX = function (a) {
        p.x = a
    };
    this.setY = function (a) {
        p.y = a
    };
    this.getButtonImage = function () {
        return p
    };
    this.getX = function () {
        return p.x
    };
    this.getY = function () {
        return p.y
    };
    this._init(a, g,
        l, f, k, h, c);
    return this
}
function CStaticSymbolCell(a, g, l, f) {
    var k = -1, h, c, e, d;
    this._init = function (a, f, h, g) {
        d = new createjs.Container;
        d.visible = !1;
        c = [];
        for (a = 0; a < NUM_SYMBOLS; a++)f = createSprite(s_aSymbolAnims[a], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE), f.stop(), f.x = h, f.y = g, f.on("animationend", this._onAnimEnded, null, !1, {index: a}), d.addChild(f), c[a] = f, c[a].visible = !1;
        a = {
            framerate: 60,
            images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {
                "static": [0, 1], anim: [1,
                    19]
            }
        };
        a = new createjs.SpriteSheet(a);
        e = new createSprite(a, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        e.stop();
        e.x = h;
        e.y = g;
        d.addChild(e);
        s_oStage.addChild(d)
    };
    this.unload = function () {
        s_oStage.removeChild(d)
    };
    this.hide = function () {
        -1 < k && (e.gotoAndStop("static"), e.visible = !1, c[k].gotoAndPlay("static"), d.visible = !1)
    };
    this.show = function (a) {
        e.gotoAndPlay("anim");
        e.visible = !0;
        for (var f = 0; f < NUM_SYMBOLS; f++)c[f].visible = f + 1 === a ? !0 : !1;
        c[a - 1].gotoAndPlay("anim");
        k = a - 1;
        h = c[a - 1].spriteSheet.getNumFrames();
        d.visible = !0
    };
    this._onAnimEnded = function (a, d) {
        c[d.index].currentFrame !== h && (c[d.index].stop(), setTimeout(function () {
            c[d.index].gotoAndPlay(1)
        }, 100))
    };
    this.stopAnim = function () {
        c[k].gotoAndStop("static");
        c[k].visible = !1;
        e.gotoAndStop("static");
        e.visible = !1
    };
    this._init(a, g, l, f)
}
function CSlotSettings() {
    this._init = function () {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolWin();
        this._initSymbolAnims();
        this._initSymbolsOccurence();
        this._initBonus()
    };
    this._initSymbolSpriteSheets = function () {
        s_aSymbolData = [];
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
            var g = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
                animations: {"static": [0, 1], moving: [1, 2]}
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(g)
        }
    };
    this._initPaylines =
        function () {
            s_aPaylineCombo = [[{row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2}, {row: 1, col: 3}, {
                row: 1,
                col: 4
            }], [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}, {row: 0, col: 4}], [{
                row: 2,
                col: 0
            }, {row: 2, col: 1}, {row: 2, col: 2}, {row: 2, col: 3}, {row: 2, col: 4}], [{row: 0, col: 0}, {
                row: 1,
                col: 1
            }, {row: 2, col: 2}, {row: 1, col: 3}, {row: 0, col: 4}], [{row: 2, col: 0}, {row: 1, col: 1}, {
                row: 0,
                col: 2
            }, {row: 1, col: 3}, {row: 2, col: 4}]]
        };
    this._initSymbolAnims = function () {
        s_aSymbolAnims = [];
        var a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[0] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[1] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {
                "static": [0,
                    1], anim: [1, 14]
            }
        };
        s_aSymbolAnims[2] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[3] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[4] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[5] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[6] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20, images: [s_oSpriteLibrary.getSprite("symbol_8_anim")], frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE, regX: 0, regY: 0
            }, animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[7] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_9_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {"static": [0, 1], anim: [1, 14]}
        };
        s_aSymbolAnims[8] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_10_anim")],
            frames: {width: SYMBOL_SIZE, height: SYMBOL_SIZE, regX: 0, regY: 0},
            animations: {
                "static": [0, 1], anim: [1,
                    14]
            }
        };
        s_aSymbolAnims[9] = new createjs.SpriteSheet(a)
    };
    this._initSymbolWin = function () {
        s_aSymbolWin = [[0, 0, 150, 250, 500], [0, 0, 100, 150, 200], [0, 0, 50, 100, 150], [0, 10, 20, 50, 100], [0, 10, 25, 50, 100], [0, 5, 15, 25, 50], [0, 2, 10, 20, 35], [0, 1, 5, 10, 15], [0, 1, 5, 10, 15]]
    };
    this._initSymbolsOccurence = function () {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 1 > a; a++)s_aRandSymbols.push(1);
        for (a = 0; 2 > a; a++)s_aRandSymbols.push(2);
        for (a = 0; 3 > a; a++)s_aRandSymbols.push(3);
        for (a = 0; 4 > a; a++)s_aRandSymbols.push(4);
        for (a = 0; 4 > a; a++)s_aRandSymbols.push(5);
        for (a = 0; 6 > a; a++)s_aRandSymbols.push(6);
        for (a = 0; 7 > a; a++)s_aRandSymbols.push(7);
        for (a = 0; 7 > a; a++)s_aRandSymbols.push(8);
        for (a = 0; 2 > a; a++)s_aRandSymbols.push(9);
        for (a = 0; 2 > a; a++)s_aRandSymbols.push(10)
    };
    this._initBonus = function () {
        s_aPrizeOccurence = [];
        var a;
        for (a = 0; a < PERC_WIN_PRIZE_1; a++)s_aPrizeOccurence.push(0);
        for (a = 0; a < PERC_WIN_PRIZE_2; a++)s_aPrizeOccurence.push(1);
        for (a = 0; a < PERC_WIN_PRIZE_3; a++)s_aPrizeOccurence.push(2)
    };
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols, s_aPrizeOccurence;
function CScoreText(a, g, l) {
    var f;
    this._init = function (a, h, c) {
        f = new createjs.Text("00000", "bold 50px " + FONT_GAME, "#ff0000");
        f.textAlign = "center";
        f.text = a;
        f.x = h;
        f.y = c;
        f.alpha = 0;
        f.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        s_oStage.addChild(f);
        var e = this;
        createjs.Tween.get(f).to({alpha: 1}, 400, createjs.Ease.quadIn).call(function () {
            e.moveUp()
        })
    };
    this.moveUp = function () {
        var a = f.y - 100, h = this;
        createjs.Tween.get(f).to({y: a}, 1E3, createjs.Ease.sineIn).call(function () {
            h.unload()
        })
    };
    this.unload = function () {
        s_oStage.removeChild(f)
    };
    this._init(a, g, l)
}
function CReelColumn(a, g, l, f) {
    var k, h, c, e, d, b, n, t, p, q, u, w, y, A, x;
    this._init = function (a, f, g, l) {
        e = c = h = k = !1;
        t = 0;
        d = a;
        n = l;
        b = d < NUM_REELS ? d : d - NUM_REELS;
        q = 0;
        u = MAX_FRAMES_REEL_EASE;
        p = REEL_STATE_START;
        w = g;
        y = w + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(f, g)
    };
    this.initContainer = function (a, b) {
        x = new createjs.Container;
        x.x = a;
        x.y = b;
        var c = 0;
        A = [];
        for (var d = 0; d < NUM_ROWS; d++) {
            var e = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            e.stop();
            e.x =
                0;
            e.y = c;
            x.addChild(e);
            A[d] = e;
            c += SYMBOL_SIZE
        }
        s_oStage.addChild(x)
    };
    this.unload = function () {
        s_oStage.removeChild(x)
    };
    this.activate = function () {
        w = x.y;
        y = w + SYMBOL_SIZE * NUM_ROWS;
        k = !0
    };
    this._setSymbol = function (a) {
        x.removeAllChildren();
        for (var b = 0, c = 0; c < a.length; c++) {
            var d = new createSprite(s_aSymbolData[a[c]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            d.stop();
            d.x = 0;
            d.y = b;
            x.addChild(d);
            A[c] = d;
            b += SYMBOL_SIZE
        }
    };
    this.setHold = function (a) {
        e = a
    };
    this.restart = function (a, b) {
        x.y = w = REEL_START_Y;
        y = w + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(a);
        if (h = b) {
            q = 0;
            u = MAX_FRAMES_REEL_EASE;
            p = REEL_STATE_STOP;
            for (var d = 0; d < NUM_ROWS; d++)A[d].gotoAndStop("static");
            c = !0
        } else for (d = 0; d < NUM_ROWS; d++)A[d].gotoAndStop("moving")
    };
    this.setReadyToStop = function () {
        q = 0;
        u = MAX_FRAMES_REEL_EASE;
        p = REEL_STATE_STOP
    };
    this.isReadyToStop = function () {
        return h
    };
    this.isHold = function () {
        return e
    };
    this._updateStart = function () {
        0 === q && d < NUM_REELS && (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("start_reel", {volume: .3}));
        q++;
        q > u && (q = 0, u /= 2, p++, w = x.y, y = w + SYMBOL_SIZE *
            NUM_ROWS);
        var a = s_oTweenController.easeInBack(q, 0, 1, u), a = s_oTweenController.tweenValue(w, y, a);
        x.y = a
    };
    this._updateMoving = function () {
        q++;
        q > u && (q = 0, w = x.y, y = w + SYMBOL_SIZE * NUM_ROWS);
        var a = s_oTweenController.easeLinear(q, 0, 1, u), a = s_oTweenController.tweenValue(w, y, a);
        x.y = a
    };
    this._updateStopping = function () {
        q++;
        if (q >= u)k = !1, q = 0, u = MAX_FRAMES_REEL_EASE, p = REEL_STATE_START, t = 0, h = !1, c && (c = !1, x.y = REEL_OFFSET_Y), s_oGame.stopNextReel(); else {
            var a = s_oTweenController.easeOutCubic(q, 0, 1, u), a = s_oTweenController.tweenValue(w,
                y, a);
            x.y = a
        }
    };
    this.update = function (a) {
        if (!1 !== k && (t++, t > n))if (e)a === d && (k = !1, s_oGame.stopNextReel(), s_oGame.stopNextReel(), 0 === d && s_oGame.increaseReelLoops()); else switch (!1 === h && x.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(d, b), p) {
            case REEL_STATE_START:
                this._updateStart();
                break;
            case REEL_STATE_MOVING:
                this._updateMoving();
                break;
            case REEL_STATE_STOP:
                this._updateStopping()
        }
    };
    this._init(a, g, l, f)
}
function CPreloader() {
    var a, g, l, f, k, h, c;
    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_preloader", "./sprites/bg_preloader.jpg");
        s_oSpriteLibrary.addSprite("preloader_bar", "./sprites/preloader_bar.png");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        c = new createjs.Container;
        s_oStage.addChild(c)
    };
    this.unload = function () {
        c.removeAllChildren()
    };
    this.hide = function () {
        var a =
            this;
        setTimeout(function () {
            createjs.Tween.get(h).to({alpha: 1}, 500).call(function () {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function () {
    };
    this._onAllImagesLoaded = function () {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function () {
        var e = createBitmap(s_oSpriteLibrary.getSprite("bg_preloader"));
        c.addChild(e);
        e = s_oSpriteLibrary.getSprite("preloader_bar");
        l = createBitmap(e);
        l.x = 510;
        l.y = CANVAS_HEIGHT - 131;
        c.addChild(l);
        f = createBitmap(s_oSpriteLibrary.getSprite("progress_bar"));
        f.x = 511;
        f.y = CANVAS_HEIGHT - 130;
        c.addChild(f);
        a = e.width;
        k = new createjs.Shape;
        k.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(511, CANVAS_HEIGHT - 130, 1, 30);
        c.addChild(k);
        f.mask = k;
        g = new createjs.Text("", "24px " + FONT_GAME, "#fff");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT - 108;
        g.shadow = new createjs.Shadow("#000", 2, 2, 2);
        g.textBaseline = "alphabetic";
        g.textAlign = "center";
        c.addChild(g);
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0;
        c.addChild(h)
    };
    this.refreshLoader =
        function (c) {
            g.text = c + "%";
            k.graphics.clear();
            c = Math.floor(c * a / 100);
            k.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(511, CANVAS_HEIGHT - 130, c, 30)
        };
    this._init()
}
function CPayTablePanel() {
    var a, g, l, f, k, h;
    this._init = function () {
        h = new createjs.Container;
        k = createBitmap(s_oSpriteLibrary.getSprite("paytable"));
        h.addChild(k);
        a = [];
        var c, e = 450, d = 106;
        a[0] = [];
        for (c = 0; 3 > c; c++) {
            var b = new createjs.Text("X" + (5 - c), "bold 22px " + FONT_GAME, "#ffffff");
            b.textAlign = "center";
            b.shadow = new createjs.Shadow("#000", 1, 1, 2);
            b.x = e;
            b.y = d;
            b.textBaseline = "alphabetic";
            h.addChild(b);
            a[0][c] = b;
            d += 30
        }
        e = 660;
        d = 106;
        a[1] = [];
        for (c = 0; 3 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 22px " + FONT_GAME, "#ffffff"),
            b.textAlign = "center", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), a[1][c] = b, d += 30;
        e = 850;
        d = 106;
        a[2] = [];
        for (c = 0; 3 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 22px " + FONT_GAME, "#ffffff"), b.textAlign = "center", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), a[2][c] = b, d += 30;
        e = 1060;
        d = 102;
        a[3] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 21px " + FONT_GAME, "#ffffff"), b.textAlign = "center", b.shadow = new createjs.Shadow("#000",
            1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), a[3][c] = b, d += 22;
        e = 438;
        d = 194;
        a[4] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 21px " + FONT_GAME, "#ffffff"), b.textAlign = "center", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), a[4][c] = b, d += 22;
        e = 660;
        d = 194;
        a[5] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 21px " + FONT_GAME, "#ffffff"), b.textAlign = "center", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline =
            "alphabetic", h.addChild(b), a[5][c] = b, d += 22;
        e = 850;
        d = 194;
        a[6] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 21px " + FONT_GAME, "#ffffff"), b.textAlign = "center", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), a[6][c] = b, d += 22;
        e = 1060;
        d = 194;
        a[7] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text("X" + (5 - c), "bold 21px " + FONT_GAME, "#ffffff"), b.textAlign = "center", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), a[7][c] =
            b, d += 22;
        g = [];
        e = 480;
        d = 106;
        g[0] = [];
        for (c = 0; 3 > c; c++)b = new createjs.Text(s_aSymbolWin[0][4 - c], "22px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[0][c] = b, d += 30;
        e = 686;
        d = 106;
        g[1] = [];
        for (c = 0; 3 > c; c++)b = new createjs.Text(s_aSymbolWin[1][4 - c], "22px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[1][c] = b, d += 30;
        e = 880;
        d = 106;
        g[2] = [];
        for (c = 0; 3 > c; c++)b = new createjs.Text(s_aSymbolWin[2][4 - c], "22px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[2][c] = b, d += 30;
        e = 1080;
        d = 102;
        g[3] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text(s_aSymbolWin[3][4 - c], "21px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[3][c] = b, d += 22;
        e = 480;
        d = 194;
        g[4] = [];
        for (c = 0; 4 > c; c++)b =
            new createjs.Text(s_aSymbolWin[4][4 - c], "21px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[4][c] = b, d += 22;
        e = 685;
        d = 194;
        g[5] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text(s_aSymbolWin[5][4 - c], "21px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[5][c] = b, d += 22;
        e = 880;
        d = 194;
        g[6] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text(s_aSymbolWin[6][4 -
        c], "21px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[6][c] = b, d += 22;
        e = 1080;
        d = 194;
        g[7] = [];
        for (c = 0; 4 > c; c++)b = new createjs.Text(s_aSymbolWin[7][4 - c], "21px " + FONT_GAME, "#ffff00"), b.textAlign = "left", b.shadow = new createjs.Shadow("#000", 1, 1, 2), b.x = e, b.y = d, b.textBaseline = "alphabetic", h.addChild(b), g[7][c] = b, d += 22;
        l = new createjs.Text(TEXT_HELP_WILD, "22px " + FONT_GAME, "#ffff00");
        l.shadow = new createjs.Shadow("#000",
            2, 2, 2);
        l.textAlign = "center";
        l.lineHeight = 22;
        l.lineWidth = 200;
        l.x = 636;
        l.y = 286;
        h.addChild(l);
        f = new createjs.Text(TEXT_HELP_BONUS, "22px " + FONT_GAME, "#ffff00");
        f.shadow = new createjs.Shadow("#000", 2, 2, 2);
        f.textAlign = "center";
        f.lineHeight = 22;
        f.lineWidth = 190;
        f.x = 980;
        f.y = 294;
        h.addChild(f);
        h.visible = !1;
        s_oStage.addChild(h);
        var n = this;
        h.on("pressup", function () {
            n._onExit()
        })
    };
    this.unload = function () {
        var c = this;
        h.off("pressup", function () {
            c._onExit()
        });
        s_oStage.removeChild(h);
        for (var e = 0; e < a.length; e++)h.removeChild(a[e]);
        for (e = 0; e < g.length; e++)h.removeChild(g[e])
    };
    this.show = function () {
        h.visible = !0
    };
    this.hide = function () {
        h.visible = !1
    };
    this.resetHighlightCombo = function () {
        for (var c = 0; c < a.length; c++)for (var e = 0; e < a[c].length; e++)a[c][e].color = "#ffffff", g[c][e].color = "#ffff00", createjs.Tween.removeTweens(g[c][e]), g[c][e].alpha = 1
    };
    this.highlightCombo = function (a, e) {
        8 < a || (g[a - 1][NUM_REELS - e].color = "#ff0000", this.tweenAlpha(g[a - 1][NUM_REELS - e], 0))
    };
    this.tweenAlpha = function (a, e) {
        var d = this;
        createjs.Tween.get(a).to({alpha: e},
            200).call(function () {
                1 === e ? d.tweenAlpha(a, 0) : d.tweenAlpha(a, 1)
            })
    };
    this._onExit = function () {
        s_oGame.hidePayTable()
    };
    this.isVisible = function () {
        return h.visible
    };
    this._init()
}
function CMenu() {
    var a, g, l, f, k, h;
    this._init = function () {
        l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(l);
        var c = s_oSpriteLibrary.getSprite("but_play_bg");
        f = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80, c, TEXT_PLAY, FONT_GAME, "#ffde00", 58);
        f.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)c = s_oSpriteLibrary.getSprite("audio_icon"), a = CANVAS_WIDTH - c.width / 2 + 20, g = c.height / 2 + 20, k = new CToggle(a, g, c), k.addEventListener(ON_MOUSE_UP,
            this._onAudioToggle, this), null === s_oSoundTrack ? s_oSoundTrack = createjs.Sound.play("soundtrack", {
            volume: SOUNDTRACK_VOLUME,
            loop: -1
        }) : s_oSoundTrack.volume = 1;
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(h);
        createjs.Tween.get(h).to({alpha: 0}, 600).call(function () {
            h.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function (c, e) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || k.setPosition(a - c, e + g)
    };
    this.unload = function () {
        f.unload();
        f = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)k.unload(), k = null;
        s_oStage.removeAllChildren();
        s_oMenu = null
    };
    this._onButPlayRelease = function () {
        this.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session")
    };
    this._onAudioToggle = function () {
        createjs.Sound.setMute(!s_bAudioActive)
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CMain(a) {
    var g, l = 0, f = 0, k = STATE_LOADING, h, c, e;
    this.initContainer = function () {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        c = new CPreloader
    };
    this.preloaderReady = function () {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        g = !0
    };
    this.soundLoaded = function () {
        l++;
        l === f && (c.unload(), this.gotoMenu())
    };
    this._initSounds = function () {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/press_but.ogg",
            "press_but"), createjs.Sound.registerSound("./sounds/win.ogg", "win"), createjs.Sound.registerSound("./sounds/reels.ogg", "reels"), createjs.Sound.registerSound("./sounds/reel_stop.ogg", "reel_stop", 6), createjs.Sound.registerSound("./sounds/start_reel.ogg", "start_reel", 6), createjs.Sound.registerSound("./sounds/choose_bonus_item.ogg", "choose_bonus_item"), createjs.Sound.registerSound("./sounds/press_hold.ogg", "press_hold"), createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack")) : (createjs.Sound.alternateExtensions =
            ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/press_but.mp3", "press_but"), createjs.Sound.registerSound("./sounds/win.mp3", "win"), createjs.Sound.registerSound("./sounds/reels.mp3", "reels"), createjs.Sound.registerSound("./sounds/reel_stop.mp3", "reel_stop", 6), createjs.Sound.registerSound("./sounds/start_reel.mp3", "start_reel", 6), createjs.Sound.registerSound("./sounds/choose_bonus_item.mp3", "choose_bonus_item"), createjs.Sound.registerSound("./sounds/press_hold.mp3",
            "press_hold"), createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack")), f += 8)
    };
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable", "./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("but_play_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but", "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg",
            "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("hit_area_col", "./sprites/hit_area_col.png");
        s_oSpriteLibrary.addSprite("hold_col", "./sprites/hold_col.png");
        s_oSpriteLibrary.addSprite("bonus_bg", "./sprites/bonus_bg.jpg");
        s_oSpriteLibrary.addSprite("bonus_item", "./sprites/bonus_item.png");
        s_oSpriteLibrary.addSprite("bonus_prize", "./sprites/bonus_prize.png");
        for (var a = 1; a < NUM_SYMBOLS + 1; a++)s_oSpriteLibrary.addSprite("symbol_" +
            a, "./sprites/symbol_" + a + ".png"), s_oSpriteLibrary.addSprite("symbol_" + a + "_anim", "./sprites/symbol_" + a + "_anim.png");
        for (a = 1; a < NUM_PAYLINES + 1; a++)s_oSpriteLibrary.addSprite("payline_" + a, "./sprites/payline_" + a + ".png");
        f += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function () {
        l++;
        c.refreshLoader(Math.floor(l / f * 100));
        l === f && (c.unload(), this.gotoMenu())
    };
    this._onAllImagesLoaded = function () {
    };
    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages()
    };
    this.gotoMenu =
        function () {
            new CMenu;
            k = STATE_MENU
        };
    this.gotoGame = function () {
        e = new CGame(h);
        k = STATE_GAME
    };
    this.gotoHelp = function () {
        new CHelp;
        k = STATE_HELP
    };
    this.stopUpdate = function () {
        g = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block")
    };
    this.startUpdate = function () {
        s_iPrevTime = (new Date).getTime();
        g = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none")
    };
    this._update = function (a) {
        if (!1 !== g) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime =
                b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            k === STATE_GAME && e.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    h = a;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null;
TEXT_GAMEOVER = "GAME OVER";
TEXT_CONGRATS = "CONGRATULATIONS";
TEXT_MONEY = "SCORE";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_WIN = "WIN";
TEXT_HOLD = "HOLD";
TEXT_HELP_WILD = "JOLLY SYMBOL CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO";
TEXT_HELP_BONUS = "3 OR MORE PYRAMIDS LET YOU PLAY THE BONUS GAME!";
TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_MSG_SHARE1 = "You collected <strong>";
TEXT_MSG_SHARE2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_MSG_SHARING1 = "My score is ";
TEXT_MSG_SHARING2 = " points! Can you do better?";
function CInterface(a, g, l) {
    var f, k, h, c, e, d, b, n, t, p, q, u, w, y, A, x, v;
    this._init = function (a, g, l) {
        var m = s_oSpriteLibrary.getSprite("but_exit");
        f = CANVAS_WIDTH - m.width / 2 - 20;
        k = m.height / 2 + 20;
        b = new CGfxButton(f, k, m, !0);
        b.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)h = b.getX() - m.width, c = m.height / 2 + 20, q = new CToggle(h, c, s_oSpriteLibrary.getSprite("audio_icon")), q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        m = s_oSpriteLibrary.getSprite("spin_but");
        n = new CTextButton(1094 +
            m.width / 2, CANVAS_HEIGHT - m.height / 2 - 4, m, TEXT_WIN + "\n0.00", FONT_GAME, "#ffde00", 26);
        n.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        m = s_oSpriteLibrary.getSprite("info_but");
        t = new CTextButton(320 + m.width / 2, CANVAS_HEIGHT - m.height / 2 - 4, m, TEXT_INFO, FONT_GAME, "#ffffff", 32);
        t.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        m = s_oSpriteLibrary.getSprite("but_lines_bg");
        p = new CTextButton(490 + m.width / 2, CANVAS_HEIGHT - m.height / 2 - 4, m, TEXT_LINES, FONT_GAME, "#ffffff", 32);
        p.addEventListener(ON_MOUSE_UP, this._onAddLine,
            this);
        m = s_oSpriteLibrary.getSprite("coin_but");
        u = new CTextButton(678 + m.width / 2, CANVAS_HEIGHT - m.height / 2 - 4, m, TEXT_COIN, FONT_GAME, "#ffffff", 32);
        u.addEventListener(ON_MOUSE_UP, this._onBet, this);
        m = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        w = new CTextButton(866 + m.width / 2, CANVAS_HEIGHT - m.height / 2 - 4, m, TEXT_MAX_BET, FONT_GAME, "#ffffff", 32);
        w.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        A = new createjs.Text(TEXT_MONEY + "\n" + l.toFixed(2), "34px " + FONT_GAME, "#ffde00");
        A.x = 450;
        A.y = 46;
        A.textBaseline = "alphabetic";
        A.lineHeight = 28;
        A.textAlign = "center";
        s_oStage.addChild(A);
        v = new createjs.Text(NUM_PAYLINES, "24px " + FONT_GAME, "#ffde00");
        v.x = 584;
        v.y = CANVAS_HEIGHT - 77;
        v.shadow = new createjs.Shadow("#000", 2, 2, 2);
        v.textAlign = "center";
        v.textBaseline = "alphabetic";
        s_oStage.addChild(v);
        y = new createjs.Text(a.toFixed(2), "24px " + FONT_GAME, "#ffde00");
        y.x = 776;
        y.y = CANVAS_HEIGHT - 77;
        y.shadow = new createjs.Shadow("#000", 2, 2, 2);
        y.textAlign = "center";
        y.textBaseline = "alphabetic";
        s_oStage.addChild(y);
        x = new createjs.Text(TEXT_BET + ": " + g.toFixed(2),
            "24px " + FONT_GAME, "#ffde00");
        x.x = 980;
        x.y = CANVAS_HEIGHT - 77;
        x.shadow = new createjs.Shadow("#000", 2, 2, 2);
        x.textAlign = "center";
        x.textBaseline = "alphabetic";
        s_oStage.addChild(x);
        m = s_oSpriteLibrary.getSprite("bet_but");
        e = [];
        a = new CBetBut(334 + m.width / 2, 282 + m.height / 2, m, !0);
        a.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        e[0] = a;
        a = new CBetBut(334 + m.width / 2, 180 + m.height / 2, m, !0);
        a.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        e[1] = a;
        a = new CBetBut(334 + m.width / 2, 432 +
            m.height / 2, m, !0);
        a.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        e[2] = a;
        a = new CBetBut(334 + m.width / 2, 114 + m.height / 2, m, !0);
        a.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        e[3] = a;
        a = new CBetBut(334 + m.width / 2, 502 + m.height / 2, m, !0);
        a.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        e[4] = a;
        d = [];
        for (m = 0; m < NUM_PAYLINES; m++)a = new createjs.Bitmap(s_oSpriteLibrary.getSprite("payline_" + (m + 1))), a.x = 0, a.y = 0, a.visible = !1, s_oStage.addChild(a), d[m] =
            a;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function () {
        b.unload();
        b = null;
        n.unload();
        n = null;
        t.unload();
        t = null;
        p.unload();
        p = null;
        u.unload();
        u = null;
        w.unload();
        w = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)q.unload(), q = null;
        for (var a = 0; a < NUM_PAYLINES; a++)e[a].unload();
        s_oStage.removeAllChildren();
        s_oInterface = null
    };
    this.refreshButtonPos = function (a, d) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || q.setPosition(h - a, d + c);
        b.setPosition(f - a, d + k)
    };
    this.refreshMoney = function (a) {
        A.text = TEXT_MONEY +
            "\n" + a.toFixed(2)
    };
    this.refreshBet = function (a) {
        y.text = a.toFixed(2)
    };
    this.refreshTotalBet = function (a) {
        x.text = TEXT_BET + ": " + a.toFixed(2)
    };
    this.refreshNumLines = function (a) {
        v.text = a;
        for (var b = 0; b < NUM_PAYLINES; b++)b < a ? (e[b].setOn(), d[b].visible = !0) : e[b].setOff();
        setTimeout(function () {
            for (var a = 0; a < NUM_PAYLINES; a++)d[a].visible = !1
        }, 1E3)
    };
    this.resetWin = function () {
        n.changeText("")
    };
    this.refreshWinText = function (a) {
        n.changeText(TEXT_WIN + "\n" + a.toFixed(2))
    };
    this.showLine = function (a) {
        d[a - 1].visible = !0
    };
    this.hideLine =
        function (a) {
            d[a - 1].visible = !1
        };
    this.hideAllLines = function () {
        for (var a = 0; a < NUM_PAYLINES; a++)d[a].visible = !1
    };
    this.disableBetBut = function (a) {
        for (var b = 0; b < NUM_PAYLINES; b++)e[b].disable(a)
    };
    this.enableGuiButtons = function () {
        n.enable();
        w.enable();
        u.enable();
        p.enable();
        t.enable()
    };
    this.enableSpin = function () {
        n.enable();
        w.enable()
    };
    this.disableSpin = function () {
        n.disable();
        w.disable()
    };
    this.disableGuiButtons = function () {
        n.disable();
        w.disable();
        u.disable();
        p.disable();
        t.disable()
    };
    this._onBetLineClicked = function (a) {
        this.refreshNumLines(a);
        s_oGame.activateLines(a)
    };
    this._onExit = function () {
        s_oGame.onExit()
    };
    this._onSpin = function () {
        s_oGame.onSpin()
    };
    this._onAddLine = function () {
        s_oGame.addLine()
    };
    this._onInfo = function () {
        s_oGame.onInfoClicked()
    };
    this._onBet = function () {
        s_oGame.changeCoinBet()
    };
    this._onMaxBet = function () {
        s_oGame.onMaxBet()
    };
    this._onAudioToggle = function () {
        createjs.Sound.setMute(!s_bAudioActive)
    };
    s_oInterface = this;
    this._init(a, g, l);
    return this
}
var s_oInterface = null;
function CGfxButton(a, g, l, f) {
    var k, h, c, e, d, b, n;
    this._init = function (a, b, f, g) {
        k = !1;
        e = [];
        d = [];
        n = createBitmap(f);
        n.x = a;
        n.y = b;
        h = f.width;
        c = f.height;
        n.regX = f.width / 2;
        n.regY = f.height / 2;
        !1 !== g && s_oStage.addChild(n);
        this._initListener()
    };
    this.unload = function () {
        n.off("mousedown", this.buttonDown);
        n.off("pressup", this.buttonRelease);
        s_oStage.removeChild(n)
    };
    this.setVisible = function (a) {
        n.visible = a
    };
    this.enable = function () {
        k = !1;
        n.filters = [];
        n.cache(0, 0, h, c)
    };
    this.disable = function () {
        k = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        n.filters = [new createjs.ColorMatrixFilter(a)];
        n.cache(0, 0, h, c)
    };
    this._initListener = function () {
        n.on("mousedown", this.buttonDown);
        n.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, b, c) {
        e[a] = b;
        d[a] = c
    };
    this.addEventListenerWithParams = function (a, c, f, g) {
        e[a] = c;
        d[a] = f;
        b = g
    };
    this.buttonRelease = function () {
        k || (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but"), n.scaleX = 1, n.scaleY = 1, e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(d[ON_MOUSE_UP], b))
    };
    this.buttonDown = function () {
        k ||
        (n.scaleX = .9, n.scaleY = .9, e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN], b))
    };
    this.setPosition = function (a, b) {
        n.x = a;
        n.y = b
    };
    this.setX = function (a) {
        n.x = a
    };
    this.setY = function (a) {
        n.y = a
    };
    this.getButtonImage = function () {
        return n
    };
    this.getX = function () {
        return n.x
    };
    this.getY = function () {
        return n.y
    };
    this.getSprite = function () {
        return n
    };
    this._init(a, g, l, f);
    return this
}
function CGame(a) {
    var g = !1, l, f, k, h, c, e, d, b, n, t, p, q, u, w = 0, y, A, x, v, B, z, G, m, D, H, F, E, M, I, J, K, r, C = null, L;
    this._init = function () {
        k = GAME_STATE_IDLE;
        l = !0;
        x = u = e = h = 0;
        G = [0, 1, 2, 3, 4];
        c = G[0];
        d = NUM_PAYLINES;
        q = TOTAL_MONEY;
        t = MIN_BET;
        p = t * d;
        m = [];
        for (var a = 0; a < NUM_ROWS; a++) {
            m[a] = [];
            for (var b = 0; b < NUM_REELS; b++)m[a][b] = 0
        }
        s_oTweenController = new CTweenController;
        J = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(J);
        this._initReels();
        K = createBitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oStage.addChild(K);
        this._initStaticSymbols();
        this._initHitAreaColumn();
        r = new CInterface(t, p, q);
        L = new CBonusPanel;
        C = new CPayTablePanel;
        q < p && r.disableSpin();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)s_oSoundTrack.volume = .4;
        g = !0
    };
    this.unload = function () {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)createjs.Sound.stop(), s_oSoundTrack = null;
        s_oStage.removeChild(J);
        s_oStage.removeChild(K);
        r.unload();
        C.unload();
        for (var a = 0; a < v.length; a++)v[a].unload();
        for (a = 0; a < NUM_ROWS; a++)for (var b = 0; b < NUM_REELS; b++)B[a][b].unload();
        L.unload()
    };
    this._initReels = function () {
        var a = REEL_OFFSET_X, b = REEL_OFFSET_Y, c = 0;
        v = [];
        for (var d = 0; d < NUM_REELS; d++)v[d] = new CReelColumn(d, a, b, c), v[d + NUM_REELS] = new CReelColumn(d + NUM_REELS, a, b + SYMBOL_SIZE * NUM_ROWS, c), a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS, c += REEL_DELAY
    };
    this._initStaticSymbols = function () {
        var a = REEL_OFFSET_X, b = REEL_OFFSET_Y;
        B = [];
        for (var c = 0; c < NUM_ROWS; c++) {
            B[c] = [];
            for (var d = 0; d < NUM_REELS; d++) {
                var e = new CStaticSymbolCell(c, d, a, b);
                B[c][d] = e;
                a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            a = REEL_OFFSET_X;
            b += SYMBOL_SIZE
        }
    };
    this._initHitAreaColumn = function () {
        E = [];
        F = [];
        for (var a = 376, b = 116, c = 0; c < NUM_REELS; c++) {
            var d = createBitmap(s_oSpriteLibrary.getSprite("hold_col"));
            d.x = a;
            d.y = b;
            d.visible = !1;
            s_oStage.addChild(d);
            a += 150;
            F.push(d);
            E[c] = !1
        }
        D = [];
        H = [];
        for (var a = 381, b = 108, c = s_oSpriteLibrary.getSprite("hit_area_col"), d = 0; d < NUM_REELS; d++) {
            var e = new createjs.Text(TEXT_HOLD, "30px " + FONT_GAME, "#ffffff");
            e.visible = !1;
            e.x = a + c.width / 2;
            e.y = b + c.height - 20;
            e.shadow = new createjs.Shadow("#000", 1, 1, 2);
            e.textAlign = "center";
            s_oStage.addChild(e);
            D[d] = e;
            e = new CGfxButton(a + c.width / 2, b + c.height / 2, c);
            e.setVisible(!1);
            e.addEventListenerWithParams(ON_MOUSE_UP, this._onHitAreaCol, this, {index: d});
            a += 150;
            H.push(e)
        }
    };
    this.generateFinalSymbols = function () {
        for (var a = 0; a < NUM_ROWS; a++)for (var b = 0; b < NUM_REELS; b++)!1 === v[b].isHold() && (m[a][b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]);
        z = [];
        for (a = y = 0; a < d; a++) {
            var b = s_aPaylineCombo[a], c = [], e = m[b[0].row][b[0].col];
            if (e !== BONUS_SYMBOL) {
                var g = 1, h = 1;
                for (c.push({row: b[0].row, col: b[0].col, value: m[b[0].row][b[0].col]}); e ===
                WILD_SYMBOL && h < NUM_REELS;)g++, e = m[b[h].row][b[h].col], c.push({
                    row: b[h].row,
                    col: b[h].col,
                    value: m[b[h].row][b[h].col]
                }), h++;
                for (; h < b.length; h++)if (m[b[h].row][b[h].col] === e || m[b[h].row][b[h].col] === WILD_SYMBOL) {
                    if (m[b[h].row][b[h].col] === BONUS_SYMBOL)break;
                    g++;
                    c.push({row: b[h].row, col: b[h].col, value: m[b[h].row][b[h].col]})
                } else break;
                0 < s_aSymbolWin[e - 1][g - 1] && (y += s_aSymbolWin[e - 1][g - 1], z.push({
                    line: a + 1,
                    amount: s_aSymbolWin[e - 1][g - 1],
                    num_win: g,
                    value: e,
                    list: c
                }))
            }
        }
        f = !1;
        w = 0;
        c = [];
        for (a = 0; a < NUM_ROWS; a++)for (b =
                                               0; b < NUM_REELS; b++)m[a][b] === BONUS_SYMBOL && (c.push({
            row: a,
            col: b,
            value: m[a][b]
        }), w++);
        w >= NUM_SYMBOLS_FOR_BONUS && (z.push({
            line: -1,
            amount: 0,
            num_win: w,
            value: BONUS_SYMBOL,
            list: c
        }), 5 < w && (w = 5), f = !0);
        return 0 < z.length ? !0 : !1
    };
    this._generateRandSymbols = function () {
        for (var a = [], b = 0; b < NUM_ROWS; b++)a[b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return a
    };
    this.reelArrived = function (a, b) {
        if (h > MIN_REEL_LOOPS)if (c === b) {
            if (!1 === v[a].isReadyToStop()) {
                var d = a;
                a < NUM_REELS ? (d += NUM_REELS, v[d].setReadyToStop(),
                    v[a].restart([m[0][a], m[1][a], m[2][a]], !0)) : (d -= NUM_REELS, v[d].setReadyToStop(), v[a].restart([m[0][d], m[1][d], m[2][d]], !0))
            }
        } else v[a].restart(this._generateRandSymbols(), !1); else v[a].restart(this._generateRandSymbols(), !1), 0 === a && h++
    };
    this.increaseReelLoops = function () {
        h += 2
    };
    this.stopNextReel = function () {
        e++;
        0 === e % 2 && (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("reel_stop", {volume: .3}), c = G[e / 2], e === 2 * NUM_REELS && this._endReelAnimation())
    };
    this._endReelAnimation = function () {
        !1 !== DISABLE_SOUND_MOBILE &&
        !1 !== s_bMobile || M.stop();
        e = h = 0;
        c = G[0];
        for (var a = 0; a < NUM_REELS; a++)E[a] = !1, F[a].visible = !1, v[a].setHold(!1), v[a + NUM_REELS].setHold(!1);
        u = 0;
        if (0 < z.length) {
            for (var d = 0; d < z.length; d++) {
                C.highlightCombo(z[d].value, z[d].num_win);
                -1 !== z[d].line && r.showLine(z[d].line);
                for (var g = z[d].list, a = 0; a < g.length; a++)B[g[a].row][g[a].col].show(g[a].value)
            }
            y *= t;
            q += y;
            SLOT_CASH -= y;
            0 < y && (r.refreshMoney(q), r.refreshWinText(y));
            b = 0;
            k = GAME_STATE_SHOW_ALL_WIN;
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)I = createjs.Sound.play("win")
        } else l &&
        this.enableColumnHitArea(), r.refreshWinText(0), k = GAME_STATE_IDLE;
        !1 === l && (l = !0);
        !1 === f && (r.disableBetBut(!1), r.enableGuiButtons());
        q < p && r.disableSpin();
        x++;
        x === A && (x = 0, $(s_oMain).trigger("show_interlevel_ad"));

        $(s_oMain).trigger("save_score", q)
    };
    this.hidePayTable = function () {
        C.hide()
    };
    this._showWin = function () {
        var a;
        if (0 < n) {
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || I.stop();
            -1 !== z[n - 1].line && (a = z[n - 1].line, r.hideLine(a));
            a = z[n - 1].list;
            for (var b = 0; b < a.length; b++)B[a[b].row][a[b].col].stopAnim()
        }
        n ===
        z.length && (n = 0);
        -1 !== z[n].line && (a = z[n].line, r.showLine(a));
        a = z[n].list;
        for (b = 0; b < a.length; b++)B[a[b].row][a[b].col].show(a[b].value);
        n++
    };
    this._hideAllWins = function () {
        for (var a = 0; a < z.length; a++)for (var c = z[a].list, d = 0; d < c.length; d++)B[c[d].row][c[d].col].stopAnim();
        r.hideAllLines();
        n = b = 0;
        b = TIME_SHOW_WIN;
        k = GAME_STATE_SHOW_WIN;
        f && L.show(w)
    };
    this.enableColumnHitArea = function () {
        for (var a = 0; a < NUM_REELS; a++)D[a].visible = !0, H[a].setVisible(!0)
    };
    this.disableColumnHitArea = function () {
        for (var a = 0; a < NUM_REELS; a++)D[a].visible = !1, H[a].setVisible(!1)
    };
    this.activateLines = function (a) {
        d = a;
        this.removeWinShowing();
        p = a = t * d;
        r.refreshTotalBet(p);
        r.refreshNumLines(d);
        a > q ? r.disableSpin() : r.enableSpin()
    };
    this.addLine = function () {
        d === NUM_PAYLINES ? d = 1 : d++;
        var a = t * d;
        p = a;
        r.refreshTotalBet(p);
        r.refreshNumLines(d);
        a > q ? r.disableSpin() : r.enableSpin()
    };
    this.changeCoinBet = function () {
        var a = Math.floor(100 * (t + .05)) / 100;
        a > MAX_BET ? (t = MIN_BET, p = t * d, r.refreshBet(t), r.refreshTotalBet(p), a = p) : (a *= d, t += .05, t = Math.floor(100 * t) / 100, p = a, r.refreshBet(t), r.refreshTotalBet(p));
        a > q ? r.disableSpin() : r.enableSpin()
    };
    this.onMaxBet = function () {
        var a = MAX_BET;
        d = NUM_PAYLINES;
        a *= d;
        t = MAX_BET;
        p = a;
        r.refreshBet(t);
        r.refreshTotalBet(p);
        r.refreshNumLines(d);
        a > q ? r.disableSpin() : (r.enableSpin(), this.onSpin())
    };
    this._onHitAreaCol = function (a) {
        a = a.index;
        !0 === E[a] ? (E[a] = !1, F[a].visible = !1, D[a].visible = !0, u--, v[a].setHold(!1), v[a + NUM_REELS].setHold(!1)) : u < MAX_NUM_HOLD && (E[a] = !0, u++, F[a].visible = !0, D[a].visible = !1, v[a].setHold(!0), v[a + NUM_REELS].setHold(!0), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile ||
        createjs.Sound.play("press_hold"));
        l = !1
    };
    this.removeWinShowing = function () {
        C.resetHighlightCombo();
        r.resetWin();
        for (var a = 0; a < NUM_ROWS; a++)for (var b = 0; b < NUM_REELS; b++)B[a][b].hide();
        for (a = 0; a < v.length; a++)v[a].activate();
        k = GAME_STATE_IDLE
    };
    this.endBonus = function (a) {
        q += a;
        r.refreshMoney(q);
        SLOT_CASH -= a;
        r.disableBetBut(!1);
        r.enableGuiButtons()
    };
    this.onSpin = function () {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)I && I.stop(), M = createjs.Sound.play("reels", {volume: .3});
        this.disableColumnHitArea();
        r.disableBetBut(!0);
        this.removeWinShowing();
        MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
        for (var a = 0; a < s_aSymbolWin.length; a++)for (var b = s_aSymbolWin[a], c = 0; c < b.length; c++)0 !== b[c] && b[c] < MIN_WIN && (MIN_WIN = b[c]);
        MIN_WIN *= t;
        q -= p;
        r.refreshMoney(q);
        SLOT_CASH += p;
        if (SLOT_CASH < MIN_WIN) {
            do a = this.generateFinalSymbols(); while (!0 === a)
        } else if (Math.floor(100 * Math.random()) > WIN_OCCURRENCE) {
            do a = this.generateFinalSymbols(); while (!0 === a)
        } else if (SLOT_CASH < BONUS_PRIZE[0][0]) {
            do a = this.generateFinalSymbols(); while (!1 === a || y * t >
            SLOT_CASH || f)
        } else if (Math.floor(100 * Math.random()) > BONUS_OCCURRENCE) {
            do a = this.generateFinalSymbols(); while (!1 === a || y * t > SLOT_CASH || f)
        } else {
            do a = this.generateFinalSymbols(), b = 0, f && (b = w - 3); while (!1 === a || y * t > SLOT_CASH || !1 === f || BONUS_PRIZE[b][0] > SLOT_CASH)
        }
        r.hideAllLines();
        r.disableGuiButtons();
        k = GAME_STATE_SPINNING
    };
    this.onInfoClicked = function () {
        k !== GAME_STATE_SPINNING && (C.isVisible() ? C.hide() : C.show())
    };
    this.onExit = function () {
        this.unload();
        a.money = q;
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event",
            {
                img: "200x200.jpg",
                title: TEXT_CONGRATULATIONS,
                msg: TEXT_MSG_SHARE1 + q + TEXT_MSG_SHARE2,
                msg_share: TEXT_MSG_SHARING1 + q + TEXT_MSG_SHARING2
            })
    };
    this.getState = function () {
        return k
    };
    this.update = function () {
        if (!1 !== g)switch (k) {
            case GAME_STATE_SPINNING:
                for (var a = 0; a < v.length; a++)v[a].update(c);
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                b += s_iTimeElaps;
                b > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                b += s_iTimeElaps, b > TIME_SHOW_WIN && (b = 0, this._showWin())
        }
    };
    s_oGame = this;
    WIN_OCCURRENCE = a.win_occurrence;
    SLOT_CASH = a.slot_cash;
    BONUS_OCCURRENCE = a.bonus_occurrence;
    MIN_REEL_LOOPS = a.min_reel_loop;
    REEL_DELAY = a.reel_delay;
    TIME_SHOW_WIN = a.time_show_win;
    TIME_SHOW_ALL_WINS = a.time_show_all_wins;
    TOTAL_MONEY = a.money;
    MIN_BET = a.min_bet;
    MAX_BET = a.max_bet;
    MAX_NUM_HOLD = a.max_hold;
    PERC_WIN_PRIZE_1 = a.perc_win_prize_1;
    PERC_WIN_PRIZE_2 = a.perc_win_prize_2;
    PERC_WIN_PRIZE_3 = a.perc_win_prize_3;
    NUM_SYMBOLS_FOR_BONUS = a.num_symbol_bonus;
    A = a.num_spin_ads_showing;
    new CSlotSettings;
    this._init()
}
var s_oGame, s_oTweenController;
function CBonusPanel() {
    var a, g, l, f, k, h, c, e;
    this._init = function () {
        e = new createjs.Container;
        s_oStage.addChild(e);
        var a = createBitmap(s_oSpriteLibrary.getSprite("bonus_bg"));
        e.alpha = 0;
        e.visible = !1;
        e.addChild(a);
        a = {
            framerate: 6,
            images: [s_oSpriteLibrary.getSprite("bonus_item")],
            frames: {width: BONUS_ITEM_WIDTH, height: BONUS_ITEM_HEIGHT},
            animations: {idle: [0], item_clicked: [1, 14, "idle"]}
        };
        a = new createjs.SpriteSheet(a);
        l = [];
        for (var b = [{x: 253, y: 30}, {x: 577, y: 118}, {x: 946, y: 19}, {x: 262, y: 305}, {
            x: 927,
            y: 305
        }], f = 0; 5 > f; f++) {
            var g =
                createSprite(a, "idle", 0, 0, BONUS_ITEM_WIDTH, BONUS_ITEM_HEIGHT);
            g.on("click", this._onBonusItemReleased, this, !1, f);
            g.x = b[f].x;
            g.y = b[f].y;
            g.visible = !1;
            e.addChild(g);
            l[f] = g
        }
        a = s_oSpriteLibrary.getSprite("bonus_prize");
        k = [];
        h = [];
        k[0] = createBitmap(a);
        k[0].x = 300;
        k[0].y = CANVAS_HEIGHT - 90;
        e.addChild(k[0]);
        b = new createjs.Text("100", "44px " + FONT_GAME, "#ffff00");
        b.textAlign = "left";
        b.x = k[0].x + a.width + 10;
        b.y = k[0].y + a.height / 2;
        b.textBaseline = "middle";
        e.addChild(b);
        h.push(b);
        k[1] = createBitmap(a);
        k[1].x = 600;
        k[1].y = CANVAS_HEIGHT -
            90;
        e.addChild(k[1]);
        b = new createjs.Text("200", "44px " + FONT_GAME, "#ffff00");
        b.textAlign = "left";
        b.x = k[1].x + a.width + 10;
        b.y = k[1].y + a.height / 2;
        b.textBaseline = "middle";
        e.addChild(b);
        h.push(b);
        k[2] = createBitmap(a);
        k[2].x = 900;
        k[2].y = CANVAS_HEIGHT - 90;
        e.addChild(k[2]);
        b = new createjs.Text("300", "44px " + FONT_GAME, "#ffff00");
        b.textAlign = "left";
        b.x = k[2].x + a.width + 10;
        b.y = k[2].y + a.height / 2;
        b.textBaseline = "middle";
        e.addChild(b);
        h.push(b);
        c = [{x: 440, y: 129}, {x: 765, y: 219}, {x: 1134, y: 129}, {x: 450, y: 405}, {x: 1114, y: 405}]
    };
    this.unload = function () {
        for (var a = 0; 5 > a; a++)l[a].off("click", this._onBonusItemReleased)
    };
    this.show = function (c) {
        a = !1;
        switch (c) {
            case 3:
                f = BONUS_PRIZE[0];
                break;
            case 4:
                f = BONUS_PRIZE[1];
                break;
            case 5:
                f = BONUS_PRIZE[2];
                break;
            default:
                f = BONUS_PRIZE[0]
        }
        h[0].text = f[0] + "$";
        h[1].text = f[1] + "$";
        h[2].text = f[2] + "$";
        for (var b = 0; b < c; b++)l[b].visible = !0;
        e.visible = !0;
        createjs.Tween.get(e).to({alpha: 1}, 1E3)
    };
    this._onBonusItemReleased = function (c, b) {
        a || (a = !0, g = f[s_aPrizeOccurence[Math.floor(Math.random() * s_aPrizeOccurence.length)]],
            l[b].gotoAndPlay("item_clicked"), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("choose_bonus_item"), this.endBonus(b))
    };
    this.endBonus = function (a) {
        new CScoreText("+" + g, c[a].x, c[a].y);
        setTimeout(function () {
            e.alpha = 0;
            e.visible = !1;
            s_oGame.endBonus(g)
        }, 4E3)
    };
    this._init()
};