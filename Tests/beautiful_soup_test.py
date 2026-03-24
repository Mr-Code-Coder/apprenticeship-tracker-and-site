from bs4 import BeautifulSoup
import requests
import csv

url = "https://books.toscrape.com"
response = requests.get(url)

print(response.status_code) # 200 means can get in whereas 403 means you can't

soup = BeautifulSoup(response.text, 'html.parser')
books = soup.find_all("article", class_="product_pod") # finds all <article> tags with the class "product_pod"

with open("books.csv", "w", newline="") as file: # opens the "books.csv file"
    writer = csv.writer(file)
    writer.writerow(["Title", "Price"])

    for book in books: # loops through all books displayed and gets the title and price
        title = book.h3.a["title"] # <h3> <a title="..."> </h3> this sets to title down to what shows the title
        price = book.find("p", class_="price_color").text
        writer.writerow([title, price]) # writes title and price to the csv file
