function onLoad(){
   $.ajax({
   url: 'http://ajax1.lmsoft.cz/procedure.php?cmd=getPeopleList', 
   dataType: 'json',
   crossDomain: true,                   
   type: 'get',
   beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Basic " + btoa("coffe" + ":" + "kafe"));
  },
   success: function(data){
       create_select(data)
       },
       error: function (xhr) {
        alert("Error...");
      }
   });

   $.ajax({
   url: 'http://ajax1.lmsoft.cz/procedure.php?cmd=getTypesList', 
   dataType: 'json',
   crossDomain: true,                    
   type: 'get',
   beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Basic " + btoa("coffe" + ":" + "kafe"));
  },
   success: function(data){
       create_range(data)
       },
       error: function (xhr) {
        alert("Error...");
      }
   });
}

/* select */
function create_select(json){
   var length = 0;
   for(var k in json) if(json.hasOwnProperty(k)) length++;

   select_element = document.createElement("select");
   select_element.name = "select";
   select_element.id = "select";

/* option */
   for (var i = 1; i <= length; i++) {
       var option = document.createElement("option");
       option.value = json[i].ID;
       option.text = json[i].name;
       select_element.appendChild(option);
   }
   document.getElementById("select_appender").appendChild(select_element);
}

/* range */
function create_range(json){
   var length = 0;
   for(var k in json) if(json.hasOwnProperty(k)) length++;

   render = document.createDocumentFragment();

   for (var i = 1; i <= length; i++) {
       var div = document.createElement("div");
       span = document.createElement("span");
       span.id="span_"+json[i].ID;
       var range = document.createElement("input");
       txt_node = document.createTextNode(json[i].typ);
       range.appendChild(txt_node);
       range = document.createElement("input");
       range.type = "range";
       range.id = + json[i].ID;
       range.min = 0;
       range.max = 10;
       range.value = 0;
       range.name = json[i].ID;
       range.onchange = function e(){
           document.getElementById("span_"+this.id).innerHTML = this.value;
       }
       div.appendChild(txt_node);
       var is = document.createElement("i");
       is.innerHTML = 0;
       span.appendChild(is);
       div.appendChild(range);
       div.appendChild(span);
       render.appendChild(div);
   }
   document.getElementById("range_appender").appendChild(render);
}

function odeslat(){

    var val = 0;
    $("input").each(function(json){
        val = val + parseInt(this.value);
        document.getElementById("vypis").innerHTML = val;
    });
    if(val == 0){
        alert("Musíte vybrat alespoň jednu hodnotu...");
        return;
    }

}