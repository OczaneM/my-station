'use strict'

gapi.load('auth2', function() {
  // Library loaded.
});

function onSignIn (googleUser) {
  var profile = googleUser.getBasicProfile()
  var email = profile.getEmail()
  var id_token = googleUser.getAuthResponse().id_token

  $('.data').css('display', 'block')
  $('#access').text(id_token)

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/idToken');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + id_token);

  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', `https://www.google.com/m8/feeds/contacts/${email}/full?max-results=50`);
}
