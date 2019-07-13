#!/usr/bin/env python3

from flask import Flask, render_template, redirect, request, jsonify
from data import Data
from pprint import pprint
from itertools import tee

import requests

app = Flask(__name__)
data = Data()

# bus stop details
# latitude, longitutde, magnitude

def pairwise(iterable):
    a, b = tee(iterable)
    next(b, None)
    return zip(a, b)

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
    data_reply = data.routes(20, 30)
    replys = []

    print(len(data_reply))
    pprint(data_reply.keys())

    # for i in range(len(data_reply[list(data_reply.keys())[0]]) - 1):
    # for i in range(len(data_reply[0])):
    latitudes = data_reply['Latitude']
    longitudes = data_reply['Longitude']
    for lat, long in zip(latitudes, longitudes):
        reply2 = []
        for latlongA, latlongB in pairwise(zip(lat, long)):
            reply2.append(requests.get('https://maps.googleapis.com/maps/api/directions/json?origin={},{}&destination={},{}&key=AIzaSyA63GKyT88PRUP9Gp10HFuJwWeAWxBgu-c'.format(*latlongA, *latlongB)).json())
        replys.append(reply2)

    # return_reply = [reply.json() for reply in replys]

    # print(len(return_reply))

    return jsonify({'data': replys})


if __name__ == '__main__':
    app.run(debug=True)
