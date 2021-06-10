const EventConfig = require("../config/eventConfigModel");
const RoomModel = require("../model/roomModel");

(async function () {
  let eventConfig = await EventConfig.findOne();

  if (!eventConfig) {
    eventConfig = new EventConfig();
    console.log("init eventConfig", eventConfig);

    const room = await RoomModel({
      _id: eventConfig.room.id,
    });
    await room.save();
    console.log(" init room ", room);
  }

  await eventConfig.save();
})();
