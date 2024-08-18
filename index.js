const fs = require('fs');

async function getServers() {
    const response = await fetch('https://master.iw4.zip/instance/');
    const servers = await response.json();
    return servers;
}

function filterServersByGame(serversList, game) {
    var validServers = [];
    serversList.forEach(servers => {
        servers.servers.forEach(server => {
            if(server.game === game) {
                validServers.push(server);
            }
        })
    });
    return validServers;
}

function finalizeData(serversList) {
    var finalData = [];
    serversList.forEach(server => {
        finalData.push(`${server.ip}:${server.port}`);
    });
    return finalData;
}

getServers().then(servers => {
    var data = finalizeData(filterServersByGame(servers, 'H2M'));
    //console.log(data);
    const serverListFile = fs.writeFileSync("favourites.json", JSON.stringify(data));
})