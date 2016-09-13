'use strict'

const facebookController = require('./facebook-controller');
const dictionary = require('../../dictionary').dictionary;

function handleEvent(event, sender) {
	let text = event.message.text;
	//TODO: later we are gonna work more with the message
	if (GLOBAL.waitingPhoneNumber) {
		GLOBAL.waitingPhoneNumber = false;
		facebookController.showCustomMessage(sender, dictionary.str_MessageReceived)
	} else {
		facebookController.showOptions(sender, dictionary.str_options);
	}
}

module.exports = {
	handleEvent: handleEvent
};