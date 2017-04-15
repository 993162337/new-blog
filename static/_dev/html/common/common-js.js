window.onload = function() {
    var aLink = document.getElementById("common-back");
    var link = 0;
    aLink.onclick = function() {
        history.back()
    }

    window.onscroll = function(evt) {
        var aLink = document.getElementById("common-back");
        var position = document.body.scrollTop;

        if(position > 100) {
            aLink.className = "float";
            link = 1;
        }else {
            if(link) aLink.className = "static";
            else aLink = "";
        }
    }
}