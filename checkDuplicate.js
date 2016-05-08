var toolset = (function () {
    var mapTV = {}, mapVideo = {}, mapCell = {};
    var maps = [mapTV, mapVideo, mapCell];
    var types = ['tv/', 'videos/', 'celebrities/'];
    var idIndex = [3, 7, 12];

    var result = function () {
        var links = document.getElementsByTagName('a');
        var domain = 'http://www.viki.com/';
        var domainLength = domain.length;
        var length = links.length;
        for (i = 0; i < length; i++) {
            var hrefVal = links[i].href;
            var index = hrefVal.indexOf(domain);
            if (index == 0) {
                for (j = 0; j < 3; j++) {
                    index = hrefVal.indexOf(types[j], domainLength);
                    if (index == domainLength &&                                            // Check if the link is a content link
                        !tryAddUnique(hrefVal.substring(domainLength + idIndex[j]), maps[j])) { // Check if it is a duplicated content id
                        return true;
                    }
                }
            }
        }
        return false;
    };

    function tryAddUnique(str, map) {
        if (map[str])
            return false;
        map[str] = true;
        return true;
    };

    return {
        hasDuplicatedContent: result
    }
})();