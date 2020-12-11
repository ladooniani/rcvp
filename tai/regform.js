/*
Project:  terbinari.tech website code 
Written by Lado Oniani github.com/ladooniani
Copyright (C) 2020 Lado Oniani, TAI Lab. All Rights Reserved    
*/
/*************************************************************************************************** Text */
var notereq, browser; 
var hello = 'Hello, ';
var confMess = '<br/><br/> Thank you for visit terbnari.tech <br/><br/> This automatic notification confirms that your message has been received and will be examined according to context, after that you will get answer within a few working days. <br/><br/> Best regards <br/><br/> Toy Artificial Intelligence <br/> Research, innovation and technology development <br/> Intelligent systems and robotics laboratory'; 
var a0 = 'RESEARCH AND TECHNOLOGY DEVELOPMENT<br><br>';
var research_title = '● Research';
var b0 = '<br><br><u>Overview</u><br><br>';
var b1 = '&nbsp; Operating program interface interacts with training and conversation system response output personified in artificial entity endowed with individual memory slot, represents dialog processing models in text-to-text, text-to-voice or voice-to-voice modes and robot control methods, which mechanical recall provides tracking orientation and eye contact with user/interlocutor, as well as mouth device synchronization with speech motility events.<br><br>'; 
var b2 = '<u>Prototype application compatibility and usage</u><br><br>&nbsp;  Particular Terbinari software implementation developed on Microsoft Windows OS platform with using of system speech synthesis/recognition references and external CV library output.';
var descriptproto = b0 + b1 + b2;
var descript_proto_title = '● Overview';
var c0 = 'APPLICATION SOFTWARE AND ROBOT DEVICE<br><br>';
var c1 = '&nbsp; Terbinari operating program represents interactive training and conversation model, natural language processing semantic analysis/matching logic algorithms and controller operating methods.<br><br><img src="assets/terbinari-app.jpg" class="images_sq" onclick="resImg(1)" id="img1" /><br> &nbsp;';
var c2 = '<br><br>&nbsp; Artificial conversational entity performs input/output question-answering, learning, spoken dialog system with multi-function chat-bot interface and anthropomorphic humanoid robot Control Bot Mechanism animatronics operator. Cervical motility device implements mouth speech events motion and eyes/head tracking contact and response under facial detection/recognition process of computer vision.';                
var c3 = '<br><br>&nbsp; Bot operates individual unique memory content updated by Interlocutor input in frames of the system legal code. Answer defines output for dialogue as a tool of reflective analysis by returning efferent recall from human-like machine cognitive function. Embodies autonomous companion simulator as trainable virtual teach assistant and agent of compensatory intercourse for various interactive communication tasks.';  
var appsoft_robotdevice = c0 + c1 + c2 + c3;
var appsoft_robotdevice_title = '● Software and device';
var video_session_txt = "&nbsp;Following video session represents interaction with Terbinari operating program artificial conversational entity training and dialogue model I/O QA system semantic processing algorithms with chat-bot interface and prototype humanoid robot CBM (Control Bot Mechanism) device.";
var overview_descript = video_session_txt + descriptproto;
var videoSession_title = 'Terbinari CBM conversations';
var lab_title = 'Toy Artificial Intelligence <br>Research, innovation and technology development <br>Intelligent systems and robotics laboratory <br>'; 
var ritd = 'Research, innovation and technology development'; 
var isrb = 'Intelligent systems and robotics laboratory'; 
var terbinari = 'T e r b i n a r i';
var cbm = 'C B M';
var operating_program = 'Operating program';
var cbm_subtitle = 'Control Bot Mechanism';
var terb_cbm = 'Terbinari CBM';
var web_assist = 'Web Assistant';
var contact_link = 'Contact';
var contact_title = 'Contact lab';
var contactTxt = '<br>Hello, dear guest!<br><br>Thank you for visit<br><br>Laboratory is open and responsive for collaborative and productive conversation<br><br>Please, be free to contact or leave your feedback';
var support_title = 'Support project'; 
var donationBtn = '<form action="https://www.paypal.com/donate" method="post" target="_top"><input type="hidden" name="hosted_button_id" value="GRGH6SL9EL72U" /><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /></form>';
var supportTxt = '<br>Laboratory founded as non profit scientific and engineering organization.<br><br>Practical experience and development process in research is aimed to create and investigate synthetic entity architecture and behavior.<br><br>The philosophy of vision in research, inspired and motivated by concept to invent and build experimental and assistive educational, therapeutic, social and humanitarian interactive and robotic technologies, as well as implying prototyping and manufacturing products with commercial potential.<br><br> Research and development includes a number of areas, such as computational logic, cognitive science, mechanical design/engineering and industrial/artistic design <br><br>Your donation will help expand independent research workflow, improve laboratory environment and speed up conceptual strategy process, which leads to more involved research in frames of related technology, forming educational platform for creative/intellectual collaboration and search for other references.<br><br>'+donationBtn+'<br>At this stage we are preparing for presentation event with research overview and Terbinari CBM robot demonstration, planned in May of 2021, exact date/location will be announced later.<br><br>To get updates from research workflow, please follow us in social networks and subscribe to <a target="_blank" class="tlink2" href="https://www.youtube.com/channel/UC0Z161RgR5KpwPLvEDzkk9Q?view_as=subscriber">YouTube</a> channel';
var logo_name = 'T A I';
var scTechEngiTit = '<u>Research and development</u>';
var ScTechEngine = '&nbsp;"Toy Artificial Intelligence"  science, technology and engineering laboratory is a non-profit organisation, which operates on an independent creative platform of experimental development research in the field of intelligent system and mechanics, based on computational linguistics, automatic natural language processing and mechatronics concepts by inventor  <a target="_blank" class="tlink" style="font-size:15px;color:black"  href="https://www.linkedin.com/in/lado-oniani/">Lado Oniani</a>.<br><br>&nbsp;Implementation startup based on theory of logic was started in 2016 in home laboratory environment with multidisciplinary engineering approach, designing an operating program of robot training and conversation model semantic analysis and motility operator methods. <br><br><img src="assets/terbinari-3.jpg" class="images" onclick="resImg(2)" id="img2"/><br><br> &nbsp;Research in the lab focuses on the development of operating system and robotics, inspired and based on idea of experiment create information processing algorithms and control methods to design artificial conversational entity cognitive/associative learning/dialogue system  integrated with anthropomorphic and bio-inspired robotics architecture.<br><br>&nbsp;Development is focused on forming intercommunication habitat network environment and assistive technology, adaptable for specialized use such as education, cognitive therapy or entertainment with modeling and simulation conversational setup via human-machine interface, behavior observation, study, development, optimization and accumulation potentially derivative experiment.<br><br>&nbsp;Work fuses development of computing techniques in computational linguistics, natural language processing/generation, machine/robot learning, computer vision scene understanding and mechanical engineering.<br> <br><img src="assets/terbinari-4.jpg" class="images"/><br><br>&nbsp;Research and conceptual experiment in design of artificial environment and synthetic entity processes creation references to search of the clues in fundamental science of consciousness and universe interdependence.<br><br>&nbsp;The subject determines behavior, depending on its environment and rule conditions, defines action, creates or looks for the method, makes logical conclusion or abstract choice, selecting and using available information or search for alternatives.<br> <br><img src="assets/terbinari-2.jpg" class="images"/><br><br>  <br>&nbsp;Imagine that in current stage of the human evolution we should pass through the change in our development process, in this case with imperative use and intervention of mind to deal with such global task. To achieve this result, it is enough consider obvious constants of condition, such as mercy and health against cruelty and disease, to accelerate process for benefit, just by rejection of organic food, make significant step in act of biological revolution, and what is even more important "conscious choice". Accessibility of such reasoned and seemingly simple choice largely depends on rules of our learning, where evaluating the meaning of values plays a key role in decision making, directly related to associative context and personal experience, which determine a lot in the mechanism of subjective attitude and interpretation of objective state.<br><br>&nbsp;This model is applicable to derivative systems endowed with weak, but similar ability of behavior and analytically simpler to understand and control. Convenient to use figurative comparison where using of tool does not defines tool, as content of a vessel does not defines a vessel, but correct relation determines value for both.<br><br>&nbsp;This idea provokes an experiment that should observe how cognitive abstraction would develop with reflective experience, capable differentiate content based meaning and use logic to find relationship between the value and object.<br><br> <hr class="contactFormLine"> <br>&nbsp;Prototype custom technology production includes information processing algorithms, control methods and implementing terminal application software desktop and web platform of Unit Network environment, as well as inventing mechanics aimed on modeling and designing humanoid anthropomorphic robot architecture.<br><br>&nbsp;Technology development and experiment focuses on creation of invention prototype design solution based on cognitive abstraction original concepts and research.<br><br><hr class="contactFormLine"> <br>&nbsp;Principal course is aimed to expansion semantic processing core as a main system layer. Vision focused on evolution of training and conversation model operation control with number of directions on conceptual basis, which Implies a deepening of abstraction to reach understanding by inherent characteristics and create system able to learn and interact using unique content of personal memory as key to the abstract path in process of creation building blocks of contextual association system. Inclusion of an experimental toy-brain into a toy-body with user access, technologically oriented on simplicity and softness of behavior and usage in interaction feedback of cognitive recall impression. <br><br>&nbsp;Functionally surrounded void of artificial entity, that does not knows anything by default, able endlessly learn from you, understand meaning of growing information and use it to build own synthetic personality, become perceptive carrier to reflect and inference received informational knowledge in natural way of dynamic conversation.<br><br><hr class="contactFormLine"> <br>&nbsp;Conversational interaction environment prescribable for such tasks as assistance of topical training, autism educational/therapy exercise, as well psycho-linguistics and synthetic psychology human-computer interaction experiment, or any other specific usage with requirement of creating contextual memory content and dialog model scenario performance within building semantically personified cognition and output structure.<br><br>&nbsp;Training and conversation processing provides grow of personal memory as useful overlay and output display communication access to key controls and operation data for experimental usage as test tool incarnation. Considers creation of surrogate platform based on original system, such as library of functions and adaptive control module device.';
var functional = '&nbsp;Neutral language processing/generation semantic analysis/matching algorithms brain core and operation control methods I/O system with multi-function chat-bot terminal desktop software application interface and head/eyes/mouth control bot mechanism robot device with position/coordinate step receiver controller.<br><br>&nbsp; • Learn from communication and talk to interlocutor, answer and ask with memory adding/editing option, providing functions control built-in conversation interface in frames of system legal code filter, receive and react to action commands by attached request.<br><br>&nbsp; • Operate as topic teacher e.g. with "astronomy" appeal, question contexts and answer output.<br> <br><img src="assets/terbinari-cbm.jpg" class="images_sq"/><br><br>  <br>&nbsp; • Support conversation in text-to-text, text-to-voice, speech-to-voice with input pronunciation type chats and voice-to-voice speech recognition mode, operate in open training and close testing memory state with answer not found condition search method and speak with mouth lips viseme motility event.<br><br>&nbsp; • See – detect, recognize introduced person, track with eye contact and head orientation following interlocutor position, blink eyelids. <br><br>&nbsp; Desktop application software installation provides access to system terminal chat-bot interface and 6V CBM robot controller device with USB serial port connection, going through registration in Unit Network user profile access to local and server based memory storage with using of Microsoft OS speech references and available system display language.<br><br><img src="assets/cbm-pro-2.png" class="images" onclick="resImg(4)" id="img4"/><br><br> &nbsp;';  
var proces = '&nbsp;Training and conversation model are close to the natural way of receiving information, when we ask question and answering, looking or requesting for answer. This way training turn into the way of writing a book by creating contextual scenario of personality able to process, evaluate and use this data for internal construction of semantic association and dialogue generation.<br><br>&nbsp;Training and conversation starts from empty memory content, during dialog, void starts fill up and grow by individual user/teacher interlocutor input, giving and requesting for questions/answers, thereby building artificial entity personified memory content to reflect and manipulate with direct return, search or generating answer through the processing and understanding of existing content, create and dynamically follow context nodes, find meaning of the subject by relations from entire content without direct link between word and its meaning at the time of determination, output hypothetical conclusion and request for new key of value.<br><br>&nbsp;Return of direct answers to given questions prescribing by user/interlocutor through the processing core directly reflects or operates to understand content of conversation, defining answer, and building personality structure to output cognitive recall on computational semantics level.'; 
var amina = '<div id="container" class="inline" ></div>';
var segdes = amina + '&nbsp;<a href="#w3" class="tlink"><u>Terbinari (Operating program)</u></a><p class="deses"><br>&nbsp;&nbsp;&nbsp;&nbsp; • Training and conversation model<br>&nbsp;&nbsp;&nbsp;&nbsp; • Semantic processing algorithms<br>&nbsp;&nbsp;&nbsp;&nbsp; • Controller operating methods</p>' + amina + '&nbsp;<a href="#w1" class="tlink"><u>Tet (Artificial conversational entity)</u></a><br>' + amina + '&nbsp;<a href="#w3" class="tlink"><u>CBM (Control bot mechanism)</u></a> <p class="deses"> <br>&nbsp;&nbsp;&nbsp;&nbsp; • Robot device</p>';
var diagImg = '<img src="assets/terbinari-pro-1.png" class="images" onclick="resImg(3)" id="img3"/><br><br>  <br>&nbsp;';
var labBanImg = '<img src="assets/tai-lab.png" class="images"/><br><br> &nbsp;';
var fasfaceImg = '<img src="assets/terbinari-3.jpg" class="images"/><br><br> &nbsp;';
var pdfLink = '<i class="fa fa-file-pdf-o" aria-hidden="true" style="font-size:24px;color:blue"></i> &nbsp; <a target="_blank" class="tlink" href="https://github.com/ladooniani/tailab/blob/master/docs/tai.pdf">TAI Lab. Terbinari CBM Project description</a><br><br>';
var functTit = '<br><br><u>Functionality</u><br><br>';
var converTit = '<u>Conversations</u><br><br>';
var softDevTit = '<u>Software and device</u><br><br>';
var labresTit = '<u>Research and technology development</u><br><br>';
var proTit = '<u>Processing</u><br><br>';

/*************************************************************************************************** Load */
loadFnc();
function loadFnc(){
	scrollOnTop();
	CheckPhoneOrMobileBrowser();
	loadTxt();
	CheckBrowser();
	verticalLine();
  //scrollOnTop();
}
/*************************************************************************************************** Slider */
$(document).ready(function() {

	$('.mobileSlider').flexslider({
		animation: "slide",
		slideshowSpeed: 3000,
		controlNav: false,
		directionNav: true,
		prevText: "&#171;",
		nextText: "&#187;"
	});
	$('.flexslider').flexslider({
		animation: "slide",
		directionNav: false
	});

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if ($(window).width() < 768) {
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - $('.navbar-header').outerHeight(true) + 1
					}, 369);
					return false;
				}
			}
			else {
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - $('.navbar').outerHeight(true) + 1
					}, 369);
					return false;
				}
			}

		}
	});
	
	$('#toTop').click(function() {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});
	
	var timer;
	$(window).bind('scroll',function () {
		clearTimeout(timer);
		timer = setTimeout( refresh , 50 );
	});
	var refresh = function () {
		if ($(window).scrollTop()>100) {
			$(".tagline").fadeTo( "slow", 0 );
		}
		else {
			$(".tagline").fadeTo( "slow", 1 );
		}
	}; 
});
/*************************************************************************************************** Desible submit if txtBox not filled */
const inputSelector = ':input[required]:visible';
function checkForm() { 
	var isValidForm = true;
	$(this.form).find(inputSelector).each(function() {
		if (!this.value.trim()) {
			isValidForm = false;
		}
	});
	$(this.form).find('.monitored-btn').prop('disabled', !isValidForm);
	return isValidForm;
}
$('.monitored-btn').closest('form')
.submit(function() {
	return checkForm.apply($(this).find(':input')[0]);
})
.find(inputSelector).keyup(checkForm).keyup();
/*************************************************************************************************** Hide nav bar after click */
/*$('.nav-link').on('click',function() { $('.navbar-collapse').collapse('hide'); });*/
function hnb() {
	$('.navbar-collapse').collapse('hide');
}
/*************************************************************************************************** Tool tip for password note */
$(document).ready(function(){ $('[data-toggle="tooltip"]').tooltip(); });
/***************************************************************************************************  Year */
getDate();
function getDate(){
	var d = new Date();
	var n = d.getFullYear();
	var cpr = 'Copyright &copy; 2016-'+ n +' TAI Lab. All Rights Reserved';
	document.getElementById("cr").innerHTML = cpr;
}
/***************************************************************************************************  Scroll on top */
$(document).ready(function(){
	$(this).scrollTop(0);
});

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}
/***************************************************************************************************  Page func */
/****************************************************************************************************************/
/***************************************************************************************************  Load text */
function loadTxt() {
	var softDevTitSize = softDevTit.fontsize(5);
	var converTitSize = converTit.fontsize(5);
	var functTitSize = functTit.fontsize(5);
	var labresSize = labresTit.fontsize(5);
	var proTitSize = proTit.fontsize(5);
	labTitle.innerHTML = lab_title;
	terbinari_title.innerHTML = terbinari;
	operPro.innerHTML = operating_program;
	cbm_title.innerHTML = cbm; 
	cbmSubtitle.innerHTML = cbm_subtitle;
	contactTit.innerHTML = contact_title;   
	segdecript.innerHTML = segdes;
	softdev.innerHTML = softDevTitSize + c1 + c2 + c3;
	ste.innerHTML = labBanImg + pdfLink + labresSize + ScTechEngine;
	funct.innerHTML = proTitSize + proces + functTitSize + diagImg + functional;
	videotxt.innerHTML = converTitSize + overview_descript;
	guest_txt.innerHTML = contactTxt;
	supportUsTit.innerHTML = support_title.fontsize(6);
	supportUs.innerHTML = supportTxt;
	contactFromBreakSet(); 
}


function verticalLine(){
  if(browser == 0) { // Mobile
   // document.getElementById("segdecript").style.columnCount = "1";
   // document.getElementById("ste").style.columnCount = "1";
   // document.getElementById("headTxt").style.top = "96px"; 
  /* document.getElementById("hideNamesElement").style.backgroundSize = "contain";
   document.getElementById("hideNamesElement").style.padding = "0px"; 
   document.getElementById("hideNamesElement").style.paddingTop = "99px"; 
   document.getElementById("hideNamesElement").style.paddingBottom = "0px"; */
   /* document.getElementById("hideNamesElement").style.backgroundImage = "url('assets/terbinari_cbm_0.png') no-repeat center center scroll"; */
  } else if(browser == 1) { // PC
   // document.getElementById("segdecript").style.columnCount = "2";
   // document.getElementById("ste").style.columnCount = "2";
   // document.getElementById("headTxt").style.top = "109px"; 
   /* document.getElementById("hideNamesElement").style.backgroundImage = "url('assets/terbinari_cbm_1.png') no-repeat center center scroll"; */
  /* document.getElementById("hideNamesElement").style.backgroundSize = "none";
   document.getElementById("hideNamesElement").style.padding = "33px"; 
   document.getElementById("hideNamesElement").style.paddingTop = "100px"; 
   document.getElementById("hideNamesElement").style.paddingBottom = "369px"; */
}  
}

function contactFromBreakSet(){ 
	document.getElementById("break").style = 'line-height:3'; 
}

var count = 0;
function linkOpenClose(){
	count++;
	if (count % 2 == 0){
		contact_title = '● Contact';
		research_title = '● Research';
		appsoft_robotdevice_title = '● Software and device';
		descript_proto_title = '● Overview';
	} else {
		contact_title = '';
		research_title = '';
		appsoft_robotdevice_title = '';
		descript_proto_title = '';    
	}
	contactTitle.innerHTML = contact_title;  
	softDevTitle.innerHTML = appsoft_robotdevice_title;
	descriptProtoTitle.innerHTML = descript_proto_title;
	researchTitle.innerHTML = research_title; 
}

/***************************************************************************************************  Title link */

function hideTxt(x) {
	linkOpenClose();
	if (x == 1){
		TitleName(); 
		HideElement2(); 
		HideElement3(); 
		HideElement4(); 
		HideElement5(); 
		TitleCoptright();
	} else if (x == 2) {
		TitleName(); 
		HideElement1(); 
		HideElement3(); 
		HideElement4(); 
		HideElement5(); 
		TitleCoptright();
	} else if (x == 3) {
		TitleName(); 
		HideElement1(); 
		HideElement2(); 
		HideElement4(); 
		HideElement5(); 
		TitleCoptright();
	} else if (x == 4) {
		TitleName(); 
		HideElement1(); 
		HideElement2(); 
		HideElement3(); 
		HideElement5(); 
		TitleCoptright();
	} else if (x == 5) {
		TitleName(); 
		HideElement1();  
		HideElement2(); 
		HideElement3(); 
		HideElement4(); 
		TitleCoptright();
	} 
} 

function HideElement1(){
	var x = document.getElementById("hideElement1");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function HideElement2(){
	var x = document.getElementById("hideElement2");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function HideElement3(){
	var x = document.getElementById("hideElement3");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function HideElement4(){
	var x = document.getElementById("hideElement4");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function HideElement5(){
	var x = document.getElementById("hideElement5");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function HideVideo(){
	var x = document.getElementById("hideElement4");
	x.style.display = "none";
}

function ShowVideo(){
	var x = document.getElementById("hideElement4");
	x.style.display = "block";
}

function TitleName(){
	var x = document.getElementById("hideNamesElement");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function TitleCoptright(){
	var x = document.getElementById("hideCR");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function showDefault(){
	location.reload();
}

/*************************************************************************************************** Contact dialog setup*/

function CheckPhoneOrMobileBrowser(){
	if($(window).width()<=1199) { 
    browser = 0; // Mobile
} else {
    browser = 1; // PC 
} 
}

var isChrome; var isFirefox;
function CheckBrowser(){
	isFirefox = typeof InstallTrigger !== 'undefined';
	isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
}

function MessSendNote(var1){
	document.getElementById("messBtn").value = var1;  
	notereq = 'Send';  
	setTimeout(delayedQuestion, 2000);  
}

function delayedQuestion() {
	document.getElementById("messBtn").value = notereq;  
}

function Clean(){
	document.getElementById("mname").value = ""; 
	document.getElementById("mlname").value = ""; 
	document.getElementById("mess").value = ""; 
}

/*************************************************************************************************** Popup login*/

function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}

/*************************************************************************************************** Hide */

function HBnSVd() {
	document.getElementById("topWrap").style.display = "none";
}

function HPgSBn() {
	document.getElementById("topWrap").style.display = "block";
  //scrollOnTop(); 
}

function WebAssist(){ 
	document.getElementById("topWrap").style.display = "none";
}

function ContactForm(){
	document.getElementById("topWrap").style.display = "none";                                        
  //scrollOnTop();
}

function scrollOnTop() {

	window.scrollTo(0, 0);

	var videoBlock = document.getElementById("topWarp");   
	videoBlock.scrollIntoView({
		behavior: "smooth", 
		block: 'start',
	});
} 

$("#contactLink").click(function() {   
	ContactForm();                                               
}); 
$("#terbCbm").click(function() {   
///...
}); 
$("#cbm_title").click(function() {   
///...
}); 
$("#videoSession").click(function() {   
///...                                
}); 
$("#terbinari_title").click(function() {   
///...                                                
}); 
$("#container").click(function() {   
	HPgSBn();                                                
}); 
$("#logoName").click(function() {   
	HPgSBn();                                                
}); 
$("#webAssist").click(function() {   
	WebAssist();                                                
}); 

/*************************************************************************************************** YouTube video */

var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('video-placeholder', {
		width: 600,
		height: 400,
		vq: 'hd1080', 
		videoId: 'uAJOvLjs0D5dGJIcGOwpURkVAGzvHU',
		host: 'https://www.youtube.com',
		playerVars: {
			color: 'white',
			playlist: 'm1xcjhqGcHw,f801_bk9htc,xZZ-RWoMQD4,oKQQEKq7pdc,UsEniQiI9Xk',
			rel: 0, 
			showinfo: 0,             
			ecver: 2
		},
		events: {
			onReady: initialize
		}
	});
}

function initialize(){
	try {
		updateTimerDisplay();     
		updateProgressBar();
		clearInterval(time_update_interval);   
		time_update_interval = setInterval(function () {   
			updateTimerDisplay();
			updateProgressBar();
		}, 1000)
	}
	catch(err) {
	}
}

$('#videoSession').on('click', function () {
	player.pauseVideo();
	player.setPlaybackQuality('hd1080');
});

/*************************************************************************************************** Visitor message */

window.addEventListener("DOMContentLoaded", function() {
	var form = document.getElementById("my-form"); 
	function success() {
		form.reset();
		MessSendNote('Message sent'); 
	}
	function error() {
		MessSendNote('Message not sent'); 
	}
	form.addEventListener("submit", function(ev) {
		ev.preventDefault();
		var data = new FormData(form);
		ajax(form.method, form.action, data, success, error);
	});
});

function ajax(method, url, data, success, error) {
	checkInputs();
	if (checkVal == 0){
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState !== XMLHttpRequest.DONE) return;
			if (xhr.status === 200) {
				success(xhr.response, xhr.responseType);
			} else {
				error(xhr.status, xhr.response, xhr.responseType);
			}
		};
		xhr.send(data);
	} 
}  

/*************************************************************************************************** Visitor input check */

var checkVal = 0;
function checkInputs(){
	var mlname = $("#mlname").val();
	var mess = $("#mess").val();
	if (mlname == '') {  
		checkVal = 1; 
		MessSendNote('Please enter email');      
	} else if (mess == '') {  
		checkVal = 1;   
		MessSendNote('Please enter message');
	} else {
        /// MessSendNote(contact_txt);  
        var mvi = validate();
        if (mvi == false) {
        	MessSendNote('Invalid email address'); 
        	checkVal = 1; 
        } else if (mvi == true){
        	checkVal = 0; 
        }       
    }
}

/*************************************************************************************************** Validate email */

function validate() {
	var email = $("#mlname").val();
	if (validateEmail(email)) { 
		return true;
	} else {
		return false;
	}
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/*************************************************************************************************** Resize image */

var cc = 0;
var  img = "";
function resImg(x) { 
	if (x == 1){
		img = document.getElementById("img1"); 
		resSelect(x);
	} else if (x == 2){
		img = document.getElementById("img2");
		resSelect(x);
	} else if (x == 3){
		img = document.getElementById("img3");
		resSelect(x);
	} else if (x == 4){
		img = document.getElementById("img4");
		resSelect(x);
	} 
} 

var curval = 0;
function resSelect(x){
	if (x != curval){
		cc = 0;
	}
	curval = x;
	cc++;
	if (cc % 2 != 0){
		img.style.transform = "scale(1.2)"; 
		img.style.transition = "transform 0.25s ease"; 
		if (x == 3 || x == 4){
			document.getElementById('img' + x).style.backgroundColor = '#98d6cb';
		}
	} else {
		img.style.transform = "scale(1)"; 
		img.style.transition = "transform 0.25s ease"; 
		if (x == 3 || x == 4){
			document.getElementById('img' + x).style.backgroundColor =  "transparent"; 
		}
	}  
	sqNonAct(x);    
}

function sqNonAct(x){
	if (x == 1){
		imgR2 = document.getElementById("img2"); 
		imgR2.style.transform = "scale(1)"; 
		imgR2.style.transition = "transform 0.25s ease";
		imgR3 = document.getElementById("img3");
		imgR3.style.transform = "scale(1)"; 
		imgR3.style.transition = "transform 0.25s ease";
		imgR4 = document.getElementById("img4");
		imgR4.style.transform = "scale(1)"; 
		imgR4.style.transition = "transform 0.25s ease";
	} 
	if (x == 2){
		imgR1 = document.getElementById("img1"); 
		imgR1.style.transform = "scale(1)"; 
		imgR1.style.transition = "transform 0.25s ease"; 
		imgR3 = document.getElementById("img3");
		imgR3.style.transform = "scale(1)"; 
		imgR3.style.transition = "transform 0.25s ease";
		imgR4 = document.getElementById("img4");
		imgR4.style.transform = "scale(1)"; 
		imgR4.style.transition = "transform 0.25s ease"; 
	} 

	if (x == 3){
		imgR1 = document.getElementById("img1"); 
		imgR1.style.transform = "scale(1)"; 
		imgR1.style.transition = "transform 0.25s ease"; 
		imgR2 = document.getElementById("img2"); 
		imgR2.style.transform = "scale(1)"; 
		imgR2.style.transition = "transform 0.25s ease";
		imgR4 = document.getElementById("img4");
		imgR4.style.transform = "scale(1)"; 
		imgR4.style.transition = "transform 0.25s ease";   
	} 

	if (x == 4){
		imgR1 = document.getElementById("img1"); 
		imgR1.style.transform = "scale(1)"; 
		imgR1.style.transition = "transform 0.25s ease"; 
		imgR2 = document.getElementById("img2"); 
		imgR2.style.transform = "scale(1)"; 
		imgR2.style.transition = "transform 0.25s ease";
		imgR3 = document.getElementById("img3");
		imgR3.style.transform = "scale(1)"; 
		imgR3.style.transition = "transform 0.25s ease"; 
	}       
}
