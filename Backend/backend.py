from flask import Flask
from flask_cors import CORS
from home.views import home_view
from home.api import home_api

def create_app(config_file):
	app = Flask(__name__)  # Create application object
	app.config.from_pyfile(config_file)  # Configure application with settings file, not strictly necessary
	app.register_blueprint(home_view)  # Register url's so application knows what to do
	app.register_blueprint(home_api)
	return app

if __name__ == '__main__':
	app = create_app('settinglocal.py')  # Create application with our config file
	CORS(app)
	app.run()
