import { PermissionsBitField } from 'discord.js';

export default {
    name: 'unlock',
    description: 'Mở khóa kênh',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        if (args.length < 1) {
            return message.reply('Vui lòng cung cấp ID kênh để mở khóa.');
        }

        const channelId = args.shift(); 
        const reason = args.join(' ') || 'Không có lý do'; 

        const channel = message.guild.channels.cache.get(channelId);

        if (!channel) {
            return message.reply('Không tìm thấy kênh với ID cung cấp.');
        }

        try {
            await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                SendMessages: true
            });

            await channel.send(`:unlock: Channel <#${channel.id}> vừa được mở khóa. Lý do: ${reason}`);
        } catch (error) {
            console.error('Lỗi khi mở khóa kênh:', error);
            message.reply('Đã xảy ra lỗi khi mở khóa kênh.');
        }
    },
};
