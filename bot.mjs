import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleGiveawayEntry, concludeGiveaway, activeGiveaways } from './events/giveawayEntry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
});

client.commands = new Map();

async function loadCommands(dir) {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory does not exist: ${fullPath}`);
    return;
  }

  const commandFiles = fs.readdirSync(fullPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = await import(`./${dir}/${file}`);
    client.commands.set(command.default.name, command.default);
    console.log(`Loaded command: ${command.default.name}`);
  }
}

async function main() {
  await loadCommands('commands');
  await loadCommands('commands/nsfw');
  await loadCommands('commands/image');
  await loadCommands('commands/utility');
  await loadCommands('commands/ticket');
  await loadCommands('commands/giveaways');

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Bot is ready to receive messages.');

    setInterval(() => {
      const now = Date.now();
      activeGiveaways.forEach((giveaway, messageId) => {
        if (now >= giveaway.endTime) {
          concludeGiveaway(client, messageId);
        }
      });
    }, 60000); 
  });

  client.on('guildCreate', async (guild) => {
    console.log(`Joined new guild: ${guild.name} (ID: ${guild.id})`);
  });

  client.on('messageCreate', async message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error('Error executing command:', error);
      await message.reply('There was an error executing that command.');
    }
  });

  client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
      await handleGiveawayEntry(interaction);
    }
  });

  client.login('YOUR_BOT_TOKEN'); //thay thế YOUR_BOT_TOKEN thành token bot của bạn
}

main().catch(console.error);
