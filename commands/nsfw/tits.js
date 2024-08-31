import { EmbedBuilder } from 'discord.js';
import NSFW from 'discord-nsfw';
import { getNsfwMode } from '../../config/google-sheets.js'; 

const nsfw = new NSFW();

export default {
  name: 'tits',
  description: 'Get an image of hentai tits',
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
      const image = await nsfw.hentaitits();

      const embed = new EmbedBuilder()
        .setTitle('Your Image')
        .setColor('#00FF00')
        .setImage(image)
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
