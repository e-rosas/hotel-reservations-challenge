module.exports = {


  friendlyName: 'Index',


  description: 'Index room.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    const rooms = Room.find();

    // All done.
    return rooms;

  }


};
