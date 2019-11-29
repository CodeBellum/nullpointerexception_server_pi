var socket = io();
  socket.on('changed', function(data){
      var parsed = '';
      data.forEach(function(el){
          parsed += '{ i: ' + el.i + '; v: '+el.v+' } '
      });

      $('#data').html(generateHtml(data));
  });

function generateHtml(data){
    var rows = '';
    for (let row = 0; row < 4; row++) {
        rows += wrap('tr', getRowHtml(row, data));
    }

    return wrap('table', rows);
}

function wrap(tag, data, cssClass){
    return '<' + tag + (cssClass == undefined ? '' : (' class=' + cssClass + ' onClick="clicked(this); return false;"') ) + '>\r\n' + data + '</'+ tag +'>\r\n';
}

function getById(id, data)
{
    var result = -1;
    data.forEach(function(el){
        if (el.i == id) {
            result = el.v;
        }        
    })

    return result;
}

function getRowHtml(rowIndex, data) {
    var html = '';
    for (let col = 0; col < 5; col++) {
        var elemIndex = rowIndex * 5 + col;

        var value = getById(elemIndex, data);
        if (value == -1) {
            value = 0;
        }

        var cssClass = getClass(value);
        html += wrap('td', elemIndex, cssClass);
    }

    return html;
}

function getClass(value) {
    var out = '';
    switch (value) {
        case 0:
            out = 'transparent';
            break;
        case 1:
            out = 'red';
            break;
        case 2:
            out = 'green';
            break;
        case 3:
            out = 'blue';
             break;
        case 4:
            out = 'yellow';
            break;
        default:
            break;
    }

    return out;
}

function getClassId(className)
{
    var out = 0;
    switch (className) {
        case 'transparent':
            out = 0;
            break;
        case 'red':
            out = 1;
            break;
        case 'green':
            out = 2;
            break;
        case 'blue':
            out = 3;
            break;
        case 'yellow':
            out = 4;
            break;
        default:
            break;
    }
    
    return out;
}

function getNext(id){
    if (id == 4){
        id = 0;
    } else {
        id++;
    }

    return id;
}

function clicked(element)
{
    var currClassId = getClassId($(element).prop('class'));
    currClassId = getNext(currClassId);
    var cssClass = getClass(currClassId);
    $(element).prop('class', cssClass);
}