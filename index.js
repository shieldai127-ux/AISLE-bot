const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('ready', () => {
  console.log(`${client.user.tag} が起動しました`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  try {
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      content: message.content,
      author: message.author.username,
      channel: message.channel.name
    });
    console.log('n8nに送信成功');
  } catch (error) {
    console.error('エラー:', error.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
