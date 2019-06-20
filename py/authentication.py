import requests
import pymongo
from py.dbconnect import *
import datetime


def verifyFbToken(fbtoken, fbuserid):
    clientId = getConfig('fbclientId')
    clientSecret = getConfig('fbclientSecret')
    apptokenurl = ('https://graph.facebook.com/oauth/access_token?client_id='
                   + clientId + '&client_secret=' + clientSecret
                   + '&grant_type=client_credentials')
    appToken = requests.get(apptokenurl).json()['access_token']
    debugtokenurl = ('https://graph.facebook.com/v3.2/debug_token?input_token='
                     + fbtoken + '&access_token=' + str(appToken))
    userId = requests.get(debugtokenurl).json()['data']['user_id']
    print('Logged User: ' + userId)
    if userId == fbuserid:
        # profileurl = ('https://graph.facebook.com/v3.2/' + fbuserid +
        #               '?fields=first_name,last_name,profile_pic,email&access_token='
        #               + fbtoken)
        # profile = requests.get(profileurl).json()
        return userId
    return 'error'


def verifyGlToken(gltoken, gluserid):
    tokeninfo_url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + gltoken
    userid = requests.get(tokeninfo_url).json()['sub']
    if userid == gluserid:
        return userid
    else:
        return 'error'


def saveUser(request):
    data = {"login": request.args.get("login"),
            "userid": request.args.get("userid"),
            "latitude": request.args.get("latitude"),
            "longitude": request.args.get("longitude"),
            "name": request.args.get("username"),
            "email": request.args.get("useremail"),
            "timestamp": datetime.datetime.utcnow()}
    dbcollection = dbConnection("users")
    user = dbcollection.find_one({"userid": data["userid"]})
    if user in ('', None):
        dbuserid = dbcollection.insert_one(data).inserted_id
    else:
        dbuserid = user["_id"]
    return str(dbuserid)
