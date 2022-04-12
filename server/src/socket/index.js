// import models here
const { user, profile, chat } = require('../../models');

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id);

    socket.on('load admin contact', async () => {
      try {
        const contact = await user.findOne({
          include: {
            model: profile,
            as: 'profile',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          where: {
            status: 'admin',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        });

        socket.emit('admin contact', contact);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('load customer contact', async () => {
      try {
        const contact = await user.findAll({
          include: [
            {
              model: profile,
              as: 'profile',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: chat,
              as: 'recipientMessage',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: chat,
              as: 'senderMessage',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
          where: {
            status: 'customer',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        });

        socket.emit('customer contact', contact);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnect');
    });
  });
};

module.exports = socketIo;
