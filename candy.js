
const rows = 9;
const cols = 9;
const colors = ["red", "blue", "green", "yellow", "purple"]

var boardArr = []

initialiseBoard();

function initialiseBoard() {
  const boardElem = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    // create a new empty row
    var boardRow = []
    for (let c = 0; c < cols; c++) {
      // create a new div for cell-back
      const newcellback = document.createElement("div");
      //console.log("boardElem  ", boardElem)
      //console.log("newcellback", newcellback)
      //console.log(r, c);

      // make it a cell-back
      newcellback.classList.add("cell-back");

      // pick a cell color for this cell
      const cellcolor = getColor();

      // set up the data for cell-back
      //newcellback.dataset.row = r;
      //newcellback.dataset.col = c;
      //newcellback.dataset.color = cellcolor;



      // add as a child to the board element
      boardElem.appendChild(newcellback);



      // create a new div for cell and set its color
      const newcell = document.createElement("div");
      newcell.classList.add(cellcolor);

      // set up the data for cell-back
      newcell.dataset.row = r;
      newcell.dataset.col = c;
      newcell.dataset.color = cellcolor;

      // make the newcell draggable
      //newcell.setAttribute("draggable", false);

      // set up event listeners for this cell
      newcell.addEventListener("mouseover", overDrag);
      newcell.addEventListener("mouseout", overDragEnd);
      newcell.addEventListener("mousedown", startDrag);
      newcell.addEventListener("mouseup", endDrag);
      //newcell.addEventListener("dragstart", startDrag);
      //newcell.addEventListener("dragend", endDrag);

      // add this cell to the current row of the board array
      boardRow.push(newcell);

      // make it a cell and make it a child of newcell-back
      newcell.classList.add("cell");

      newcellback.appendChild(newcell);
    }
    boardArr.push(boardRow);
  }
}

function showDetails(e) {
  var cellback = e.target;

  document.getElementById("details-row").innerHTML = cellback.dataset.row;

  document.getElementById("details-col").innerHTML = cellback.dataset.col;

  document.getElementById("details-color").innerHTML = cellback.dataset.color;


}

function clearDetails(e) {
  var cellback = e.target;

  document.getElementById("details-row").innerHTML = "";

  document.getElementById("details-col").innerHTML = "";

  document.getElementById("details-color").innerHTML = "";
}

function getColor() {

  // get random index value
  const rIndex = Math.floor(Math.random() * colors.length);

  // get random item
  const item = colors[rIndex];

  return item;
}


/* ********************************** */
/* Dragging variables and functions   */
/* ********************************** */

var startcell = null;
var endcell = null;

// click on a cell and start the drag
function startDrag(e) {
  if (startcell) {
    startcell.classList.remove("dragstart");
  }
  if (endcell) {
    endcell.classList.remove("dragstart");
    endcell = null;
  }

  startcell = e.target;
  startcell.classList.add("dragstart");
  //console.log("start", startcell);



  document.getElementById("details-row").innerHTML = startcell.dataset.row;

  document.getElementById("details-col").innerHTML = startcell.dataset.col;

  document.getElementById("details-color").innerHTML = "";

  document.getElementById("details-status").innerHTML = "dragging";

}

// make a cell more transparent when moving over it
// and dragging has started
function overDrag(e) {
  const overcell = e.target;

  if (startcell) {
    if (isValidSwap(startcell, overcell)) {
      overcell.classList.add("dragover");
    }
  }
}

// set cell to normal opacity when the mouse leaves it
function overDragEnd(e) {
  e.target.classList.remove("dragover");
}


function endDrag(e) {
  e.preventDefault();
  endcell = e.target;

  if (isValidSwap(startcell, endcell))
  {
    // only carry out swap if it is a valid move.
    swapCells(startcell, endcell);
  }
  //console.log("end", endcell);
  //document.getElementById("details-row").innerHTML = endcell.dataset.row;
  //document.getElementById("details-col").innerHTML = endcell.dataset.col;
  //document.getElementById("details-color").innerHTML = "";
  //document.getElementById("details-status").innerHTML = "end drag";

  // clear the dragging event
  startcell.classList.remove("dragstart");
  startcell = null;
  endcell.classList.remove("dragover");
}

// return true if the two cell elements are adjacent
function isValidSwap(cell1, cell2) {

  var hmove = Math.abs(cell2.dataset.row - cell1.dataset.row);
  var vmove = Math.abs(cell2.dataset.col - cell1.dataset.col);

  var validhmove = (hmove==1)&&(vmove==0);
  var validvmove = (vmove==1)&&(hmove==0);

  return (validhmove || validvmove );

}

// swap the two cells
// just need to change the color data and associated class of
// the cells
function swapCells(cell1, cell2){
  var color1 = cell1.dataset.color;
  var color2 = cell2.dataset.color;

  // replace color of cell1 with color2
  cell1.dataset.color = color2;
  cell1.classList.remove(color1);
  cell1.classList.add(color2);

  
  // replace color of cell2 with color1
  cell2.dataset.color = color1;
  cell2.classList.remove(color2);
  cell2.classList.add(color1);
  
}