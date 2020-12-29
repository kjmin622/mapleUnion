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
    const sectionArr = Array.from(Array(20), () => Array(22).fill(null));
    for(var i=0; i<5; i++){
        for(var j=i; j<10; j++){
            sectionArr[j][i]="criticalDamage";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=10; j<15+(5-i); j++){
            sectionArr[j][i]="armerIgnore";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=10; j>=1+i; j--){
            sectionArr[i][j]="tolerance";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=11; j<21-i; j++){
            sectionArr[i][j]="exp";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=4-i; j<10; j++){
            sectionArr[j][17+i]="critical";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=10; j<16+i; j++){
            sectionArr[j][17+i]="bossDamage";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=5-i; j<11; j++){
            sectionArr[i+15][j]="buff";
        }
    }
    for(var i=0; i<5; i++){
        for(var j=11; j<17+i; j++){
            sectionArr[i+15][j]="stance";
        }
    }
    for(var i=5; i<10; i++){
        for(var j=5; j<=i; j++){
            sectionArr[i][j]="tmp1";
        }
    }
    for(var i=5; i<10; i++){
        for(var j=1+i; j<11; j++){
            sectionArr[i][j]="tmp2";
        }
    }
    for(var i=5; i<10; i++){
        for(var j=11; j<16+(5-i); j++){
            sectionArr[i][j]="tmp3";
        }
    }
    for(var i=5; i<10; i++){
        for(var j=16-(i-5); j<17; j++){
            sectionArr[i][j]="tmp4";
        }
    }
    for(var i=10; i<15; i++){
        for(var j=5; j<=5+(14-i); j++){
            sectionArr[i][j]="tmp5";
        }
    }
    for(var i=10; i<15; i++){
        for(var j=10-(i-10); j<11; j++){
            sectionArr[i][j]="tmp6";
        }
    }
    for(var i=10; i<15; i++){
        for(var j=11; j<12+(i-10); j++){
            sectionArr[i][j]="tmp7";
        }
    }
    for(var i=10; i<15; i++){
        for(var j=16-(14-i); j<17; j++){
            sectionArr[i][j]="tmp8";
        }
    }


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
        isClick=0;
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
    });
    $('.unionBlock').mousedown(function(){
        isClick = 1;
        var id = $(this).attr('id').split('_');
        timer = setTimeout(function(){
            if(isClick != 0){
                isClick = 0;
                var r = id[0];
                var c = id[1];
                var status = !maps[r][c];
                var section = sectionArr[r][c];
                for(var i=0; i<20; i++){
                    for(var j=0; j<22; j++){
                        if(section==sectionArr[i][j]){
                            if(!status){
                                maps[i][j]=true;
                                $("#"+i+"_"+j).css('background-color','rgb(150,150,150)');
                            }
                            else{
                                maps[i][j]=false;
                                $("#"+i+"_"+j).css('background-color','rgb(235,235,235)');
                            }
                        }
                    }
                }  
            }
        },500);
    }).on({
        mouseup:function(){
            isClick = 0;
        },
        mouseleave:function(){
            isClick = 0;
        }
    });

    $('.unionBlock').dblclick(function(e){
        var id = $(this).attr('id').split('_');
        var r = id[0];
        var c = id[1];
        var status = maps[r][c];
        var section = sectionArr[r][c];
        for(var i=0; i<20; i++){
            for(var j=0; j<22; j++){
                if(section==sectionArr[i][j]){
                    if(!status){
                        maps[i][j]=true;
                        $("#"+i+"_"+j).css('background-color','rgb(150,150,150)');
                    }
                    else{
                        maps[i][j]=false;
                        $("#"+i+"_"+j).css('background-color','rgb(235,235,235)');
                    }
                }
            }
        }  
        
    });
    $('.resetbtn').click(function(){
        for(var i=0; i<20; i++){
            for(var j=0; j<22; j++){
                maps[i][j]=false;
                $("#"+i+"_"+j).css('background-color','rgb(235,235,235)');
            }
        }
    });
});