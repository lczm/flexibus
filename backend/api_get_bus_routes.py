from api import API
import pandas as pd

api = API()

routes = {}

values = api.get_all('Routes')

df = pd.DataFrame(values)

df.to_csv('bus_routes.csv')