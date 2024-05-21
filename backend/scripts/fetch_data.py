import requests
import json
import logging

logging.basicConfig(filename="FinSmart/backend/scripts/fetch_data.log", level=logging.DEBUG)

ALPHA_VANTAGE_API_KEY = "CSALKE1VWKYJREP6"
IEX_CLOUD_API_KEY = "pk_0604f4f2b4bd42199934e2d961034f68"
NASDAQ_API_KEY = "roYRm2ZN8XvkQiW1ESbj"

def fetch_alpha_vantage(symbol):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}"
    logging.debug(f"Fetching Alpha Vantage data for {symbol}")
    response = requests.get(url)
    logging.debug(f"Alpha Vantage response: {response.text[:1000]}")  # Log first 1000 characters
    return response.json()

def fetch_iex_cloud(symbol):
    url = f"https://cloud.iexapis.com/stable/stock/{symbol}/quote?token={IEX_CLOUD_API_KEY}"
    logging.debug(f"Fetching IEX Cloud data for {symbol}")
    response = requests.get(url)
    logging.debug(f"IEX Cloud response: {response.text[:1000]}")
    return response.json()

def fetch_nasdaq(symbol):
    url = f"https://data.nasdaq.com/api/v3/datasets/WIKI/{symbol}.json?api_key={NASDAQ_API_KEY}"
    logging.debug(f"Fetching Nasdaq data for {symbol}")
    response = requests.get(url)
    logging.debug(f"Nasdaq response: {response.text[:1000]}")
    return response.json()

if __name__ == "__main__":
    symbol = "AAPL"
    try:
        alpha_vantage_data = fetch_alpha_vantage(symbol)
        iex_cloud_data = fetch_iex_cloud(symbol)
        nasdaq_data = fetch_nasdaq(symbol)

        with open("FinSmart/backend/scripts/alpha_vantage_data.json", "w") as f:
            json.dump(alpha_vantage_data, f, indent=4)

        with open("FinSmart/backend/scripts/iex_cloud_data.json", "w") as f:
            json.dump(iex_cloud_data, f, indent=4)

        with open("FinSmart/backend/scripts/nasdaq_data.json", "w") as f:
            json.dump(nasdaq_data, f, indent=4)
    except Exception as e:
        logging.error(f"Error occurred: {e}")
