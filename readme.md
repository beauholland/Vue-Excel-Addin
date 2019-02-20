## Excel Add-in

1. `NPM install` \client\vue-excel\
2. Setup sideload folder share for testing i.e. \client\vue-excel\Graph API\ and configure Excel to trust share folder and insert addin
https://docs.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins
3. \client\vue-excel\ run `npm run install`
4. Spin up all the dependant APIs, Graph from the root \GraphAPIExample\ folder `npm run start`
5. Spin up the Excel addin web server from the \client\vue-excel\ folder `npm run start`
6. Browse to http://localhost:3000 and confirm the web app runs
7. Open Excel and click on the addin toolbar button "Graph Demo"

Other... Trust local HTTPS SSL certificate
https://github.com/OfficeDev/generator-office/blob/fd600bbe00747e64aa5efb9846295a3f66d428aa/src/docs/ssl.md#add-certification-file-through-ie

npm install -g vue-cli
npm install -g yo generator-office

https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/excel-quickstart-vue 

Sideload steps:
https://docs.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins