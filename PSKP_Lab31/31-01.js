const TelegramBot = require('node-telegram-bot-api');

const token = '6265906006:AAG_BF2HG9hy6im_og9H2t9mDgfNUxso-Zw';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    bot.sendMessage(chatId, `echo: ${message}`);
});