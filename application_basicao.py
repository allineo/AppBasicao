from flask import Flask, redirect


application = Flask(__name__)


@application.route('/')
def main():
	return redirect('static/index.html')



if __name__ == "__main__":
	application.run(debug=True)