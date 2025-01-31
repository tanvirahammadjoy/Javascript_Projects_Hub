from flask import Flask
from flask import render_template

# Create a Flask application
app = Flask(__name__)

# Define a route for the home page
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return "This is the about page."

@app.route("/hello/<name>")
def hello(name):
    return render_template("hello.html", name=name)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)