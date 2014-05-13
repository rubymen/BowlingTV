var socket = io.connect('http://localhost:3000');

socket.on('set_game', function (data) {
  console.log(data)
  var scoretable = $('#scoretable')

  _.each(data.game.team, function(player){
    var line = '';
    var total = 0;
    var nb_coups = 10;
    var is_strike = false;
    var is_spare = false;
    line += ('<tr><td>' + player.name + '</td>');
    _.each(player.coups, function(lances){
      nb_coups--;
      line += ('<td class="m-scoretable--td">');
      _.each(lances, function(quilles){
        _.each(quilles, function(quille){
          if(!lances.strike && !lances.spare) {
            if(is_spare) {
              total += (quille.quilles * 2);
              is_spare = false;
            } else {
              if(is_strike){
                total += (quille.quilles * 2);
              } else {
                total += quille.quilles;
              }
            }
          }
          line += ('<div class="m-scoretable--col text-center">' + quille.quilles + '</div> ');
        })
      })
      if(lances.strike) {
        if(is_strike || is_spare){
          total += 20;
          is_spare = false;
        } else {
          total += 10;
        }
        is_strike = true;
      } else if(lances.spare) {
        if(is_strike){
          total += 20;
        } else {
          total += 10;
        }
        is_spare = true;
        is_strike = false;
      } else {
        is_spare = false;
        is_strike = false;
      }
      line += ('</br><div class="m-scoretable--col--score text-right">' + total + '</div>');
      line += ('</td>');
    })
    for (var i=0;i<nb_coups;i++) {
      line += ('<td></td>');
    }
    line += ('<td><b>' + total + '</b></td>');
    line += ('</tr>');

    scoretable.append(line);
  })
});

socket.on('no_active_game', function (data) {
  $('#container-score').html('<div class="container"><div class="row"><div class="col-lg-12 text-center"><h1>Aucune partie active sur cette piste</h1></div></div></div>')
});
