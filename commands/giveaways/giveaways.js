import pkg from 'discord.js';
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = pkg;

export default {
  name: 'ga',
  description: 'Tạo giveaway mới',
  async execute(message) {
    const args = message.content.slice(4).trim().split('|').map(arg => arg.trim());

    if (args.length < 4) {
      return message.reply("Cú pháp không hợp lệ. Sử dụng: `!ga [phần thưởng] | [thời gian] | [số người win] | [yêu cầu]`");
    }

    const [award, durationStr, winners, request] = args;
    const duration = parseDuration(durationStr);

    if (!duration) {
      return message.reply("Thời gian không hợp lệ. Sử dụng định dạng như `3h`, `1d1w3s`, v.v.");
    }

    const endTimestamp = Math.floor((Date.now() + duration) / 1000); 

    const embed = new EmbedBuilder()
      .setTitle(":tada: GIVEAWAY :tada:")
      .setDescription(`**End in:** <t:${endTimestamp}:F>\n**Awards:** ${award}\n**Hosted by:** ${message.author}\n**Entries:** 0\n**Requirement:** ${request || 'None'}\n**Winners:** ${winners}`)
      .setColor("#0adb23")
      .setFooter({ text: "Click button below to join Giveaways", iconURL: message.guild.iconURL() });

    const button = new ButtonBuilder()
      .setCustomId('join_giveaway')
      .setLabel('🎁 Join Giveaways')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await message.reply({ embeds: [embed], components: [row] });

    
    activeGiveaways.set(message.id, {
      award,
      endTime: Date.now() + duration,
      winnersCount: parseInt(winners, 10),
      request,
      participants: [],
      channelId: message.channel.id,
      guildId: message.guild.id,
      messageId: message.id
    });
  },
};


function parseDuration(duration) {
  const regex = /(\d+)([hsmwdmo])/g;
  let match;
  let totalMilliseconds = 0;

  while ((match = regex.exec(duration)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 'h': totalMilliseconds += value * 60 * 60 * 1000; break;
      case 'm': totalMilliseconds += value * 60 * 1000; break;
      case 's': totalMilliseconds += value * 1000; break; 
      case 'd': totalMilliseconds += value * 24 * 60 * 60 * 1000; break; 
      case 'w': totalMilliseconds += value * 7 * 24 * 60 * 60 * 1000; break; 
      case 'mo': totalMilliseconds += value * 30 * 24 * 60 * 60 * 1000; break; 
      default: return null;
    }
  }

  return totalMilliseconds;
}