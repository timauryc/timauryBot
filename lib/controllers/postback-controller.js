'use strict'

const facebookController = require('./facebook-controller');
const dictionary = require('../../dictionary').dictionary;


function handleEvent(event, sender) {
	var payload = event.postback.payload;

	if (payload === 'personalInterests') {
		facebookController.showPersonalInterests(sender, dictionary.str_personalInterestsText, dictionary.str_personalInterestsImgSource)
	} else if (payload === 'socialNetworks') {
		facebookController.showSocialNetWorks(sender)
	} else if (payload === 'sendMessage') {
		GLOBAL.waitingPhoneNumber = true;
	} else if (payload === 'professionalLife') {
		facebookController.showProfessional(sender, dictionary.str_professionalLifeText, dictionary.str_resumeURL)
	} else if (payload === 'personalLife') {
		facebookController.showPersonalMenu(sender, dictionary.str_showPersonalMenu)
	}else if (payload === 'doNothing') {
		facebookController.showCustomMessage(sender, dictionary.str_notNowAnswer)
	}
}


module.exports = {
	handleEvent: handleEvent
};