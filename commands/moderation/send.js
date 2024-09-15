export default {
    name: 'send',
    description: 'Gửi nội dung đến kênh',
    async execute(message, args) {

      const channel = message.mentions.channels.first();
      if (!channel) {
        return message.reply('Bạn phải đề cập đến kênh để gửi tin nhắn.');
      }

      const content = args.slice(1).join(' ');
      if (!content) {
        return message.reply('Bạn phải cung cấp nội dung để gửi.');
      }
      
      try {
        await channel.send(content);
        message.reply(`Đã gửi tin nhắn đến kênh ${channel}.`);
      } catch (error) {
        console.error(error);
        message.reply('Có lỗi xảy ra khi gửi tin nhắn.');
      }
    }
  };
  