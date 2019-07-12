import requests


class Data():
    def __init__(self):
        self.key = "BdC8OjgqTWqDRFXUltCFHQ=="

    # returns a dictionary with 
    # keys of "Latitude" and "Longitude"
    # to be iterated at both at the same time
    def busstop(self) -> dict:
        uri = "http://datamall2.mytransport.sg/ltaodataservice/BusStops"

        r = requests.get(uri, headers = {
            'AccountKey' : 'BdC8OjgqTWqDRFXUltCFHQ==',
            'accept' : 'application/json'
        })

        latitude = []
        longitude = []

        if r.status_code == 200:
            return_values = r.json()
            # iterate over the values
            for value in return_values['value']:
                latitude.append(value['Latitude'])
                longitude.append(value['Longitude'])

        return_dict = {'Latitude': latitude, 'Longitude': longitude}

        return return_dict



if __name__ == "__main__":
    data = Data()
    print(data.busstop())
