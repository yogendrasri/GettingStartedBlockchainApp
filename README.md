# Blockchain StarterApp



## Local Deployment

1. Downaload and Install Node and Google Postman plugin
2. Clone the git URL https://github.com/yogendrasri/GettingStartedBlockchainApp.git to download the project.
3. Go to chaincode at chaicode/src/startup/starterchaincode.go and get it deployed and initialize in Blockchain instance.
4. Once chaincode successfully initialized, copy the credentail json from Blockchain UI Channel -> Chaincode and get the content paste in config/blockchain_creds.json.
5. Go to the project root directory and run 'npm install' - This will download all the dependencies defined in package.json
6. Run 'npm start', it starts Server at port 3001 with a success message in console.
7. Starter App contains three methods createProduct, getProduct, deleteProduct.
8. Open Postman

	a. Test Create Product:
	Send POST request to url http://localhost:3001/createProduct
	Input Json </br>
			{</br>
			"id":"1", </br>
			"item" : "TV",</br>
			"distributor" : "JK"</br>
			}</br>
	b. Test Get Product:Same id used for create product
	Send POST request to url http://localhost:3001/getProduct
	Input Json</br>
			{</br>
			"id":"1"</br>
			}</br>
	c. Test Delete Product:Same id used for create product
	Send POST request to url http://localhost:3001/deleteProduct
	Input Json</br>
			{</br>
			"id":"1"</br>
			}</br>


## Bluemix Deployment

1. Downaload and Install Node and Google Postman plugin
2. Clone the git URL https://github.com/yogendrasri/GettingStartedBlockchainApp.git to download the project.
3. Go to chaincode at chaicode/src/startup/starterchaincode.go and get it deployed and initialize in Blockchian instance.
4. Once chaincode successfully initialized, copy the credentail json from Blockchain UI Channel -> Chaincode and get the content paste in confi/blockchain_creds.json.
5. Go to the project root directory edit manifest.yml file, change host name to some unique name.
6. From the root directory type 'cf push', give the bluemix api endpoint , username and password if it asks.
7. To see any error type cd logs --recent <Application Name>
8. Starter App contains three methods createProduct, getProduct, deleteProduct.
9. Open Postman

	a.Test Create Product:
	Send POST request to url http://yourapplicationhost/createProduct
	Input Json</br>
			{</br>
			"id":"1",</br>
			"item" : "TV",</br>
			"distributor" : "JK"</br>
			}</br>
	b. Test Get Product:Same id used for create product
	Send POST request to url http://yourapplicationhost/getProduct
	Input Json</br>
			{</br>
			"id":"1"</br>
			}</br>
	c. Test Delete Product:Same id used for create product
<<<<<<< HEAD
	Send POST request to url http://<application end point>/deleteProduct
	Input Json
			{
			"id":"1"
			}   

