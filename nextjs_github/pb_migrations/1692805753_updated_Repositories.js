/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6x5trogvmt325v")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9wm1awda",
    "name": "updated_at",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6x5trogvmt325v")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9wm1awda",
    "name": "update_at",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
