var express = require('express');
var routes = require('./routes');
var tv = require('./routes/tv');
var http = require('http');
var path = require('path');

var app = express();

// all environments
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/:tv', tv.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

var games =
{
  'games':
  [{
    'title': 'Partie 11234',
    'id': 1,
    'piste': 1,
    'team': [{
      'name': 'Rémi Delhaye',
      'position': 1,
      'coups': [{
        'numero': 1,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 5
        },
        {
          'numero': 2,
          'quilles': 3
        }]
      },
      {
        'numero': 2,
        'strike': true,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 'X'
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 3,
        'strike': true,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 'X'
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 4,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 6
        },
        {
          'numero': 2,
          'quilles': 2
        }]
      },
      {
        'numero': 5,
        'strike': false,
        'spare': true,
        'lances': [{
          'numero': 1,
          'quilles': 6
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 6,
        'strike': true,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 'X'
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 7,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 1
        },
        {
          'numero': 2,
          'quilles': 7
        }]
      },
      {
        'numero': 8,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 2
        },
        {
          'numero': 2,
          'quilles': 2
        }]
      },
      {
        'numero': 9,
        'strike': false,
        'spare': true,
        'lances': [{
          'numero': 1,
          'quilles': 4
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 10,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 2
        },
        {
          'numero': 2,
          'quilles': 3
        }]
      }]
    },
    {
      'name': 'Baptiste Lecocq',
      'position': 2,
      'coups': [{
        'numero': 1,
        'strike': false,
        'spare': true,
        'lances': [{
          'numero': 1,
          'quilles': 3
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 2,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 1
        },
        {
          'numero': 2,
          'quilles': 2
        }]
      },
      {
        'numero': 3,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 9
        },
        {
          'numero': 2,
          'quilles': 0
        }]
      }]
    }],
  },
  {
    'title': 'Partie 2342',
    'id': 1,
    'piste': 2,
    'team': [{
      'name': 'Mireille Matthieu',
      'position': 1,
      'coups': [{
        'numero': 1,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 5
        },
        {
          'numero': 2,
          'quilles': 3
        }]
      },
      {
        'numero': 2,
        'strike': true,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 'X'
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 3,
        'strike': true,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 'X'
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 4,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 6
        },
        {
          'numero': 2,
          'quilles': 2
        }]
      },
      {
        'numero': 5,
        'strike': false,
        'spare': true,
        'lances': [{
          'numero': 1,
          'quilles': 6
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 6,
        'strike': true,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 'X'
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 7,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 1
        },
        {
          'numero': 2,
          'quilles': 7
        }]
      },
      {
        'numero': 8,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 2
        },
        {
          'numero': 2,
          'quilles': 2
        }]
      },
      {
        'numero': 9,
        'strike': false,
        'spare': true,
        'lances': [{
          'numero': 1,
          'quilles': 4
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 10,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 2
        },
        {
          'numero': 2,
          'quilles': 3
        }]
      }]
    },
    {
      'name': 'Jean Pierre Foucault',
      'position': 2,
      'coups': [{
        'numero': 1,
        'strike': false,
        'spare': true,
        'lances': [{
          'numero': 1,
          'quilles': 3
        },
        {
          'numero': 2,
          'quilles': '/'
        }]
      },
      {
        'numero': 2,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 1
        },
        {
          'numero': 2,
          'quilles': 2
        }]
      },
      {
        'numero': 3,
        'strike': false,
        'spare': false,
        'lances': [{
          'numero': 1,
          'quilles': 9
        },
        {
          'numero': 2,
          'quilles': 0
        }]
      }]
    }],
  }]
}

io.sockets.on('connection', function (socket) {
  socket.emit('who_are_you')
  socket.on('who_am_i', function (data) {
    var active_game = false
    for (index = 0; index < games.games.length; ++index) {
      console.log(data.id + ' - ' + games.games[index].piste)
      if (games.games[index].piste == data.id) {
        active_game = games.games[index]
      }
    }
    if (active_game) {
      socket.emit('set_game', { game: active_game });
    } else {
      socket.emit('no_active_game', { game: false });
    }
  })
});
