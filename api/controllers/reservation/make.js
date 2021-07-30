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
    },
    notFound: {
      description: 'No room with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    notAvailable: {
      description: 'Room with the specified ID is not available.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs) {

    var room = await Room.findOne({ id: inputs.roomId });

    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    if (!room) { throw 'notFound'; }

    // All done.
    return {
      roomNumber: room.number
    };

  }


};
