function ajax(method, path, data, query, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return;
    }
    var path = path + (query ? query : "");
    xhr.open(method, path, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    }
    method === 'get' ? xhr.send(null) : xhr.send(data);
}