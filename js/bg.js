function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}
chrome.contextMenus.create({
        type: "normal",
        title: 'contextMenus', 
        contexts: ['link'], // 只有当选中链接时才会出现此右键菜单
        id: "menu",
        onclick: function(info,tab)
        {		
                //alert(info.linkUrl);
                sendMessageToContentScript({url:info.linkUrl}, function(response)
                {
                console.log('来自content的回复：'+response);
                });
                
        }
});
