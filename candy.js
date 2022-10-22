
const rows = 9;
const cols = 9;
const colors = ["red", "blue", "green", "yellow", "purple"]

var boardArr = []

initialiseBoard();

function initialiseBoard(){
  const boardElem = document.getElementById("board");

  for( let r=0; r<rows; r++){
    // create a new empty row
    var boardRow = []
    for( let c=0; c<cols; c++){
      // create a new div for cell-back
      const newcellback = document.createElement("div");
      //console.log("boardElem  ", boardElem)
      //console.log("newcellback", newcellback)
      console.log(r, c);

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
      const newcell= document.createElement("div");
      newcell.classList.add(cellcolor);

      // set up the data for cell-back
      newcell.dataset.row = r;
      newcell.dataset.col = c;
      newcell.dataset.color = cellcolor;

      // set up event listeners for this cell
      newcell.addEventListener("mouseover", showDetails);
      newcell.addEventListener("mouseout", clearDetails);

      // add this cell to the current row of the board array
      boardRow.push(newcell);

      // make it a cell and make it a child of newcell-back
      newcell.classList.add("cell");

      newcellback.appendChild(newcell);
    }  
    boardArr.push(boardRow);
  }
}

function showDetails(e){
  var cellback = e.target;

  document.getElementById("details-row").innerHTML = cellback.dataset.row;

  document.getElementById("details-col").innerHTML = cellback.dataset.col;

  document.getElementById("details-color").innerHTML = cellback.dataset.color;
}

function clearDetails(e){
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
