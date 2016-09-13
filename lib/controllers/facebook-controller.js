'use strict'

const request = require('request');
const pageToken = require('../../conf/timaury-bot').MESSENGER.PAGE_ACCESS_TOKEN;
const dictionary = require('../../dictionary').dictionary;
const async = require('async');


function showOptions(user, text) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "button",
				"text": text,
				"buttons": [{
					"type": "postback",
					"title": dictionary.str_professionalLife,
					"payload": "professionalLife"
				}, {
					"type": "postback",
					"title": dictionary.str_personalLife,
					"payload": "personalLife"
				}, {
					"type": "postback",
					"title": dictionary.str_sendMessage,
					"payload": "sendMessage"
				}]
			}
		}
	};


	makeRequest(user, messageData, (error) => {
		if (error) {
			console.log(error)
		} else {
			console.log('request ok')
		}
	});
}

function showCustomMessage(user, message) {
	let messageData = {
		text: message
	}
	makeRequest(user, messageData, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('request ok');
		}
	});
}

//tengo que hacerle texto a esto
function showPersonalMenu(user, text) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "button",
				"text": text,
				"buttons": [{
					"type": "postback",
					"title": dictionary.str_personalInterests,
					"payload": "personalInterests"
				}, {
					"type": "postback",
					"title": dictionary.str_socialNetworks,
					"payload": "socialNetworks"
				}]
			}
		}
	};


	makeRequest(user, messageData, (error) => {
		if (error) {
			console.log(error)
		} else {
			console.log('request ok')
		}
	});
}

function showPersonalInterests(user, text, img) {
	//image
	let image = {
		"attachment": {
			"type": "image",
			"payload": {
				"url": img
			}
		}
	};

	//text
	let messageData = {
		"text": text
	};

	async.waterfall([
		function(callback) {
			makeRequest(user, messageData, (error) => {
				if (error) {
					console.log(error)
					callback(error)
				} else {
					console.log('request ok')
					callback(null)
				}
			});
		},
		function(callback) {
			makeRequest(user, image, (error) => {
				if (error) {
					console.log(error)
					callback(error)
				} else {
					console.log('request ok')
					callback(null)
				}
			});
		}
	]);
}

function showSocialNetWorks(user) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": dictionary.str_facebookText,
					"image_url": dictionary.str_facebookLogo,
					"buttons": [{
						"type": "web_url",
						"url": "https://www.facebook.com/Shadowsaga",
						"title": dictionary.str_goThere

					}],
				},{
					"title": dictionary.str_instagramText,
					"image_url": dictionary.str_instagramLogo,
					"buttons": [{
						"type": "web_url",
						"url": "https://www.instagram.com/timauryc",
						"title": dictionary.str_goThere

					}],
				},{
					"title": dictionary.str_youtubeText,
					"image_url": dictionary.str_youtubeLogo,
					"buttons": [{
						"type": "web_url",
						"url": "https://www.youtube.com/channel/UC_WNaQK9FTWwCM-stttuhKg",
						"title": dictionary.str_goThere

					}],
				}]
			}
		}
	};

	makeRequest(user, messageData, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('request ok');
		}
	});
}

function showProfessional(user, text, fileUrl) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "button",
				"text": text,
				"buttons": [{
					"type": "web_url",
					"url": "https://ve.linkedin.com/in/carlos-timaury-moreno-16b84061",
					"title": dictionary.str_goThere

				}, {
					"type": "postback",
					"title": dictionary.str_notNow,
					"payload": "doNothing"
				}]
			}
		}
	};


	makeRequest(user, messageData, (error) => {
		if (error) {
			console.log(error)
		} else {
			console.log('request ok')
		}
	});
}

function makeRequest(user, messageData, callback) {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {
			access_token: pageToken
		},
		method: 'POST',
		json: {
			recipient: {
				id: user
			},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			callback('Error sending message: ', error);
		} else if (response.body.error) {
			callback('Body Error: ', response.body.error);
		} else {
			callback(null);
		}
	});
}

module.exports = {
	showOptions: showOptions,
	showCustomMessage: showCustomMessage,
	showPersonalMenu: showPersonalMenu,
	showPersonalInterests: showPersonalInterests,
	showSocialNetWorks: showSocialNetWorks,
	showProfessional: showProfessional
};