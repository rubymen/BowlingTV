// On se connecte au socket

var socket = io.connect('http://localhost:3000');

// EVENEMENT : Il y à une partie en cours

socket.on('set_game', function (data) {
  var scoretable = $('#scoretable')

  // On boucle sur les PLAYERS de la partie en cours

  _.each(data.game.players, function(player){
    var final_score = 0;
    var nb_coups    = 10;
    var line        = '';
    line            += ('<tr><td>' + player.Pseudo + '</td>');

    // On boucle sur chaque TOURS du PLAYER

    _.each(player.turns, function(turn){
      line += ('<td class="m-scoretable--td" id="' + player.Id + '-' + turn.Id + '">');
      nb_coups--;

      // On boucle sur chaque LANCES du TOUR

      _.each(turn.throws, function(throww){
        line += ('<div class="m-scoretable--col text-center">' + throww.Fallen_skittles + '</div>');
      })

      line += ('</br><div class="m-scoretable--col--score text-right">' + turn.Score + '</div></td>');
      final_score = turn.Score
    })

    // On remplie de cases vides les coups pas encore joués

    for (var i=0;i<nb_coups;i++) {
      line += ('<td></td>');
    }

    // On affiche le score final

    if (final_score == undefined) {
      line += ('<td><b>0</b></td>');
    } else {
      line += ('<td><b>' + final_score + '</b></td>');
    }

    line += ('</tr>');

    // On ajoute le tour au tableau des scores

    scoretable.append(line);
  })
});

// EVENEMENT : Pas de partie en cours

socket.on('no_active_game', function (data) {
  $('#container-score').html('<div class="container"><div class="row"><div class="col-lg-12 text-center"><h1>Aucune partie active sur cette piste</h1></div></div></div>')
});
