import { EmbedBuilder } from 'discord.js';

export default {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
  execute: async (message, args, client) => {
    try {
      if (message.author.bot) return;

      const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;


      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('💌 Mời bot vào server của bạn!')
        .setDescription(`Click vào [đây](${inviteLink}) để mời bot vào server của bạn.`)
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .setTimestamp();

      const inviteMessage = await message.author.send({ embeds: [embed] });


      setTimeout(() => {
        inviteMessage.delete().catch(console.error);
      }, 30000);


      const replyMessage = await message.reply('📬 Đã gửi link bot qua DMs. Vui lòng kiểm tra tin nhắn của bạn!');

 
      setTimeout(() => {
        replyMessage.delete().catch(console.error);
      }, 10000);

    } catch (error) {
      console.error('Error sending invite:', error);
      message.reply('❌ Không thể gửi tin nhắn. Hãy đảm bảo rằng bạn đã mở DMs.');
    }
  },
};
