import pickle
import random
import numpy as np

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

    def routes(self, n_routes, n_stops):
        routes = []
        for _ in range(n_routes):
            code = random.choice(list(self.data.keys()))
            stop = self.data[code]
            route = [code]
            for _ in range(n_stops):
                links_taps = [sum(self.data[code2]['Hourly Taps'].values()) for code2 in stop['Links']]
                indicies = np.argsort(links_taps)
                
                success = False
                for index in indicies[::-1]:
                    code = stop['Links'][index]
                    if code not in route:
                        route.append(code)
                        stop = self.data[code]
                        success = True
                        break
                
                if not success:
                    break
            
            routes.append(route)


        latitudes = []
        longitudes = []
        for route in routes:
            latitude = []
            longitude = []
            for code in route:
                stop = self.data[code]
                latitude.append(stop['Latitude'])
                longitude.append(stop['Longitude'])
            latitudes.append(latitude)
            longitudes.append(longitude)

        return {
            'Longitude': longitudes,
            'Latitude': latitudes
        }