var ansi = require('ansi');
    require('consoleplusplus');
var prompt = require('prompt-console'),
    keypress = require('keypress');
var cursor = ansi(process.stdout);

var colors = ['#red','#cyan','#teal','#green','#blue','#lime','#yellow','#silver'];


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

            }
            //keypress(process.stdin);
            //process.stdin.on('keypress',function(ch,key){
            //    if (key && (key.name==='n')){
            //        console.log('You have choosen boring world :( ' + key.name);
            //        process.exit();
            //    }
            //    else if (key && (key.name==='y')){return true}
            //    else return false;
            //});
        },
        color: 'green',
        name: 'name'
    },{
        question: 'Please enter your awesome word! Warning! maximum 8 chars long',
        validator: /\b\w{1,8}\b/,
        color: 'blue',
        name: 'ex'

    }], function(response){
        var x = response.ex;
        var result='';
        var sound = cursor.beep();
        for (i=0 ; i< x.length ; i++){
            result+=(colors[i]+'{'+x.charAt(i)+'}');
        } console.info(result);setTimeout(sound,1000);
        }

    );
