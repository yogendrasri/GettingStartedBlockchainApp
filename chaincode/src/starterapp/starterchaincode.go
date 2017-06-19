package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type Product struct {
	id          string `json:"id"`
	Item        string `json:"item"`
	Distributor string `json:"distributor"`
}

type GettingStartedChaincode struct {
}

func main() {
	err := shim.Start(new(GettingStartedChaincode))
	if err != nil {
		fmt.Printf("Error in starting Getting started application chaincode - %s", err)
	}
}

func (t *GettingStartedChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("Blockchain vNext Getting started application Is Starting Up")
	_, args := stub.GetFunctionAndParameters()

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	fmt.Println("Getting started application ready for action")
	return shim.Success(nil)
}

func (t *GettingStartedChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()
	fmt.Println(" ")
	fmt.Println("starting invoke, for - " + function)

	if function == "init" {
		return t.Init(stub)
	} else if function == "createProduct" {
		return createProduct(stub, args)
	} else if function == "getProduct" {
		return getProduct(stub, args)
	} else if function == "deleteProduct" {
		return deleteProduct(stub, args)
	}

	fmt.Println("Received unknown invoke function name - " + function)
	return shim.Error("Received unknown invoke function name - '" + function + "'")
}

func createProduct(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	fmt.Println("Start Create Product")
	product := Product{}
	product.id = args[0]
	product.Item = args[1]
	product.Distributor = args[2]
	jsonAsBytes, _ := json.Marshal(product)
	err := stub.PutState(args[0], jsonAsBytes)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success(nil)
}

func getProduct(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	fmt.Println("starting get product")
	var key string
	var err error
	key = args[0]
	valAsbytes, err := stub.GetState(key)
	if err != nil {
		return shim.Error("Failed to get state for " + key + "")
	}

	return shim.Success(valAsbytes)
}

func deleteProduct(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	fmt.Println("starting delete product")
	var key string
	key = args[0]
	err := stub.DelState(key)
	if err != nil {
		return shim.Error("Failed to delete state")
	}
	return shim.Success(nil)
}
