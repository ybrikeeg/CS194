"use strict";
/* jshint node: true */
/*
* Model data for CS142 Project #5 - the photo sharing site.
* This module returns an object called cs142Models with the following functions:
*
* cs142Models.userListModel - A function that returns the list of users on the system. The
* list is returned as an array of objects containing:
*   id  (number) - The ID of the user.
*   first_name (string) - The first name of the user.
*   last_name (string) - The last name of the user.
*   location (string) - The location of the user.
*   description (string) - A brief user description.
*   occupation (string) - The occupation of the user.
*
* cs142Models.userModel - A function that returns the info of the specified user. Called
* with an user ID (id), the function returns n object containing:
*   id  (number) - The ID of the user.
*   first_name (string) - The first name of the user.
*   last_name (string) - The last name of the user.
*   location (string) - The location of the user.
*   description (string) - A brief user description.
*   occupation (string) - The occupation of the user.
*
* cs142Models.photoOfUserModel - A function that returns the photos belong to
* the specified user. Called  with an user ID (id), the function returns n object containing:
*   id  (number) - The ID of the photo
*   date_time (date) - he date and time the picture was taken in ISO format.
*   file_name (string) - The file name in the image directory of the picture.
*   user {object} - The user info (see the userModel for format) of the picture's owner.
*   comments: {array of objects} - An array of comment objects containing the properties:
*        id  (number) - The ID of the comment.
*        date_time (date) - The date the comment was made in ISO format.
*        comment (string) - The text of the comment.
*        user: {object} The user info (see userMode for format) who made the comment
*        photo: {object} - The photo object of the comment.
*
*/
(function() {
  // Create init users.

  function createUser(first_name, last_name, user_name, pw, id, followers){
    var user = {
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      pw: pw,
      id: id,
      followers: followers,//list of Users
      reposted_articles: []//list of articles
    };
    return user;
  }
  //list of other users George follows
  var userFollowers = [];
  userFollowers.push(createUser("Alice", "Hau", "a_hau", "weak", "ahau", []));
  userFollowers.push(createUser("Matt", "Leong", "m_leong", "weak", "mleong", []));
  userFollowers.push(createUser("Kirby", "Gee", "k_gee", "weak", "kgee", []));

  //create an Article
  function createArticle(reposter, url, comment, title){
    var article = {
      reposter: reposter,
      url: url,
      comment: comment,
      title: title,
      date: new Date()
    };
    reposter.reposted_articles.push(article);
  }

  //reposted by Alice
  createArticle(userFollowers[0], "www.alice.com", "I love small arms", "13 reasons you should love your small arms");
  createArticle(userFollowers[0], "www.alice2.com", "Musuem Maniac", "Why I love the most boring thing in the world: musuems");
  //reposted by Matt
  createArticle(userFollowers[1], "www.matt.com", "red nose", "How to love and own your asain glow");
  //reposted by Kirby
  createArticle(userFollowers[2], "www.kirby.com", "Arm day", "Why would you ever work legs?");

  //the user that is logged in
  var loggedInUser = createUser("George", "Jabroni", "g_jabroni", "weak", "gjabroni", userFollowers);

  var loggedInUserModel = function() {
    return loggedInUser;
  };

  var noozModels = {
    loggedInUserModel: loggedInUserModel
  };
  console.log("mocking data");

  if( typeof exports !== 'undefined' ) {
    // We're being loaded by the Node.js module loader ('require') so we use its
    // conventions of returning the object in exports.
    exports.noozModels = noozModels;
  } else {
    // We're not in the Note.js module loader so we assume we're being loaded
    // by the browser into the DOM.
    window.noozModels = noozModels;
  }
})();