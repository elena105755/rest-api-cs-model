import requests

jsonwebtoken = ''

def userLogReg():
    userInput = input('\n LOG IN(L) or REGISTER(R)? \n')
    if userInput == 'L':
        username = input('Type your username ')
        password = input('Your password ')
        logIn(username, password)
        userDecide()
    elif userInput == "R":
        username = input('Create username ')
        password = input('Create password ')
        userRegistry(username, password)
        userLogReg()
    else: 
        print ('You did not input a correct command! Try again...')
        userLogReg()

def userDecide():
    userInput = input('\n Choose next step \n Available options: \n MAIN MENU \n PRINT ALL AUCTIONS \n GET AUCTION BY ID \n ADD AUCTION \n DELETE AUCTION \n UPDATE AUCTION \n BID \n GET BIDS \n LOG OUT \n \n')
    if userInput == 'ADD AUCTION':
        auctionName = input(' \n Name of the auction: ')
        bid = input('Starting bid amount: ')
        addNewAuction(auctionName, bid, jsonwebtoken)
    elif userInput == 'DELETE AUCTION':
        id = input(' \n Auction id: ')
        deleteAuction(id, jsonwebtoken)
    elif userInput == 'PRINT ALL AUCTIONS':
        listAuctions()
    elif userInput == 'GET AUCTION BY ID':
        id = input(' \n Auction id: ')
        getOneAuction(id, jsonwebtoken)
    elif userInput == 'UPDATE AUCTION':
        id = int(input(' \n Auction id: '))
        auctionName = input('Name of auction: ')
        bid = input('Starting bid amount: ')
        updateAuction(id, auctionName, bid, jsonwebtoken)
    elif userInput == 'BID':
        amount = input(' \n How much do you want to bid? ')
        auctionId = input('Auction id: ')
        bidInAuction(amount, auctionId, jsonwebtoken)
    elif userInput == 'GET BIDS':
        auctionId = input(' \n Auction id: ')
        getAllBids(auctionId, jsonwebtoken)
    elif userInput == 'LOG OUT':
        logOut()
    elif userInput == 'MAIN MENU':
        userDecide()
    else: 
        print ('You did not input a correct command! Try again...')
        userDecide()

def userRegistry(username, password):
    URL = 'http://localhost:9090/api/user'
    userData = {
        'username': username,
        'password': password
    }
    #getResponse = requests.get(URL)
    postResponse = requests.post( URL, userData)
    sc = postResponse.status_code

    if sc == 200: 
        global jsonwebtoken
        jsonwebtoken = postResponse.headers['Authorization']
        print ('Successful registration on newBay! To log in, go to ./login')
        print (postResponse.status_code)
        userLogReg()
    else:
        error = postResponse.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userLogReg()

def logIn(username, password):
    URL = 'http://localhost:9090/api/user/login'
    userData = {
        'username': username,
        'password': password
    }
    getData = requests.post(URL, userData)
    sc = getData.status_code

    if sc == 200:
        global jsonwebtoken
        jsonwebtoken = getData.headers['Authorization']
        print ('Welcome to newBay!')
        userDecide()
    else:
        error = getData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userLogReg()

def listAuctions():
    URL = 'http://localhost:9090/api/auctions'
    getData = requests.get(URL)
    sc = getData.status_code

    if sc == 200:
        headers = {}
        print ('This is the list of auctions: \n')
        print (getData.json())
        print ('\n')
        userDecide()
    else:
        error = getData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()


def addNewAuction(auctionName, bid, jsonwebtoken):
    URL = 'http://localhost:9090/api/auction'
    userData = {
        'name': auctionName,
        'firstBid': bid
    }
    #getResponse = requests.get(URL)
    postResponse = requests.post(
        URL, 
        userData, 
        headers = {'Authorization': jsonwebtoken})
    sc = postResponse.status_code
    if sc == 200:
        headers = {}
        print ('Successfully added new auction on newBay!')
        userDecide()
    else:
        error = postResponse.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()

def getOneAuction(ID, jsonwebtoken):
    URL = 'http://localhost:9090/api/auction/{}'.format(ID)
    getData = requests.get(URL, headers = {'Authorization': jsonwebtoken})
    sc = getData.status_code
   
    if sc == 200:
        headers = {}
        print ('This is the auction you were looking for: \n')
        print (getData.json())
        print ('\n')
        userDecide()
    else:
        error = getData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()

def deleteAuction(ID, jsonwebtoken):
    URL = 'http://localhost:9090/api/auction/{}'.format(ID)
    deleteData = requests.delete(URL, headers = {'Authorization': jsonwebtoken})
    sc = deleteData.status_code
   
    if sc == 200:
        headers = {}
        print ('Auction successfuly deleted.')
        userDecide()
    else:
        error = deleteData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()

def updateAuction(ID, auctionName, bid, jsonwebtoken):
    updatedData = {
        'id': ID,
        'name': auctionName,
        'firstBid': bid,
        'status': 'available',
        'sellerId': 'id'
    }
    
    URL = 'http://localhost:9090/api/auction/{}'.format(ID)
    updateData = requests.post( URL, updatedData, headers = {'Authorization': jsonwebtoken})
    #auctionName = input('Type the name of the auction')
    #bid = input('How much do you want to bid?')
    sc = updateData.status_code
   
    if sc == 200:
        headers = {}
        print ('Auction successfuly updated')
        userDecide()
    else:
        error = updateData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()

def bidInAuction(amount, auctionId, jsonwebtoken):
    updatedData = {
        'bidAmount': amount
    }
    URL = 'http://localhost:9090/api/auction/{}/bid'.format(auctionId)
    
    bidData = requests.post( URL, updatedData, headers = {'Authorization': jsonwebtoken})
    sc = bidData.status_code
   
    if sc == 200:
        headers = {}
        print ('Bid successfully added.')
        userDecide()
    else:
        error = bidData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()

def getAllBids(auctionId, jsonwebtoken):
    URL = 'http://localhost:9090/api/auction/{}/bids'.format(auctionId)
    getData = requests.get(URL, headers = {'Authorization': jsonwebtoken})
    sc = getData.status_code

    if sc == 200:
        headers = {}
        print ('\n All bids in specified auction: \n')
        print (getData.json())
        print ('\n')
        userDecide()
    else:
        error = getData.headers["Error"]
        print("Error {}: {}".format(sc, error))
        userDecide()

def logOut():
    print ('Buh-byeee')
    userLogReg()
userLogReg()