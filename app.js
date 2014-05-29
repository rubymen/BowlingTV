// On initialise l'application Express, les routes, et le serveur http

var express = require('express');
var routes = require('./routes');
var tv = require('./routes/tv');
var http = require('http');
var path = require('path');

// On crée l'instance de l'application Express

var app = express();

// On définie l'environement de l'application Express

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// On activent l'affichage des erreurs dans la console pour le mode "development"

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// On définie les routes de l'application

app.get('/', routes.index);
app.get('/:tv', tv.index);

// On crée et lance le serveur HTTP

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// On attache "socket.io" au serveur HTTP

var io = require('socket.io').listen(server);

var game;

// EVENEMENT : Quand un client (une télé) se connecte au serveur

io.sockets.on('connection', function (socket) {

  // EVENEMENT : On demande au client quel télé est-elle (son ID)

  socket.emit('who_are_you');

  /*
   * EVENEMENT : - On connais l'ID de la télé grace à DATA
   *             - On lui envoient les informations de la partie qu'elle doit afficher
   */

  socket.on('who_am_i', function (data) {
    var url = 'http://bowling.noip.me/lanes/' + data.id + '/available';

    console.log('---------------------------------------------------------------------------------------')
    console.log('|   La TV numéro ' + data.id + ' à envoyer une requete à ' + url + '   |')
    console.log('---------------------------------------------------------------------------------------')

    // On envoient une requête HTTP au WebService pour savoir si il y à une partie active sur la piste

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var available_request = new XMLHttpRequest();
    available_request.open('GET', url, true);

    available_request.onload = function() {

      if (available_request.status >= 200 && available_request.status < 400){
        available = JSON.parse(available_request.responseText);

        // Si il y a une partie

        if (!available) {

          var timer = setInterval(function() {
          var url   = 'http://bowling.noip.me/lanes/' + data.id + '/game';
            return true
          }, 2000);

          // On demandent au WebService de nous envoyer la partie en cours

          var request = new XMLHttpRequest();
          request.open('GET', url, true);

          request.onload = function() {
            if (request.status >= 200 && request.status < 400){
              socket.emit('set_game', { game: JSON.parse(request.responseText) });
            } else {
              console.log('Impossible de joindre le serveur')
              socket.emit('no_active_game', { game: false });
            }
          };
          request.send();

          // Si il n'y a pas de partie

        } else {

          // On dit à la télé qu'il n'y à pas de partie active

          socket.emit('no_active_game', { game: false });
        }

      } else {

        // Si le WebService ne répond pas, on dit à la télé qu'il n'y à pas de partie active

        console.log('Impossible de joindre le serveur')
        socket.emit('no_active_game', { game: false });
      }
    };

    available_request.send();
  });
});
