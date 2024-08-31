import { EmbedBuilder } from 'discord.js';
import { Client as NekoClient } from 'nekos-best.js'; 

const nekosBest = new NekoClient();

export default {
  name: 'kitsune',
  description: 'Get a random kitsune image',
  execute: async (message, args) => {
    if (!message || !message.channel) {
      console.error('Invalid message object or message.channel is undefined');
      return;
    }

    try {
      const imageResponse = await nekosBest.fetch('kitsune', 1);
      const imageUrl = imageResponse.results[0].url;

      const embed = new EmbedBuilder()
        .setTitle('Your Image')
        .setColor('#00FF00')
        .setImage(imageUrl)
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        });

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching image:', error);
      await message.channel.send('There was an error fetching the image.');
    }
  }
};