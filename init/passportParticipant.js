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
      // clientID: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/api/auth/login/callback`,
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
      const [team] = participant.teams.filter(
        (team) => team.toJSON().event.toString() === process.env.EVENT_ID
      );
      if (!team) {
        return done(null, false, {
          message: "No team for this event found.",
        });
      }
      const minTeamLength = Number(process.env.MIN_TEAM_LENGTH);
      if (team.toJSON().members.length < minTeamLength) {
        return done(null, false, {
          message: `Time should have at least ${minTeamLength} members.`,
        });
      }

      const eventTeam = await Team.findById(team.id);
      if (!eventTeam) {
        const t = team.toJSON();
        console.log("t id", t._id);
        const newEventTeam = new Team({
          teamName: t.teamName,
          _id: t._id,
          members: t.members,
        });
        await newEventTeam.save();
      }

      done(null, { id: participant._id, accessToken });
    }
  )
);

// * Passport serializeUser
passport.serializeUser((obj, done) => {
  // console.log("in ser");
  // console.log(obj);
  // console.log("done");
  done(null, obj);
});

// * Passport deserializeUser
passport.deserializeUser(async (obj, done) => {
  const participant = await Participant.findById(obj.id).populate("teams");
  //! change
  const [team] = participant.teams.filter(
    (team) => team.toJSON().event.toString() === process.env.EVENT_ID
  );
  participant.teams = [team];
  participant.accessToken = obj.accessToken;
  // console.log("in deser");
  // console.log(participant);
  // console.log("done");

  done(null, participant);
});
