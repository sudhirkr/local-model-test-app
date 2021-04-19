# local-model-test-app

User can upload their models and the images. This app will take model and test on the provided data and shows the result in human readable format.

### Installation
1. Install npm - either on host or npm docker
2. clone this repo
3. Go to dir local-model-test-app/local-server - run npm install
4. To start server - npm start
5. To access - <IP addr>:8083

### Fields to be filled in
1. Give a name to your model - Any name of your model
2. Model Weights - Weights of the model (shards)
3. Model Algorithm - Model.js
4. Select image(s) to test - Images on which models will be tested
5. Choose the model from dropdown
6. Run prediction - Run the prediction on the model with the data
