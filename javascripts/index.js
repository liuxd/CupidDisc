relation = {
  'Asama' : 'Female/Mitama',
  'Benoit' : 'Male/Ignis',
  'Flannel' : 'Female/Velour',
  'Harold' : 'Male/Lutz',
  'Hinata' : 'Male/Hisame',
  'Joker' : 'Male/Deere',
  'Kamui' : 'Female/Kanna',
  'Lazward' : 'Female/Soleil',
  'Leon' : 'Male/Foleo',
  'Marx' : 'Male/Siegbert',
  'Nishiki' : 'Female/Kinu',
  'Odin' : 'Female/Ophelia',
  'Ryouma' : 'Male/Shinonome',
  'Saizou' : 'Male/Grey',
  'Silas' : 'Female/Sophie',
  'Suzukaze' : 'Female/Midoriko',
  'Takumi' : 'Male/Kisaragi',
  'Tsubaki' : 'Female/Matoi',
  'Tsukuyomi' : 'Female/Shara',
  'Zero' : 'Female/Eponine'
};

function sin(degree) {
  return Math.sin(degree * Math.PI / 180);
}

function cos(degree) {
  return Math.cos(degree * Math.PI / 180);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  var img_id = ev.target.id;
  ev.dataTransfer.setData("img_id", img_id);
  var parent_id = $('#' + img_id).parent().attr('id');

  // clear child when moving.
  if (!isNaN(parent_id) && relation[img_id]) {
    var id = parseInt(parent_id) + 40;
    $('#' + id).empty();
  }

  // for Aqua
  if (img_id === 'Aqua') {
    $('#60').empty();
  }
}

function drop(ev) {
  ev.preventDefault();
  var img_id = ev.dataTransfer.getData("img_id");

  // forbid covering.
  if (isNaN($(ev.target).attr('id'))) {
    x0p('Sorry', 'There is a person yet.');
    return false;
  }

  var target_id = ev.target.id;

  if (relation[img_id]) {
    if (target_id < 20) {
      $(ev.target).append($('#' + img_id));

      // set child.
      var child_id = parseInt(ev.target.id) + 40;
      var img = '<img class="candidate" src="portrait/Children/' + relation[img_id] + '.png"></img>';
      $('#' + child_id).append(img);
    } else {
      x0p('Oh, no!', 'You are a boy.You should be put in outer circle.');
      return false;
    }
  } else {
    if (target_id >= 20 && target_id < 40) {
      $(ev.target).append($('#' + img_id));

      // for Aqua
      if (img_id === 'Aqua') {
        var img = '<img class="candidate" src="portrait/Children/Male/Shigure.png"></img>';
        $('#60').append(img);
      }
    } else {
      x0p('Oh, no!', 'You are a girl.You should be put in middle circle.');
      return false;
    }
  }
}

function init() {
  var height = $(document).height();
  var width = $(document).width() - 400;
  var radius = 300;
  var radius_inner = 240;
  var radius_child = 180;

  var circle_radius = 25;
  var container = $('#boys_and_girls');

  $('#boys_and_girls').height(height);

  var x = [
    // The outer circle
    width / 2,
    width / 2 - radius * sin(18),
    width / 2 - radius * sin(36),
    width / 2 - radius * sin(54),
    width / 2 - radius * sin(72),

    width / 2 - radius,
    width / 2 - radius * cos(18),
    width / 2 - radius * cos(36),
    width / 2 - radius * cos(54),
    width / 2 - radius * cos(72),

    width / 2,
    width / 2 + radius * sin(18),
    width / 2 + radius * sin(36),
    width / 2 + radius * sin(54),
    width / 2 + radius * sin(72),

    width / 2 + radius,
    width / 2 + radius * cos(18),
    width / 2 + radius * cos(36),
    width / 2 + radius * cos(54),
    width / 2 + radius * cos(72),

    // The middle circle
    width / 2,
    width / 2 - radius_inner * sin(18),
    width / 2 - radius_inner * sin(36),
    width / 2 - radius_inner * sin(54),
    width / 2 - radius_inner * sin(72),

    width / 2 - radius_inner,
    width / 2 - radius_inner * cos(18),
    width / 2 - radius_inner * cos(36),
    width / 2 - radius_inner * cos(54),
    width / 2 - radius_inner * cos(72),

    width / 2,
    width / 2 + radius_inner * sin(18),
    width / 2 + radius_inner * sin(36),
    width / 2 + radius_inner * sin(54),
    width / 2 + radius_inner * sin(72),

    width / 2 + radius_inner,
    width / 2 + radius_inner * cos(18),
    width / 2 + radius_inner * cos(36),
    width / 2 + radius_inner * cos(54),
    width / 2 + radius_inner * cos(72),

    // The inner circle
    width / 2,
    width / 2 - radius_child * sin(18),
    width / 2 - radius_child * sin(36),
    width / 2 - radius_child * sin(54),
    width / 2 - radius_child * sin(72),

    width / 2 - radius_child,
    width / 2 - radius_child * cos(18),
    width / 2 - radius_child * cos(36),
    width / 2 - radius_child * cos(54),
    width / 2 - radius_child * cos(72),

    width / 2,
    width / 2 + radius_child * sin(18),
    width / 2 + radius_child * sin(36),
    width / 2 + radius_child * sin(54),
    width / 2 + radius_child * sin(72),

    width / 2 + radius_child,
    width / 2 + radius_child * cos(18),
    width / 2 + radius_child * cos(36),
    width / 2 + radius_child * cos(54),
    width / 2 + radius_child * cos(72),

    // The center
    width / 2
  ];

  var y = [
    // The outer circle
    height / 2 - radius,
    height / 2 - radius * sin(72),
    height / 2 - radius * sin(54),
    height / 2 - radius * sin(36),
    height / 2 - radius * sin(18),

    height / 2,
    height / 2 + radius * sin(18),
    height / 2 + radius * sin(36),
    height / 2 + radius * sin(54),
    height / 2 + radius * sin(72),

    height / 2 + radius,
    height / 2 + radius * cos(18),
    height / 2 + radius * cos(36),
    height / 2 + radius * cos(54),
    height / 2 + radius * cos(72),

    height / 2,
    height / 2 - radius * sin(18),
    height / 2 - radius * sin(36),
    height / 2 - radius * sin(54),
    height / 2 - radius * sin(72),

    // The outer circle
    height / 2 - radius_inner,
    height / 2 - radius_inner * sin(72),
    height / 2 - radius_inner * sin(54),
    height / 2 - radius_inner * sin(36),
    height / 2 - radius_inner * sin(18),

    height / 2,
    height / 2 + radius_inner * sin(18),
    height / 2 + radius_inner * sin(36),
    height / 2 + radius_inner * sin(54),
    height / 2 + radius_inner * sin(72),

    height / 2 + radius_inner,
    height / 2 + radius_inner * cos(18),
    height / 2 + radius_inner * cos(36),
    height / 2 + radius_inner * cos(54),
    height / 2 + radius_inner * cos(72),

    height / 2,
    height / 2 - radius_inner * sin(18),
    height / 2 - radius_inner * sin(36),
    height / 2 - radius_inner * sin(54),
    height / 2 - radius_inner * sin(72),

    // The inner circle
    height / 2 - radius_child,
    height / 2 - radius_child * sin(72),
    height / 2 - radius_child * sin(54),
    height / 2 - radius_child * sin(36),
    height / 2 - radius_child * sin(18),

    height / 2,
    height / 2 + radius_child * sin(18),
    height / 2 + radius_child * sin(36),
    height / 2 + radius_child * sin(54),
    height / 2 + radius_child * sin(72),

    height / 2 + radius_child,
    height / 2 + radius_child * cos(18),
    height / 2 + radius_child * cos(36),
    height / 2 + radius_child * cos(54),
    height / 2 + radius_child * cos(72),

    height / 2,
    height / 2 - radius_child * sin(18),
    height / 2 - radius_child * sin(36),
    height / 2 - radius_child * sin(54),
    height / 2 - radius_child * sin(72),

    // The center
    height / 2
  ]

  for (var i in x) {
    var _left = x[i] - circle_radius;
    var _top = y[i] - circle_radius;

    var e = '<div id="' + i + '" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';

    var div = $(e).addClass('pos').css('left', _left).css('top', _top);
    div.appendTo(container);
  }
}

init();

