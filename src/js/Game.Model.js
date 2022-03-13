Game.Model = (function (){
    /**
     * Responsible for (user) data validation
     */

    let configMap;

    const _getGameState = async function(){

        //aanvraag via Game.Data
        let gameData;
        await Game.Data.get('/api/Spel/Beurt/token').then(r =>{
            gameData = r
            console.log(gameData);
        }).catch(e =>{
            console.log(e.message)
        });

        /**
         * Controle of ontvangen data valide is:
         *  0: geen specifieke waarde
         *  1: wit aan zet
         *  2: zwart aan zet
         */
        if (gameData > 2 || gameData < 0) throw new Error("gameData valt buiten de geldige waarde")
        if (gameData === 0){
            console.log("geen specifieke waarde")
            return "geen specifieke waarde";
        }else if (gameData === 1){
            console.log("wit aan zet")
            return "wit aan zet";
        }else if (gameData === 2){
            console.log("zwart aan zet")
            return "zwart aan zet";
        }
        console.log("end of _getGameState, returning null...")
        return null;
    }

    const init = function (){
        console.log("Model init")
    }

    return {
        init,
        getGameState: _getGameState
    }

    //Get weather exercise
    /*const getWeather = function () {
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=6d89f197d2b20f70807f087de3c4012f'
        Game.Data.get(url).then(function (data){
            return{
                data: data
            }
        }).then(function (result){
            let temp = result.data.main.temp.toString();
            if (temp === ""){
                throw new Error("Geen temperatuur aanwezig")
            }
            console.log(temp)
        }).catch(function (error){
            console.log(`Error: ${error.message}`)
        })
    }*/
})()