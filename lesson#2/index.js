var sugar=require('sugar'),
    readline=require('readline');
var rl=readline.createInterface({       // создаем интерфейс взаимодействия с пользователем через командную строку
    input: process.stdin,               // определяем откуда выводим
    output: process.stdout              // и куда вводим
});
var result= 0,newResult=function(){result=Number.random(1,2)};

function playAgain(){
    rl.question('Хотите попробовать еще? y|n ',function(answer){    //  Do you want to try again? y|n
        switch (answer){
            case 'y':
                console.log('\033c');
                game();
                break;
            case 'n':
                process.exit();
                break;
            default:
                console.log('Я вас не понял! Используйте только y или n! ');  //You have entered wrong answer! y or n only !
                playAgain();
        }
    })
}
function game(){
    rl.question("Привет! Давай сыграем в игру!? Попробуй угадать выпадет 1 или 2: ",function(answer){     //let's play a game! Try to guess the odds 1 or 2:
        newResult();
        if (answer!=1 && answer!=2) console.log('Вы ввели не верное число! Мы угадываем только между 1 и 2');     //You have entered wrong number! Use only 1 or 2.
        else console.log('У нас выпало: ',+result); // Odds are:
            (answer==result)? console.log('Вы угадали! Поздравляю! ',+answer):console.log('Вы проиграли =( ',+answer);      //You have guessed! Congratz you won!  || You have lost =(
            playAgain();
    })
};
game();