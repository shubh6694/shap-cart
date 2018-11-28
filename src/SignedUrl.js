import oauthSignature from 'oauth-signature';
import CONFIG from './config';

function toQueryString(obj) {
	var parts = [];
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
		}
	}
	return parts.join('&');
}

function getTimeStamp() {
	return Math.round(+new Date()/1000);
};

function getNonce() {
	return Math.random()*1.2483;
};

export default function signedUrl(endPoint, method, filters = {}) {

	let oauth_data = {
		oauth_consumer_key: 'ck_92365b2ee0bb78c53377848414a86ac9297675be',
		oauth_nonce: getNonce(),
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: getTimeStamp(),
		oauth_version: '1.0',
		per_page: CONFIG.perPage
	};
	oauth_data = Object.assign({}, oauth_data, filters);

	let url = 'http://clients.yourworkwithus.com/projects/fooddeliveryapp/wp-json/wc/v2/' + endPoint;
	const consumer_secret = 'cs_3fa9caa55a829f85c496c67bd75604e5a217392f';
	oauth_data.oauth_signature = oauthSignature.generate(method, url, oauth_data, consumer_secret);
	let oauth_args = toQueryString(oauth_data);
	let final_request_uri_str = url + '?' + oauth_args;
	return final_request_uri_str;
}