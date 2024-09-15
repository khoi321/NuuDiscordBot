export default {
    name: 'ban',
    description: 'Ban user',
    async execute(message, args) {
        if (!message.guild.members.me.permissions.has('BanMembers')) {
            return message.author.send("Vui lòng kiểm tra quyền hạn của tôi.");
        }

        if (!message.member.permissions.has('BanMembers')) {
            return message.reply("Bạn không có quyền để cấm người dùng!");
        }

        const userToBan = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        const reason = args.slice(1).join(' ') || "Không có lý do";

        if (!userToBan) {
            return message.reply("Không tìm thấy người dùng để cấm!");
        }

        const confirmationMessage = await message.reply(`Bạn có muốn cấm ${userToBan} (ID: \`${userToBan.id}\`) với lý do: ${reason}?`);
        
        await confirmationMessage.react('✅');
        await confirmationMessage.react('❌');

        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const collector = confirmationMessage.createReactionCollector({ filter, time: 15000 });

        collector.on('collect', async (reaction) => {
            if (reaction.emoji.name === '✅') {
                await userToBan.ban({ reason });
                await confirmationMessage.edit(`${userToBan} (ID: \`${userToBan.id}\`) đã bị ban bởi ${message.author}. Lý do: ${reason}`);
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

