import pymongo
from py.dbconnect import *
from bson.json_util import dumps


dbcollectionCadastro = "messages"

def listCadastro():	
	dbcollection = dbConnection(dbcollectionCadastro)
	cursor = dbcollection.find().sort("timestamp", -1).limit(10) 
	return dumps(cursor)


def saveCadastro(item):
	dbcollection = dbConnection(dbcollectionCadastro)
	itemid = dbcollection.insert_one(item).inserted_id
	return str(itemid)