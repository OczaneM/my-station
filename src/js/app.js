'use strict'

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
      apiKey: 'AIzaSyBqfPN_3yEeGRnQyj6j2Mh7KACHvl0iEkg',
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
      clientId: '736647691028-dqgglbgqbb69e1pkpkshajikn0b93lro.apps.googleusercontent.com',
      scope: 'profile https://www.googleapis.com/auth/contacts'
  }).then(function () {

    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {

  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {

  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function makeApiCall() {

  // Make an API call to the People API, and print the user's given name.
  gapi.client.people.people.connections.list({
    'resourceName': 'people/me',
    'personFields': 'emailAddresses'
  }).then(function(response) {
    console.log('Hello, ' + response.result.connections[0].emailAddresses[0].value);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}
