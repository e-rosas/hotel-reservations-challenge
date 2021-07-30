module.exports = {


  friendlyName: 'Make',


  description: 'Make reservation.',


  inputs: {
    roomId: {
      description: 'The ID of the room.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `roomId` parameter is not a number.
      type: 'number',
      // By making the `roomId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    },
    date: {
      description: 'The date (epoch time) of the reservation.',
      type: 'number',
      required: true
    },
    name: {
      description: 'The name of the reservation.',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      message: 'Room reserved successfully.',
      reservation: {}
    },
    notFound: {
      message: 'No room with the specified ID was found in the database.',
      responseType: 'badRequest'
    },
    notAvailable: {
      message: 'Room with the specified ID is not available.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    const room = await Room.findOne({ id: inputs.roomId });

    // If no room was found, respond "notFound" (like calling `res.notFound()`)
    if (!room) {
      return exits.notFound({
        message: 'No room with the specified ID was found in the database.',
      });
    }

    // If room is already reserved
    if (room.reserved) {
      return exits.notAvailable({
        message: 'Room with the specified ID is not available.',
      });
    }

    const reservation = await Reservation.create({ name: inputs.name, date: inputs.date })
    .intercept((err)=>{
      return err;
    }).fetch();

    await Room.addToCollection(room.id, 'reservations')
    .members(reservation.id);

    reservation.room = await Room.updateOne({ id:room.id })
    .set({
      reserved:true
    });



    // All done.
    return exits.success({
      message: 'Room reserved successfully.',
      id: reservation.id,
      reservation: reservation
    });

  }


};
