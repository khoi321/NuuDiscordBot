export default {
    name: 'clear',
    description: 'Xóa tin nhắn trong kênh hiện tại.',
    async execute(message, args) {

      if (!message.member.permissions.has('MANAGE_MESSAGES') &&
          !message.member.permissions.has('ADMINISTRATOR') &&
          !message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Staff')) {
        return message.reply("Bạn không có quyền sử dụng lệnh này.");
      }
  
      const amount = parseInt(args[0]);
  
      if (isNaN(amount) || amount <= 0 || amount > 101) {
        return message.reply('Vui lòng nhập số lượng hợp lệ (từ 1 đến 100).');
      }
  
      try {

        await message.channel.bulkDelete(amount, true);

        const replyMessage = await message.channel.send(`Đã xóa ${amount} tin nhắn.`);
  

        setTimeout(() => replyMessage.delete().catch(console.error), 5000);
  
      } catch (error) {
        console.error('Error clearing messages:', error);
        message.reply('Đã xảy ra lỗi khi cố gắng xóa tin nhắn.');
      }
    }
  };
  