const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  deleteComment,
  likeScream,
  unlikeScream,
  deleteScream,
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

app.delete('/scream/:screamId', FBAuth, deleteScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);

app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
app.delete('/scream/:screamId/comment', FBAuth, deleteComment);

//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetail);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
