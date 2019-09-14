from flask import Flask, render_template, request
from py.formCadastro import *
from py.authentication import *


application = Flask(__name__)


@application.route('/')
def main():
    return render_template('index.html')


@application.route('/saveNewUser', methods=['POST'])
def saveNewUser():
    return saveUser(request)


@application.route('/listForm', methods=['POST'])
def listForm():
    authenticate()
    return listCadastro()


@application.route('/saveForm', methods=['POST'])
def saveForm():
    authenticate()
    return saveCadastro(request)



def authenticate():
    login = request.args.get("login")
    userid = request.args.get("userid")
    token = request.args.get("token")
    if login == 'fb':
        return verifyFbToken(token, userid)
    elif login == 'gl':
        return verifyGlToken(token, userid)


if __name__ == "__main__":
	application.run(debug=True)