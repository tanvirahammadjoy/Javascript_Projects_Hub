// src/config/passport.js

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require("passport-apple").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  // Serialize user to store in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Local Strategy for email and password authentication
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user based on email
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            // If user does not exist
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          if (!user.password) {
            // If user registered via social auth and has no password
            return done(null, false, {
              message: "Please log in using your social account",
            });
          }

          // Match entered password with hashed password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              // Passwords match
              return done(null, user);
            } else {
              // Passwords do not match
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.error(err));
    })
  );

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Google Client ID
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret
        callbackURL: process.env.GOOGLE_CALLBACK_URL, // Callback URL after authentication
      },
      (accessToken, refreshToken, profile, done) => {
        // Extract profile information
        const { id, displayName, emails } = profile;

        // Find the user based on Google ID
        User.findOne({ googleId: id })
          .then((user) => {
            if (user) {
              // If user exists, proceed
              return done(null, user);
            } else {
              // If user does not exist, create a new user
              const newUser = new User({
                name: displayName,
                email: emails[0].value,
                googleId: id,
              });

              // Save the new user
              newUser
                .save()
                .then((user) => done(null, user))
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      }
    )
  );

  // Facebook OAuth Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID, // Facebook App ID
        clientSecret: process.env.FACEBOOK_APP_SECRET, // Facebook App Secret
        callbackURL: process.env.FACEBOOK_CALLBACK_URL, // Callback URL after authentication
        profileFields: ["id", "displayName", "emails"], // Fields to retrieve from Facebook
      },
      (accessToken, refreshToken, profile, done) => {
        // Extract profile information
        const { id, displayName, emails } = profile;

        // Find the user based on Facebook ID
        User.findOne({ facebookId: id })
          .then((user) => {
            if (user) {
              // If user exists, proceed
              return done(null, user);
            } else {
              // If user does not exist, create a new user
              const newUser = new User({
                name: displayName,
                email: emails ? emails[0].value : "", // Some Facebook accounts may not have email
                facebookId: id,
              });

              // Save the new user
              newUser
                .save()
                .then((user) => done(null, user))
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      }
    )
  );

  // Apple OAuth Strategy
  passport.use(
    new AppleStrategy(
      {
        clientID: process.env.APPLE_CLIENT_ID, // Apple Client ID
        teamID: process.env.APPLE_TEAM_ID, // Apple Team ID
        keyID: process.env.APPLE_KEY_ID, // Apple Key ID
        privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Apple Private Key
        callbackURL: process.env.APPLE_CALLBACK_URL, // Callback URL after authentication
        passReqToCallback: true, // Pass the request to the callback
      },
      (req, accessToken, refreshToken, idToken, profile, done) => {
        // Extract profile information
        const { sub, email, name } = profile;

        // Find the user based on Apple ID
        User.findOne({ appleId: sub })
          .then((user) => {
            if (user) {
              // If user exists, proceed
              return done(null, user);
            } else {
              // If user does not exist, create a new user
              const newUser = new User({
                name: name || "Apple User",
                email: email || "",
                appleId: sub,
              });

              // Save the new user
              newUser
                .save()
                .then((user) => done(null, user))
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      }
    )
  );
};
