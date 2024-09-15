export default {
    name: 'kick',
    description: 'Kick user',
    async execute(message, args) {
        if (!message.guild.members.me.permissions.has('KickMembers')) {
            return message.author.send("Vui lòng kiểm tra quyền hạn của tôi.");
        }
        if (!message.member.permissions.has('KickMembers')) {
            return message.reply("Bạn không có quyền để kick người dùng!");
        }

        const userToKick = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        const reason = args.slice(1).join(' ') || "Không có lý do";

        if (!userToKick) {
            return message.reply("Không tìm thấy người dùng để kick!");
        }
        const confirmationMessage = await message.reply(`Bạn có muốn kick ${userToKick} (ID: \`${userToKick.id}\`) với lý do: ${reason}?`);
        
        await confirmationMessage.react('✅');
        await confirmationMessage.react('❌');

        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        const collector = confirmationMessage.createReactionCollector({ filter, time: 15000 });
        collector.on('collect', async (reaction) => {
            if (reaction.emoji.name === '✅') {
                await userToKick.kick(reason);
                await confirmationMessage.edit(`${userToKick} (ID: \`${userToKick.id}\`) đã bị kick bởi ${message.author}. Lý do: ${reason}`);
            } else if (reaction.emoji.name === '❌') {
                await confirmationMessage.delete();
            }
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                confirmationMessage.delete();
            }
        });
    }
};
