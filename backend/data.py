import pickle
import requests
from pprint import pprint

class Data:
    def __init__(self):
        with open('pickle_data', 'rb') as file:
            self.data = pickle.load(file)

    def stops(self):
        latitudes = []
        longitudes = []
        weights = []
        # minimum = min([sum(value['Hourly Taps']) for value in self.data.values()])
        for value in self.data.values():
            # times = sum(value['Hourly Taps'].values()) // minimum
            # latitudes.extend([value['Latitude']] * times)
            # longitudes.extend([value['Longitude']] * times)

            latitudes.append(value['Latitude'])
            longitudes.append(value['Longitude'])
            weights.append(sum(value['Hourly Taps'].values()))
        
        return {
            'Latitude': latitudes,
            'Longitude': longitudes,
            'Weight': weights
        }


# reply = requests.get('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyA63GKyT88PRUP9Gp10HFuJwWeAWxBgu-c')

# pprint(reply)
# print(reply.json())
