var response = 0;

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
      response = JSON.parse(ajax_request.responseText);
      var html = '';

      if(response.length > 0)
      {
          html += '<p>';
        for(var i = 0; i < response.length; i++)
        {
          html += '<span id= '+i+'>';
          if (response[i].word != '.' && response[i].word != ','){
            html += " "+response[i].word;
          }else{
            html += response[i].word;
          }
          html += '</span>';
        }
          html += '</p>';
      }
      document.getElementById('main-container').innerHTML = html;
      console.log("DOM loaded")
    }
  }
}

document.body.addEventListener("mousedown",function(e) {
    //display the lemma of the word that is clicked on in a table on the right
    right = "<table>" 
    right += "<tr><td><b>"+response[e.target.id].lemma+"</b></td></tr>";
    right += "<tr><td>"+response[e.target.id].pos+"</td></tr>";
    
    features = response[e.target.id].features.replace("{","").replace("}","").split(',');
    for (var i = 0; i < features.length; i++){
      right += "<tr><td>"+features[i]+"<td></tr>";
    }
    right += "</table>" 
    document.getElementById("right-container").innerHTML = right;
},false);

function diplay_properties(word_id){

}