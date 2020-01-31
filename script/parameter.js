const WIDTH = 10;
const HEIGHT = 20;
const BLOCK_SIZE = 30;
const COLOR = 7;
const piece = [
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0]
  ]
];
let color = [
  'rgb(201, 50, 50)',
  'rgb(100, 211, 96)',
  'rgb(241, 233, 123)',
  'rgb(92, 216, 154)',
  'rgb(86, 197, 231)',
  'rgb(115, 112, 255)',
  'rgb(229, 96, 255)'
];

let map = new Array(HEIGHT).fill(false).map(() => new Array(WIDTH).fill(false));
let keystatus = new Array(6).fill(false);
let predict = Math.floor(Math.random() * Math.floor(7));
let colorMap = new Array(HEIGHT).fill(-1).map(() => new Array(WIDTH).fill(-1));
// calulate level
let levelClear = 0;
// calculate score
let level = 0;
let clearAtOnce = 0;
let score = 0;

// store block
let storeItem = -1;
let storeBefore = false;

// time Id
const autoDropSpeed = 800;
const hard = 200;
let autoDropID;

let game;