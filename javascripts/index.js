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

  var position = position_generator(width, height, [radius, radius_inner, radius_child]);
  var x = position[0], y = position[1];

  for (var i in x) {
    var _left = x[i] - circle_radius;
    var _top = y[i] - circle_radius;

    var e = '<div id="' + i + '" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';

    var div = $(e).addClass('pos').css('left', _left).css('top', _top);
    div.appendTo(container);
  }
}

function position_generator (width, height, radius_arr)
{
  var x = [], y = [];

  for (var index in radius_arr) {
    var radius = radius_arr[index];
    var pointer = 0;

    while (pointer <= 19) {
      var offset = pointer % 5;

      switch (true) {
        case pointer < 5:
          x.push(width / 2 - radius * sin(18 * offset));
          y.push(height / 2 - radius * cos(18 * offset));
          break;
        case pointer < 10 && pointer >= 5:
          x.push(width / 2 - radius * cos(18 * offset));
          y.push(height / 2 + radius * sin(18 * offset));
          break;
        case pointer < 15 && pointer >= 10:
          x.push(width / 2 + radius * sin(18 * offset));
          y.push(height / 2 + radius * cos(18 * offset));
          break;
        case pointer < 20 && pointer >= 15:
          x.push(width / 2 + radius * cos(18 * offset));
          y.push(height / 2 - radius * sin(18 * offset));
          break;
        default: break;
      }

      pointer++;
    }
  }

  x.push(width / 2);
  y.push(height / 2);

  return [x, y];
}

init();
