//number of cells, [x, y]
const size = [100, 60];
//dimension of each cells
const boardWidth = 600;
//default speed, milliseconds frame rate
const rate = 200;
//density of live cells when generating random board
const density = 0.3;
//initial state of the board (empty board)
let obj = {};
for (let j=0; j<size[1]; j++) {
  for (let i=0; i<size[0]; i++) {
    obj[i+'x'+j] = "dead"
  }
}
const initState = obj;

export {size, boardWidth, rate, density, initState}
