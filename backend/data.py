import pickle

class Data:
    def __init__(self):
        with open('pickle_data', 'rb') as file:
            self.data = pickle.load(file)

    def stops(self):
        latitudes = []
        longitudes = []
        for value in self.data.values():
            latitudes.append(value['Latitude'])
            longitudes.append(value['Longitude'])
        
        return {
            'Latitude': latitudes,
            'Longitude': longitudes
        }