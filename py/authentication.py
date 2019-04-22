import requests
import pymongo
from py.dbconnect import *


def verifyFbToken(fbtoken, fbuserid):
	clientId = getConfig('fbclientId')
	clientSecret = getConfig('fbclientSecret')
	apptokenurl = 'https://graph.facebook.com/oauth/access_token?client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=client_credentials'
	appToken = requests.get(apptokenurl).json()['access_token']
	debugtokenurl = 'https://graph.facebook.com/v3.2/debug_token?input_token=' + fbtoken + '&access_token=' + str(appToken)
	userId = requests.get(debugtokenurl).json()['data']['user_id']
	print('Logged User: ' + userId)
	if userId == fbuserid:
		#profileurl = 'https://graph.facebook.com/v3.2/' + fbuserid + '?fields=first_name,last_name,profile_pic,email&access_token=' + fbtoken
		#profile = requests.get(profileurl).json()
		return userId
	else:
		return 'error'


def verifyGlToken(gltoken, gluserid):
	tokeninfo_url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + gltoken
	userid = requests.get(tokeninfo_url).json()['sub']
	if userid == gluserid:
		return userid
	else:
		return 'error'


def saveUser(item):
	dbcollection = dbConnection("users")
	user = dbcollection.find_one({"userid": item["userid"]})
	if user == '' or user == None:
		dbuserid = dbcollection.insert_one(item).inserted_id
	else:
		dbuserid = user["_id"]
	return str(dbuserid)