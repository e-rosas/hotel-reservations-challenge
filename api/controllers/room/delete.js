module.exports = {


  friendlyName: 'Delete',


  description: 'Delete room.',


  inputs: {
    roomId: {
      description: 'The ID of the room.',
      type: 'number',
      required: true
    },

  },


  exits: {
    success: {
      message: '',
      room: {}
    },
    notFound: {
      message: 'No room with the specified ID was found in the database.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {

    const deletedRoom = await Room.destroyOne({ id: inputs.roomId });

    return exits.success({
      message: 'Room deleted successfully',
      room: deletedRoom
    });

  }


};
