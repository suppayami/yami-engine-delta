// replace PluginManager.loadScript

PluginManager.loadScript = function(name) {
    var url = this._path + name;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false; // added
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
};
