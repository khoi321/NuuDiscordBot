import { EmbedBuilder } from 'discord.js';
import axios from 'axios';

export default {
  name: 'ba',
  description: 'Lấy thông tin nhân vật từ API Buruaka',
  async execute(message, args) {
    if (args.length < 1) {
      return message.reply('Vui lòng cung cấp tên nhân vật!');
    }

    const characterName = args[0];
    const apiUrl = `https://api.ennead.cc/buruaka/character/${characterName}`;

    try {
      const response = await axios.get(apiUrl);
      const { character, info, image } = response.data;

      const embed = new EmbedBuilder()
        .setColor('#0099ff')  // Màu sắc của embed
        .setTitle(character.fullname || 'Không có tên')
        .setDescription(character.profile || 'Không có mô tả')
        .setThumbnail(image.lobby || '')  // Hình ảnh thumbnail
        .setImage(image.portrait || '')  // Hình ảnh chính
        .setFooter({ text: `Requested by ${message.author.username}`, iconURL: image.icon || '' })
        .addFields(
          { name: 'Rarity', value: character.rarity || 'N/A', inline: true },
          { name: 'Squad', value: character.squadType || 'N/A', inline: true },
          { name: 'Role', value: character.role || 'N/A', inline: true },
          { name: 'Position', value: character.position || 'N/A', inline: true },
          { name: 'Bullet', value: character.bulletType || 'N/A', inline: true },
          { name: 'Armor', value: character.armorType || 'N/A', inline: true },
          { name: 'Weapon', value: character.weaponType || 'N/A', inline: true },
          { name: 'Age', value: info.age || 'N/A', inline: true },
          { name: 'Birth Date', value: info.birthDate || 'N/A', inline: true },
          { name: 'School', value: info.school || 'N/A', inline: true }
        );

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching character data:', error);
      message.reply('Có lỗi xảy ra khi lấy thông tin nhân vật.');
    }
  },
};
