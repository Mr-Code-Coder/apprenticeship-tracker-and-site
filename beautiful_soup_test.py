from bs4 import BeautifulSoup
import requests

soup = BeautifulSoup(
    """<html>
    
    <b class="boldest" id="this is an id">Extremely bold</b>
    
    </html>""", 'html.parser')

tag = soup.b

print(type(tag))
print(tag.name)
print(tag['id'])




#https://www.findapprenticeship.service.gov.uk/apprenticeships?sort=AgeAsc&searchTerm=&location=&distance=all&levelIds=6&levelIds=7&routeIds=7