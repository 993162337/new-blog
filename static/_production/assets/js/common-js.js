(function() {
    var aLink = document.getElementById("common-back");
    var link = 0;
    aLink.onclick = function() {
        history.back()
    }

    var content = document.getElementsByClassName("app-content__container")[0]
    content.onscroll = function(evt) {
        var aLink = document.getElementById("common-back");
        var position = content.scrollTop;

        if(!aLink) return

        if(position > 100) {
            aLink.className = "float";
            link = 1;
        }else {
            if(link) aLink.className = "static";
            else aLink = "";
        }
    }
})()