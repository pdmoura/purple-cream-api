const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const swaggerDocument = require("./swagger.json");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 8080;

// Modify swagger document based on environment
if (process.env.NODE_ENV === "production") {
  swaggerDocument.host = "purple-cream-api.onrender.com";
  swaggerDocument.schemes = ["https"];
} else {
  swaggerDocument.host = `localhost:${PORT}`;
  swaggerDocument.schemes = ["http"];
}

// Middleware
app.use(cors());
app.use(express.json()); 

app.use(session({
  secret: process.env.SESSION_SECRET || "purple-cream-really-long-secret-session-for-security",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOneAndUpdate(
        { githubId: profile.id },
        {
          username: profile.username,
          displayName: profile.displayName || profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null
        },
        { new: true, upsert: true }
      );
      return done(null, user);
    } catch (err) {
      console.error("Error during GitHub strategy:", err);
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Initialize DB
connectDB();

app.use("/api", require("./routes"));

app.use("/", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});