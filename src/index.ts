import * as ServerCore from '@var3n1k/server-core'

const Core = new ServerCore.default({}, {}, {}, {}, [`.env`])

const GlobalModule = await import(`./module/@module.js`)

const GlobalAPI = await import(`./api/@api.js`)

await Core.Init(async () => {
  await GlobalAPI.Telegram.ChatBot.default.Init()
})
