import pickle

class Data:
    def __init__(self):
        with open('pickle_data', 'rb') as file:
            self.data = pickle.load(file)

    def stops(self):
        return {
            'Latitude': self.data['Latitude'],
            'Longtitude': self.data['Longtitude']
        }