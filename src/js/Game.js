const Game = (function(url){
    /**
     * contains the api url
     * @type {{apiUrl: string}}
     */
    let configMap = {
        apiUrl : url
    }

    let stateMap = {
        gameState : null
    }

    const init = function (callback){
        console.log(configMap.apiUrl);
        _getCurrentGameState();
        callback();
    }

    const _getCurrentGameState = function (){
        setInterval(function (){
            stateMap.gameState = Game.Model.getGameState();
        }, 2000)

        //For testing purposes
        /*setTimeout(function (){
            clearInterval(interval);
        }, 10000)*/
    }

    return {
        init
    }
})('/api/spel')

function afterInit() {
    console.log('Game init voltooid')
}