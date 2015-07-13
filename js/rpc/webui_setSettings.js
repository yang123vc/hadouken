var config  = require("config");
var session = require("bittorrent").session; 

function set(key, value) {
    var settings = session.getSettings();

    switch(key) {
        case "bind_port":
            var port = parseInt(value, 10);
            if(isNaN(port) || port < 0 || port > 65535) {
                "Invalid port";
            }
            config.set("bittorrent.listenPort", port);
            session.listenOn([port, port]);
            break;

        case "dht":
            value = !!(value);
            config.set("bittorrent.dht.enabled", value);
            if(value) { session.startDht(); } else { session.stopDht(); }
            break;

        case "enable_bw_management":
            value = (!!(value) ? 1 : 0);
            config.set("bittorrent.mixedModeAlgorithm", value);
            settings.mixedModeAlgorithm = value;
            break;

        case "lsd":
            value = !!(value);
            config.set("bittorrent.lsd.enabled", value);
            if(value) { session.startLsd(); } else { session.stopLsd(); }
            break;

        case "max_dl_rate":
            var rate = parseInt(value, 10);
            if(!isNaN(rate)) {
                config.set("bittorrent.downloadRateLimit", rate);
                settings.downloadRateLimit = rate;
            }
            break;

        case "max_ul_rate":
            var rate = parseInt(value, 10);
            if(!isNaN(rate)) {
                config.set("bittorrent.uploadRateLimit", rate);
                settings.uploadRateLimit = rate;
            }
            break;

        case "net.calc_overhead":
            value = !!(value);
            config.set("bittorrent.rateLimitIpOverhead", value);
            settings.rateLimitIpOverhead = value;
            break;

        case "net.ratelimit_utp":
            value = !!(value);
            config.set("bittorrent.rateLimitUtp", value);
            settings.rateLimitUtp = value;
            break;

        case "natpmp":
            value = !!(value);
            config.set("bittorrent.natpmp.enabled", value);
            if(value) { session.startNatPmp(); } else { session.stopNatPmp(); }
            break;

        case "upnp":
            value = !!(value);
            config.set("bittorrent.upnp.enabled", value);
            if(value) { session.startUpnp(); } else { session.stopUpnp(); }
            break;

        case "webui.cookie":
            config.set("http.webui.cookie", value);
            break;
    }

    session.setSettings(settings);
}

exports.rpc = {
    name: "webui.setSettings",
    method: function(settings) {
        var keys = Object.keys(settings);

        for(var i = 0; i < keys.length; i++) {
            var key = keys[i];
            set(key, settings[key]);
        }
    }
};
