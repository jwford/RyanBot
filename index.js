const Commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');

const ryanbot = new Commando.Client({
  selfbot: config.selfbot,
  commandPrefix: config.commandPrefix,
  commandEditableDuration: config.commandEditableDuration,
  nonCommandEditable: config.nonCommandEditable,
  disableEveryone: config.disableEveryone,
  unknownCommandResponse: config.unknownCommandResponse,
  owner: config.ownerID
});

require('./util/eventLoader')(ryanbot);

ryanbot.registry
    .registerGroups([
        ['hogwartaria', 'Hogwartaria Only Commands'],
        ['info_useful', 'Info/Useful Commands'],
        ['owners', 'Bot Owner Commands'],
        ['stats', 'Statistic Commands'],
        ['tuataria', 'Tuataria Only Commands'],
        ['util', 'Utility Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultTypes()
    .registerDefaultCommands({
      help: false,
      ping: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

ryanbot.login(config.token);

process.on('unhandledRejection', console.error);