let Promise = require("bluebird");
let storageUtils = require("../utils");
let util = require("util");
const mongo = require('mongodb').MongoClient
let config = require("./dml-config").mongodb


class DMLInsertImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "dml.insert error";
    }
}



var impl = function(params, state) {
    
        let parts = params.collection.split(".")
        let database = "dj-storage"
        
        if (parts[1]){
            params.collection = parts[1]
            database = parts[0]
        }  

        // let url = connectionUrl
        // let parsed = require("url").parse(url).pathname
        // let pathNames = (parsed) ? parsed.split("/") : []
        // if(pathNames.length > 0) database = pathNames[pathNames.length-1]
        
        let client

        params.values.forEach( r => {
            r.updatedAt = new Date()
        })  
        
        return mongo.connect(config.url, config.options)
                .then( c => {
                    client = c
                    let db = client.db(database)
                    return db.collection(params.collection)
                })
                .then( collection => collection.insertMany(params.values))
                .then( result => {
                    client.close()
                    return result.ops
                })
                .catch( e => {
                    client.close()
                    throw new DMLInsertImplError(e.toString())
                })    



    // return new Promise(function(resolve, reject) {
    //     storageUtils.access(state.client, params.collection, 'insert')
    //     .then(() => {
    //         var collection = sails.models[params.collection]
    //         resolve(sails.models[params.collection].create(params.values))    
    //     })
    //     .catch((e) => { reject(new DMLInsertImplError(e.toString()))})
    // })
}

module.exports = {
    name: "dml.insert",

    synonims: {
        "dml.insert": "dml.insert",
        "dml.save": "dml.insert",
        "dml.add": "dml.insert",
        "dml.put": "dml.insert",

    },

    "internal aliases": {
        "collection": "collection",
        "object": "collection",
        "entity": "collection",
        "into": "collection",
        "values": "values"
    },

    defaultProperty: {},

    execute: function(command, state) {
        return new Promise(function(resolve, reject) {
            var model = command.settings.collection;
            if (!model) {
                reject(new DMLInsertImplError("Entity collection '" + model + "' is not available"))
                return
            }
            
            if (!command.settings.values) {
                reject(new DMLInsertImplError("Values for '" + model + "' is not available"))
                return
            }

            command.settings.values = (util.isArray(command.settings.values)) ? command.settings.values : [command.settings.values]

            impl(command.settings, state)
                .then(result => {
                    state.head = {
                        type: "json",
                        data: result
                    }
                    resolve(state);
                })
                .catch(function(e) {
                    reject(new DMLInsertImplError(e.toString()))
                })
        })
    },

    help: {
        synopsis: "Save context into cache",
        name: {
            "default": "cache",
            synonims: ["cache", "save"]
        },
        "default param": "none",
        params: [],
        example: {
            description: "Save context into cache",
            code: "load(\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\n    as:'json'\n)\nselect('$.metadata')\nextend()\ntranslate()\ncache()\nselect(\"$.data_id\")\n"
        }

    }
}