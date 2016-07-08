var CANVAS_WIDTH = 1500;
var CANVAS_HEIGHT = 640;

var EDGEBOARD_X = 300;
var EDGEBOARD_Y = 0;

var FPS_TIME      = 1000/24;
var DISABLE_SOUND_MOBILE = false;
var FONT_GAME = "arialbold";

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var GAME_STATE_IDLE         = 0;
var GAME_STATE_SPINNING     = 1;
var GAME_STATE_SHOW_ALL_WIN = 2;
var GAME_STATE_SHOW_WIN     = 3;

var REEL_STATE_START   = 0;
var REEL_STATE_MOVING = 1;
var REEL_STATE_STOP    = 2;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP   = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT  = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END   = 5;

var REEL_OFFSET_X = 380;
var REEL_OFFSET_Y = 84;

var NUM_REELS = 5;
var NUM_ROWS = 3;
var NUM_SYMBOLS = 8;
var WILD_SYMBOL = 8;
var NUM_PAYLINES = 20;
var SYMBOL_SIZE = 140;
var SPACE_BETWEEN_SYMBOLS = 10;
var MAX_FRAMES_REEL_EASE = 16;
var MIN_REEL_LOOPS;
var REEL_DELAY;
var REEL_START_Y = REEL_OFFSET_Y - (SYMBOL_SIZE * 3);
var REEL_ARRIVAL_Y = REEL_OFFSET_Y + (SYMBOL_SIZE * 3);
var TIME_SHOW_WIN;
var TIME_SHOW_ALL_WINS;
var TOTAL_MONEY;
var WIN_OCCURRENCE;
var SLOT_CASH;
var MIN_WIN;