module.exports = {


  friendlyName: 'Cancel',


  description: 'Cancel reservation.',


  inputs: {
    reservationId: {
      description: 'The ID of the reservation.',
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      message: '',
      reservation: {}
    },
    notFound: {
      message: 'No reservation with the specified ID was found in the database.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    const reservation = await Reservation.findOne({ id: inputs.reservationId }).populate('room');

    if (!reservation) {
      return exits.notFound({
        message: 'No reservation with the specified ID was found in the database.',
      });
    }
    const roomId = reservation.room.id;
    const archivedReservation = await Reservation.archiveOne({ id: inputs.reservationId });

    await Room.updateOne({ id: roomId })
    .set({
      reserved:false
    });

    return exits.success({
      message: 'Reservation cancelled successfully, room is now available.',
      reservation: archivedReservation
    });

  }


};
