import * as ServerCore from '@var3n1k/server-core'

import * as Telegram from '@var3n1k/telegram'

const TelegramBotToken = ServerCore.Engine.Module.Classes.Process.Env.TELEGRAM_BOT_TOKEN as string

const TelegramBotEventHandlersPath = ServerCore.Engine.Module.Classes.FileSystem.GetPathFromRootDirectory(import.meta.url, [`Events`])
const TelegramBotMessageHandlersPath = ServerCore.Engine.Module.Classes.FileSystem.GetPathFromRootDirectory(import.meta.url, [`Messages`])
const TelegramBotActionComponentHandlersPath = ServerCore.Engine.Module.Classes.FileSystem.GetPathFromRootDirectory(import.meta.url, [`Action`, `Components`])
const TelegramBotCommandHandlersPath = ServerCore.Engine.Module.Classes.FileSystem.GetPathFromRootDirectory(import.meta.url, [`Commands`])

const TelegramAPI = new Telegram.API.ChatBot.API.default(TelegramBotToken, {
  Handler: {
    Event: {
      Directory: TelegramBotEventHandlersPath,
    },
    Message: {
      Directory: TelegramBotMessageHandlersPath,
    },
    Action: {
      Component: {
        Directory: TelegramBotActionComponentHandlersPath,
      },
    },
    Command: {
      Directory: TelegramBotCommandHandlersPath,
    },
  },
})

export default TelegramAPI
