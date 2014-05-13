
/*
 * GET tv listing.
 */

exports.index = function(req, res, next) {
  res.render('tv', { tv: req.params.tv, title: 'Partie numéro ' + req.params.tv });
}
