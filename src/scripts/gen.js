import { fileField } from "../components/Atoms/Fields/File/File.js";
import { selectField } from "../components/Atoms/Fields/Select/Select.js";
import { inputMasks, showFieldError, toggleLabelPosition } from "../components/Atoms/Fields/Input/Input.js";

import { accordeon } from "../components/Molecules/Accordeon/Accordeon.js";
import { yandexMap } from "../components/Molecules/Maps/Yandex/Yandex.js";
import { simpleSlider } from "../components/Molecules/Sliders/Simple/Simple.js";
import { video } from "../components/Molecules/Video/Video.js";
import { logoTrain } from "../components/Molecules/LogoTrain/LogoTrain.js";

import { btnUp } from "../components/Organisms/BtnUp/BtnUp.js";
import { cookie } from "../components/Organisms/Cookie/Cookie.js";
import { notify } from "../components/Organisms/Notify/Notify.js";
import { header } from "../components/Organisms/Header/Header.js";
import { mobileMenu, closeMobileMenu } from "../components/Organisms/MobileMenu/MobileMenu.js";
import { togglePopup } from "../components/Organisms/Popups/Base/Base.js";

import { animatedShow } from "../components/Wrappers/AnimatedShow/AnimatedShow.js";

import { initContainerLink } from "./modules/initContainerLink.js";
import { lazyLoad } from "./modules/lazyLoad.js";
import { lightgallery } from "./modules/lightgallery.js";
import { runScriptOnUserEvent } from "./modules/runScriptOnUserEvent.js";
import { scrollToTop } from "./modules/scrollToTop.js";
import { setAppHeight } from "./modules/setAppHeight.js";
import { urlGenerator } from "./modules/urlGenerator.js";

document.addEventListener("DOMContentLoaded", function () {
	try {
		// Глобальный объект для доступа к функциям извне
		window.umGlobal = window.umGlobal || {};

		// Атомы
		umGlobal.showFieldError = showFieldError
		umGlobal.toggleLabelPosition = toggleLabelPosition;
		umGlobal.inputMasks = inputMasks;
		umGlobal.fileField = fileField;
		umGlobal.selectField = selectField;
		
		toggleLabelPosition();
		fileField();
		inputMasks();
		selectField();

		// Молекулы
		umGlobal.accordeon = accordeon;
		
		simpleSlider();
		accordeon();
		yandexMap();
		video();
		logoTrain();

		// Организмы
		umGlobal.showNotify = notify();
		umGlobal.togglePopup = togglePopup();
		umGlobal.closeMobileMenu = closeMobileMenu;
		btnUp();
		cookie();
		header();
		mobileMenu();

		// Врапперы
		umGlobal.animatedShow = animatedShow;
		
		animatedShow();

		// Всякое полезное, описание функций внутри модулей
		umGlobal.initContainerLink = initContainerLink;
		umGlobal.lightgallery = lightgallery;
		umGlobal.runScriptOnUserEvent = runScriptOnUserEvent;
		umGlobal.scrollToTop = scrollToTop;
		umGlobal.urlGenerator = urlGenerator;
		
		initContainerLink();
		lightgallery();
	} catch (error) {
		console.error(error);
	}
});

window.addEventListener('load', function() {
	try {
		// Глобальный объект для доступа к функциям извне
		window.umGlobal = window.umGlobal || {};

		// Всякое полезное, описание функций внутри модулей
		umGlobal.lazyLoad = lazyLoad;
		
		setAppHeight();
		lazyLoad();
	} catch (error) {
		console.error(error);
	}
});