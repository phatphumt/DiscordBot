require('dotenv').config();
const { Client, IntentsBitField, Events } = require('discord.js');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

const prefix = '!f';
const users = [];

const fetchUsers = async () => {
	console.log('fetching users');
	let res = await guild.members.fetch();

	res.forEach((member) => {
		users.push(member.id);
	});
};

client.on('ready', (c) => {
	console.log(`${c.user.username} is online`);
	fetchUsers();
});

client.on(Events.ClientReady, async (client) => {
	console.log('client ready');
	const guild = client.guilds.cache.get(process.env.GUILD_ID);
});

client.on(Events.GuildMemberAdd);

client.on('messageCreate', (msg) => {
	if (msg.author.bot) {
		return;
	}

	if (msg.content === 'เก') {
		msg.reply(`very เก ${msg.author.username}`);
	}

	if (msg.content === `${prefix} members`) {
		const membersgonnasend = [];

		users.forEach((member) => {
			membersgonnasend.push(`<@${member}>\n`);
		});

		msg.reply(`${membersgonnasend}`);
	}
});

client.on('messageDelete', (msg) => {
	if (msg.author.bot && msg.author.username === 'helllo') {
		msg.channel.send(`someone just deleted my message!!`);
	} else {
		msg.channel.send(`someone just deleted <@${msg.author.id}>'s message`);
	}
});

client.login(process.env.TOKEN);
