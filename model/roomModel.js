const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

const mapDefalut = {};

for (let i = 1; i <= 40; i++) {
  mapDefalut[i] = {
    type: mongoose.Types.ObjectId,
  };
}

const roomSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    teams: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Team",
        default: [],
      },
    ],
    ownershipMap: {
      ...mapDefalut,
    },
    connectedTeams: [
      {
        type: mongoose.Types.ObjectId,

        ref: "Team",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);
roomSchema.virtual("size").get(function () {
  return this.teams.length;
});

module.exports = eventDB.model("Room", roomSchema);
