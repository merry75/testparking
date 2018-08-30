# Instruction to launch:

# 1.Run a ravendb server

    download ravendb https://daily-builds.s3.amazonaws.com/RavenDB-4.0.6-windows-x64.zip
    extract the Server folder in the project directory
    cd yourprojectdirectory/Server
    ./Raven.Server.exe
    go to http://127.0.0.1:port (port number is specified in the console) and make sure to set up port to 8080 when configuring ravendb
    follow the ravendb web installation and go to databases
    create the local database = "db_parking"

# 2.Run the node server (backend)

    cd yourprojectdirectory/backend
    yarn install
    yarn start

# 3.Run the react client (frontend)

    cd yourprojectdirectory/client
    yarn install
    yarn start
