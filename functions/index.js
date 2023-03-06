const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
} = require('./handlers/screams');
const {
  signup,
  login,
  uploadImage,
  addUserDetail,
  getAuthenticatedUser,
} = require('./handlers/users');

//screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);

//TODO: delete scream
//TODO: like a scream
//TODO: unlike a scream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetail);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
