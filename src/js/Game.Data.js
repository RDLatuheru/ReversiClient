

Game.Data = (function (){
    /**
     * Responsible for communicating with the Reversi server
     */

    const configMap = {
        apiKey: 'http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=6d89f197d2b20f70807f087de3c4012f',
        mock: [
            {
                url: 'api/Spel/Beurt',
                data: 0
            }
        ]
    };

    let stateMap = {
        environment: "development"
    }

    function getMockData(url){
        const mockData = configMap.mock.find(x => x.url === url).data;

        return new Promise((resolve, reject) => {
            if (mockData !== null){
                resolve(mockData);
            }else{
                reject(new Error("Mockdata niet gevonden!"));
            }
        });
    }

    const get = function(url){
        if (stateMap.environment === "development") {
            return getMockData('api/Spel/Beurt');
        }

        if (stateMap.environment === "production") {
            return $.get(url)
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
    }

    const init = function (environment){
        console.log("Data init")
        stateMap.environment = environment;
        if (environment !== 'production' || environment !== 'development') throw new Error("Environment niet gelijk aan 'production' of 'development'");
        if (environment === 'production') {
            //request aan server
        }
        if (environment === 'development'){
            return getMockData('api/Spel/Beurt');
        }
    }

    return {
        init,
        get
    }
})()