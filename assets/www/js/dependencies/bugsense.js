Bugsense = {
  notify: function(notice) {

    var that    = this;
    this.notice = notice;
    this.errorMessage = function(){ return JSON.stringify(that.notice);};


    // bugsense parameters (required)
    this.defaults = {
    	  apiKey:  BUGSENS_KEY, 
    	  url: 'https://bugsense.appspot.com/api/errors?api_key=' // SSL
      // url: 'http://www.bugsense.com/api/js/errors?api_key=' // NON-SSL
    };

    this.data = {

      // basic data (required)
      application_environment: {
        environment: 'development', // modify me if you like
        // TODO: find a way to detect the mobile device, maybe with WURFL or so…?
        appver: APP_VERSION || 'unknown',
        osver: window.navigator.oscpu || 'unknown'
      },

      // bugsense client
      client: {
        name : 'SC Mobile Bugsense Notifier',
        protocol_version: 1,
        version: '0.1'
      },

      // basics about the exception
      exception: {
        klass: that.notice.error[0].message || "Unknown",
        where: "n/a:0", 
        message: that.errorMessage(),
        backtrace : that.errorMessage()
      },

      // details & custom data about the exception including url, request, response,…
      request: (function() {
        var request = {
          // Collecting IPs is illegal in some countries that's why we don't do it, if you'd like to, just remove this ligne
          remote_ip: '0.0.0.0',
          url: window.location.href,
          custom_data: {
            // You can remove & add custom data here from session/localStorage, cookies, geolocation, language, mimetypes,…
            document_referrer    : that.escapeText(document.referrer),
            navigator_user_agent : that.escapeText(navigator.userAgent),
            navigator_platform   : that.escapeText(navigator.platform),
            navigator_vendor     : that.escapeText(navigator.vendor),
            navigator_language   : that.escapeText(navigator.language),
            screen_width         : that.escapeText(screen.width),
            screen_height        : that.escapeText(screen.height),
            message 			 : that.escapeText(that.errorMessage()),
            page				 : main.currentPage,
            request              : {}
          }
        };
        
        // stringify it
        request.custom_data.request = JSON.stringify(request.custom_data.request);
        return request;
      }())

    };

    // all ready? lets make a get request with the data
    console.log(JSON.stringify(this.data));
    if (this.data && this.defaults.url && this.defaults.apiKey) {
      var url = this.defaults.url + this.defaults.apiKey + '&data=' + escape( JSON.stringify(this.data) );
      jQuery.post(url)
      	.success(function(){console.log("all ok " + JSON.stringify(this));})
      	.error(function(){console.log("problems " + JSON.stringify(arguments));});
    }
  },
  
  escapeText: function(text) {
    text = text.toString() || '';
    return text.replace(/&/g, '&#38;')
               .replace(/</g, '&#60;')
               .replace(/>/g, '&#62;')
               .replace(/'/g, '&#39;')
               .replace(/"/g, '&#34;');
  },
  generateBackTrace: function(stack) {
    if (stack) {
      return stack.file + ':' + stack.line;
    }
    try {
      throw new Error();
    } catch (e) {
      if (e.stack) {
        var matcher = /\s+at\s(.+)\s\((.+?):(\d+)(:\d+)?\)/;
        return jQuery.map(e.stack.split("\n").slice(4), _.bind(function(line) {
          var match  = line.match(matcher);
          var method = escapeText(match[1]);
          var file   = escapeText(match[2]);
          var number = match[3];
          return file + ':' + number + 'in' + method;
        }, this)).join("\n");
      } else if (e.sourceURL) {
        // note: this is completely useless, as it just points back at itself but is needed on Safari
        // keeping it around in case they ever end up providing actual stacktraces
        return e.sourceURL + ':' + e.line;
      }
    }
    return 'n/a:0';
  }
};