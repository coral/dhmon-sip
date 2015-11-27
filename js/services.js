 var dialplan = {
     get: function(cb) {
         $.getJSON("https://tele.event.dreamhack.se/dialplan.json", function(data) {
             cb(data);
         });
     }
 }