// A Javascript script which listens for changes on each INPUT checkbox tag.
$(document).ready(function () {
  let checkDict = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      checkDict[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete checkDict[$(this).attr('data-name')];
    }
    let list = [];
    $.each(checkDict, function (index, value) {
      list.push(index);
    });
    if (list.length > 0) {
      $('.amenities h4').text(list.join(', '));
    } else {
       $('.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
    if (data['status'] === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }, 'json');

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: createPlaces
  });

  $('button').click(function () {
    let amenityList = [];
    amenityList = $.map(idDict, function (value, key) { return value; });
    console.log(amenityList);
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({'amenities': amenityList}),
      success: createPlaces
    });
  });

  function createPlaces (data) {
    let places = [];
    data.sort(function (obj1, obj2) {
      if (obj1.name < obj2.name) return -1;
      if (obj1.name > obj2.name) return 1;
      return 0;
    });
    for (let i in data) {
      const name = data[i].name;
      const price = data[i].price_by_night;
      const desc = data[i].description;
      const guest = data[i].max_guest;
      const bed = data[i].number_rooms;
      const bath = data[i].number_bathrooms;
      let place = `
      <ARTICLE>
         <div class="title">
	       <h2>${name}</h2>
	       <div class="price_by_night">$${price}</div>
         </div>
	     <div class="information">
	       <div class="max_guest">
             <i class="fa fa-users fa-3x" aria-hidden="true"></i>
             <br>${guest} ${guest > 1 ? 'Guests' : 'Guest'}
           </div>
           <div class="number_rooms">
	         <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
             <br>${bed} ${bed > 1 ? 'Bedrooms' : 'Bedroom'}
           </div>
           <div class="number_bathrooms">
             <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
             <br>${bath} ${bath > 1 ? 'Bathrooms' : 'Bathroom'}
           </div>
	     </div>
         <div class="description">${desc}</div>
      </ARTICLE>
      `;
      places.push(place);
    }
    $('.places').empty();
    $('.places').append(places);
  }
});
