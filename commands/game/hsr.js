import { EmbedBuilder } from 'discord.js';  

export default {
  name: 'hsr',
  description: 'Fetches Honkai: Star Rail information using UID',
  async execute(message, args) {
    const uid = args[0];
    if (!uid) {
      return message.reply('Vui lòng cung cấp UID của bạn.');
    }

    const apiUrl = `https://api.mihomo.me/sr_info_parsed/${uid}?lang=vi`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu từ API');
      }
      const data = await response.json();

      if (!data.player) {
        return message.reply('Không thể tìm thấy thông tin cho UID này.');
      }

      const player = data.player;
      const spaceInfo = player.space_info || {};

     
      const baseUrl = 'https://api.mihomo.me/';
      const avatarUrl = baseUrl + player.avatar.icon;

      
      const userAvatarUrl = message.author.displayAvatarURL({ format: 'png', dynamic: true });

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Thông tin người chơi: ${player.nickname}`)
        .setDescription(`**UID**: ${player.uid}`)
        .setThumbnail(avatarUrl)
        .addFields(
          { name: '📊 Level', value: player.level.toString(), inline: true },
          { name: '🌍 Cấp khai phá', value: player.world_level.toString(), inline: true },
          { name: '👥 Bạn bè', value: player.friend_count.toString(), inline: true },
          { name: '🌌 Vũ trụ mô phỏng', value: spaceInfo.universe_level?.toString() || 'Không có', inline: true },
          { name: '🏆 Thành tích', value: spaceInfo.achievement_count?.toString() || 'Không có', inline: true },
          { name: '🖋️ Chữ ký', value: player.signature || 'Không có', inline: true },
          { name: '✨ Nón ánh sáng', value: spaceInfo.light_cone_count?.toString() || 'Không có', inline: true },
          { name: '🪙 Di vật', value: spaceInfo.relic_count?.toString() || 'Không có', inline: true },
          { name: '👤 Nhân vật', value: spaceInfo.avatar_count?.toString() || 'Không có', inline: true },
          { name: '🎮 Số Ngày Năng Động', value: spaceInfo.active_days?.toString() || 'Không có', inline: true },
          { name: '📚 Số sách đã thu thập', value: spaceInfo.book_count?.toString() || 'Không có', inline: true },
          { name: '🎶 Số lượng nhạc', value: spaceInfo.music_count?.toString() || 'Không có', inline: true }
        )
        .setImage(avatarUrl)
        .setFooter({ text: 'Honkai: Star Rail Player Info', iconURL: userAvatarUrl });

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Hãy nhập đúng UID Honkai: Star Rail của bạn.');
    }
  }
};
