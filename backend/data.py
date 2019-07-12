import pickle

class Data:
    def __init__(self):
        with open('pickle_data', 'rb') as file:
            self.data = pickle.load(file)

    def stops(self):
        latitudes = []
        longitudes = []
        for value in self.data.values():
            times = sum(list(value['Hourly Taps'].values()))
            latitudes.extend([value['Latitude']] * times)
            longitudes.extend([value['Longitude']] * times)
        
        return {
            'Latitude': latitudes,
            'Longitude': longitudes
        }