Backend Documentation
=====
So, the plan is simple. The back end is a very light framework at the moment. It has two endpoints `/` and `/api/books`. The first returns a simple page with the text "Hello World" that lets you easily verify that the server has been set up properly. `/api/books` returns a simple example JSON object to give you the opportunity to play with JSON handling.

Setup
-----
Setting up the server is quite simple. First, open the virtual environment. On UNIX platforms, you can simply run `source venv/bin/activate`. Then, install the dependencies with `pip3 install -r requirements.txt`. If you only have python 3 installed and not python 3, you can simply use `pip` and `python` throughout this tutorial instead of the `pip3` or `python3`. At this point, the server should be ready to go, and you can just run `python3 backend.py`

Testing
-----
Testing the server is quite simple (on desktop). Simply visit `127.0.0.1:5000/` to view the root Hello World page and `127.0.0.1:5000/api/books` to check out the JSON data.
