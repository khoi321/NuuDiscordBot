import { PermissionsBitField } from 'discord.js';

export default {
    name: 'lock',
    description: 'Khóa kênh',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        if (args.length < 2) {
            return message.reply('Vui lòng cung cấp ID kênh và lý do để khóa kênh.');
        }

        const channelId = args.shift(); 
        const reason = args.join(' '); 

        const channel = message.guild.channels.cache.get(channelId);

        if (!channel) {
            return message.reply('Không tìm thấy kênh với ID cung cấp.');
        }

        try {
            await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                SendMessages: false
            });

            await channel.send(`:lock: Channel <#${channel.id}> vừa bị khóa. Lý do: ${reason}`);
        } catch (error) {
            console.error('Lỗi khi khóa kênh:', error);
            message.reply('Đã xảy ra lỗi khi khóa kênh.');
        }
    },
};
