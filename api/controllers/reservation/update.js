module.exports = {


  friendlyName: 'Update',


  description: 'Update reservation.',


  inputs: {
    reservationId: {
      description: 'The ID of the reservation.',
      type: 'number',
      required: true
    },
    roomId: {
      description: 'The ID of the room.',
      type: 'number',
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
    },
    completed: {
      description: 'Reservation status.',
      type: 'boolean',
    },
  },


  exits: {
    success: {
      message: 'Room updated successfully.',
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

    const reservation = await Reservation.findOne({ id: inputs.reservationId }).populate('room');

    if (!reservation) {
      return exits.notFound({
        message: 'No reservation with the specified ID was found in the database.',
      });
    }
    
    const roomId = reservation.room.id;

    if(roomId !== inputs.roomId) {
      //change room

      const newRoom = await Room.findOne({ id: inputs.roomId });
      if (!newRoom) {
        return exits.notFound({
          message: 'No room with the specified ID was found in the database.',
        });
      }

      // If room is already reserved
      if (newRoom.reserved) {
        return exits.notAvailable({
          message: 'Room with the specified ID is not available.',
        });
      }

      await Room.updateOne({ id: roomId })
      .set({
        reserved:false
      });

      
      await Room.addToCollection(newRoom.id, 'reservations')
      .members(reservation.id);

      await Room.updateOne({ id: newRoom.id })
      .set({
        reserved:true
      });
    }

    //mark room as available
    if(inputs.completed){
      await Room.updateOne({ id: roomId })
      .set({
        reserved:false
      });
    }
    const updatedReservation = await Reservation.updateOne({ id: inputs.reservationId }).set({
      name: inputs.name,
      date: inputs.date,
      completed: inputs.completed
    });

    return exits.success({
      message: 'Reservation updated successfully.',
      reservation: updatedReservation
    });

  }


};
