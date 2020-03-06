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
    case 'status':
      responseMessage = 'Yes';
    case 'email address':
      responseMessage = 'jpaljasma@gmail.com';
    case 'referrer':
      responseMessage = 'I found this position on LinkedIn. But Mike Marc-Aurele has been great working with me.';
    case 'phone':
      responseMessage = '(646) 280-7151';
    case 'name':
      responseMessage = 'Jaan Paljasma';
    case 'position':
      responseMessage = 'Senior Software Engineer (EMX)';
    case 'years':
      responseMessage = '20';
    case 'resume':
      responseMessage = 'https://www.dropbox.com/s/gvpp5m1g2t3gpnf/Jaan_Paljasma_Resume.pdf?dl=0';
      break;
    case 'degree':
      responseMessage = 'Some college, no degree';
      break;
    case 'puzzle':

// GET /?q=Puzzle&d=Please+solve+this+puzzle%3A%0A+ABCD%0AA%3D---%0AB--%3E-%0AC%3E---%0AD%3C---%0A

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


      // split the input by rows
      var pd = d.split('\n');

      // x holds the data
      var x = [];

      // grab puzzle header
      var headLine = pd[1];

      // add input characters to the 2-dimensional array
      for (var i = 2; i < 6; i++) {
        x.push(Array.from(pd[i]).slice(1, 5));
      }

      // place equal sign in the center diagonal
      var eqs = x[0][0];
      for(i = 1; i < 4; i++) {
        x[i][i] = eqs;
      }

      // find a character to repeat horizontally
      var ch = '';
      for(row = 0; row < 4; row++) {
        for(col = 0; col < 4; col++) {
          ch = x[row][col];
          if(ch !== '=' && ch !== '-') {
            // found the character, repeat that character and move to next row
            for(col2 = 0; col2 < 4; col2++) {
              if(x[row][col2] !== '=') {
                x[row][col2] = ch;
              }
            }
            col = 5;  // move on to next row
          }
        }  
      }

      var map = {
        '-': '-',
        '=': '=',
        '<': '>',
        '>': '<'
      };

      // translate
      var translate = function(ch) {
        // Flip the known opposites
        for(row = 0; row < 4; row++) {
          for(col = 0; col < 4; col++) {
            if(x[row][col] !== ch) {
              x[col][row] = map[x[row][col]];
            }
          }
        }
      }

      // translate in two passes
      translate('-');
      translate('=');

      // construct the output
      responseMessage  = headLine + '\n';
      for(i = 0; i < 4; i++) {
        responseMessage += String.fromCharCode(65+i) + x[i].join('') + '\n';
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
