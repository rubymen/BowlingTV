var game =
{
  'title': 'Partie 1',
  'id': '1',
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
}

var scoretable = $('#scoretable')

_.each(game.team, function(player){
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
