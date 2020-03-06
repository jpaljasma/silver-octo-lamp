var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var responseMessage = '';
  var apiStatusCode = 200;
  var q = (req.query.q || '').trim().toLowerCase();
  var d = req.query.d;

  switch (q) {
    case 'source':
      responseMessage = 'https://github.com/jpaljasma/silver-octo-lamp';
      break;
    case 'status':
      responseMessage = 'Yes';
      break;
    case 'email address':
      responseMessage = 'jpaljasma@gmail.com';
      break;
    case 'referrer':
      responseMessage = 'I found this position on LinkedIn. But Mike Marc-Aurele has been great working with me.';
      break;
    case 'phone':
      responseMessage = '(646) 280-7151';
      break;
    case 'name':
      responseMessage = 'Jaan Paljasma';
      break;
    case 'position':
      responseMessage = 'Senior Software Engineer (EMX)';
      break;
    case 'years':
      responseMessage = '20';
      break;
    case 'resume':
      responseMessage = 'https://www.dropbox.com/s/gvpp5m1g2t3gpnf/Jaan_Paljasma_Resume.pdf?dl=0';
      break;
    case 'degree':
      responseMessage = 'Some college, no degree';
      break;
    case 'puzzle':

// GET /?q=Puzzle&d=Please+solve+this+puzzle%3A%0A+ABCD%0AA%3D---%0AB--%3E-%0AC%3E---%0AD%3C---%0A
// GET /?q=Puzzle&d=Please+solve+this+puzzle%3A%0A+ABCD%0AA--%3E-%0AB--%3C-%0AC--%3D-%0AD%3E---%0A

//   A B C D
// A = - - -
// B - - > -
// C > - - -
// D < - - -

//   A B C D
// A = < < >
// B > = > >
// C > < = >
// D < < < =


//   A B C D
// A = < < >
// B > = > >
// C > < = >
// D < < < =

// GET /?q=Puzzle&d=Please+solve+this+puzzle%3A%0A+ABCD%0AA-%3E--%0AB--%3E-%0AC--%3D-%0AD--%3C-%0A

// Initial
//   A B C D
// A - > - -
// B - - > -
// C - - = -
// D - - < -

// 1st pass - add "=", known opposite, and fill blanks row by row
//   A B C D
// A = > > >
// B < = > -
// C - - = -
// D - - < =

//   A B C D
// A = > > >
// B < = > >
// C < < = >
// D < < < =

      // split the input by rows
      var pd = d.split('\n');
      console.log(d);

      // x holds the data
      var x = [];

      // add input characters to the 2-dimensional array
      for (var i = 2; i < 6; i++) {
        x.push(Array.from(pd[i]).slice(1, 5));
      }

      // place equal sign in the center diagonal
      for(i = 0; i < 4; i++) {
        x[i][i] = '=';
      }

      console.log(x);

      var y = x.slice();  // clone

      // find placholders
      var _ph = [];
      for(row = 0; row < 4; row++) {
        for(col = 0; col < 4; col++) {
          if(col === row) continue;
          if(x[row][col] != '-') {
            _ph[row] = x[row][col];
          }
        }
      }

      // find a character and flip it
      var map = {
        '-': '-',
        '=': '=',
        '<': '>',
        '>': '<'
      };

      for(row = 0; row < 4; row++) {
        for(col = 0; col < 4; col++) {
          if(col === row) continue;
          if(x[row][col] != '-') {
            y[col][row] = map[x[row][col]];
          }
        }
      }

      console.log('After first pass');
      console.log(y);

      // fill the gaps 
      for(row = 0; row < 4; row++) {
        if(!_ph[row]) continue;

        for(col = 0; col < 4; col++) {
          if(col === row) continue;
          if(y[row][col] == '-') {
            y[row][col] = _ph[row];
          }
        }
      }

      console.log('After second pass');
      console.log(y);

      for(row = 0; row < 4; row++) {
        for(col = 0; col < 4; col++) {
          if(col === row) continue;
          if(y[row][col] !== '-') {
            y[col][row] = map[y[row][col]];
          }
        }
      }

      console.log('Final pass');
      console.log(y);

      // construct the output
      responseMessage  = ' ABCD\n';
      for(i = 0; i < 4; i++) {
        responseMessage += String.fromCharCode(65+i) + y[i].join('') + '\n';
      }
      
      break;
    case 'ping':
      responseMessage = 'OK';
      break;
    default:
      apiStatusCode = 501;
      responseMessage = 'Not Implemented';
      break;
  }

  res
    .type('text')
    .status(apiStatusCode)
    .send(responseMessage);
});

module.exports = router;
