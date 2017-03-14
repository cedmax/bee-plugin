import loadScript from 'load-script'

const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

const load = (bee) => {
  loadScript(BEEJS_URL, (err) => {
    if (err) {
      throw new Error('BeePlugin.js is not reachable')
    }
    return bee()
  })
}

const beeExisist = (instance) => {
  if (!instance) {
    throw new Error('Bee is not started')
  }
}

export default class Bee {
  constructor(token) {
    this.bee = (call) => load(() => call())
    this.token = token || null
    this.config = null
    this.instance = null
  }

  getToken(clientId, clientSecret) {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}`,
      mode: 'cors',
    }
    if (this.token) {
      throw new Error('Toker already declared')
    }
    return fetch(new Request(API_AUTH_URL, config))
    .then(res => res.json())
    .then(token => {
      this.token = token
      return token
    })
  }

  start(config, template) {
    const { bee, token } = this
    if (!config || !template) {
      throw new Error('Config or template are missing')
    }
    if (!this.token) {
      throw new Error('Toker NOT declared, call getToken or pass token on new BEE')
    }
    return bee(() =>
      BeePlugin.create(token, config, (instance) => {
        this.instance = instance
        return instance.start(template)
      })
    )
  }

  load(template) {
    const { instance } = this
    beeExisist(instance)
    return instance.laod(template)
  }

  save() {
    const { instance } = this
    beeExisist(instance)
    return instance.save()
  }

  saveAsTemplate() {
    const { instance } = this
    beeExisist(instance)
    return instance.saveAsTemplate()
  }
}
