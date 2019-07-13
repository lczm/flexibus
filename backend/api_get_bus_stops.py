from api import API
import pickle

api = API()

data = {}

count = 0
while True:
    print(count)
    details = api.get('Stops', params={'$skip': count * 500})
    for detail in details:
        per_data = {}
        code, road_name, description, latitude, longitude = detail.values()
        data[int(code)] = {
            'Road Name': road_name,
            'Description': description,
            'Latitude': float(latitude),
            'Longitude': float(longitude),
        }
    
    if len(details) < 500: break
    else:                  count += 1

with open('pickle_bus_stops', 'wb') as file:
    pickle.dump(data, file)
