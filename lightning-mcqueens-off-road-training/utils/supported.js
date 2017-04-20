
/**
 * Part of boot strap - Entry point for browser.
 * Not generally needed to be modified by user!
 */

/**
 * Windows 8 innerHTML function override
 */


/**
 * Displays an error box and throws a new error. Can be overridden in the game to look different.
 * @param {string} error Message to display in error box, and log.
 * @param {string=} opt_visualError If specified, this message is displayed in the error log while the above in the log. Can filter out too technical information from end user
 * @export
 */


/**
 * @export
 */
var supported = {};

/**
 * Parses url params for rpjs.appConfig.
 * @param {Object} bootflags default values from definition.client.json
 * @param {string} opt_url to parse the parameters from
 */



supported._detectBrowser = function _detectBrowser(navigator) {
	browser.info.platformType = navigator.platform;
	browser.info.browserName = navigator.appName;
	browser.info.browserVersion = parseFloat(navigator.appVersion);
	browser.info.iDevice = false;
	browser.info.touchDevice = false;

	// detect platform
	if (navigator.platform.indexOf('iPhone') != -1)
	{
		browser.info.iDevice = true;
		browser.info.touchDevice = true;
		browser.info.platformType = 'iPhone';
		if (/OS (\d+\_\d+)/.test(navigator.userAgent)) {
			var ver = RegExp.$1;
			ver = ver.replace('_', '.');
			browser.info.platformVersion = parseFloat(ver);
		}
	}
	else if (navigator.platform.indexOf('iPod') != -1)
	{
		browser.info.iDevice = true;
		browser.info.touchDevice = true;
		browser.info.platformType = 'iPod';
		if (/OS (\d+\_\d+)/.test(navigator.userAgent)) {
			var ver = RegExp.$1;
			ver = ver.replace('_', '.');
			browser.info.platformVersion = parseFloat(ver);
		}
	}
	else if (navigator.platform.indexOf('iPad') != -1)
	{
		browser.info.iDevice = true;
		browser.info.touchDevice = true;
		browser.info.platformType = 'iPad';
		if (/OS (\d+\_\d+)/.test(navigator.userAgent)) {
			var ver = RegExp.$1;
			ver = ver.replace('_', '.');
			browser.info.platformVersion = parseFloat(ver);
		}
	}
	else if (navigator.userAgent.indexOf('Kindle') != -1)
	{
		var fire = navigator.userAgent.indexOf('Kindle Fire') != -1;
		browser.info.touchDevice = fire;
		browser.info.platformType = fire ? 'Kindle Fire' : 'Kindle';
		if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
			browser.info.platformVersion = parseFloat(RegExp.$1);
		}
	}
	else if (navigator.userAgent.indexOf('Android') != -1)
	{
		browser.info.touchDevice = true;
		browser.info.platformType = 'Android';
		if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
			browser.info.platformVersion = parseFloat(RegExp.$1);
		}
	}
	else if (navigator.userAgent.indexOf('IEMobile') != -1)
	{
		browser.info.touchDevice = true;
		browser.info.platformType = 'IEMobile';
		if (/IEMobile\/(\d+\.\d+)/.test(navigator.userAgent)) {
			browser.info.platformVersion = parseFloat(RegExp.$1);
		}
	}
	else if (navigator.platform.indexOf('Win') != -1)
	{
		browser.info.platformType = 'Win';
		browser.info.platformVersion = 0.0; // TODO
	}
	else if (navigator.platform.indexOf('Mac') != -1) // and Silk!
	{
		browser.info.platformType = 'Mac';
		if (/OS X (\d+\_\d+)/.test(navigator.userAgent)) {
			var ver = RegExp.$1;
			ver = ver.replace('_', '.');
			browser.info.platformVersion = parseFloat(ver);
		}
	}
	else if (navigator.platform.indexOf('Linux') != -1)
	{
		browser.info.platformType = 'Linux';
		browser.info.platformVersion = 0.0; // TODO
	}

	// detect browser
	if (navigator.userAgent.indexOf('Firefox') != -1)
	{
		browser.info.browserName = 'Firefox';
		if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('MSIE') != -1)
	{
		//code to detect IE10 multi-touch devices
		browser.info.msTouchDevice = navigator.msMaxTouchPoints > 0;
		browser.info.browserName = 'MSIE';
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('Opera') != -1)
	{
		browser.info.browserName = 'Opera';
		if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('Chrome') != -1)
	{
		browser.info.browserName = 'Chrome';
		if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('CriOS') != -1)
	{
		browser.info.browserName = 'Chrome';
		if (/CriOS[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('Safari') != -1)
	{
		browser.info.browserName = 'Safari';
		if (/Version[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('Netscape') != -1)
	{
		browser.info.browserName = 'Netscape';
		if (/Netscape[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else if (navigator.userAgent.indexOf('Konqueror') != -1)
	{
		browser.info.browserName = 'Konqueror';
		if (/KHTML[\/\s](\d+\.\d+)/.test(navigator.userAgent))
			browser.info.browserVersion = parseFloat(RegExp.$1);
	}
	else {
		if (browser.info.iDevice)
			browser.info.browserName = 'Safari';
	}

	if (navigator.userAgent.indexOf('WebKit') != -1)
		browser.info.browserType = 'WebKit';
	else
		browser.info.browserType = browser.info.browserName;

	// set capability flags
	if (browser.info.browserName == 'MSIE' && browser.info.browserVersion < 9)
		browser.info.legacyIEFilterDOMPipe = true; // doesn't support css transforms
	else
		browser.info.legacyIEFilterDOMPipe = false;

	// check for 3d transformation support
	var cssMatrix = window.WebKitCSSMatrix || window.MSCSSMatrix || window.MozCSSMatrix || window.OCSSMatrix;
	if (cssMatrix != undefined && (new cssMatrix()['m11']) != undefined)
		browser.info.supports3dTransform = true;
	else
		browser.info.supports3dTransform = false;
};


supported._isBrowserSupported = function _isBrowserSupported() {
	var mydata = JSON.parse(data);
	for (var i = 0; i < mydata.length; i++) {
		var minBrowser = mydata[i];
		if ((!minBrowser.browserType || browser.info.browserName == minBrowser.browserType) &&
			(!minBrowser.platformType || browser.info.platformType == minBrowser.platformType)) {
			if (minBrowser.minVersion < 0) {
				window.location = "unsupported.html";
			}
			if (browser.info.browserVersion < minBrowser.minVersion) {
				window.location = "unsupported.html";
			}
			return 'supported';
		}
	}
	window.location = "unsupported.html";
};
		