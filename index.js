const TelegramApi = require('node-telegram-bot-api')

const token = '5686693592:AAF3Eo_LBbJkmv5-rECDUytm8ObkOMXenhU'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data:'1'},{text: '2', callback_data:'2'},{text: '3', callback_data:'3'}],
            [{text: '4', callback_data:'4'},{text: '5', callback_data:'5'},{text: '6', callback_data:'6'}],
            [{text: '7', callback_data:'7'},{text: '8', callback_data:'8'},{text: '9', callback_data:'9'}],
            [{text: '0', callback_data:'0'}],
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data:'/again'}],
        ]
    })
}

const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9,а ты должен угадать!')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
    bot.setMyCommands([
        {command: '/start', description:'Начальное приветствие'},
        {command: '/info', description:'Получить информацию о пользователе'},
        {command: '/game', description:'Игра угадай цифру'}
    ])
    
        if (text === '/start') {
            return bot.sendMessage(chatId, `Здравствуй, чем сегодня займемся?`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Что вас интересует?`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю`)
    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал,бот загадал цифру ${chats[chatId]}`, againOptions)
        }

        console.log(msg)
    })
}

start()
