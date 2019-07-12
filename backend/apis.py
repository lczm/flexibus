import csv
import requests
from pprint import pprint


if __name__ == '__main__':
    uri = "http://datamall2.mytransport.sg/ltaodataservice/BusStops"

    r = requests.get(uri, headers = {
        'AccountKey' : 'BdC8OjgqTWqDRFXUltCFHQ==',
        'accept' : 'application/json'
    })

    longitude = []
    latitude = []

    if r.status_code == 200:
        return_values = r.json()
        # iterate over the values
        for value in return_values['value']:
            longitude.append(value['Longitude'])
            latitude.append(value['Latitude'])

        with open('latlong.csv', 'w') as file:
            filewriter = csv.writer(file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
            filewriter.writerow(['Latitude', 'Longitude'])
            assert len(longitude) == len(latitude)
            for i in range(len(longitude)):
                filewriter.writerow([latitude[i], longitude[i]])

    print('Done without errors')
