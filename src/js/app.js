'use strict'

function handleClientLoad () {
  gapi.load('client:auth2', initClient)
}

function initClient() {
  gapi.client.init({
      apiKey: 'AIzaSyBqfPN_3yEeGRnQyj6j2Mh7KACHvl0iEkg',
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
      clientId: '736647691028-dqgglbgqbb69e1pkpkshajikn0b93lro.apps.googleusercontent.com',
      scope: 'profile https://www.googleapis.com/auth/contacts'
  }).then(function () {

    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
  })
}

function updateSigninStatus(isSignedIn) {
  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.
  if (isSignedIn) {
    makeApiCall()
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn()
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut()

  // Set view back to home
  $('#home').css('display', 'block')
  $('.data').css('display', 'none')
  $('.signout').css('display', 'none')
}

function makeApiCall() {
  // Hide page view to data and hide home view
  $('#home').css('display', 'none')
  $('.data').css('display', 'block')
  $('.signout').css('display', 'block')

  // Make an API call to the People API
  gapi.client.people.people.connections.list({
    'resourceName': 'people/me',
    'pageSize': 50,
    'personFields': 'emailAddresses,names'
  }).then(function(response) {

    // attach contact elems to DOM
    // make sure not to exceet contacts amount
    for (let i = 0; i < response.result.connections.length && holder.children.length < response.result.connections.length; i++){
      holder.appendChild(
          li({className: 'row'}, null,
            p({className: 'contact'}, response.result.connections[i].names[0].givenName),
            p({className: 'dash'}, '-'),
            p({className: 'email'}, response.result.connections[i].emailAddresses[0].value)
          )
      )
    }
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message)
  })

}
