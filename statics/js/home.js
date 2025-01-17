
String.prototype.replaceAll  = function(s1,s2){ return this.replace(new RegExp(s1,"gm"),s2); }
String.prototype.trim=function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}

var MAC={
    'Url': document.URL,
    'Title': document.title,
    'UserAgent' : function(){
        var ua = navigator.userAgent;//navigator.appVersion
        return {
            'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
            'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            'iPad': ua.indexOf('iPad') > -1, //是否iPad
            'trident': ua.indexOf('Trident') > -1, //IE内核
            'presto': ua.indexOf('Presto') > -1, //opera内核
            'webKit': ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
            'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",
        };
    }(),
    'Copy': function(s){
        if (window.clipboardData){ window.clipboardData.setData("Text",s); }
        else{
            if( $("#mac_flash_copy").get(0) ==undefined ){ $('<div id="mac_flash_copy"></div>'); } else {$('#mac_flash_copy').html(''); }
            $('#mac_flash_copy').html('<embed src='+maccms.path+'"images/_clipboard.swf" FlashVars="clipboard='+escape(s)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
        }
        MAC.Pop.Msg(100,20,'复制成功',1000);
    },
    'Home': function(o,u){
        try{
            o.style.behavior='url(#default#homepage)'; o.setHomePage(u);
        }
        catch(e){
            if(window.netscape){
                try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
                catch(e){ MAC.Pop.Msg(150,40,'此操作被浏览器拒绝！请手动设置',1000); }
                var moz = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                moz.setCharPref('browser.startup.homepage',u);
            }
        }
    },
    'Fav': function(u,s){
        try{ window.external.addFavorite(u, s);}
        catch (e){
            try{window.sidebar.addPanel(s, u, "");}catch (e){ MAC.Pop.Msg(150,40,'加入收藏出错，请使用键盘Ctrl+D进行添加',1000); }
        }
    },
    'Open': function(u,w,h){
        window.open(u,'macopen1','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0,resizable=yes,width='+w+',height='+h+'');
    },
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
    'GoBack':function(){
        var ldghost=document.domain;
        if(document.referrer.indexOf(ldghost)>0) {
            history.back();
        }
        else{
            window.location ="//"+ldghost;
        }
    },
    'Adaptive':function(){
        if(maccms.mob_status=='1' && maccms.url != maccms.wapurl){
            if(document.domain ==maccms.url && MAC.UserAgent.mobile){
                    location.href = location.href.replace(maccms.url,maccms.wapurl);
            }
            else if(document.domain ==maccms.wapurl && !MAC.UserAgent.mobile){
                location.href = location.href.replace(maccms.wapurl,maccms.url);
            }
        }
    },
    'CheckBox':{
        'All':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = true;
            });
        },
        'Other':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = !this.checked;
            });
        },
        'Count':function(n){
            var res=0;
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res++; }
            });
            return res;
        },
        'Ids':function(n){
            var res=[];
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res.push(this.value); }
            });
            return res.join(",");
        }
    },
    'Ajax':function(url,type,dataType,data,sfun,efun,cfun){
        type=type||'get';
        dataType=dataType||'json';
        data=data||'';
        efun=efun||'';
        cfun=cfun||'';

        $.ajax({
            url:url,
            type:type,
            dataType:dataType,
            data:data,
            timeout: 5000,
            beforeSend:function(XHR){

            },
            error:function(XHR,textStatus,errorThrown){
                if(efun) efun(XHR,textStatus,errorThrown);
            },
            success:function(data){
                sfun(data);
            },
            complete:function(XHR, TS){
                if(cfun) cfun(XHR, TS);
            }
        })
    },
    'Qrcode':{
        'Init':function(){
            $('.mac_qrcode').attr('src','' + MAC.Url);
        }
    },
    'Shorten': {
        'Init':function(){
            if($('.mac_shorten').length==0){
                return;
            }
            MAC.Shorten.Get();
        },
        'Get':function(url,call){
            url=url||location.href;
            MAC.Ajax('//'+ encodeURIComponent(url),'get','jsonp','',function(r){
                if (r.code == 1) {
                    if($('.mac_shorten').length>0) {
                        $('.mac_shorten').val(r.data.url_short);
                        $('.mac_shorten').html(r.data.url_short);
                    }
                    if(call){
                        call(r);
                    }

                }
            });
        }
    },
    'Image':{
        'Lazyload':{
            'Show': function(){
                try { $("img.lazy").lazyload(); }catch(e){};
            },
            'Box': function($id){
                $("img.lazy").lazyload({
                    container: $("#"+$id)
                });
            }
        }
    },

    'PageGo':{
        'Init':function() {
            $('.mac_page_go').click(function () {
                var that =$(this);
                var url = that.attr('data-url');
                var total = parseInt(that.attr('data-total'));
                var sp = that.attr('data-sp');
                var page= parseInt($('#page').val());

                if(page>0&&(page<=total)){
                    url=url.replace(sp + 'PAGELINK',sp + page).replace('PAGELINK',page);
                    location.href=url;
                }
                return false;
            });
        }
    },

    'Score': {
        'Init':function(){
            if($('.mac_score').length==0){
                return;
            }
            $('body').on('click', '.score_btn', function(e){
                MAC.Score.Submit();
            });

            MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+ $('.mac_score').attr('data-mid') +'&id=' +$('.mac_score').attr('data-id'),'post','json','',function(r){
                MAC.Score.View(r);
            },function(){
                $(".mac_score").html('评分加载失败');
            });

        },
        'Submit':function(){
            var $s = $('.mac_score').find("input[name='score']").val();
            MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+$('.mac_score').attr('data-mid')+'&id='+$('.mac_score').attr('data-id') + '&score='+ $s,'get','json','',function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code==1){
                    MAC.Score.View(r);
                }
            });
        },
        'View':function(r){
            $(".rating"+Math.floor(r.data.score)).attr('checked',true);
            $(".score_num").text(r.data.score_num);
            $(".score_all").text(r.data.score_all);
            $(".score_pjf").text(r.data.score);
        }
    },
    'Star': {
        'Init':function(){
            if($('.mac_star').length==0){
                return;
            }

            $('.mac_star').raty({
                starType: 'i',
                number: 5,
                numberMax : 5,
                half: true,
                score : function(){
                    return $(this).attr('data-score');
                },
                click: function(score, evt) {

                    MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+$('.mac_star').attr('data-mid')+'&id='+$('.mac_star').attr('data-id')+'&score='+(score*2),'get','json','',function(r){
                        if(json.status == 1){
                            $('.star_tips').html(r.data.score);
                        }else{
                            $('.star_box').attr('title', r.msg);
                        }
                    },function(){
                        $('.star_box').attr('title', '网络异常！');
                    });

                }
            });
        }
    },
    'Digg': {
        'Init':function(){
            $('body').on('click', '.digg_link', function(e){
                var $that = $(this);
                if($that.attr("data-id")){

                    MAC.Ajax(maccms.path + '/index.php/ajax/digg.html?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),'get','json','',function(r){
                        $that.addClass('disabled');
                        if(r.code == 1){
                            if($that.attr("data-type")=='up'){
                                $that.find('.digg_num').html(r.data.up);
                            }
                            else{
                                $that.find('.digg_num').html(r.data.down);
                            }
                        }
                        else{
                            $that.attr('title', r.msg);
                        }
                    });

                }
            });
        }
    },
    'Gbook':{
        'Login':0,
        'Verify':0,
        'Init':function(){
            $('body').on('keyup', '.gbook_content', function(e){
                MAC.Remaining($(this),200,'.gbook_remaining')
            });
            $('body').on('focus', '.gbook_content', function(e){
                if(MAC.Gbook.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });
            $('body').on('click', '.gbook_submit', function(e){
                MAC.Gbook.Submit();
            });
        },
        'Show':function($page){
            MAC.Ajax(maccms.path+'/index.php/gbook/index?page='+$page,'post','json','',function(r){
                $(".mac_gbook_box").html(r);
            },function(){
                $(".mac_gbook_box").html('留言加载失败，请刷新...');
            });
        },
        'Submit':function(){
            if($(".gbook_content").val() == ''){
                MAC.Pop.Msg(100,20,'请输入您的留言!',1000);
                return false;
            }
            MAC.Ajax(maccms.path + '/index.php/gbook/saveData','post','json',$('.gbook_form').serialize(),function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    location.reload();
                }
                else{
                    if(MAC.Gbook.Verify==1){
                        MAC.Verify.Refresh();
                    }
                }
            });
        },
        'Report':function(name,id){
            MAC.Pop.Show(400,300,'数据报错',maccms.path+'/index.php/gbook/report.html?id='+id+'&name='+ encodeURIComponent(name),function(r){

            });
        }
    },
    'Search':{
        'Init':function(){
            $('.mac_search').click(function(){
                var that=$(this);
                var url = that.attr('data-href') ? that.attr('data-href') : maccms.path + '/index.php/vod/search.html';
                location.href = url + '?wd='+ encodeURIComponent($("#wd").val());
            });
        },
        'Submit':function(){

            return false;
        }
    },
    'Suggest':{
        'Init':function($obj,$mid,$jumpurl){
            try {
                $($obj).autocomplete(maccms.path + '/index.php/ajax/suggest?mid=' + $mid, {
                    inputClass: "mac_input",
                    resultsClass: "mac_results",
                    loadingClass: "mac_loading",
                    width: 175, scrollHeight: 300, minChars: 1, matchSubset: 0,
                    cacheLength: 10, multiple: false, matchContains: true, autoFill: false,
                    dataType: "json",
                    parse: function (r) {
                        if (r.code == 1) {
                            var parsed = [];
                            $.each(r['list'], function (index, row) {
                                row.url = r.url;
                                parsed[index] = {
                                    data: row
                                };
                            });
                            return parsed;
                        } else {
                            return {data: ''};
                        }
                    },
                    formatItem: function (row, i, max) {
                        return row.name;
                    },
                    formatResult: function (row, i, max) {
                        return row.text;
                    }
                }).result(function (event, data, formatted) {
                    $($obj).val(data.name);
                    location.href = data.url.replace('mac_wd', encodeURIComponent(data.name));
                });
            }
            catch(e){}
        }
    },
    'History': {
        'BoxShow':0,
        'Limit':10,
        'Days':7,
        'Json':'',
        'Init':function(){
            if($('.mac_history').length ==0){
                return;
            }

            $('.mac_history').hover(function(e){
                $('.mac_history_box').show();
            }, function(){
                $('.mac_history_box').hover(function(){
                    MAC.History.BoxShow=1;
                }, function(){
                    MAC.History.BoxShow=0;
                    $('.mac_history_box').hide();
                });
            });

            var jsondata = [];
            if(this.Json){
                jsondata = this.Json;
            }else{
                var jsonstr = MAC.Cookie.Get('mac_history');
                if(jsonstr != undefined){
                    jsondata = eval(jsonstr);
                }
            }

            html = '<dl class="mac_drop_box mac_history_box" style="display:none;">';
            html +='<dt><a target="_self" href="javascript:void(0)" onclick="MAC.History.Clear();">清空</a></dt>';

            if(jsondata.length > 0){
                for($i=0; $i<jsondata.length; $i++){
                    if($i%2==1){
                        html +='<dd class="odd">';
                    }else{
                        html +='<dd class="even">';
                    }
                    html +='<a href="'+jsondata[$i].link+'" class="hx_title">'+jsondata[$i].name+'</a></dd>';
                }
            }else{
                html +='<dd class="hide">暂无浏览记录</dd>';
            }
            html += '</dl>';

            $('.mac_history').after(html);
            var h = $('.mac_history').height();
            var position = $('.mac_history').position();
            $('.mac_history_box').css({'left':position.left,'top':(position.top+h)});


            if($(".mac_history_set").attr('data-name')){
                var $that = $(".mac_history_set");
                MAC.History.Set($that.attr('data-name'),$that.attr('data-link'),$that.attr('data-pic'));
            }
        },
        'Set':function(name,link,pic){
            if(!link){ link = document.URL; }
            var jsondata = MAC.Cookie.Get('mac_history');

            if(jsondata != undefined){
                this.Json = eval(jsondata);

                for($i=0;$i<this.Json.length;$i++){
                    if(this.Json[$i].link == link){
                        return false;
                    }
                }

                jsonstr = '{log:[{"name":"'+name+'","link":"'+link+'","pic":"'+pic+'"},';
                for($i=0; $i<this.Json.length; $i++){
                    if($i<= this.Limit && this.Json[$i]){
                        jsonstr += '{"name":"'+this.Json[$i].name+'","link":"'+this.Json[$i].link+'","pic":"'+this.Json[$i].pic+'"},';
                    }else{
                        break;
                    }
                }
                jsonstr = jsonstr.substring(0,jsonstr.lastIndexOf(','));
                jsonstr += "]}";
            }else{
                jsonstr = '{log:[{"name":"'+name+'","link":"'+link+'","pic":"'+pic+'"}]}';
            }
            this.Json = eval(jsonstr);
            MAC.Cookie.Set('mac_history',jsonstr,this.Days);
        },
        'Clear': function(){
            MAC.Cookie.Del('mac_history');
            $('.mac_history_box').html('<li class="hx_clear">已清空观看记录。</li>');
        },
    },
    'Pop':{
        'Remove':function(){
            $('.mac_pop_bg').remove();
            $('.mac_pop').remove();
        },
        'RemoveMsg':function(){
            $('.mac_pop_msg_bg').remove();
            $('.mac_pop_msg').remove();
        },
        'Msg':function($w,$h,$msg,$timeout){
            if($('.mac_pop_bg').length !=1) {
                MAC.Pop.Remove();
            }
            $('body').append('<div class="mac_pop_msg_bg"></div><div class="mac_pop_msg"><div class="pop-msg"></div></div>');
            $('.mac_pop_msg .pop_close').click(function(){
                $('.mac_pop_msg').remove();
            });

            $('.mac_pop_msg').width($w);
            $('.mac_pop_msg').height($h);
            $('.mac_pop_msg .pop-msg').html($msg);
            $('.mac_pop_msg_bg,.mac_pop_msg').show();
            setTimeout(MAC.Pop.RemoveMsg,$timeout);
        },
        'Show':function($w,$h,$title,$url,$callback) {
            if($('.mac_pop_bg').length !=1) {
                MAC.Pop.Remove();
            }

            $('body').append('<div class="mac_pop_bg"></div><div class="mac_pop"><div class="pop_top"><h2></h2><span class="pop_close">Ｘ</span></div><div class="pop_content"></div></div>');
            $('.mac_pop .pop_close').click(function(){
                $('.mac_pop_bg,.mac_pop').remove();
            });

            $('.mac_pop').width($w);
            $('.mac_pop').height($h);
            $('.pop_content').html('');
            $('.pop_top').find('h2').html($title);

            MAC.Ajax($url,'post','json','',function(r){
                $(".pop_content").html(r);
                $callback(r);
            },function(){
                $(".pop_content").html('加载失败，请刷新...');
            });

            $('.mac_pop_bg,.mac_pop').show();
        }
    },

    'AdsWrap':function(w,h,n){
        document.writeln('<img width="'+w+'" height="'+h+'" alt="'+n+'" style="background-color: #CCCCCC" />');
    },
    'Css':function($url){
        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: $url}).appendTo("head");
    },
    'Js':function($url){
        $.getScript($url, function(response, status) {

        });
    },
    'Desktop':function(s){
        location.href= maccms.path + '/index.php/ajax/desktop?name='+encodeURI(s)+'&url=' + encodeURI(location.href);
    },
    'Timming':function(){
        if($('.mac_timming').length==0){
            return;
        }
        var infile = $('.mac_timming').attr("data-file");
        if(infile==undefined || infile == ''){
            infile = 'api.php';
        }
        var t=(new Image());t.src=maccms.path + '/'+infile+'/timming/index?t='+Math.random();
    },
    'Error':function(tab,id,name){

    },
    'AddEm':function(obj,i){
        var oldtext = $(obj).val();
        $(obj).val( oldtext + '[em:' + i +']' );
    },
    'Remaining':function(obj,len,show){
        var count = len - $(obj).val().length;
        if(count < 0){
            count = 0;
            $(obj).val($(obj).val().substr(0,200));
        }
        $(show).text(count);
    },

}

$(function(){
    //异步加载图片初始化
    MAC.Image.Lazyload.Show();
    //自动跳转手机和pc网页地址
    MAC.Adaptive();
    //分页跳转初始化
    MAC.PageGo.Init();
    //二维码初始化
    MAC.Qrcode.Init();
    //顶和踩初始化
    MAC.Digg.Init();
    //评分初始化
    MAC.Score.Init();
    //星星评分初始化
    MAC.Star.Init();
    //点击数量
    MAC.Hits.Init();
    //历史记录初始化
    MAC.History.Init();
    //定时任务初始化
    MAC.Timming();
});
