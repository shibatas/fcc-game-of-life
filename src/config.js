//number of cells, [x, y]
const size = [50, 30];
//dimension of each cells
const cell = [12, 12];
//default speed, milliseconds frame rate
const rate = 250;
//density of live cells when generating random board
const density = 0.3;
//initial state of the board (empty board)
const initState = {};
for (let j=0; j<size[1]; j++) {
  for (let i=0; i<size[0]; i++) {
    initState[i+'x'+j] = "dead"
  }
}
export {size, cell, rate, density, initState}
