# Instruction to launch:

# 1.Run a ravendb server

    download ravendb https://daily-builds.s3.amazonaws.com/RavenDB-4.0.6-windows-x64.zip
    extract the ravendb folder in the project directory
    cd ravendb/Server
    ./Raven.Server.exe
    go to http://127.0.0.1:8080 and create the local database = "db_parking" and make sure to set up port to 8080 when configuring ravendb.

# 2.Run the node server (backend)

    cd parking/server
    yarn install
    yarn start

# 3.Run the react client (frontend)

    cd parking/client
    yarn install
    yarn start
