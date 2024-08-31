import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import { getNsfwMode } from '../../config/google-sheets.js';

export default {
  name: 'hrandom',
  description: 'Get a random NSFW image from various endpoints',
  execute: async (message, args, client) => {
    if (!message || !message.channel) {
      console.error('Invalid message object or message.channel is undefined');
      return;
    }

   
    if (!message.channel.nsfw) {
      return message.channel.send('Lệnh này chỉ có thể được sử dụng trong kênh NSFW.');
    }

 
    if (!message.guild) return;
    const nsfwMode = await getNsfwMode(message.guild.id);

    if (!nsfwMode) {
      return message.channel.send('NSFW mode đã bị tắt. Bạn không thể sử dụng lệnh này. Sử dụng lệnh `!nsfw` để bật.');
    }

    try {
     
      const endpoints = [
        'hass', 'hmidriff', 'pgif', '4k', 'hentai', 'holo', 'hneko', 'neko', 
        'hkitsune', 'kemonomimi', 'anal', 'hanal', 'gonewild', 'kanna', 'ass', 
        'pussy', 'thigh', 'hthigh', 'gah', 'paizuri', 'tentacle', 'boobs', 
        'hboobs', 'yaoi'
      ];

      const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];


      const response = await fetch(`https://nekobot.xyz/api/image?type=${randomEndpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '015445535454455354D6', 
        },
      });


      const data = await response.json();

      if (!data.success) {
        return message.reply('Failed to fetch the image. Please try again later.');
      }


      const embed = new EmbedBuilder()
        .setTitle('Random NSFW Image')
        .setDescription(`Endpoint: ${randomEndpoint}`)
        .setColor('#FF69B4')
        .setImage(data.message) 
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        });

    
      await message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error('Error fetching image:', error);
      await message.channel.send('There was an error fetching the image.');
    }
  },
};
