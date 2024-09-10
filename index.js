// index.js
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Додаємо маршрут для кореневого шляху
app.get('/', (req, res) => {
    res.send('Bot is running successfully!');
});

const { API_TOKEN, SERVER_URL} = process.env;

const bot = new TelegramBot(API_TOKEN, { webHook: true });

bot.setWebHook(`${SERVER_URL}/bot${API_TOKEN}`);


// Обробка команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://tap-bot-front.vercel.app/'; // Замініть на URL вашого веб-додатку

    bot.sendMessage(chatId, `${msg.chat.first_name}! Ласкаво просимо до Tap Bucket! Натисніть на кнопку нижче, щоб запустити гру.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Запустити гру', web_app: { url: webAppUrl } }]
            ]
        }
    });
});

app.post(`/bot${API_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});


const PORT = process.env.PORT || 1111; // Можете вказати будь-який порт або залишити 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});