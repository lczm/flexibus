from flask import Flask, render_template, redirect, request, jsonify
from backend.data import Data

app = Flask(__name__)
data = Data()

# bus stop details
# latitude, longitutde, magnitude

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/busstop')
def busstop():
    return jsonify(data.busstop())


if __name__ == '__main__':
    app.run(debug=True, port=8823)
