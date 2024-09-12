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

// Функція для затримки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const PORT = process.env.PORT || 1111;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await bot.setWebHook(`${SERVER_URL}/bot${API_TOKEN}`);
        console.log('WebHook встановлено успішно');

        // Затримка перед обробкою команд
        await delay(1500); // Затримка 1.5 секунди
        console.log('Затримка завершена. Бот готовий обробляти команди.');

    } catch (err) {
        console.error('Помилка встановлення WebHook:', err);
    }
});

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://vladsimak11.github.io/tap-bot-front/'; // Замініть на URL вашого веб-додатку

    bot.sendMessage(chatId, `${msg.chat.first_name}! Ласкаво просимо до Tap Bucket! Натисніть на кнопку нижче, щоб запустити гру.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Запустити гру', web_app: { url: webAppUrl } }]
            ]
        }
    });
});

app.post(`/bot${API_TOKEN}`, (req, res) => {
    try {
        bot.processUpdate(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.error('Помилка обробки оновлення:', error);
        res.sendStatus(500);
    }
});


