module.exports = {


  friendlyName: 'Show',


  description: 'Show room.',


  inputs: {
    roomId: {
      description: 'The ID of the room.',
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      room: {}
    },
    notFound: {
      message: 'No room with the specified ID was found in the database.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    const room = await Room.findOne({ id: inputs.roomId }).populate('reservations');

    // If no room was found, respond "notFound" (like calling `res.notFound()`)
    if (!room) {
      return exits.notFound({
        message: 'No room with the specified ID was found in the database.',
      });
    }

    // All done.
    return exits.success({
      room: room
    });

  }


};
