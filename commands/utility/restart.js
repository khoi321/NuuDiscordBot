import fs from 'fs';
import path from 'path';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

const filePath = path.join(process.cwd(), 'data', 'DevID.json');
const devID = JSON.parse(fs.readFileSync(filePath, 'utf-8')).devID;

export default {
  name: 'restart',
  description: 'Restart the bot',
  async execute(interaction) {
    if (!interaction || !interaction.user || !interaction.user.id) {
      console.error('Interaction or interaction.user is undefined.');
      return interaction.reply({
        content: '❌ Có lỗi xảy ra khi xử lý lệnh này.',
        ephemeral: true
      });
    }

    if (interaction.user.id !== devID) {
      return interaction.reply({
        content: '❌ Bạn không có quyền sử dụng lệnh này.',
        ephemeral: true
      });
    }

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirm-restart')
          .setLabel('Restart Bot')
          .setStyle(ButtonStyle.Danger)
      );

    await interaction.reply({
      content: '⚠️ Bạn có chắc chắn muốn restart bot không?',
      components: [row],
      ephemeral: true
    });

    const filter = i => i.customId === 'confirm-restart' && i.user.id === devID;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'confirm-restart') {
        await i.update({ content: '🔄 Restarting...', components: [] });

        setTimeout(() => {
          process.exit(0);
        }, 2000);
      }
    });

    collector.on('end', async collected => {
      if (collected.size === 0) {
        await interaction.editReply({
          content: '⏳ Hết thời gian để xác nhận restart.',
          components: []
        });
      }
    });
  }
};