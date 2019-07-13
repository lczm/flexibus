import requests

class API_Base:
    def __init__(self):
        self.HEADERS = {
            'AccountKey': 'BdC8OjgqTWqDRFXUltCFHQ==',
            'accept': 'application/json'
        }
        self.URI = 'http://datamall2.mytransport.sg/ltaodataservice/'
        self.PATHS = {
            'Arrivals': 'BusArrivalv2',
            'Services': 'BusServices',
            'Stops': 'BusStops',
            'Passengers': 'PV/Bus',
            'Trips': 'PV/ODBus'
        }
    
    def get(self, path, **kwargs):
        url = self.URI + self.PATHS[path]
        r = requests.get(url, headers=self.HEADERS, **kwargs)
        return r.json()['value']