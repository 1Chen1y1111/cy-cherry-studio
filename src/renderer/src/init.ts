import KeyvStorage from '@kangfenmao/keyv-storage'
import localforage from 'localforage'

function init(): void {
  localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'CherryAI',
    version: 1.0,
    storeName: 'cherryai',
    description: 'Cherry Studio Storage'
  })

  window.keyv = new KeyvStorage()
  window.keyv.init()
}

init()
