module.exports = {


  friendlyName: 'Update',


  description: 'Update room.',


  inputs: {
    roomId: {
      description: 'The ID of the room.',
      type: 'number',
      required: true
    },
    number: {
      description: 'The room number, must be unique.',
      type: 'string',
    },
  },


  exits: {
    success: {
      message: 'Room created successfully.',
      room: {}
    },
    notUnique: {
      description: 'Room number must be unique.',
      responseType: 'badRequest',
      statusCode: 404
    },
  },


  fn: async function (inputs, exits) {
    const room = await Room.updateOne({ id: inputs.roomId }).set({
      number: inputs.number
    });
    return exits.success({
      message: 'Room updated successfully.',
      room: room
    });

  }


};
