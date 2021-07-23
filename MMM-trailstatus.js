/* global Module */

/* Magic Mirror
 * Module: MMM-trailstatus
 *
 * By ckdake
 * MIT Licensed.
 */

Module.register("MMM-trailstatus", {
    defaults: {
        name: "Atlanta Trails",
        updateInterval: 600000,
        apiUrl: "https://mtbatlanta.com/wp-json/mtbatlanta-api/status",
    },

    requiresVersion: "2.1.0", 

    start: function() {
        var self = this;
        var trailData = null;
        var dataNotification = null;

        this.loaded = false;
        this.error = false;
        this.sendSocketNotification('CONFIG', this.config);
    },

    getDom: function() {
        var self = this; 

        var wrapper = document.createElement("div");
        if (!this.loaded) {
            wrapper.innerHTML = "Loading "+this.config.name+" Status ...";
            wrapper.className = "dimmed light small";
            return wrapper;
        }
        if (this.error) {
            wrapper.innerHTML = "Error loading data for " + this.config.name;
            return wrapper;
        }
        
        if (this.trailData) {
            for (var trail in this.trailData) {
                var icon;
                icon = document.createElement("i");
                icon.setAttribute("aria-hidden","true");
                icon.className = "fa fa-bicycle";
                
                var txt = document.createElement("span");

                if (this.trailData[trail] === "Open") {
                    icon.style.cssText="color:green; dimmed small";
                    txt.innerHTML = "&nbsp;" + trail + " - Open";
                } else {
                    icon.style.cssText="color:red;";
                    icon.className = "fa fa-ban";
                    txt.innerHTML = "&nbsp;" + trail + " - Closed";
                }
                wrapper.appendChild(icon);
                wrapper.appendChild(txt);
                wrapper.appendChild(document.createElement("br"));
            };
        }
        return wrapper;
    },

    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return ["font-awesome.css"];
    },

    // Expected format:
    // {"last_updated":"2021-07-23 16:17:46","trails":{"Browns Mill":"Open","Clinton":"Open","Cochran Mill":"Open","Moore's Bridge":"Open","Newnan LINC":"Open","North Cooper Lake":"Open","Sope Creek":"Open","South Rockdale":"Open","Southside":"Open","Sykes":"Open"},"trailforks_url":"https:\/\/www.trailforks.com\/directory\/9232\/"}
    processData: function(data) {
        var self = this;
        this.trailData = data.trails;
        if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
        this.loaded = true;
        this.updateDom();
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "STARTED" && payload === this.config.name) {
            this.updateDom();
        }
        else if (notification === "DATA_" + this.config.name) {
            this.loaded = true;
            this.error = false;
            this.processData(JSON.parse(payload));
        }        
        else if (notification === "DATA_ERROR_" + this.config.name) {
            this.loaded = true;
            this.error = true;
            this.updateDom();
        }
    },
});