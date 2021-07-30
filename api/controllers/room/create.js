module.exports = {


  friendlyName: 'Create ',


  description: 'Create room.',


  inputs: {
    number: {
      description: 'The room number, must be unique.',
      type: 'string',
      required: true
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
    const room = await Room.create({ number: inputs.number })
    .intercept((err)=>{
      return err;
    }).fetch();
    return exits.success({
      message: 'Room created successfully.',
      room: room
    });

  }


};
