$(function() { 
/*if($.trim($("#fancytext").val())!='') { 
generateFancy($("#fancytext").val());
} else {
generateFancy("Preview Text");
}*/
$(document).ready(function() {
    var $fancyText = $(".fancytext");
    
    $fancyText.on("input", function() {
        console.log('test');
        $fancyText.val($(this).val());
        
        if ($.trim($(this).val()) !== '') {
            generateFancy($(this).val());
        } else {
            generateFancy("Preview Text");
        }
    });
    
    // Trigger the "input" event for the default value
    $fancyText.trigger("input");
});


$(".fancytext").on("input", function() {
    console.log('test');
    $(".fancytext").val($(this).val());
    
    if ($.trim($(this).val()) !== '') {
        generateFancy($(this).val());
    } else {
        generateFancy("Preview Text");
    }
});

var ct = 89;
function generateFancy(txt) {
var fancyText = '';
 var result = forward(txt);
     var finalRes =  result.split('\n\n');
     var sn=1;
    $.each(finalRes,function(inx, vl) { 
        $("#copy_"+inx).val(vl);
        
     // fancyText  +=  '<div class="input-group mb-2 flex justify-center items-center"><input type="text" class="input input-bordered w-full  text-'+sn+'" value="'+vl+'" id="copy_'+inx+'" readonly="readonly"><div class="input-group-append"><span class="btn btn-primary input-group-text copybutton" style="cursor:pointer;" data-clipboard-action="copy" data-clipboard-target="#copy_'+inx+'">Copy</span></div></div>';
      sn++;
    });
    
    
    for(k=89; k<=ct; k++) {
        //console.log(k);
        $("#copy_"+k).val(crazyWithFlourishOrSymbols(txt));
    }
       //$("#result").html(fancyText); 
}

$(".loadmore").click(function(){
$(this).html('Loading...');
var text = $.trim($(".fancytext").val());
if(text=='') {
 text = 'Preview Text';
} 
var that = $(this);
var intvl = setInterval(function(){  that.html('Load More');clearInterval(intvl); }, 1000);
for(var i=1;i<=10;i++){
  fancyText  =  '<div class="input-group mb-2 flex justify-center items-center"><input type="text" class="form-control input input-bordered w-full my-1" value="'+crazyWithFlourishOrSymbols(text)+'" id="copy_'+ct+'" readonly="readonly"><div class="input-group-append -m-1"><span class="btn bg-primary text-white input-group-text copybutton" style="cursor:pointer;" data-clipboard-action="copy" data-clipboard-target="#copy_'+ct+'">Copy</span></div></div>';
  ct++;
$("#result").append(fancyText);
}
});

});

$(function(){
    var intv = setInterval(function(){ $(".copybutton").html('Copy'); }, 2000);
    $("body").on('click', ".copybutton", function() { 
        $(".copybutton").html('Copy');
        $(this).html('Copied'); 
        clearInterval(intv);
    });
});

var clipboard = new ClipboardJS('.copybutton');
clipboard.on('success', function(e) {
    //console.log(e);
});
clipboard.on('error', function(e) {
    //console.log(e);
});
