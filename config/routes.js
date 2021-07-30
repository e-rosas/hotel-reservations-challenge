/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /reservations': { action: 'reservation/make' },
  'DELETE /reservations/:reservationId': { action: 'reservation/cancel' },
  'GET /reservations/:reservationId': { action: 'reservation/show' },
  'POST /rooms': { action: 'room/create' },
  'GET /rooms/:roomId': { action: 'room/show' },

};
