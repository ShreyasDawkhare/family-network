'use strict';
module.exports = function(app) {
  var familyNetwork = require('../controllers/familyNetworkController');
  var peopleController = require('../controllers/PeopleController');
  var connectionsController = require('../controllers/ConnectionsController');

  app.route('/people')
    .get(peopleController.list_all_people)
    .post(peopleController.create_a_person);

  app.route('/people/:personId')
    .get(peopleController.read_a_person)
    .put(peopleController.update_a_person)
    .delete(peopleController.delete_a_person);

  app.route('/connections')
    .get(connectionsController.list_all_connections)
    .post(connectionsController.create_a_connection);

  app.route('/connections/:connectionId')
    .get(connectionsController.read_a_connection)
    .delete(connectionsController.delete_a_connection);

  app.route('/all')
    .get(familyNetwork.list_all);

  app.route('/search_autocomplete')
    .get(familyNetwork.search_autocomplete);

  app.route('/table/people')
    .post(peopleController.table_update_person);

  app.route('/table/connections')
    .post(connectionsController.table_update_connection);
};
