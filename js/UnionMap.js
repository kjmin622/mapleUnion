var MAXCHARACTER = 46;


var unionlank = "nobice";
var unionlevel = 1;
var maxChar = 0;
const maps = Array.from(Array(20), () => Array(22).fill(false));
const result = Array.from(Array(20), () => Array(22).fill(null));
const sectionArr = Array.from(Array(20), () => Array(22).fill(null));
var hands = 1;

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
        if(maps[r][c]==null) return;
        if(maps[r][c]==false) mouseStatus = 1;
        else if(maps[r][c]==true) mouseStatus = 2;
        if(mouseStatus==1){
            maps[r][c]=true;
            $(this).css('background-color','rgb(150,150,150)');
        }
        if(mouseStatus==2){
            maps[r][c]=false;
            $(this).css('background-color','rgb(245,245,245)');
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
            if(maps[r][c]==null) return;
            if(mouseStatus==1){
                maps[r][c]=true;
                $(this).css('background-color','rgb(150,150,150)');
            }
            if(mouseStatus==2){
                maps[r][c]=false;
                $(this).css('background-color','rgb(245,245,245)');
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
                if(maps[r][c]==null) return;
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
                                $("#"+i+"_"+j).css('background-color','rgb(245,245,245)');
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

    $('.resetbtn').click(function(){
        for(var i=0; i<20; i++){
            for(var j=0; j<22; j++){
                if(maps[i][j]==null) continue;
                maps[i][j]=false;
                $("#"+i+"_"+j).css('background-color','rgb(245,245,245)');
            }
        }
    });

    var locksection = function(lank){ // 0,1,2,3,4,5
        for(var i=0; i<20; i++){
            for(var j=0; j<22; j++){
                maps[i][j]=false;
                $("#"+i+"_"+j).css('background-color','rgb(245,245,245)');
            }
        }
        for(var i=0; i<22; i++){
            for(var j=4; j>=0; j--){
                if(lank<=j){
                    if(i<20){
                        maps[i][0+(4-j)]=null;
                        maps[i][21-(4-j)]=null;
                        $("#"+i+"_"+(0+(4-j))).css('background-color','rgb(90,90,90)');
                        $("#"+i+"_"+(21-(4-j))).css('background-color','rgb(90,90,90)');
                    }
                    maps[0+(4-j)][i]=null;
                    maps[19-(4-j)][i]=null;
                    $("#"+(0+(4-j))+"_"+i).css('background-color','rgb(90,90,90)');
                    $("#"+(19-(4-j))+"_"+i).css('background-color','rgb(90,90,90)');
                }
            }
        }
    }
    var setUnion = function(aflank,aflevel){
        $("img[name="+unionlank+"]").css('opacity','0.6');
        $("div[name=level"+unionlevel+"]").css('color','gray');
        unionlank = aflank;
        unionlevel = aflevel;
        $("img[name="+unionlank+"]").css('opacity','1');
        $("div[name=level"+unionlevel+"]").css('color','black');
        var str;
        var tlevel=0;
        if(aflank=="nobice") {str="노비스 유니온 ";maxChar=9;}
        if(aflank=="veteran"){str="베테랑 유니온 ";tlevel=2500;maxChar=18;}
        if(aflank=="master"){str="마스터 유니온 ";tlevel=5000;maxChar=27;}
        if(aflank=="grand"){str="그랜드 유니온 ";tlevel=7500;maxChar=36;}
        if(aflevel==1) str+="I";
        if(aflevel==2) str+="II";
        if(aflevel==3) str+="III";
        if(aflevel==4) str+="IV";
        if(aflevel==5) str+="V";
        tlevel += aflevel*500;
        maxChar += (aflevel-1);
        $('.lankname>p').text(str);
        var flank = 0;
        if(tlevel < 2000) flank=0;
        else if(tlevel < 3000) flank=1;
        else if(tlevel < 4000) flank=2;
        else if(tlevel < 5000) flank=3;
        else if(tlevel < 6000) flank=4;
        else flank=5;
        locksection(flank);
    }
    setUnion("master",2);
    $(".unionicon").click(function(){
        setUnion($(this).attr('name'),unionlevel);
    });
    $(".levelbtn").click(function(){
        setUnion(unionlank,$(this).attr('name').substring(5));
    });



    var totalnumber = function(){
        var allinput = $("input[name=charcount]");
        var tnum = 0;
        $.each(allinput,function(index,value){
            tnum+=$(value).val()*1;
        });
        return tnum;
    }

    var totalnecessary = function(){
        var allinput = $('input[name=necessary]');
        var tnum = 0;
        $.each(allinput,function(index,value){
            tnum+=$(value).val()*1;
        });
        return tnum;
    }

    $(".char>div>input").on("propertychange change keyup paste input",function(){
        var inputvalue = $(this).val();
        if(isNaN(inputvalue) || inputvalue<0){
            alert("0 이상의 숫자를 입력해주세요!");
            $(this).val('0');
        }
        if(totalnumber()>MAXCHARACTER){
            alert("최대 캐릭터 개수를 넘을 수 없습니다.");
            $(this).val('0');
        }
        if($(this).attr('name')=='necessary'){
            if($(this).val()*1 > $(this).parent().children('input[name=charcount]').val()*1){
                alert("필수 유니온의 개수는 캐릭터 개수를 넘을 수 없습니다.");
                $(this).val($(this).parent().children('input[name=charcount]').val());
            }
        }
        if(totalnecessary() > maxChar+hands){
            alert("필수 유니온의 개수는 현재 유니온에서 가능한 최대치를 넘을 수 없습니다.");
            $(this).val('0');
        }
    });

    $("input[name=hands]").on("propertychange change keyup paste input",function(){
        if($(this).is(":checked")) hands=1;
        else hands=0;
    });

    $(".cplusbtn").click(function(){
        if(totalnumber()+1>MAXCHARACTER+hands){
            alert("최대 캐릭터 개수를 넘을 수 없습니다.");
            return;
        }
        $(this).parent().children('input[name=charcount]').val($(this).parent().children('input[name=charcount]').val()*1+1);
    });
    $(".cminusbtn").click(function(){
        var valu = 1*$(this).parent().children('input[name=charcount]').val();
        if(valu>0) $(this).parent().children('input[name=charcount]').val(valu-1);
    });
});