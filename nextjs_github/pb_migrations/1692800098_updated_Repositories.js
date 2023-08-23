/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6x5trogvmt325v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zeptkmve",
    "name": "repo_id",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6x5trogvmt325v")

  // remove
  collection.schema.removeField("zeptkmve")

  return dao.saveCollection(collection)
})
