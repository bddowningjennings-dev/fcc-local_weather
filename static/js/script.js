function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      $('#demo').html("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
  $.ajax({
    url: url,
    type: 'GET',
    data: {},
    dataType: 'json',
  }).done(function(response) {
    console.log(response);
    $('#location').html('<h2>'+response.name+', '+response.sys.country+'</h2>');
    $('.calc').html(response.main.temp.toFixed(1));
    $('.degree').html(' &#8451;');
    $('#weather').html('<h2>'+response.weather[0].main+'</h2>');
    $('#icon').html('<img src='+JSON.stringify(response.weather[0].icon)+'/>');
  });
}
function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          $('#demo').html("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          $('#demo').html("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          $('#demo').html("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          $('#demo').html("An unknown error occurred.");
          break;
  }
}

$(document).ready(function() {
  var celc = true;
  var calc = 0;
  getLocation();
  $('.degree').click(function(event) {
    if (celc === true) {
      celc = false;
      calc = Number($('.calc').html()) * 1.8 + 32;
      $('.calc').html(calc.toFixed(1));
      $('.degree').html(' &#8457;');
    } else {
      celc = true;
      calc = (Number($('.calc').html()) - 32) / 1.8;
      $('.calc').html(calc.toFixed(1));
      $('.degree').html(' &#8451;');
    }
  });
});