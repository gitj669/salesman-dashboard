/**
 * Get the URL parameters
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
export const getUrlParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

export const sumOfKeyInArrObj = (items, prop) => items.reduce((a, b) => a + b[prop], 0);

export const formatAsDollar = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const capitalizeFirstLetter = (string) => {
  const str = string.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}