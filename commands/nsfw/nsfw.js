import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from 'discord.js';
import { getNsfwMode, setNsfwMode } from '../../config/google-sheets.js'; 

export default {
  name: 'nsfw',
  description: 'Turn on/off NSFW mode',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels) &&
        !message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
        !message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Staff')) {
      return message.reply('Bạn không có quyền sử dụng lệnh này.');
    }

    try {
      const serverId = message.guild.id;
      const botAvatar = message.client.user.displayAvatarURL();
      const userAvatar = message.author.displayAvatarURL();
      const userCommand = message.author.username;

 
      const nsfwMode = await getNsfwMode(serverId);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "System",
          iconURL: botAvatar,
        })
        .setTitle(":warning: NSFW Mode")
        .setDescription(`${nsfwMode ? ":green_circle: NSFW Mode in this server is: on" : ":red_circle: NSFW Mode in this server is: off"}`)
        .setColor("#00b0f4")
        .setFooter({
          text: `Run by ${userCommand}`,
          iconURL: userAvatar,
        })
        .setTimestamp();

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('nsfw-on')
            .setLabel('Bật')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('nsfw-off')
            .setLabel('Tắt')
            .setStyle(ButtonStyle.Danger),
        );

      await message.reply({ embeds: [embed], components: [row] });

    } catch (error) {
      console.error('Error executing nsfw command:', error);
      message.reply('An error occurred while executing the NSFW command.');
    }
  }
};
