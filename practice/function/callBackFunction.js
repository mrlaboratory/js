var arr = [1,2,3,4,5]
function forEach(arrName,cb){
    for(var i=0;i<arrName.length;i++){
     cb(arrName[i]);
    }

}
var sum=0;
function map(arrName,cb){
    var nArr =[]
    for(var i=0;i<arrName.length;i++){
      var  temp =cb(arrName[i],i,arrName)
      nArr[i]=temp;
      
       }
       return nArr
}

var qb = map(arr,function(value){
    return value*value*value;
});
var sqr = map(arr,function(value){
    return value*value;
});

var mten = map(arr,function(value){
    return value*10;
});


console.log(arr,qb,sqr,mten);