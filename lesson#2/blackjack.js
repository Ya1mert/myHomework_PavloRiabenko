var sugar = require('sugar'),
    readline = require('readline'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2));

var rl = readline.createInterface({       // создаем интерфейс взаимодействия с пользователем через командную строку
    input: process.stdin,               // определяем откуда выводим
    output: process.stdout              // и куда вводим
});
var deck = [], newDeck = [
    {
        name: 'чирва - 2',
        cost: 2
    }, {
        name: 'бубен - 2',
        cost: 2
    }, {
        name: 'трефа - 2',
        cost: 2
    }, {
        name: 'пика -  2',
        cost: 2
    }, {
        name: 'чирва - 3',
        cost: 3
    }, {
        name: 'бубен - 3',
        cost: 3
    }, {
        name: 'трефа - 3',
        cost: 3
    }, {
        name: 'пика -  3',
        cost: 3
    }, {
        name: 'чирва - 4',
        cost: 4
    }, {
        name: 'бубен - 4',
        cost: 4
    }, {
        name: 'трефа - 4',
        cost: 4
    }, {
        name: 'пика -  4',
        cost: 4
    }, {
        name: 'чирва - 5',
        cost: 5
    }, {
        name: 'бубен - 5',
        cost: 5
    }, {
        name: 'трефа - 5',
        cost: 5
    }, {
        name: 'пика -  5',
        cost: 5
    }, {
        name: 'чирва - 6',
        cost: 6
    }, {
        name: 'бубен - 6',
        cost: 6
    }, {
        name: 'трефа - 6',
        cost: 6
    }, {
        name: 'пика -  6',
        cost: 6
    }, {
        name: 'чирва - 7',
        cost: 7
    }, {
        name: 'бубен - 7',
        cost: 7
    }, {
        name: 'трефа - 7',
        cost: 7
    }, {
        name: 'пика -  7',
        cost: 7
    }, {
        name: 'чирва - 8',
        cost: 8
    }, {
        name: 'бубен - 8',
        cost: 8
    }, {
        name: 'трефа - 8',
        cost: 8
    }, {
        name: 'пика -  8',
        cost: 8
    }, {
        name: 'чирва - 9',
        cost: 9
    }, {
        name: 'бубен - 9',
        cost: 9
    }, {
        name: 'трефа - 9',
        cost: 9
    }, {
        name: 'пика -  9',
        cost: 9
    }, {
        name: 'чирва - 10',
        cost: 10
    }, {
        name: 'бубен - 10',
        cost: 10
    }, {
        name: 'трефа - 10',
        cost: 10
    }, {
        name: 'пика -  10',
        cost: 10
    }, {
        name: 'чирва - туз',
        cost: 11
    }, {
        name: 'бубен - туз',
        cost: 11
    }, {
        name: 'трефа - туз',
        cost: 11
    }, {
        name: 'пика -  туз',
        cost: 11
    }, {
        name: 'чирва - валет',
        cost: 10
    }, {
        name: 'бубен - валет',
        cost: 10
    }, {
        name: 'трефа - валет',
        cost: 10
    }, {
        name: 'пика -  валет',
        cost: 10
    }, {
        name: 'чирва - дама',
        cost: 10
    }, {
        name: 'бубен - дама',
        cost: 10
    }, {
        name: 'трефа - дама',
        cost: 10
    }, {
        name: 'пика -  дама',
        cost: 10
    }, {
        name: 'чирва - король',
        cost: 10
    }, {
        name: 'бубен - король',
        cost: 10
    }, {
        name: 'трефа - король',
        cost: 10
    }, {
        name: 'пика -  король',
        cost: 10
    }
], diller, player;


// Создаем общий прототип игрока
function Player(name) {
    this.name = name;
    this.hand = [];
    this.sum = 0;
}
// Создаем стандартные методы "игрока"
Player.prototype.start = function () {
    var a;
    for (var i = 0; i < 2; i++) {
        a = deck.sample();    // локальная переменная
        this.sum += a.cost;
        this.hand.push(a);
        deck = deck.exclude(a);
        console.log(this.name + ', вы получили : ', a.name);
    }
    console.log(this.name + ', сумма ваших карт = ', this.sum);


};
// Создаем функцию выбора карт в прототипе
Player.prototype.cardpick = function () {
    var a;
    a = deck.sample();
    this.sum += a.cost;
    this.hand.push(a);
    deck = deck.exclude(a);
    console.log(this.name + ' получил: ', a.name);
    console.log(this.name + ', сумма ваших карт: ', this.sum);
};
// создаем класс игрока и класс диллера
function User(name) {
    Player.apply(this, arguments);
}
function Admin(name) {
    Player.apply(this, arguments);
}
// Наследуем общие свойства и методы
User.prototype = Object.create(Player.prototype);
Admin.prototype = Object.create(Player.prototype);
User.prototype.constructor = Player;
Admin.prototype.constructor = Player;
// Особености потомков


// Прописываем особености метода старт диллера
Admin.prototype.start = function () {
    var b;
    b = deck.sample();
    this.sum += b.cost;
    this.hand.push(b);
    deck = deck.exclude(b);
    console.log('У диллера : ', b.name);
    console.log('сумма карт диллера = ', this.sum)

};
// функция повторной игры
function playAgain() {
    console.log('-------------------------------------------------------------------');
    rl.question(player.name + 'Хотите сыграть еще раз? y(yes)/n(no) ', function (answer) {
        switch (answer) {
            case 'y':
                console.log('\033c');
                game();
                break;
            case 'n':
                process.exit();
                break;
            default:
                console.log('Я вас не понял! Пожалуйста используйте только y или n');
                playAgain();
        }
    })
}
// функция проверки условий победы
function checkScore() {
    console.log('-------------------------------------------------------------------');
    if (diller.sum > 21) {
        console.log('Поздравляю! Вы победили! Диллер набрал больше 21! ', diller.sum);
        return playAgain();
    }
    if (diller.sum > player.sum) {
        console.log('К сожалению вы проиграли! Сумма карт диллера: ' + diller.sum + ' больше вашей: ', player.sum);
        return playAgain();
    }
    if (diller.sum < player.sum) {
        console.log('Поздравляю! Вы победили! Сумма ваших карт: ' + player.sum + ' больше суммы карт диллера! ', diller.sum);
        return playAgain();
    }
    if (diller.sum == player.sum) {
        console.log('У вас ничья!');
        return playAgain()
    }
}

// основной этап игры. Диалог с игроком
function finish() {
    if (player.sum == 21) {
        console.log('Поздравляю' + player.name + ', вы победили! У вас блекджек!');
        playAgain()
    }
    console.log('-------------------------------------------------------------------');
    rl.question('Диллер спрашивает Вас, будете брать еще карту? y(yes)/n(no) ', function (answer) {
        if (answer === 'y') {
            player.cardpick();
            if (player.sum > 21) {
                console.log('К сожалению вы проиграли! Вы набрали больше 21! ', player.sum);
                playAgain();
            }
            else finish()
        }
        if (answer === 'n') {
            if (diller.sum < 17) {
                console.log('-------------------------------------------------------------------');
                console.log('Диллер берет карты пока сумма его карт не будет больше или равна 17');
                do {
                    diller.cardpick();
                    console.log(diller.sum)
                } while (diller.sum < 17);

            }
            checkScore();
        }
    })
}

function game(answer) {
    console.log('\033c');
    if (deck.length < 15) {
        deck = newDeck
    }
    player = new User(answer);
    diller = new Admin('Диллер');
    player.start();
    diller.cardpick();
    finish();
}
function blackjack() {
    //if (argv._=='stat'){console.log('Works')};
    //console.dir(argv);
    rl.question('Вы хотите вывести статистику по игре? y(yes)/n(no) ',function (answer){
        switch (answer){
            case 'y':
                console.log('Эта опция пок ане работает. Простите(')ж
                blackjack();
                //fs.readFile('score.txt',function(err,data){
                //    if (err)throw err;
                //    console.log(data.toString())
                //})
                break;
            case 'n':
                rl.question('Привет! Давай сыграем в блекджек! Ты знаешь правила? y(yes)/n(no) ', function (answer) {
                    console.log('\033c');
                    deck = newDeck;
                    switch (answer) {
                        case 'n':
                            console.log('Значения карт: Туз - 11 очков; Карты с картинками (J, Q, K) - 10 очков; \n Остальные карты - в соответствии с их достоинством');
                            console.log('Вы играете одной колодой пока в ней не останется меньше 30% карт.\n После этого береться новая колода');
                            console.log('Вы выигрываете: Если сумма значений Ваших карт ближе к 21, чем сумма значений карт дилера,\n причём в этом случае Ваша ставка оплачивается 1 к 1. Если у Вас Блэк Джек, а у дилера нет Блэк Джека, то Ваша ставка оплачивается 3 к 2.');
                            console.log('Перебор: Если сумма Ваших карт превысит 21, Вы "Перебрали". В этом случае Вы проигрываете Вашу ставку.');
                            console.log('Ничья: Если сумма значений Ваших карт равна сумме значений карт дилера, то объявляется ничья,\n и Вы получаете Вашу ставку обратно. Помните, что комбинация Блэк Джек всегда побеждает сумму карт 21, набранную более чем из двух карт.');
                            rl.question('Ну что теперь ты готов сыграть? y(yes)/n(no) ', function (answer) {
                                return (answer == 'y') ? game() : process.exit();
                            });
                            break;
                        case 'y':
                            rl.question('Как Вас зовут? ', function (answer) {
                                return game(answer);
                            });
                            break;
                        default:
                            console.log('К сожажению я Вас не понял. Используй только y(yes)/n(no)');
                            blackjack();

                    }
                });
                break;
            default :
                console.log('К сожажению я Вас не понял. Используй только y(yes)/n(no)');
                blackjack();
        }


    })

}
blackjack();