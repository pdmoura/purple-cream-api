const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const swaggerDocument = require("./swagger.json");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

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
  secret: process.env.SESSION_SECRET || "purple-cream-secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// Initialize DB
connectDB();

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  // #swagger.ignore = true
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect("/api/api-docs");
  }
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PurpleCream API - Login</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }

              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  background-color: #622262;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 20px;
              }

              .login-container {
                  background: white;
                  border-radius: 12px;
                  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                  padding: 48px 40px;
                  max-width: 400px;
                  width: 100%;
                  text-align: center;
              }

              .logo {
                  margin-bottom: 24px;
              }

              .logo img {
                  width: 120px;
                  height: 120px;
                  object-fit: contain;
              }

              h1 {
                  color: #2d2d2d;
                  font-size: 28px;
                  font-weight: 600;
                  margin-bottom: 8px;
              }

              h1 .purple {
                  color: #8B2F8B;
              }

              .subtitle {
                  color: #555;
                  font-size: 15px;
                  margin-bottom: 40px;
              }

              .github-btn {
                  background: #24292e;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  padding: 14px 20px;
                  font-size: 16px;
                  font-weight: 500;
                  cursor: pointer;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  transition: background-color 0.2s ease;
                  text-decoration: none;
              }

              .github-btn:hover {
                  background: #1e2227;
              }

              .github-icon {
                  width: 24px;
                  height: 24px;
              }

              .info {
                  color: #777;
                  font-size: 13.5px;
                  margin-top: 32px;
                  line-height: 1.5;
              }

              .divider {
                  margin: 32px 0 24px;
                  position: relative;
              }

              .divider::before {
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: 0;
                  right: 0;
                  height: 1px;
                  background: #e5e5e5;
              }
          </style>
      </head>
      <body>
          <div class="login-container">
              <div class="logo">
                  <img src="https://res.cloudinary.com/dyqyb9ri8/image/upload/v1774473032/logo-ezgif.com-webp-to-png-converter_v6t411.png"
                      alt="PurpleCream API">
              </div>
              
              <h1><span class="purple">PurpleCream</span> API</h1>
              <p class="subtitle">Sign in to access your API dashboard</p>

              <a href="/auth/github" class="github-btn">
                  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="GitHub"
                      class="github-icon">
                  Continue with GitHub
              </a>

              <div class="divider"></div>

              <p class="info">
                  Only authenticated users can Create, Update and Delete products.
              </p>
          </div>
      </body>
    </html>
  `);
});

app.get("/auth/github",
  // #swagger.ignore = true
  passport.authenticate("github", { scope: [ "user:email" ] })
);

app.get("/github/callback", 
  // #swagger.ignore = true
  passport.authenticate("github", { failureRedirect: "/", session: true }),
  (req, res) => {
    res.redirect("/api/api-docs");
  }
);

app.get("/logout", (req, res, next) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect("/");
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});