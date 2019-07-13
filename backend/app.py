#!/usr/bin/env python3

from flask import Flask, render_template, redirect, request, jsonify
from data import Data
from pprint import pprint

app = Flask(__name__)
data = Data()

# bus stop details
# latitude, longitutde, magnitude

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/busstop', methods=['GET', 'POST'])
def busstop():
    return jsonify(data.stops())


if __name__ == '__main__':
    app.run(debug=True)
