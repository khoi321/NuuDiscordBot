import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import { getNsfwMode } from '../../config/google-sheets.js';

export default {
  name: 'hneko',
  description: 'Get an image of hneko',
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
       const response = await fetch('https://nekobot.xyz/api/image?type=hneko', {
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
        .setTitle('Your Image')
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
