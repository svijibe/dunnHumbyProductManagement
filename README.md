A full-stack web application built with:

- **Frontend**: React (with Vite )
- **Backend**: ASP.NET Core Web API
- **Database**: SQLite 
- **API Communication**: REST (JSON over HTTP)

Features
- RESTful API with .NET Core
- Responsive UI with React

Prerequisites
A list of software and tools required to run the application, including versions:
Node.js and npm/yarn
.NET SDK
IDE (e.g., Visual Studio)

Getting Started
Clone the Repository from the below repository-url
https://github.com/svijibe/dunnHumbyProductManagement.git

    git clone https://github.com/svijibe/dunnHumbyProductManagement.git
    cd dunnHumbyProductManagement/dunnhumbyproductmanagement.client

install packages in client application location with below commands
npm install,
npm install chart.js react-chartjs-2,
npm install tailwindcss @tailwindcss/vite,
npm install date-fns,
npm install chartjs-plugin-datalabels,


front end run in the below 
https://localhost:59972/

Backend API runs in https://localhost:7122
GET Method to retrieve all products - https://localhost:7122/ProductsAPI
POST Method to insert a product - https://localhost:7122/ProductsAPI
	Sample Data
		{
  			"id": 10,
  			"category": "Electronics",
  			"name": "HP Laptop",
  			"productCode": "HPL-4454-345",
  			"price": 1800,
  			"sku": "E01-HPL-4454",
  			"stockQuantity": 25,
  			"dateAdded": "2025-08-04T12:17:58.406Z"
		}
GET Method to retrieve a product - https://localhost:7122/ProductsAPI/4
GET Method to read data for Graphs - https://localhost:7122/ProductsAPI/ProductsQuantityOverThePeriod 

In Client application, configure the API URL, so that react application able to reach the API

Running API and react + vite app

Run WEb API with command from the server folder location- dotnet run
Run react + vite with command from the client folder location- npm run dev


