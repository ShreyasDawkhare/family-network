'use strict';
module.exports = function(app) {
  var familyNetwork = require('../controllers/familyNetworkController');

  app.route('/people')
    .get(familyNetwork.list_all_people)
    .post(familyNetwork.create_a_person);

  app.route('/people/:personId')
    .get(familyNetwork.read_a_person)
    .put(familyNetwork.update_a_person)
    .delete(familyNetwork.delete_a_person);

  app.route('/connections')
    .get(familyNetwork.list_all_connections)
    .post(familyNetwork.create_a_connection);

  app.route('/connections/:connectionId')
    .get(familyNetwork.read_a_connection)
    .put(familyNetwork.update_a_connection)
    .delete(familyNetwork.delete_a_connection);

  app.route('/all')
    .get(familyNetwork.list_all);
};
