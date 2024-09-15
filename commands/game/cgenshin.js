import { EmbedBuilder } from 'discord.js'; 
export default {
  name: 'cgenshin',
  description: 'Lấy thông tin nhân vật từ Genshin Impact',
  async execute(message, args) {
    const characterName = args[0];
    if (!characterName) {
      return message.reply('Vui lòng cung cấp tên nhân vật.');
    }

    const apiUrl = `https://genshin-db-api.vercel.app/api/v5/characters?query=${encodeURIComponent(characterName)}&resultLanguage=vietnamese`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu từ API');
      }
      const data = await response.json();

      if (!data.name) {
        return message.reply(`Không tìm thấy thông tin cho nhân vật: ${characterName}`);
      }

      const cover1Url = data.images.cover1 || data.images.mihoyo_icon;
      let elementEmoji = ':cloud_tornado:'; 
      if (data.elementText === 'Hỏa') {
        elementEmoji = '<:hoa:1284724892964618362>';
      } else if (data.elementText === 'Thảo') {
        elementEmoji = '<:thao:1284726656983896136>';
      } else if (data.elementText === 'Nham') {
        elementEmoji = '<:nham:1284726706715885652>';
      } else if (data.elementText === 'Băng') {
        elementEmoji = '<:bang:1284726737246228550>';
      } else if (data.elementText === 'Phong') {
        elementEmoji = '<:phong:1284726767092895778>';
      } else if (data.elementText === 'Thủy') {
        elementEmoji = '<:thuy:1284726844532195378>';
      }

      const embed = new EmbedBuilder()
        .setColor('#0099ff') 
        .setTitle(`${data.name} - ${data.title}`)
        .setDescription(`${data.description || 'Không có mô tả.'}`)
        .setImage(cover1Url)  
        .addFields(
          { name: '🔹 Tên', value: data.name, inline: true },
          { name: '🌟 Độ hiếm', value: `${'⭐'.repeat(data.rarity)}`, inline: true },
          { name: '🎂 Sinh nhật', value: data.birthday || 'Không có thông tin', inline: true },
          { name: '⚔️ Vũ khí', value: data.weaponText || 'Không có thông tin', inline: true },
          { name: `${elementEmoji} Hệ`, value: data.elementText, inline: true },  
          { name: '🏰 Phe phái', value: data.affiliation || 'Không có thông tin', inline: true },
          { name: '🌍 Khu vực', value: data.region || 'Không có thông tin', inline: true },
          { name: '🌟 Chòm sao', value: data.constellation || 'Không có thông tin', inline: true },
          { name: '⚙️ Build', value: data.substatText || 'Không có thông tin', inline: true }
        )
        .setFooter({ text: `${data.name} by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }) });

      
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi lấy dữ liệu từ API.');
    }
  }
};
