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

export const formatAsDollar = (number) => {
  let num = typeof number === 'string' ? number : number.toString();
  const [intPart, decPart='']=num.split('.')
  num = intPart
  let lastThree = num.substring(num.length - 3);
  const otherNumbers = num.substring(0, num.length - 3);
  if (otherNumbers !== '' && otherNumbers !== '0') {
    lastThree = `,${lastThree}`;
  }
  if (decPart !== '') {
    lastThree = `${lastThree}.${decPart}`;
  }
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
};