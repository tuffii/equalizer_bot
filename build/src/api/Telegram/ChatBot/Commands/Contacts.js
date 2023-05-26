import * as ServerCore from '@var3n1k/server-core';
import * as Telegram from '@var3n1k/telegram';
const CommandName = `contacts`;
const CommandDescription = `Контакты для обратной связи`;
export default class SlashCommandHandler extends Telegram.API.ChatBot.API.Handler.Command.Slash.BaseSlashCommand.default {
    constructor(api) {
        const Validator = ServerCore.Engine.Module.Classes.Validator;
        Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(Telegram.API.ChatBot.API.default));
        super(api, CommandName, CommandDescription, {
            Private: {
                Available: true,
                PerUser: async (actionUser) => {
                    const IsActionAvailableForUser = true;
                    return IsActionAvailableForUser;
                },
            },
            Public: {
                Chat: {
                    Available: {
                        PerChat: async (actionChat) => {
                            const IsActionAvailableForChat = false;
                            return IsActionAvailableForChat;
                        },
                    },
                    PerUser: async (actionChat, actionUser) => {
                        const IsActionAvailableForUser = false;
                        return IsActionAvailableForUser;
                    },
                },
            },
        }, {
            Private: async (..._) => {
                const [EventContext, Message, CommandName, CommandArguments, CommandQuery, CommandChat, CommandAuthor] = _;
                const filters = ['0', '5', '0', '0', '-5', '-5', '-5'];
                const equalizer = ServerCore.Engine.Module.Dependencies.Default.Node.child_process.spawn('python', ['./python/equal.py', ...filters]);
                equalizer.stdout.on('data', (data) => {
                    if (data.toString() === 'SUCKsess') {
                    }
                });
                equalizer.stderr.on('data', (data) => {
                    console.log(data.toString());
                });
                equalizer.on('close', (code) => {
                    console.log('zavershil prochess');
                });
            },
            Public: {
                Chat: async (..._) => {
                    const [EventContext, Message, CommandName, CommandArguments, CommandQuery, CommandChat, CommandAuthor] = _;
                },
            },
        });
    }
}
//# sourceMappingURL=Contacts.js.map