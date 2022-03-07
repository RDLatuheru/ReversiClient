const Game = (function(url){
    /**
     * contains the api url
     * @type {{apiUrl: string}}
     */
    let configMap = {
        apiUrl : url
    }

    const init = function (callback){
        console.log(configMap.apiUrl);
        callback();
    }

    return {
        init
    }
})('/api/url')

function afterInit() {
    console.log('Game init voltooid')
}