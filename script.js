load_data();

function load_data(query = '')
{
  var form_data = new FormData();

  form_data.append('query', query);

  var ajax_request = new XMLHttpRequest();

  ajax_request.open('POST', 'sqlquery.php');

  ajax_request.send(form_data);

  console.log("POST sent");

  ajax_request.onreadystatechange = function()
  {
    if(ajax_request.readyState == 4 && ajax_request.status == 200)
    {
      console.log("JSON recieved");
      //console.log(ajax_request.responseText);

      var response = JSON.parse(ajax_request.responseText);

      var html = '';

      if(response.length > 0)
      {
        for(var i = 0; i < response.length; i++)
        {
          html += '<tr>';
          html += '<td>'+response[i].id+'</td>';
          html += '<td>'+response[i].word+'</td>';
          html += '<td>'+response[i].lemma+'</td>';
          html += '<td>'+response[i].pos+'</td>';
          html += '<td>'+response[i].features+'</td>';
          html += '</tr>';
        }
      }
      else
      {
        html += '<tr><td colspan="5" class="text-center">no data recieved</td></tr>';
      }
      document.getElementById('post_data').innerHTML = html;
      document.getElementById('total_data').innerHTML = response.length;
    }
  }
}
  