#!/usr/bin/env python3

from flask import Flask, render_template, redirect, request, jsonify
from data import Data
from pprint import pprint

import requests

app = Flask(__name__)
data = Data()

# bus stop details
# latitude, longitutde, magnitude

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/busstop', methods=['GET', 'POST'])
def busstop():
    return jsonify(data.stops())

@app.route('/cors', methods=['GET', 'POST'])
def cors():
    data_reply = data.stops()
    replys = []

    print(len(data_reply))
    pprint(data_reply.keys())

    for i in range(len(data_reply[list(data_reply.keys())[0]]) - 1):
    # for i in range(1000):
        replys.append(requests.get('https://maps.googleapis.com/maps/api/directions/json?origin={},{}&destination={},{}&key=AIzaSyA63GKyT88PRUP9Gp10HFuJwWeAWxBgu-c'.format(data_reply['Latitude'][i], data_reply['Longitude'][i], data_reply['Latitude'][i + 1], data_reply['Longitude'][i + 1])))

    return_reply = [reply.json() for reply in replys]

    print(len(return_reply))

    return jsonify({'data': return_reply})


if __name__ == '__main__':
    app.run(debug=True)
