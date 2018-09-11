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
});
