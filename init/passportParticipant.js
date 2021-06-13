const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;

// * Models
const Team = require("../team/model");
const Participant = require("../baseTeam/participantModel");

// * Settingup Passport google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/login/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let participant = await Participant.findOne({
        email: profile.email,
      }).populate("teams");

      //! change function properly
      // console.log(participant);
      if (!participant) {
        return done(null, false, {
          message: "This google ID not registered.",
        });
      }
      let baseTeam = participant.teams.find(
        (team) => team.toJSON().event.toString() === process.env.EVENT_ID
      );
      if (!baseTeam) {
        return done(null, false, {
          message: "No team for this event found.",
        });
      }
      baseTeam = baseTeam.toJSON();

      const minTeamLength = Number(process.env.MIN_TEAM_LENGTH);

      if (baseTeam.members.length < minTeamLength) {
        return done(null, false, {
          message: `Time should have at least ${minTeamLength} members.`,
        });
      }

      let eventTeam = await Team.findById(baseTeam._id);
      console.log("baseTeam._id", baseTeam._id);
      console.log("event team", eventTeam);

      if (!eventTeam) {
        eventTeam = new Team({
          teamName: baseTeam.teamName,
          _id: baseTeam._id,
          members: baseTeam.members,
        });
        await eventTeam.save();
      }

      // done(null, { id: participant._id, accessToken });
      done(null, { id: eventTeam._id, accessToken });
    }
  )
);

// * Passport serializeUser
passport.serializeUser((obj, done) => {
  done(null, obj);
});

// * Passport deserializeUser
passport.deserializeUser(async (obj, done) => {
  const team = await Team.findById(obj.id)
    .populate("teams")
    .populate("members", "name email profilePicLink");
  team.accessToken = obj.accessToken;
  done(null, team);
});

// // * Passport deserializeUser
// passport.deserializeUser(async (obj, done) => {
//   const participant = await Participant.findById(obj.id).populate("teams");
//   //! change

//   const [team] = participant.teams.filter(
//     (team) => team.toJSON().event.toString() === process.env.EVENT_ID
//   );

//   participant.teams = [team];
//   participant.accessToken = obj.accessToken;
//   done(null, participant);
// });
