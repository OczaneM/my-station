'use strict'

function onSignIn (googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $(".data").css("display","block")
  $("#id").text("ID TOKEN: " + id_token)
}
