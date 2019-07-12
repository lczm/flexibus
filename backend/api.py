import requests

class API:
    def __init__(self):
        self.HEADERS = {
            'AccountKey': 'BdC8OjgqTWqDRFXUltCFHQ==',
            'accept': 'application/json'
        }
        self.URI = 'http://datamall2.mytransport.sg/ltaodataservice/'
        self.PATHS = {
            'Arrivals': 'BusArrivalv2',
            'Services': 'BusServices',
            'Routes': 'BusRoutes',
            'Stops': 'BusStops',
            'Passengers': 'PV/Bus',
            'Trips': 'PV/ODBus'
        }
    
    def get(self, path, **kwargs):
        url = self.URI + self.PATHS[path]
        r = requests.get(url, headers=self.HEADERS, **kwargs)
        return r.json()['value']

    def get_all(self, path, **kwargs):
        values = []
        count = 0
        while True:
            print('Ping Count:', count)
            value = self.get(path, params={'$skip': 500 * count}, **kwargs)
            values.extend(value)
            if len(value) < 500: break
            else:                count += 1
            
        return values
