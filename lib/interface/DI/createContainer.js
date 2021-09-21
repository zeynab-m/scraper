const diContainer= require('./DIContainer')()
const repositories = require('./dependencies/repositoryDep')
const services = require('./dependencies/serviceDep')
const entities = require('./dependencies/entityDep')
const controllers = require('./dependencies/controllerDep')
const utils = require('./dependencies/utils')


repositories(diContainer)
services(diContainer)
entities(diContainer)
controllers(diContainer)
utils(diContainer)

module.exports=diContainer