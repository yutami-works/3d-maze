// キャンバス定義
const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');
const canvasWidth = 640;
const canvasHeight = 480;

const step = 0;
const squareWidth = 80;
const squareHeight = 60;

// エレメント
const dirDisplay = document.getElementById('dir');
const mazeMap = document.getElementById('map');
const openMazeMapFlag = document.getElementById('checkMap');

let x;
let y;
let dir;

// 迷路
const maze = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1,
  1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1
];

const mazeWidth = 16;
const mazeHeight = maze.length / mazeWidth;

/* マップ表示関数 */
const showMazeMap = () => {
  const mapElm = '';
  const dirArrow = ['→', '↓', '←', '↑'];

  for (let i = 0; i < maze.length; i++) {
    if (maze[i] == 1) {
      map += '□';
    } else if (maze[i]) {
      //aaa
    }
  }
}

/* 画面描画関数 */
const draw = () => {
  // 前方と左右を抽出
  let front = [1, 1, 1, 1];
  let left = [1, 1, 1, 1];
  let right = [1, 1, 1, 1];

  // 各進行方向の4歩先までのデータを取得
  for (let i = 0; i < 4; i++) {
    if ((dir == 0) && ((x + i) < mazeWidth)) {
      // 進行方向：東
      front[i] = maze[(x + i) + y * mazeWidth];
      if (y-1>=0) left[i] = maze[(x + i) + (y-1) * mazeWidth];
      if (y+1<mazeHeight) right[i] = maze[(x + i) + (y+1) * mazeWidth];
    } else if ((dir == 1) && ((y + i) < mazeHeight)) {
      // 進行方向：南
      front[i] = maze[x + (y+i) * mazeWidth];
      if (y-1>=0) left[i] = maze[(x + i) + (y-1) * mazeWidth];
      if (y+1<mazeHeight) right[i] = maze[(x + i) + (y+1) * mazeWidth];
    } else if ((dir == 1) && ((y + i) < mazeHeight)) {
      // 進行方向：西
      front[i] = maze[x + (y+i) * mazeWidth];
      if (y-1>=0) left[i] = maze[(x + i) + (y-1) * mazeWidth];
      if (y+1<mazeHeight) right[i] = maze[(x + i) + (y+1) * mazeWidth];
    } else if ((dir == 1) && ((y + i) < mazeHeight)) {
      // 進行方向：北
      front[i] = maze[x + (y+i) * mazeWidth];
      if (y-1>=0) left[i] = maze[(x + i) + (y-1) * mazeWidth];
      if (y+1<mazeHeight) right[i] = maze[(x + i) + (y+1) * mazeWidth];
    }
  }

  // 迷路を描画
  ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
  ctx.beginPath(); // 線引き開始
  ctx.strokeStyle = '#FFFFFF'; // 線の色：白

  for (let i = 0; i < 4; i++) {
    if ((front[i] == 0) && (i < 3)) {
      // 左
      if (left[i] > 0) {
        // 壁描画
        ctx.moveTo(squareWidth * i, squareHeight * i); // 線引きの開始座標
        ctx.lineTo(squareWidth * (i + 1), squareHeight * (i + 1));
        ctx.lineTo(squareWidth * (i + 1), canvasHeight - squareHeight * (i + 1));
        ctx.lineTo(squareWidth * i, canvasHeight - squareHeight * i);
      } else {
        // 通路描画
        ctx.moveTo(squareWidth * i, squareHeight * (i + 1));
        ctx.lineTo(squareWidth * (i + 1), squareHeight * (i + 1));
        ctx.lineTo(squareWidth * (i + 1), canvasHeight - squareHeight * (i + 1));
        ctx.lineTo(squareWidth * (i + 1), canvasHeight - squareHeight * (i + 1));
      }

      // 右
      if (right[i] > 0) {
        // 壁描画
        ctx.moveTo(canvasWidth - squareWidth * i, squareHeight * i);
        ctx.lineTo(canvasWidth - squareWidth * (i + 1), squareHeight * (i + 1));
        ctx.lineTo(canvasWidth - squareWidth * (i + 1), canvasHeight - squareHeight * (i + 1));
        ctx.lineTo(canvasWidth - squareWidth * i, canvasHeight - squareHeight * i);
      } else {
        // 通路描画
        ctx.moveTo(canvasWidth - squareWidth * i, squareHeight * (i + 1));
        ctx.lineTo(canvasWidth - squareWidth * (i + 1), squareHeight * (i + 1));
        ctx.lineTo(canvasWidth - squareWidth * (i + 1), canvasHeight - squareHeight * (i + 1));
        ctx.lineTo(canvasWidth - squareWidth * i, canvasHeight - squareHeight * (i + 1));
      }
    } else if (front[i] != 0) {
      // 前方の壁
      ctx.rect(squareWidth * i, squareHeight * i, canvasWidth - squareWidth * 2 * i, canvasHeight - squareHeight*  2 * i);
      if (front[i] == 2) {
        // ゴール
        ctx.rect(240+20*i, 120+30*1, 160-40*i, 360-90*i);
      }
      break;
    }
  }
  ctx.stroke(); // 線引き終了

  // マップ
  if (openMazeMapFlag.checked) {
    showMazeMap();
  } else {
    mazeMap.innerHTML = '';
  }
}

/* 移動関数 */
const move = () => {
  if ((dir == 0) && (maze[(x+1)+y*mazeWidth] == 0)) x++;
  if ((dir == 1) && (maze[x+(y+1)*mazeWidth] == 0)) y++;
  if ((dir == 2) && (maze[(x-1)+y*mazeWidth] == 0)) x--;
  if ((dir == 3) && (maze[x+(y-1)*mazeWidth] == 0)) y--;

  draw();
}

const changeDirDisplay = (dirNum) => {
  const dirText = ['東', '南', '西', '北'];
  dirDisplay.innerHTML = dirText[dirNum];
}

/* 方向転換関数 */
const rotate = (n) => {
  dir += n;
  if (dir == 4) dir = 0;
  if (dir == -1) dir = 3;
  changeDirDisplay(dir);

  draw();
}

const startMaze = () => {
  x = 0;
  y = 1;
  dir = 0;
  changeDirDisplay(dir);

  // 描画
  draw();
}

/* イベントハンドラ */
window.addEventListener('load', (event) => {
  startMaze();
});