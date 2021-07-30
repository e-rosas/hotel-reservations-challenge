module.exports = {


  friendlyName: 'Show',


  description: 'Show reservation.',


  inputs: {
    reservationId: {
      description: 'The ID of the reservation.',
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      reservation: {}
    },
    notFound: {
      message: 'No reservation with the specified ID was found in the database.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    const reservation = await Reservation.findOne({ id: inputs.reservationId }).populate('room');

    // If no reservation was found, respond "notFound" (like calling `res.notFound()`)
    if (!reservation) {
      return exits.notFound({
        message: 'No reservation with the specified ID was found in the database.',
      });
    }

    // All done.
    return exits.success({
      reservation: reservation
    });

  }


};
