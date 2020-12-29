$(document).ready(function(){
    var initMap = function(){
        var mapTable = $("#map");
        for(var i=0; i<20; i++){
            mapTable.append("<tr id=mapRow"+i+"></tr>");
            var tmp = $("#mapRow"+i);
            for(var j=0; j<22; j++){
                if(i==0){
                    if(j==0){
                        $(tmp).append("<td id='"+i+'_'+j+"' class='unionBlock' style='border:1px solid gray;'></td>");
                    }
                    else{
                        $(tmp).append("<td id='"+i+'_'+j+"' class='unionBlock' style='border-top:1px solid gray;border-bottom:1px solid gray;border-right:1px solid gray;'></td>");
                    }
                }
                else{
                    if(j==0){
                        $(tmp).append("<td id='"+i+'_'+j+"' class='unionBlock' style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;'></td>");
                    }
                    else{
                        $(tmp).append("<td id='"+i+'_'+j+"' class='unionBlock' style='border-bottom:1px solid gray;border-right:1px solid gray;'></td>");
                    }
                    
                }
                
            }
        }
        for(var i=0; i<22; i++){
            $("#0_"+i).css('border-top','2px solid rgb(100,100,100)');
            $("#"+i+"_0").css('border-left','2px solid rgb(100,100,100)');
            $("#"+i+"_21").css('border-right','2px solid rgb(100,100,100)');
            $("#19_"+i).css('border-bottom','2px solid rgb(100,100,100)');
            $("#"+i+"_10").css('border-right','2px solid rgb(100,100,100)');
            $("#9_"+i).css('border-bottom','2px solid rgb(100,100,100)');
            if(i<10){
                $("#"+i+"_"+(i+1)).css('border-bottom','2px solid rgb(100,100,100)');
                $("#"+i+"_"+(i)).css('border-right','2px solid rgb(100,100,100)');
                $("#"+i+"_"+(21-(i+1))).css('border-bottom','2px solid rgb(100,100,100)');
                $("#"+i+"_"+(21-(i+1))).css('border-right','2px solid rgb(100,100,100)');
            }
            else{
                $("#"+i+"_"+(i+2)).css('border-bottom','2px solid rgb(100,100,100)');
                $("#"+i+"_"+(i+1)).css('border-right','2px solid rgb(100,100,100)');
                $("#"+i+"_"+(21-(i+2))).css('border-bottom','2px solid rgb(100,100,100)');
                $("#"+i+"_"+(21-(i+2))).css('border-right','2px solid rgb(100,100,100)');
            }
            if(i>5 && i<17){
                $("#4_"+i).css('border-bottom','2px solid rgb(100,100,100)');
                $("#14_"+i).css('border-bottom','2px solid rgb(100,100,100)');
            }
            if(i>4 && i<15){
                $("#"+i+"_4").css('border-right','2px solid rgb(100,100,100)');
                $("#"+i+"_16").css('border-right','2px solid rgb(100,100,100)');
            }
            
        }
    }
    initMap();

    const maps = Array.from(Array(20), () => Array(22).fill(false));
    var mouseStatus = 0; // 0:non 1:add 2:delete
    $('.unionBlock').mousedown(function(){
        var id = $(this).attr('id').split('_');
        var r = id[0];
        var c = id[1];
        if(maps[r][c]==false) mouseStatus = 1;
        else mouseStatus = 2;
        if(mouseStatus==1){
            maps[r][c]=true;
            $(this).css('background-color','rgb(150,150,150)');
        }
        if(mouseStatus==2){
            maps[r][c]=false;
            $(this).css('background-color','rgb(235,235,235)');
        }
    });
    $('*').mouseup(function(){
        mouseStatus = 0;
    });
    $('.unionBlock').mouseover(function(){
        if(mouseStatus!=0){
            var id = $(this).attr('id').split('_');
            var r = id[0];
            var c = id[1];
            if(mouseStatus==1){
                maps[r][c]=true;
                $(this).css('background-color','rgb(150,150,150)');
            }
            if(mouseStatus==2){
                maps[r][c]=false;
                $(this).css('background-color','rgb(235,235,235)');
            }
        }
    })
});