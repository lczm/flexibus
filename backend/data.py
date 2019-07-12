import requests

class Data:
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
        r = requests.get(url, **kwargs)
        return r.json()

    # returns a dictionary with 
    # keys of "Latitude" and "Longitude"
    # to be iterated at both at the same time
    def busstop(self) -> dict:
        latitude = []
        longitude = []

        return_values = self.get('Stops')
        # iterate over the values
        for value in return_values['value']:
            latitude.append(value['Latitude'])
            longitude.append(value['Longitude'])

        return_dict = {'Latitude': latitude, 'Longitude': longitude}

        return return_dict

    def passengers(self):
        data = self.get('Passengers')
        return data


if __name__ == "__main__":
    data = Data()
    print(data.busstop())
