import { EmbedBuilder } from 'discord.js';

export default {
  name: 'server',
  description: 'Show information of the server',

  execute: async (client, message, args) => {
    if (!message || !message.guild) {
      console.error('Message or guild is undefined');
      return;
    }

    const guild = message.guild;

    try {

      await guild.members.fetch();

 
      const humanMembers = guild.members.cache.filter(member => !member.user.bot).size;

      
      const onlineMembers = guild.members.cache.filter(member => !member.user.bot && member.presence?.status === 'online').size;
      const idleMembers = guild.members.cache.filter(member => !member.user.bot && member.presence?.status === 'idle').size;
      const dndMembers = guild.members.cache.filter(member => !member.user.bot && member.presence?.status === 'dnd').size;
      const offlineMembers = guild.members.cache.filter(member => !member.user.bot && (!member.presence || member.presence.status === 'offline')).size;

 
      const embed = new EmbedBuilder()
        .setTitle("Server Info")
        .setDescription(`
          :rocket: Server Name: ${guild.name}
          🆔 **Server ID**: ${guild.id}
          👑 Server Owner: <@${guild.ownerId}>
          🙋 **Members**: ${humanMembers}
          🤖 **Bot**: ${guild.members.cache.filter(member => member.user.bot).size}
          🔗 **Channels**: ${guild.channels.cache.size}
          🎭 **Roles**: ${guild.roles.cache.size}
          😎 **Emotes**: ${guild.emojis.cache.size}
          🔧 **Server Created**: ${guild.createdAt.toDateString()}
          🟢 ${onlineMembers} members are online
          🌙 ${idleMembers} members are idle
          🔴 ${dndMembers} members are in Do Not Disturb
          ⭕ ${offlineMembers} members are offline
        `)
        .setImage(guild.bannerURL() || null)
        .setThumbnail(guild.iconURL())
        .setColor("#0adb2d")
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .setTimestamp();

  
      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching server information:', error);
      message.reply('There was an error fetching the server information.');
    }
  }
};
