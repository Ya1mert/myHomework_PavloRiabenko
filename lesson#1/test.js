colors = ['#red','#cyan','#teal','#green','#blue','#lime','#yellow','#silver'];



var x = 'flibust';
for (i=0 ; i< x.length ; i++){
    var result='';
    result+=colors[i]+'{'+x.charAt(i)+'}';
    } console.log(result);
