var arr = [1,2,3,4,5,6,7,8,9,10]

function filter(arrName,cb){
    arr2=[]
for(var i=0;i<arrName.length;i++){
var bbn = cb(arrName[i])
if(bbn){
    arr2.push(arrName[i])
}

}

return arr2
}





var result = filter(arr,function(valu){
return  valu % 2 == 1
    })

console.log(result)

