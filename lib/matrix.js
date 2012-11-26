var v = require('./vector');

// -----------------------------------------------------------
// Matrices
// -----------------------------------------------------------
var Matrix = function Matrix (rows, cols) {
  // initialize the matrix
  this.rows = rows;
  this.cols = cols;

  this.m = new Array(rows);
  for (var i = 0; i < rows; ++i) {
    this.m[i] = new Array(cols);
    for (var c = 0; c < cols; ++c) {
      this.m[i][c] = 0;
    }
  }

  this.isVector = false;

};

Matrix.prototype = {

  set : function (i, j, val) {
    this.m[i][j] = val;
  },

  get : function (i, j) {
    return this.m[i][j];
  },

  add: function (B) {
    if (B.cols !== this.cols || B.rows !== this.rows)
      return new Error('A and B must be the same size');

    var C = new Matrix(this.rows, this.cols);
    for (var r = 0; r < this.rows; ++r) {
      for (var c = 0; c < this.cols; ++c) {
        var val = this.get(r,c) + B.get(r,c);
        C.set(r,c, val);
      }
    }
    return C;
  },

  dot: function (B) {
    if (B.isVector ? B.v.length !== this.cols : B.rows !== this.cols) {
      return new Error('number of cols of A must equal number of rows of B');
    }

    var C;
    if (B.isVector) {
      var arr = Array(B.v.length);
      for (var i = 0; i < B.v.length; ++i) {
        arr[i] = 0;
        for (var j = 0; j < this.rows; ++j) {
          arr[i] += this.get(j,i) * B.v[i];
        }
      }
      C = new v(arr);
    } else {
      C = new Matrix(this.rows, B.cols);
      for (var r = 0; r < C.rows; ++r) {
        var val = 0;
        for (var c = 0; c < C.cols; ++c) {
          for (var m = 0; m < B.rows; ++m) {
             val += this.get(r,m) * B.get(m,c);
          }
          C.set(r, c, val);
        }
      }

    }
    return C;
  },

  transpose: function() {
    var T = new Matrix(this.rows, this.cols);

    for(var r = 0; r < this.rows; ++r)
    {
      for (var c = 0; c < this.cols; ++c)
      {
        T.m[r][c] = this.m[c][r];
      }
    }
    return T;
  }
};


exports = module.exports = Matrix;