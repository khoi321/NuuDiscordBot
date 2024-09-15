import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
  name: 'genshin',
  description: 'Fetches Genshin Impact information using UID',

  async execute(message) {
    if (!message.content.startsWith('!genshin') || message.author.bot) return;
    const args = message.content.slice('!genshin'.length).trim().split(/ +/);
    const uid = args[0];

    if (!uid) {
      return message.reply('Vui lòng cung cấp UID.');
    }

    try {
      const response = await fetch(`https://enka.network/api/uid/${uid}`);
      const data = await response.json();

      if (!data.playerInfo) {
        return message.reply('Không tìm thấy thông tin cho UID này.');
      }

      const { playerInfo } = data;

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle(`Thông tin người chơi ${playerInfo.nickname}`)
        .addFields(
          { name: 'UID', value: uid, inline: false },
          { name: 'Tên', value: playerInfo.nickname, inline: true },
          { name: 'Level', value: playerInfo.level.toString(), inline: true },
          { name: 'Chữ ký', value: playerInfo.signature || 'Chưa có chữ ký', inline: false },
          { name: 'Cấp thế giới', value: playerInfo.worldLevel.toString(), inline: true },
          { name: 'Thành tựu', value: playerInfo.finishAchievementNum.toString(), inline: true },
          { name: 'La hoàn thâm cảnh', value: `${playerInfo.towerFloorIndex}-${playerInfo.towerLevelIndex}`, inline: true },
        )
        .setThumbnail(`https://enka.network/${playerInfo.nameCardId}.png`) 
        .setTimestamp()
        .setFooter({ text: 'Genshin Impact Player Info' });

      return message.reply({ embeds: [embed] });

    } catch (error) {
      console.error('Error fetching Genshin Impact info:', error);
      return message.reply('Có lỗi xảy ra khi lấy thông tin.');
    }
  },
};
