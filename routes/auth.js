const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  // #swagger.ignore = true
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.send(`
      <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h2>Logged in as ${req.user.username}</h2>
        <a href="/api/api-docs" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#622262; color:#fff; text-decoration:none; border-radius:5px;">Go to API Docs</a>
        <br><br>
        <a href="/logout" style="color: #666;">Logout</a>
      </div>
    `);
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

router.get("/auth/github",
  // #swagger.ignore = true
  passport.authenticate("github", { scope: [ "user:email" ] })
);

router.get("/github/callback", 
  // #swagger.ignore = true
  (req, res, next) => {
    passport.authenticate("github", (err, user, info) => {
      if (err) {
        console.error("Passport Error:", err);
        return res.redirect("/");
      }
      if (!user) {
        console.error("Passport Failed - no user returned. Info:", info);
        return res.redirect("/");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error("Login Error:", err);
          return next(err);
        }
        console.log("Session established for:", req.user.username);
        return res.redirect("/");
      });
    })(req, res, next);
  }
);

router.get("/logout", (req, res, next) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

module.exports = router;
