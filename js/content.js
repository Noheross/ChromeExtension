chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{

    console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    var url = request.url;
    //var url = 'https://kns.cnki.net/kns/detail/detail.aspx?QueryID=0&CurRec=1&recid=&FileName=SKYK20200303000&DbName=CAPJDAY&DbCode=CJFQ&yx=Y&pr=&URLID=11.2360.TE.20200303.1601.002&bsm=';
    url = url.replace('https://kns.cnki.net',"");//ps.传过来的url要删掉https开头
    console.log("get url:"+url);
    var table = document.evaluate('//*[@id="ctl00"]/table/tbody/tr[2]/td/table', document).iterateNext(); //table元素
    var titleList = table.getElementsByClassName("fz14"); //用来存放每一行文献元素
    var item ;
    console.log(titleList);
    for(var index in titleList)
    {
      item = titleList[index];
      console.log("item:",item);
      if(item.getAttribute("href")== url) //判断哪个元素的链接网站和点击的是一样的 
      {
          var name = item.innerText.replace('<font class="Mark">',"").replace('</font>',"") //有些关键字会用<font>包起来
          var autorList = documtableent.getElementsByClassName("author_flag")[index];
          var autor = autorList.innerText;
          console.log(name,autor);
          break;
      }
    }
    sendResponse('我收到了你的消息！');
});