# Blockchain StarterApp



## Local Deployment

1. Downaload and Install Node and Google Postman plugin
2. Clone the git URL <> to download the project.
3. Go to chaincode at chaicode/src/startup/starterchaincode.go and get it deployed and initialize in Blockchain instance.
4. Once chaincode successfully initialized, copy the credentail json from Blockchain UI Channel -> Chaincode and get the content paste in config/blockchain_creds.json.
5. Go to the project root directory and run 'npm install' - This will download all the dependencies defined in package.json
6. Run 'npm start', it starts Server at port 3001 with a success message in console.
7. Starter App contains three methods createProduct, getProduct, deleteProduct.
8. Open Postman

	a. Test Create Product:
	Send POST request to url http://localhost:3001/createProduct
	Input Json 
			{
			"id":"1", 
			"item" : "TV",
			"distributor" : "JK"
			}
	b. Test Get Product:Same id used for create product
	Send POST request to url http://localhost:3001/getProduct
	Input Json
			{
			"id":"1"
			}  
	c. Test Delete Product:Same id used for create product
	Send POST request to url http://localhost:3001/deleteProduct
	Input Json
			{
			"id":"1"
			}  


## Bluemix Deployment

1. Downaload and Install Node and Google Postman plugin
2. Clone the git URL <> to download the project.
3. Go to chaincode at chaicode/src/startup/starterchaincode.go and get it deployed and initialize in Blockchian instance.
4. Once chaincode successfully initialized, copy the credentail json from Blockchain UI Channel -> Chaincode and get the content paste in confi/blockchain_creds.json.
5. Go to the project root directory edit manifest.yml file, change host name to some unique name.
6. From the root directory type 'cf push', give the bluemix api endpoint , username and password if it asks.
7. To see any error type cd logs --recent <Application Name>
8. Starter App contains three methods createProduct, getProduct, deleteProduct.
9. Open Postman

	a.Test Create Product:
	Send POST request to url http://<application end point>/createProduct
	Input Json 
			{
			"id":"1", 
			"item" : "TV",
			"distributor" : "JK"
			}
	b. Test Get Product:Same id used for create product
	Send POST request to url http://<application end point>/getProduct
	Input Json
			{
			"id":"1"
			}  
	c. Test Delete Product:Same id used for create product
	Send POST request to url http://<application end point>/deleteProduct
	Input Json
			{
			"id":"1"
			}   

3:38:42 PM: 

# Blockchain StarterApp



## Local Deployment

1. Downaload and Install Node and Google Postman plugin
2. Clone the git URL <> to download the project.
3. Go to chaincode at chaicode/src/startup/starterchaincode.go and get it deployed and initialize in Blockchain instance.
4. Once chaincode successfully initialized, copy the credentail json from Blockchain UI Channel -> Chaincode and get the content paste in confi/blockchain_creds.json.
5. Go to the project root directory and run 'npm install' - This will download all the dependencies defined in package.json
6. Run 'npm start', Server should start at port 3001 with a success message in console.
7. Starter App contains three methods createProduct, getProduct, deleteProduct.
8. Open Postman
	a. Test Create Product:
	Send POST request to url http://localhost:3001/createProduct
	Input Json 
			{
			"id":"1", 
			"item" : "TV",
			"distributor" : "JK"
			}
	b. Test Get Product:Same id used for create product
	Send POST request to url http://localhost:3001/getProduct
	Input Json
			{
			"id":"1"
			}  
	c. Test Delete Product:Same id used for create product
	Send POST request to url http://localhost:3001/deleteProduct
	Input Json
			{
			"id":"1"
			}  


## Bluemix Deployment

### Automated Process

Click on the below button to deploy this appication on button click



[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://marshad5@git.ng.bluemix.net/marshad5/GSTNSupplyChainPOC.git (https://bluemix.net/deploy/button.png%29]%28https://bluemix.net/deploy?repository=https://marshad5@git.ng.bluemix.net/marshad5/GSTNSupplyChainPOC.git)  # [required])

### Manual Process

1. Downaload and Install Node and Google Postman plugin
2. Clone the git URL <> to download the project.
3. Go to chaincode at chaicode/src/startup/starterchaincode.go and get it deployed and initialize in Blockchian instance.
4. Once chaincode successfully initialized, copy the credentail json from Blockchain UI Channel -> Chaincode and get the content paste in config/blockchain_creds.json.
5. Go to the project root directory edit manifest.yml file, change host name to some unique name.
6. From the root directory type 'cf push', give the bluemix api endpoint , username and password if it asks.
7. To see any error type cd logs --recent <Application Name>
8. Starter App contains three methods createProduct, getProduct, deleteProduct.
9. Open Postman

	a.Test Create Product:
	Send POST request to url http://<application end point>/createProduct
	Input Json 
			{
			"id":"1", 
			"item" : "TV",
			"distributor" : "JK"
			}
	b. Test Get Product:Same id used for create product
	Send POST request to url http://<application end point>/getProduct
	Input Json
			{
			"id":"1"
			}  
	c. Test Delete Product:Same id used for create product
	Send POST request to url http://<application end point>/deleteProduct
	Input Json
			{
			"id":"1"
			}   