import pkg from 'discord.js';
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = pkg;

export const activeGiveaways = new Map();

export async function handleGiveawayEntry(interaction) {
  if (!interaction.message || !activeGiveaways.has(interaction.message.id)) {
    return interaction.reply({ content: 'Giveaway này không tồn tại!', ephemeral: true });
  }

  const giveaway = activeGiveaways.get(interaction.message.id);

  if (!giveaway.participants) {
    giveaway.participants = [];
  }

  if (giveaway.participants.includes(interaction.user.id)) {
    return interaction.reply({ content: 'Bạn đã tham gia giveaway này!', ephemeral: true });
  }

  giveaway.participants.push(interaction.user.id);

  interaction.reply({ content: 'Bạn đã tham gia giveaway thành công!', ephemeral: true });


  const embed = new EmbedBuilder()
    .setTitle(":tada: GIVEAWAY :tada:")
    .setDescription(`**End in:** <t:${Math.floor(giveaway.endTime / 1000)}:F>\n**Awards:** ${giveaway.award}\n**Hosted by:** ${interaction.message.author}\n**Entries:** ${giveaway.participants.length}\n**Requirement:** ${giveaway.request || 'None'}\n**Winners:** ${giveaway.winnersCount}`)
    .setColor("#0adb23")
    .setFooter({ text: "Click button below to join Giveaways", iconURL: interaction.guild.iconURL() });

  await interaction.message.edit({ embeds: [embed] });
}

export async function concludeGiveaway(client, messageId) {
  const giveaway = activeGiveaways.get(messageId);

  if (!giveaway) return;

  if (Date.now() < giveaway.endTime) {
    console.log('Giveaway chưa kết thúc.');
    return;
  }

  const winners = getRandomWinners(giveaway.participants, giveaway.winnersCount);
  const winnerMentions = winners.map(id => `<@${id}>`).join(' ');
  const giveawayMessageUrl = `https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${messageId}`;

  const channel = await client.channels.fetch(giveaway.channelId);
  const message = await channel.messages.fetch(messageId);


  await message.reply(`:confetti_ball: **Chúc mừng** ${winnerMentions} đã chiến thắng [giveaway](${giveawayMessageUrl})`);


  activeGiveaways.delete(messageId);
}

function getRandomWinners(participants, winnersCount) {
  const shuffled = participants.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, winnersCount);
}