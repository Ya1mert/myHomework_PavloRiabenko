var ansi = require('ansi'),
    prompt = require('prompt-console');
    require('consoleplusplus');

var cursor = ansi(process.stdout),
    colors = ['#red','#cyan','#teal','#green','#blue','#lime','#yellow','#silver'];

prompt.ask(
    [{
        question: 'Do you want to see some magic? y|n',
        validator: function(name){
            switch (name){
                case "n":
                    console.log('You have choosen boring world :( ');
                    process.exit();
                    break;
                case "y":
                    return true;
                default:
                    console.log('wrong input!')
                }},
        color: 'green',
        name: 'name'
    },{
        question: 'Please enter your awesome word! Warning! maximum 8 chars long',
        validator: /\b\w{1,8}\b/,      // фильтруем по словам до 8 символов включительно с помошью regexp
        color: 'blue',
        name: 'ex'

    }], function(response){
        var x = response.ex;
        var result='';
        //var sound = cursor.beep;
        for (var i=0 ; i< x.length ; i++){
            result+=(colors[i]+'{'+x.charAt(i)+'}');
        } console.info(result);cursor.beep();
        }

    );
