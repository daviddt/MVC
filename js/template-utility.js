/**
 * @name unencodeHTML
 *
 * @description 
 * Converts the decoded &lt; and &gt; back to "<" and ">"
 * This function is needed because if we get the template
 * with .innerHTML or .innerText the characters get encoded
 *
 * @param {string} string String to be unencoded.
 * @returns {string} unencoded template string.
 */

var unencodeHTML = function (str) {
	str = str.replace(/\&lt;/g,"<");
	str = str.replace(/\&gt;/g,">");
	return str;
}