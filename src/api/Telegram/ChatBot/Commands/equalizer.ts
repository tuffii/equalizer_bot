import * as ServerCore from '@var3n1k/server-core'

import * as axios from 'axios'

import * as Telegram from '@var3n1k/telegram'

import * as GlobalModule from '../../../../module/@module.js'

import * as GlobalAPI from '../../../@api.js'

const CommandName = `equal`
const CommandDescription = `equalizer`

export default class SlashCommandHandler extends Telegram.API.ChatBot.API.Handler.Command.Slash.BaseSlashCommand.default {
  constructor(api: Telegram.API.ChatBot.API.default) {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(Telegram.API.ChatBot.API.default))

    super(
      api,
      CommandName,
      CommandDescription,
      {
        Private: {
          Available: true,
          PerUser: async (actionUser) => {
            const IsActionAvailableForUser = true

            return IsActionAvailableForUser
          },
        },
        Public: {
          Chat: {
            Available: {
              PerChat: async (actionChat) => {
                const IsActionAvailableForChat = false

                return IsActionAvailableForChat
              },
            },
            PerUser: async (actionChat, actionUser) => {
              const IsActionAvailableForUser = false

              return IsActionAvailableForUser
            },
          },
        },
      },
      {
        Private: async (..._) => {
          const [EventContext, Message, CommandName, CommandArguments, CommandQuery, CommandChat, CommandAuthor] = _


          this._API.Client.on(Telegram.API.ChatBot.Dependencies.TelegrafFilters.message('audio'), async (context) => {
            const fileID = context.message.audio.file_id
            const fileURL = (await this._API.Client.telegram.getFileLink(fileID)).href
            const response = await axios.default.get(fileURL, {responseType: 'stream'} )
            const stream = response.data
            const fileStream = ServerCore.Engine.Module.Dependencies.Default.Node.fs.createWriteStream('./python/sound.mp3')
            stream.pipe(fileStream)
            fileStream.on('finish', async () => {
              console.log('finish')

              
              await EventContext.reply('введите фильтры в виде \`40 5 -5 -5 -5 -5 -5\`\nдля частот [100, 500, 3000, 5000, 7500, 10000]', {parse_mode: 'Markdown'})
              const filtersEvent = await this._API.Awaited.Message.Private(CommandChat.id, CommandAuthor.id, undefined)
              const filters_equal = filtersEvent[2].split(/[\s|\-|_|\+|=|,]+/)


              await EventContext.reply('введите время обрезки в виде \`5 5\`\n', {parse_mode: 'Markdown'})
              const filtersEvent2 = await this._API.Awaited.Message.Private(CommandChat.id, CommandAuthor.id, undefined)
              const time = filtersEvent2[2].split(/[\s|\-|_|\+|=|,]+/)

              await EventContext.reply('введите тип итогового аудио (mp3/wav)', {parse_mode: 'Markdown'})
              const filtersEvent3 = await this._API.Awaited.Message.Private(CommandChat.id, CommandAuthor.id, undefined)
              const filters_type = filtersEvent3[2].split(/[\s|\-|_|\+|=|,]+/)




              const equalizer = ServerCore.Engine.Module.Dependencies.Default.Node.child_process.spawn('python.exe', ['./python/equal.py', ...filters_equal, ...time, ...filters_type])



              equalizer.stdout.on('data', async (data: Buffer) => {
                console.log(data.toString())

                if (data.toString().includes('success'))
                {
                  const patch_output = './python/result.' + filters_type[0]
                  ServerCore.Engine.Module.Dependencies.Default.Node.fs.unlinkSync('./python/sound.mp3')
                  const resultFile = ServerCore.Engine.Module.Dependencies.Default.Node.fs.readFileSync(patch_output)
                  await this._API.Client.telegram.sendAudio(CommandChat.id, {source: Buffer.from(resultFile.buffer), filename: 'result.' + filters_type[0]})
                  ServerCore.Engine.Module.Dependencies.Default.Node.fs.unlinkSync(patch_output)
                }
              })

              equalizer.stderr.on('data', (data: Buffer) => {
                console.log(data.toString())
              })

              equalizer.on('close', (code: number) => {
                console.log('zavershil prochess')
              })
            })
          })

        },
        Public: {
          Chat: async (..._) => {
            const [EventContext, Message, CommandName, CommandArguments, CommandQuery, CommandChat, CommandAuthor] = _
          },
        },
      }
    )
  }
}
