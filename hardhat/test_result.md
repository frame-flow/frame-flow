yarn run v1.22.19
$ D:\hardhat\node_modules\.bin\hardhat coverage

# Version

> solidity-coverage: v0.8.5

# Instrumenting for coverage...

> TokenMarketplace.sol
> VideoNFT.sol
> VIDToken.sol

# Compilation:

Nothing to compile

# Network Info

> HardhatEVM: v2.17.3
> network: hardhat

    VIDToken
    Deployment
      ✔ Should set the correct admin
      ✔ Only admin can set the Advertiser
    Video play and Ad click
      ✔ Should mint tokens when a video is played
      ✔ Only admin can call play video
      ✔ Only admin can call clickAD
      ✔ Should burn tokens when an ad is clicked
    Transfers
      ✔ Advertiser cannot sell
      ✔ Whitelisted non-advertisers cannot sell to non-advertisers
      ✔ Allows transfer from non-advertiser to advertiser
    TransferFrom
      ✔ Cannot sell to non-advertisers
      ✔ Advertisers cannot sell Token
      ✔ Allows transfer from non-advertiser to advertiser
    getAdvertiser
      ✔ Check for advertisers
    setWhiteList
      ✔ Only admin can modify whiteList
      ✔ Add whitelist item
    
    VideoNFT
    Deployment
      ✔ Should initialize correctly
    Upload video
      ✔ Should mint a new NFT when a video is uploaded
      ✔ Should reject non-admin uploads
    Change platform
      ✔ Should allow NFT owner to change the platform
      ✔ Should reject platform change by non-owners
    Transfer restrictions
      ✔ Should not allow transfers
    Transfer restrictions
      ✔ should return correct token counter
      ✔ should return correct NFT platform address
    
    TokenMarketplace
    Create order Failed NotApprovedForMarketplace
      ✔ Should create a new order
      ✔ Insufficient token balance
      ✔ Price must be greater than zero
    Create order
      ✔ Should create a new order
    Buy tokens
      ✔ Invaild order id
      ✔ Should allow a buyer to purchase tokens
      ✔ Should allow a buyer to purchase tokens
    Withdraw proceeds
      ✔ Should allow a seller to withdraw their proceeds
      ✔ Should not allow a non-seller to withdraw proceeds

32 passing (2s)

-----------------------|----------|----------|----------|----------|----------------|
File | % Stmts | % Branch | % Funcs | % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
contracts\ | 100 | 88.24 | 100 | 100 | |
TokenMarketplace.sol | 100 | 83.33 | 100 | 100 | |
VIDToken.sol | 100 | 93.75 | 100 | 100 | |
VideoNFT.sol | 100 | 83.33 | 100 | 100 | |
-----------------------|----------|----------|----------|----------|----------------|
All files | 100 | 88.24 | 100 | 100 | |
-----------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
> Done in 4.29s.
