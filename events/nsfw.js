import { EmbedBuilder } from 'discord.js';
import { getNsfwMode as getGoogleSheetsNsfwMode, setNsfwMode as setGoogleSheetsNsfwMode } from '../config/google-sheets.js';

export const handleInteraction = async (interaction) => {
  if (interaction.isButton()) {
    const serverId = interaction.guild.id;
    let nsfwMode = await getGoogleSheetsNsfwMode(serverId); 

    if (interaction.customId === 'nsfw-on') {
      nsfwMode = true;
      await setGoogleSheetsNsfwMode(serverId, nsfwMode); 

      await interaction.update({
        content: 'NSFW mode đã được bật!',
        components: [],
      });

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "System",
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setTitle(":warning: NSFW Mode")
        .setDescription(":green_circle: NSFW Mode in this server is: on")
        .setColor("#00b0f4")
        .setFooter({
          text: `Run by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      await interaction.message.edit({ embeds: [embed] });

    } else if (interaction.customId === 'nsfw-off') {
      nsfwMode = false;
      await setGoogleSheetsNsfwMode(serverId, nsfwMode);

      await interaction.update({
        content: 'NSFW mode đã bị tắt!',
        components: [],
      });

      const embed = new EmbedBuilder()
        .setAuthor({
          name: "System",
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setTitle(":warning: NSFW Mode")
        .setDescription(":red_circle: NSFW Mode in this server is: off")
        .setColor("#00b0f4")
        .setFooter({
          text: `Run by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      await interaction.message.edit({ embeds: [embed] });
    }
  }
};
