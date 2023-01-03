import { MeiliSearch } from 'meilisearch'
import Data from '../schemas/Data.js'
const client = new MeiliSearch({
    host: "http://192.168.0.192:7700/"
})
const index = client.index("data");


export default async function syncMeilisearch(){
    // Get all documents in Melisearch
    var response = await index.search('',{limit : 10000000})
    var allM = response.hits
    var meiliList = []
    for(var i =0;i<allM.length;i++){
        meiliList.push(allM[i].id)
    }
    var allMongo = await Data.find()

    var notSynced = []
    for(var i =0;i<allMongo.length;i++){
        var thisData = allMongo[i]

       if(!meiliList.includes(thisData.id)){
            notSynced.push(thisData)

       }
    }

    await index.addDocuments(notSynced)
}