const PANE = 'cockpit'

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'cockpit', description: 'Open the cockpit pane' })
    return next(e)
  })
  on('command.run', { command: 'cockpit' }, async ($) => {
    await $.ui.open({ id: PANE, title: 'Cockpit', focus: true })
    return {}
  })
  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Text } = $.ui.resolve(e)
    return Text({ children: ['cockpit is alive'] })
  })
}
