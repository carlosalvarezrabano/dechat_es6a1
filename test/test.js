require('chai');
var assert = require('assert');
const auth = require('solid-auth-client');

const SemanticChat = require('../src/lib/semanticchat');
const chat = new SemanticChat({ url: "http://prueba:8080", chatBaseUrl: "hola", interlocutorWebId: 123 });
const SemanticChat2 = require('../src/lib/semanticchat');
const chat2 = new SemanticChat2({ url: "https://testdechat6a1.solid.community/profile/card#me", userWebId : 122, chatBaseUrl: "Adios", interlocutorWebId: 123 });

const Loaderjs = require('../src/lib/loader');
const loader = new Loaderjs(auth.fetch);

const DeChatCore = require('../src/lib/core');
const core = new DeChatCore(auth.fetch);

describe('Simple test', function () {
  it('2 + 2 = 4', function () {
    assert.equal(2+2, 4);
  })
})
  
describe('Semantic chat constructor', function () {
  it('getUrl and getInterlocutorWebId', function () {
    assert.equal(chat.getUrl(), "http://prueba:8080");
    assert.equal(chat.getInterlocutorWebId(), 123);
    assert.equal(chat.numberOfMessages, 0);
  })
  
  it('loadMessage', function () {
    chat.loadMessage("Hola");
    assert.equal(chat.getMessages().length, 1);
    assert.equal(chat.getMessages()[0], "Hola");
    chat.loadMessage("Adiós");
    assert.equal(chat.getMessages().length, 2);
    assert.equal(chat.getMessages()[1], "Adiós");
  })
  
})

describe('Loader tests', function () {
	it('loadMessageFromURL', async function () {
		let s= await loader.loadFromUrl("https://testdechat6a1.solid.community/profile/card#me", 123, "hola");
		assert.equal(s.getUrl(), "https://testdechat6a1.solid.community/profile/card#me");
		assert.equal(s.userWebId, 123);
		assert.equal(s.getMessages().length, 0);
	})
	it('loadFromURL', async function () {
		let chat = await loader.loadFromUrl("https://alvarogonzalezcarracedo2.solid.community/private/dechat_201903291235.ttl","https://alvarogonzalezcarracedo2.solid.community/profile/card#me","https://alvarogonzalezcarracedo2.solid.community/private/dechat_201903291235.ttl");
		assert.equal(chat, new SemanticChat({ url: "https://alvarogonzalezcarracedo2.solid.community/private/dechat_201903291235.ttl", userWebId : "https://alvarogonzalezcarracedo2.solid.community/profile/card#me", chatBaseUrl: "https://alvarogonzalezcarracedo2.solid.community/private/dechat_201903291235.ttl"}));
	})
	
})

describe('Core tests', function () {
	it('core constructor', function () {
		assert.equal(core.alreadyCheckedResources.length, 0);
		assert.equal(core.logger.level, 'error');
		console.log(core.getFormattedName("https://testdechat6a1.solid.community/profile/card#me"));
	})
  
	it('getFormattedName', async function () {
		let s= await core.getFormattedName("https://testdechat6a1.solid.community/profile/card#me");
		assert.equal(s, "Tests Dechat_6a1");
	})
	/*
	it('setUpNewChat(No funciona)', async function () {
		let s= await core.setUpNewChat ("https://testdechat6a1.solid.community/profile/card",150,151);
		assert.equal(s, new SemanticChat({ url: "https://testdechat6a1.solid.community/profile/card#me", userWebId : 150, chatBaseUrl: "https://testdechat6a1.solid.community/profile/card", interlocutorWebId: 151 }););
	})
	
	it('generateUniqueUrlForResource ', async function () {
		let s= await core.generateUniqueUrlForResource("https://alvarogonzalezcarracedo2.solid.community/profile/card");
		assert.equal(s,"https://alvarogonzalezcarracedo2.solid.community/profile/card#me");
	})
	
	it('joinExistingChat(NO FUnciona)', async function () {
		let s= await core.joinExistingChat  ("https://testdechat6a1.solid.community/profile/card#me", "https://alvarogonzalezcarracedo2.solid.community/profile/card#me", "https://testdechat6a1.solid.community/profile/card#me", "https://alvarogonzalezcarracedo2.solid.community/private");
	})
	*/
  
})
