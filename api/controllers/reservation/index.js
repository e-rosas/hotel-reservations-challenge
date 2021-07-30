module.exports = {


  friendlyName: 'Index',


  description: 'Index reservation.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    const reservations = Reservation.find().populate('room');

    // All done.
    return reservations;

  }


};
