// Testing and creating method to parse and or
// Should be recursive, although we should only allow like three layers?
//


var main = {
    filters : [
        {
            filters : [
                {field : "content", type : "Contains", value : "Minecraft"},
                {field : "sourceType", type : "Exactly Equals", value : "Shame Blog"},

            ],
            type : 1

        },
        {field : "sourceName", type : "Exactly Equals", value : "Lockbit"},


    ],
    type : 0 //0 = or, 1 = and

}



function toMongoQuery(filter){
    var searchObj = {}
    if(filter.type === 'Exactly Equals'){
        //If its source name
        filter.field == 'sourceName' ? searchObj['source.name'] =filter.value:         searchObj[filter.field] = filter.value

    }else{
        filter.field == 'sourceName' ? searchObj['source.name'] ={$regex : filter.value, $options : 'i'}:         searchObj[filter.field] = {$regex : filter.value, $options : 'i'}

    }
    return searchObj

}

function HandleFilterGroup(group){
    var searchObj = []

    for(var i=0;i<group.filters.length;i++){

        //Check if is is a group
        
        if(group.filters[i].filters){
            searchObj.push(HandleFilterGroup(group.filters[i]))
        }else{
            searchObj.push(toMongoQuery(group.filters[i]))
        }
    }
    var finalQuery 
    if(group.type === 0){
        finalQuery = {$or : searchObj}
    }else{
        finalQuery = {$and : searchObj}
    }

    return finalQuery

}
function ParseFilter(pre){
    
    console.info(JSON.stringify(HandleFilterGroup(pre)))

}

ParseFilter(main)