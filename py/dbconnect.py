import pymongo, json


def getConfig(configitem):
    with open('py/config.json', 'r') as f:
        config = json.load(f)
    return config[configitem]


def dbConnection(dbcollectionname):
    dburi = getConfig('dburi')
    dbname = "test"
    client = pymongo.MongoClient(dburi)
    db = client[dbname]
    dbcollection = db[dbcollectionname]
    return dbcollection


def saveData(dbcollectionname, data):
    dbcollection = dbConnection(dbcollectionname)
    id = dbcollection.insert_one(data).inserted_id
    return str(id)
