import cache from 'memory-cache'
import express from 'express'

const router = express.Router()

const items = [{
	'node': {
		'login': 'addyosmani',
		'name': 'Addy Osmani',
		'email': 'addyosmani@gmail.com',
		'url': 'https://github.com/addyosmani',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/110953?v=3',
		'company': 'Google',
		'followers': {
			'totalCount': 23146
		},
		'following': {
			'totalCount': 233
		},
		'repositories': {
			'totalCount': 287
		},
		'price': 23666
	}
}, {
	'node': {
		'login': 'mikolalysenko',
		'name': 'Mikola Lysenko',
		'email': 'mikolalysenko@gmail.com',
		'url': 'https://github.com/mikolalysenko',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/231686?v=3',
		'company': 'bits cooperative',
		'followers': {
			'totalCount': 1053
		},
		'following': {
			'totalCount': 545
		},
		'repositories': {
			'totalCount': 489
		},
		'price': 2087
	}
}, {
	'node': {
		'login': 'ashleygwilliams',
		'name': 'ashley williams',
		'email': 'ashley666ashley@gmail.com',
		'url': 'https://github.com/ashleygwilliams',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/1163554?v=3',
		'company': '@npm',
		'followers': {
			'totalCount': 1528
		},
		'following': {
			'totalCount': 15
		},
		'repositories': {
			'totalCount': 259
		},
		'price': 1802
	}
}, {
	'node': {
		'login': 'vladikoff',
		'name': 'Vlad Filippov',
		'email': 'github@vf.io',
		'url': 'https://github.com/vladikoff',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/128755?v=3',
		'company': '',
		'followers': {
			'totalCount': 980
		},
		'following': {
			'totalCount': 148
		},
		'repositories': {
			'totalCount': 380
		},
		'price': 1508
	}
}, {
	'node': {
		'login': 'leobalter',
		'name': 'Leo Balter',
		'email': 'leonardo.balter@gmail.com',
		'url': 'https://github.com/leobalter',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/301201?v=3',
		'company': 'Bocoup',
		'followers': {
			'totalCount': 592
		},
		'following': {
			'totalCount': 90
		},
		'repositories': {
			'totalCount': 204
		},
		'price': 886
	}
}, {
	'node': {
		'login': 'scottgonzalez',
		'name': 'Scott González',
		'email': 'scott.gonzalez@gmail.com',
		'url': 'https://github.com/scottgonzalez',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/141167?v=3',
		'company': 'Clipper Magazine',
		'followers': {
			'totalCount': 685
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 195
		},
		'price': 880
	}
}, {
	'node': {
		'login': 'jeffmo',
		'name': 'Jeff Morrison',
		'email': '',
		'url': 'https://github.com/jeffmo',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/498293?v=3',
		'company': '',
		'followers': {
			'totalCount': 803
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 51
		},
		'price': 854
	}
}, {
	'node': {
		'login': 'arthurvr',
		'name': 'Arthur Verschaeve',
		'email': 'arthur.versch@gmail.com',
		'url': 'https://github.com/arthurvr',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/6025224?v=3',
		'company': '',
		'followers': {
			'totalCount': 510
		},
		'following': {
			'totalCount': 117
		},
		'repositories': {
			'totalCount': 209
		},
		'price': 836
	}
}, {
	'node': {
		'login': 'raphamorim',
		'name': 'Raphael Amorim',
		'email': 'rapha850@gmail.com',
		'url': 'https://github.com/raphamorim',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/3630346?v=3',
		'company': '@globocom ',
		'followers': {
			'totalCount': 491
		},
		'following': {
			'totalCount': 57
		},
		'repositories': {
			'totalCount': 193
		},
		'price': 741
	}
}, {
	'node': {
		'login': 'nacin',
		'name': 'Andrew Nacin',
		'email': '',
		'url': 'https://github.com/nacin',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/272784?v=3',
		'company': 'WordPress / The White House',
		'followers': {
			'totalCount': 676
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 35
		},
		'price': 711
	}
}, {
	'node': {
		'login': 'buritica',
		'name': 'Juan Pablo Buritica',
		'email': 'buritica@gmail.com',
		'url': 'https://github.com/buritica',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/228120?v=3',
		'company': '@splicers ',
		'followers': {
			'totalCount': 522
		},
		'following': {
			'totalCount': 24
		},
		'repositories': {
			'totalCount': 82
		},
		'price': 628
	}
}, {
	'node': {
		'login': 'timmywil',
		'name': 'Timmy Willison',
		'email': '',
		'url': 'https://github.com/timmywil',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/192451?v=3',
		'company': '@jquery Core Lead, @opentable Senior Engineer',
		'followers': {
			'totalCount': 423
		},
		'following': {
			'totalCount': 22
		},
		'repositories': {
			'totalCount': 124
		},
		'price': 569
	}
}, {
	'node': {
		'login': 'brianloveswords',
		'name': 'Brian J Brennan',
		'email': 'brianloveswords@gmail.com',
		'url': 'https://github.com/brianloveswords',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/166258?v=3',
		'company': 'Bocoup',
		'followers': {
			'totalCount': 309
		},
		'following': {
			'totalCount': 41
		},
		'repositories': {
			'totalCount': 209
		},
		'price': 559
	}
}, {
	'node': {
		'login': 'dmethvin',
		'name': 'Dave Methvin',
		'email': '',
		'url': 'https://github.com/dmethvin',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/157858?v=3',
		'company': 'The Engage Group',
		'followers': {
			'totalCount': 515
		},
		'following': {
			'totalCount': 2
		},
		'repositories': {
			'totalCount': 30
		},
		'price': 547
	}
}, {
	'node': {
		'login': 'mgol',
		'name': 'Michał Gołębiowski',
		'email': 'm.goleb@gmail.com',
		'url': 'https://github.com/mgol',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/1758366?v=3',
		'company': 'YouGov, jQuery, Angular',
		'followers': {
			'totalCount': 386
		},
		'following': {
			'totalCount': 56
		},
		'repositories': {
			'totalCount': 90
		},
		'price': 532
	}
}, {
	'node': {
		'login': 'csnover',
		'name': 'Colin Snover',
		'email': '',
		'url': 'https://github.com/csnover',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/229244?v=3',
		'company': '',
		'followers': {
			'totalCount': 443
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 52
		},
		'price': 495
	}
}, {
	'node': {
		'login': 'gnarf',
		'name': 'Mx Corey Frang',
		'email': 'corey@bocoup.com',
		'url': 'https://github.com/gnarf',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/549355?v=3',
		'company': 'Bocoup',
		'followers': {
			'totalCount': 224
		},
		'following': {
			'totalCount': 67
		},
		'repositories': {
			'totalCount': 117
		},
		'price': 408
	}
}, {
	'node': {
		'login': 'Frijol',
		'name': 'Kelsey',
		'email': '',
		'url': 'https://github.com/Frijol',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/454690?v=3',
		'company': '',
		'followers': {
			'totalCount': 244
		},
		'following': {
			'totalCount': 20
		},
		'repositories': {
			'totalCount': 102
		},
		'price': 366
	}
}, {
	'node': {
		'login': 'ajpiano',
		'name': 'adam j. sontag',
		'email': 'ajpiano@ajpiano.com',
		'url': 'https://github.com/ajpiano',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/155599?v=3',
		'company': 'Bocoup',
		'followers': {
			'totalCount': 305
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 45
		},
		'price': 351
	}
}, {
	'node': {
		'login': 'apsdehal',
		'name': 'Amanpreet Singh',
		'email': 'me@apsdehal.in',
		'url': 'https://github.com/apsdehal',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/3616806?v=3',
		'company': 'jQuery Foundation, NYU',
		'followers': {
			'totalCount': 178
		},
		'following': {
			'totalCount': 108
		},
		'repositories': {
			'totalCount': 65
		},
		'price': 351
	}
}, {
	'node': {
		'login': 'tjvantoll',
		'name': 'TJ VanToll',
		'email': 'tj.vantoll@gmail.com',
		'url': 'https://github.com/tjvantoll',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/544280?v=3',
		'company': 'Telerik',
		'followers': {
			'totalCount': 252
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 95
		},
		'price': 347
	}
}, {
	'node': {
		'login': 'mikesherov',
		'name': 'Mike Sherov',
		'email': null,
		'url': 'https://github.com/mikesherov',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/364532?v=3',
		'company': null,
		'followers': {
			'totalCount': 208
		},
		'following': {
			'totalCount': 22
		},
		'repositories': {
			'totalCount': 86
		},
		'price': 316
	}
}, {
	'node': {
		'login': 'Krinkle',
		'name': 'Timo Tijhof',
		'email': 'krinklemail@gmail.com',
		'url': 'https://github.com/Krinkle',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/156867?v=3',
		'company': 'Wikimedia Foundation',
		'followers': {
			'totalCount': 166
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 132
		},
		'price': 298
	}
}, {
	'node': {
		'login': 'AurelioDeRosa',
		'name': 'Aurelio De Rosa',
		'email': 'a.derosa@audero.it',
		'url': 'https://github.com/AurelioDeRosa',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/1430979?v=3',
		'company': 'Digital Detox',
		'followers': {
			'totalCount': 250
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 46
		},
		'price': 297
	}
}, {
	'node': {
		'login': 'arschmitz',
		'name': 'Alexander Schmitz',
		'email': 'arschmitz@gmail.com',
		'url': 'https://github.com/arschmitz',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/462993?v=3',
		'company': 'jQuery Foundation, W3C',
		'followers': {
			'totalCount': 196
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 100
		},
		'price': 297
	}
}, {
	'node': {
		'login': 'tkellen',
		'name': 'Tyler Kellen',
		'email': 'tyler@sleekcode.net',
		'url': 'https://github.com/tkellen',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/1004324?v=3',
		'company': 'Bocoup',
		'followers': {
			'totalCount': 237
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 54
		},
		'price': 292
	}
}, {
	'node': {
		'login': 'jaubourg',
		'name': 'Julian Aubourg',
		'email': 'j@ubourg.net',
		'url': 'https://github.com/jaubourg',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/160354?v=3',
		'company': 'Creative Area',
		'followers': {
			'totalCount': 267
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 24
		},
		'price': 291
	}
}, {
	'node': {
		'login': 'ericandrewlewis',
		'name': 'Eric Lewis',
		'email': 'eric.andrew.lewis@gmail.com',
		'url': 'https://github.com/ericandrewlewis',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/1087646?v=3',
		'company': 'The New York Times',
		'followers': {
			'totalCount': 136
		},
		'following': {
			'totalCount': 10
		},
		'repositories': {
			'totalCount': 141
		},
		'price': 287
	}
}, {
	'node': {
		'login': 'runspired',
		'name': 'Chris Thoburn',
		'email': '',
		'url': 'https://github.com/runspired',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/650309?v=3',
		'company': '',
		'followers': {
			'totalCount': 148
		},
		'following': {
			'totalCount': 44
		},
		'repositories': {
			'totalCount': 86
		},
		'price': 278
	}
}, {
	'node': {
		'login': 'kadamwhite',
		'name': 'K.Adam White',
		'email': '',
		'url': 'https://github.com/kadamwhite',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/442115?v=3',
		'company': '@bocoup',
		'followers': {
			'totalCount': 138
		},
		'following': {
			'totalCount': 17
		},
		'repositories': {
			'totalCount': 122
		},
		'price': 277
	}
}, {
	'node': {
		'login': 'boazsender',
		'name': 'Boaz',
		'email': 'boaz@bocoup.com',
		'url': 'https://github.com/boazsender',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/122117?v=3',
		'company': null,
		'followers': {
			'totalCount': 198
		},
		'following': {
			'totalCount': 16
		},
		'repositories': {
			'totalCount': 62
		},
		'price': 276
	}
}, {
	'node': {
		'login': 'kborchers',
		'name': 'Kris Borchers',
		'email': 'kris.borchers@gmail.com',
		'url': 'https://github.com/kborchers',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/282468?v=3',
		'company': '',
		'followers': {
			'totalCount': 93
		},
		'following': {
			'totalCount': 19
		},
		'repositories': {
			'totalCount': 155
		},
		'price': 267
	}
}, {
	'node': {
		'login': 'agcolom',
		'name': 'Anne-Gaelle Colom',
		'email': 'coloma@westminster.ac.uk',
		'url': 'https://github.com/agcolom',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/688413?v=3',
		'company': 'University of Westminster',
		'followers': {
			'totalCount': 162
		},
		'following': {
			'totalCount': 18
		},
		'repositories': {
			'totalCount': 82
		},
		'price': 262
	}
}, {
	'node': {
		'login': 'rxaviers',
		'name': 'Rafael Xavier de Souza',
		'email': '',
		'url': 'https://github.com/rxaviers',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/967155?v=3',
		'company': 'PayPal',
		'followers': {
			'totalCount': 142
		},
		'following': {
			'totalCount': 15
		},
		'repositories': {
			'totalCount': 101
		},
		'price': 258
	}
}, {
	'node': {
		'login': 'JamesMGreene',
		'name': 'James M. Greene',
		'email': 'james.m.greene@gmail.com',
		'url': 'https://github.com/JamesMGreene',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/417751?v=3',
		'company': 'Viavi Solutions',
		'followers': {
			'totalCount': 131
		},
		'following': {
			'totalCount': 30
		},
		'repositories': {
			'totalCount': 87
		},
		'price': 248
	}
}, {
	'node': {
		'login': 'markelog',
		'name': 'Oleg Gaidarenko',
		'email': 'markelog@gmail.com',
		'url': 'https://github.com/markelog',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/945528?v=3',
		'company': '',
		'followers': {
			'totalCount': 176
		},
		'following': {
			'totalCount': 5
		},
		'repositories': {
			'totalCount': 67
		},
		'price': 248
	}
}, {
	'node': {
		'login': 'johnkpaul',
		'name': 'John K. Paul',
		'email': null,
		'url': 'https://github.com/johnkpaul',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/475621?v=3',
		'company': null,
		'followers': {
			'totalCount': 122
		},
		'following': {
			'totalCount': 16
		},
		'repositories': {
			'totalCount': 98
		},
		'price': 236
	}
}, {
	'node': {
		'login': 'jiahuang',
		'name': 'Jia Huang',
		'email': 'jialiya.huang0@gmail.com',
		'url': 'https://github.com/jiahuang',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/577629?v=3',
		'company': 'Technical Machine',
		'followers': {
			'totalCount': 125
		},
		'following': {
			'totalCount': 44
		},
		'repositories': {
			'totalCount': 40
		},
		'price': 209
	}
}, {
	'node': {
		'login': 'danheberden',
		'name': 'Dan Heberden',
		'email': '',
		'url': 'https://github.com/danheberden',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/307962?v=3',
		'company': 'Bazaarvoice',
		'followers': {
			'totalCount': 145
		},
		'following': {
			'totalCount': 2
		},
		'repositories': {
			'totalCount': 57
		},
		'price': 204
	}
}, {
	'node': {
		'login': 'fnagel',
		'name': 'Felix Nagel',
		'email': 'info@felixnagel.com',
		'url': 'https://github.com/fnagel',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/116824?v=3',
		'company': 'Freelancer',
		'followers': {
			'totalCount': 124
		},
		'following': {
			'totalCount': 33
		},
		'repositories': {
			'totalCount': 30
		},
		'price': 187
	}
}, {
	'node': {
		'login': 'RedWolves',
		'name': 'Ralph Whitbeck',
		'email': 'ralph.whitbeck@gmail.com',
		'url': 'https://github.com/RedWolves',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/129322?v=3',
		'company': 'Atlassian',
		'followers': {
			'totalCount': 110
		},
		'following': {
			'totalCount': 38
		},
		'repositories': {
			'totalCount': 36
		},
		'price': 184
	}
}, {
	'node': {
		'login': 'aulvi',
		'name': 'Adam Ulvi',
		'email': '',
		'url': 'https://github.com/aulvi',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/3950946?v=3',
		'company': '',
		'followers': {
			'totalCount': 97
		},
		'following': {
			'totalCount': 20
		},
		'repositories': {
			'totalCount': 49
		},
		'price': 166
	}
}, {
	'node': {
		'login': 'gseguin',
		'name': 'Ghislain Seguin',
		'email': '',
		'url': 'https://github.com/gseguin',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/373923?v=3',
		'company': 'Nest',
		'followers': {
			'totalCount': 97
		},
		'following': {
			'totalCount': 14
		},
		'repositories': {
			'totalCount': 48
		},
		'price': 159
	}
}, {
	'node': {
		'login': 'HipsterBrown',
		'name': 'Nick Hehr',
		'email': 'headhipster@hipsterbrown.com',
		'url': 'https://github.com/HipsterBrown',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/3051193?v=3',
		'company': '@namely ',
		'followers': {
			'totalCount': 50
		},
		'following': {
			'totalCount': 17
		},
		'repositories': {
			'totalCount': 91
		},
		'price': 158
	}
}, {
	'node': {
		'login': 'johnnyman727',
		'name': 'Jon',
		'email': 'johnnyman727@gmail.com',
		'url': 'https://github.com/johnnyman727',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/432909?v=3',
		'company': 'Technical Machine',
		'followers': {
			'totalCount': 79
		},
		'following': {
			'totalCount': 29
		},
		'repositories': {
			'totalCount': 44
		},
		'price': 152
	}
}, {
	'node': {
		'login': 'copasetickid',
		'name': 'Rushaine McBean',
		'email': 'rushaine.mcbean@gmail.com',
		'url': 'https://github.com/copasetickid',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/892365?v=3',
		'company': null,
		'followers': {
			'totalCount': 67
		},
		'following': {
			'totalCount': 17
		},
		'repositories': {
			'totalCount': 67
		},
		'price': 151
	}
}, {
	'node': {
		'login': 'gibson042',
		'name': 'Richard Gibson',
		'email': '',
		'url': 'https://github.com/gibson042',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/1199584?v=3',
		'company': 'Architect at Dyn; jQuery core team & Sizzle lead',
		'followers': {
			'totalCount': 98
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 46
		},
		'price': 144
	}
}, {
	'node': {
		'login': 'isaacdurazo',
		'name': 'Isaac Durazo',
		'email': '',
		'url': 'https://github.com/isaacdurazo',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/1379244?v=3',
		'company': 'Bocoup.com',
		'followers': {
			'totalCount': 74
		},
		'following': {
			'totalCount': 30
		},
		'repositories': {
			'totalCount': 35
		},
		'price': 139
	}
}, {
	'node': {
		'login': 'dmzza',
		'name': 'David Mazza',
		'email': '',
		'url': 'https://github.com/dmzza',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/120893?v=3',
		'company': '',
		'followers': {
			'totalCount': 20
		},
		'following': {
			'totalCount': 45
		},
		'repositories': {
			'totalCount': 73
		},
		'price': 138
	}
}, {
	'node': {
		'login': 'chrislea',
		'name': 'Chris Lea',
		'email': 'chris.lea@gmail.com',
		'url': 'https://github.com/chrislea',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/115710?v=3',
		'company': 'NodeSource',
		'followers': {
			'totalCount': 111
		},
		'following': {
			'totalCount': 6
		},
		'repositories': {
			'totalCount': 18
		},
		'price': 135
	}
}, {
	'node': {
		'login': 'ikarienator',
		'name': 'Bei Zhang - Ikarienator',
		'email': '',
		'url': 'https://github.com/ikarienator',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/1472048?v=3',
		'company': 'Shape Security',
		'followers': {
			'totalCount': 48
		},
		'following': {
			'totalCount': 30
		},
		'repositories': {
			'totalCount': 54
		},
		'price': 132
	}
}, {
	'node': {
		'login': 'ryanneufeld',
		'name': 'Ryan Neufeld',
		'email': 'ryan@neucode.org',
		'url': 'https://github.com/ryanneufeld',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/585350?v=3',
		'company': null,
		'followers': {
			'totalCount': 42
		},
		'following': {
			'totalCount': 9
		},
		'repositories': {
			'totalCount': 81
		},
		'price': 132
	}
}, {
	'node': {
		'login': 'jaspermdegroot',
		'name': 'Jasper de Groot',
		'email': '',
		'url': 'https://github.com/jaspermdegroot',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/1296793?v=3',
		'company': 'Self-employed Web Developer & Designer',
		'followers': {
			'totalCount': 104
		},
		'following': {
			'totalCount': 17
		},
		'repositories': {
			'totalCount': 6
		},
		'price': 127
	}
}, {
	'node': {
		'login': 'LizaLemons',
		'name': 'Liza Ramo',
		'email': '',
		'url': 'https://github.com/LizaLemons',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/7459417?v=3',
		'company': '',
		'followers': {
			'totalCount': 38
		},
		'following': {
			'totalCount': 30
		},
		'repositories': {
			'totalCount': 50
		},
		'price': 118
	}
}, {
	'node': {
		'login': 'trentmwillis',
		'name': 'Trent Willis',
		'email': 'trentmwillis@gmail.com',
		'url': 'https://github.com/trentmwillis',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/3526753?v=3',
		'company': 'LinkedIn',
		'followers': {
			'totalCount': 38
		},
		'following': {
			'totalCount': 5
		},
		'repositories': {
			'totalCount': 74
		},
		'price': 117
	}
}, {
	'node': {
		'login': 'MattSurabian',
		'name': 'Matthew Surabian',
		'email': 'matt@mattsurabian.com',
		'url': 'https://github.com/MattSurabian',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/1134260?v=3',
		'company': '@bocoup ',
		'followers': {
			'totalCount': 56
		},
		'following': {
			'totalCount': 18
		},
		'repositories': {
			'totalCount': 39
		},
		'price': 113
	}
}, {
	'node': {
		'login': 'flaki',
		'name': 'István Szmozsánszky',
		'email': 'git@flaki.hu',
		'url': 'https://github.com/flaki',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/2089432?v=3',
		'company': '',
		'followers': {
			'totalCount': 28
		},
		'following': {
			'totalCount': 2
		},
		'repositories': {
			'totalCount': 81
		},
		'price': 111
	}
}, {
	'node': {
		'login': 'geekman-rohit',
		'name': 'Rohit Mulange',
		'email': 'rohit@rohit.codes',
		'url': 'https://github.com/geekman-rohit',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/7365362?v=3',
		'company': '',
		'followers': {
			'totalCount': 46
		},
		'following': {
			'totalCount': 28
		},
		'repositories': {
			'totalCount': 24
		},
		'price': 98
	}
}, {
	'node': {
		'login': 'patriciarealini',
		'name': 'Patricia Realini',
		'email': '',
		'url': 'https://github.com/patriciarealini',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/7608497?v=3',
		'company': '@bustlelabs ',
		'followers': {
			'totalCount': 36
		},
		'following': {
			'totalCount': 30
		},
		'repositories': {
			'totalCount': 19
		},
		'price': 85
	}
}, {
	'node': {
		'login': 'clarkbox',
		'name': 'Clark A',
		'email': 'clarka@gmail.com',
		'url': 'https://github.com/clarkbox',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/359375?v=3',
		'company': null,
		'followers': {
			'totalCount': 54
		},
		'following': {
			'totalCount': 9
		},
		'repositories': {
			'totalCount': 22
		},
		'price': 85
	}
}, {
	'node': {
		'login': 'gabrielschulhof',
		'name': 'Gabriel "_|Nix|_" Schulhof',
		'email': 'gabriel.schulhof@intel.com',
		'url': 'https://github.com/gabrielschulhof',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/976081?v=3',
		'company': 'Intel Finland Oy',
		'followers': {
			'totalCount': 35
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 42
		},
		'price': 77
	}
}, {
	'node': {
		'login': 'anamariasosam',
		'name': 'Ana María',
		'email': 'anamariasosam@gmail.com',
		'url': 'https://github.com/anamariasosam',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/2703269?v=3',
		'company': '',
		'followers': {
			'totalCount': 26
		},
		'following': {
			'totalCount': 10
		},
		'repositories': {
			'totalCount': 40
		},
		'price': 76
	}
}, {
	'node': {
		'login': 'SelinaMusuta',
		'name': 'Selina Musuta',
		'email': 'selina@codeforprogress.org',
		'url': 'https://github.com/SelinaMusuta',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/6758402?v=3',
		'company': 'Code for Progress',
		'followers': {
			'totalCount': 22
		},
		'following': {
			'totalCount': 19
		},
		'repositories': {
			'totalCount': 32
		},
		'price': 73
	}
}, {
	'node': {
		'login': 'RussellBradley',
		'name': 'Russell Bradley',
		'email': 'me@russellbradley.com',
		'url': 'https://github.com/RussellBradley',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/2488791?v=3',
		'company': 'Airtime',
		'followers': {
			'totalCount': 34
		},
		'following': {
			'totalCount': 21
		},
		'repositories': {
			'totalCount': 18
		},
		'price': 73
	}
}, {
	'node': {
		'login': 'n7best',
		'name': 'n7best',
		'email': 'n7best@gmail.com',
		'url': 'https://github.com/n7best',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/7037381?v=3',
		'company': '',
		'followers': {
			'totalCount': 31
		},
		'following': {
			'totalCount': 2
		},
		'repositories': {
			'totalCount': 38
		},
		'price': 71
	}
}, {
	'node': {
		'login': 'pbunsee',
		'name': 'Pranesha Bunsee',
		'email': '',
		'url': 'https://github.com/pbunsee',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/12846621?v=3',
		'company': '',
		'followers': {
			'totalCount': 10
		},
		'following': {
			'totalCount': 25
		},
		'repositories': {
			'totalCount': 35
		},
		'price': 70
	}
}, {
	'node': {
		'login': 'adrocknaphobia',
		'name': 'Adam Lehman',
		'email': '',
		'url': 'https://github.com/adrocknaphobia',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/1197545?v=3',
		'company': '@adobe ',
		'followers': {
			'totalCount': 44
		},
		'following': {
			'totalCount': 8
		},
		'repositories': {
			'totalCount': 13
		},
		'price': 65
	}
}, {
	'node': {
		'login': 'Queeniebee',
		'name': '',
		'email': '',
		'url': 'https://github.com/Queeniebee',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/1273608?v=3',
		'company': '',
		'followers': {
			'totalCount': 7
		},
		'following': {
			'totalCount': 7
		},
		'repositories': {
			'totalCount': 50
		},
		'price': 64
	}
}, {
	'node': {
		'login': 'cgack',
		'name': 'Cory Gackenheimer',
		'email': '',
		'url': 'https://github.com/cgack',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/688148?v=3',
		'company': 'Healthx',
		'followers': {
			'totalCount': 19
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 40
		},
		'price': 60
	}
}, {
	'node': {
		'login': 'angryjenkins',
		'name': 'Matthew N. Martin',
		'email': 'matt@angryjenkins.com',
		'url': 'https://github.com/angryjenkins',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/14875183?v=3',
		'company': '',
		'followers': {
			'totalCount': 6
		},
		'following': {
			'totalCount': 7
		},
		'repositories': {
			'totalCount': 43
		},
		'price': 56
	}
}, {
	'node': {
		'login': 'alexrqs',
		'name': 'Alexander',
		'email': '',
		'url': 'https://github.com/alexrqs',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/1099589?v=3',
		'company': '',
		'followers': {
			'totalCount': 37
		},
		'following': {
			'totalCount': 4
		},
		'repositories': {
			'totalCount': 14
		},
		'price': 55
	}
}, {
	'node': {
		'login': 'platinumazure',
		'name': 'Kevin Partington',
		'email': 'platinum.azure@kernelpanicstudios.com',
		'url': 'https://github.com/platinumazure',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/284282?v=3',
		'company': '',
		'followers': {
			'totalCount': 15
		},
		'following': {
			'totalCount': 7
		},
		'repositories': {
			'totalCount': 33
		},
		'price': 55
	}
}, {
	'node': {
		'login': 'tekd',
		'name': 'Denny Tek',
		'email': '',
		'url': 'https://github.com/tekd',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/9205941?v=3',
		'company': '',
		'followers': {
			'totalCount': 5
		},
		'following': {
			'totalCount': 4
		},
		'repositories': {
			'totalCount': 43
		},
		'price': 52
	}
}, {
	'node': {
		'login': 'theutahkate',
		'name': 'Utah K Newman',
		'email': 'utah.kate.newman@gmail.com',
		'url': 'https://github.com/theutahkate',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/5475551?v=3',
		'company': '',
		'followers': {
			'totalCount': 11
		},
		'following': {
			'totalCount': 4
		},
		'repositories': {
			'totalCount': 35
		},
		'price': 50
	}
}, {
	'node': {
		'login': 'rubymorillo',
		'name': 'Stephanie Morillo',
		'email': '',
		'url': 'https://github.com/rubymorillo',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/3386562?v=3',
		'company': '',
		'followers': {
			'totalCount': 23
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 24
		},
		'price': 48
	}
}, {
	'node': {
		'login': 'kimcoop',
		'name': null,
		'email': null,
		'url': 'https://github.com/kimcoop',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/1010665?v=3',
		'company': null,
		'followers': {
			'totalCount': 12
		},
		'following': {
			'totalCount': 4
		},
		'repositories': {
			'totalCount': 31
		},
		'price': 47
	}
}, {
	'node': {
		'login': 'bethge',
		'name': 'Marius Stefan Bethge',
		'email': 'marius.bethge@gmail.com',
		'url': 'https://github.com/bethge',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/522575?v=3',
		'company': 'Albert-Ludwigs-University Freiburg',
		'followers': {
			'totalCount': 34
		},
		'following': {
			'totalCount': 6
		},
		'repositories': {
			'totalCount': 7
		},
		'price': 47
	}
}, {
	'node': {
		'login': 'jorydotcom',
		'name': 'Jory Burson',
		'email': 'jory@bocoup.com',
		'url': 'https://github.com/jorydotcom',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/1355039?v=3',
		'company': 'Bocoup',
		'followers': {
			'totalCount': 27
		},
		'following': {
			'totalCount': 7
		},
		'repositories': {
			'totalCount': 10
		},
		'price': 44
	}
}, {
	'node': {
		'login': 'arghgr',
		'name': 'bianca c',
		'email': '',
		'url': 'https://github.com/arghgr',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/3230717?v=3',
		'company': '',
		'followers': {
			'totalCount': 7
		},
		'following': {
			'totalCount': 17
		},
		'repositories': {
			'totalCount': 20
		},
		'price': 44
	}
}, {
	'node': {
		'login': 'rjollos',
		'name': 'Ryan J Ollos',
		'email': 'ryan.j.ollos@gmail.com',
		'url': 'https://github.com/rjollos',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/1152089?v=3',
		'company': 'Verasonics, Inc.',
		'followers': {
			'totalCount': 21
		},
		'following': {
			'totalCount': 7
		},
		'repositories': {
			'totalCount': 12
		},
		'price': 40
	}
}, {
	'node': {
		'login': 'joelgkinney',
		'name': 'Joel G. Kinney',
		'email': 'joel@fortpointlegal.com',
		'url': 'https://github.com/joelgkinney',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/1663719?v=3',
		'company': 'Fort Point Legal',
		'followers': {
			'totalCount': 12
		},
		'following': {
			'totalCount': 24
		},
		'repositories': {
			'totalCount': 3
		},
		'price': 39
	}
}, {
	'node': {
		'login': 'taraadiseshan',
		'name': 'Tara Adiseshan',
		'email': '',
		'url': 'https://github.com/taraadiseshan',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/2432062?v=3',
		'company': '',
		'followers': {
			'totalCount': 6
		},
		'following': {
			'totalCount': 7
		},
		'repositories': {
			'totalCount': 18
		},
		'price': 31
	}
}, {
	'node': {
		'login': 'lady3bean',
		'name': 'Hawley',
		'email': 'lady3bean@users.noreply.github.com',
		'url': 'https://github.com/lady3bean',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/10011287?v=3',
		'company': '@Bernie-2016 ',
		'followers': {
			'totalCount': 7
		},
		'following': {
			'totalCount': 6
		},
		'repositories': {
			'totalCount': 16
		},
		'price': 29
	}
}, {
	'node': {
		'login': 'aspaceforsound',
		'name': 'Rena Anakwe',
		'email': 'rena@aspaceforsound.com',
		'url': 'https://github.com/aspaceforsound',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/5399917?v=3',
		'company': 'A Space for Sound LLC',
		'followers': {
			'totalCount': 6
		},
		'following': {
			'totalCount': 9
		},
		'repositories': {
			'totalCount': 14
		},
		'price': 29
	}
}, {
	'node': {
		'login': 'sarahduve',
		'name': 'Sarah Duve',
		'email': '',
		'url': 'https://github.com/sarahduve',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/2575390?v=3',
		'company': '',
		'followers': {
			'totalCount': 11
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 11
		},
		'price': 23
	}
}, {
	'node': {
		'login': 'danielle-b',
		'name': 'Danielle Brantley',
		'email': '',
		'url': 'https://github.com/danielle-b',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/10361140?v=3',
		'company': '',
		'followers': {
			'totalCount': 1
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 22
		},
		'price': 23
	}
}, {
	'node': {
		'login': 'bentonam',
		'name': 'Aaron',
		'email': '',
		'url': 'https://github.com/bentonam',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/442745?v=3',
		'company': '',
		'followers': {
			'totalCount': 9
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 11
		},
		'price': 21
	}
}, {
	'node': {
		'login': 'theaemarie',
		'name': 'Amy Etheredge',
		'email': 'amy.etheredge@gmail.com',
		'url': 'https://github.com/theaemarie',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/10343400?v=3',
		'company': '',
		'followers': {
			'totalCount': 5
		},
		'following': {
			'totalCount': 3
		},
		'repositories': {
			'totalCount': 11
		},
		'price': 19
	}
}, {
	'node': {
		'login': 'rdugue',
		'name': 'Ralph Dugue',
		'email': '',
		'url': 'https://github.com/rdugue',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/5379112?v=3',
		'company': '',
		'followers': {
			'totalCount': 3
		},
		'following': {
			'totalCount': 4
		},
		'repositories': {
			'totalCount': 10
		},
		'price': 17
	}
}, {
	'node': {
		'login': 'aricearice',
		'name': 'Alice Yang',
		'email': 'alice.yang@me.com',
		'url': 'https://github.com/aricearice',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/6108994?v=3',
		'company': '',
		'followers': {
			'totalCount': 4
		},
		'following': {
			'totalCount': 4
		},
		'repositories': {
			'totalCount': 8
		},
		'price': 16
	}
}, {
	'node': {
		'login': 'snewcomb',
		'name': null,
		'email': null,
		'url': 'https://github.com/snewcomb',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/880104?v=3',
		'company': null,
		'followers': {
			'totalCount': 14
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 1
		},
		'price': 16
	}
}, {
	'node': {
		'login': 'andybs',
		'name': 'Andy Smith',
		'email': '',
		'url': 'https://github.com/andybs',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/423690?v=3',
		'company': 'IBM',
		'followers': {
			'totalCount': 2
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 11
		},
		'price': 14
	}
}, {
	'node': {
		'login': 'StevenAyr',
		'name': 'Steven Ayr',
		'email': 'steve@fortpointlegal.com',
		'url': 'https://github.com/StevenAyr',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/6910856?v=3',
		'company': 'Fort Point Legal PC',
		'followers': {
			'totalCount': 3
		},
		'following': {
			'totalCount': 1
		},
		'repositories': {
			'totalCount': 6
		},
		'price': 10
	}
}, {
	'node': {
		'login': 'JacquesPerrault',
		'name': 'Jacques Perrault',
		'email': 'jacques_perrault@us.ibm.com',
		'url': 'https://github.com/JacquesPerrault',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/521638?v=3',
		'company': 'IBM',
		'followers': {
			'totalCount': 2
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 7
		},
		'price': 9
	}
}, {
	'node': {
		'login': 'jquerybot',
		'name': null,
		'email': null,
		'url': 'https://github.com/jquerybot',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/2255191?v=3',
		'company': null,
		'followers': {
			'totalCount': 5
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 0
		},
		'price': 5
	}
}, {
	'node': {
		'login': 'subaha',
		'name': '',
		'email': '',
		'url': 'https://github.com/subaha',
		'avatarURL': 'https://avatars0.githubusercontent.com/u/7139681?v=3',
		'company': '',
		'followers': {
			'totalCount': 0
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 3
		},
		'price': 3
	}
}, {
	'node': {
		'login': 'ericladd',
		'name': null,
		'email': null,
		'url': 'https://github.com/ericladd',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/2287906?v=3',
		'company': null,
		'followers': {
			'totalCount': 0
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 2
		},
		'price': 2
	}
}, {
	'node': {
		'login': 'JSFOwner',
		'name': 'JS Foundation GitHub Owner',
		'email': '',
		'url': 'https://github.com/JSFOwner',
		'avatarURL': 'https://avatars2.githubusercontent.com/u/17435044?v=3',
		'company': '@JSFoundation',
		'followers': {
			'totalCount': 1
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 0
		},
		'price': 1
	}
}, {
	'node': {
		'login': 'jqdeploy',
		'name': null,
		'email': null,
		'url': 'https://github.com/jqdeploy',
		'avatarURL': 'https://avatars1.githubusercontent.com/u/453259?v=3',
		'company': null,
		'followers': {
			'totalCount': 0
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 0
		},
		'price': 0
	}
}, {
	'node': {
		'login': 'Vaygh',
		'name': 'Darius McCaskey',
		'email': '',
		'url': 'https://github.com/Vaygh',
		'avatarURL': 'https://avatars3.githubusercontent.com/u/14252794?v=3',
		'company': '',
		'followers': {
			'totalCount': 0
		},
		'following': {
			'totalCount': 0
		},
		'repositories': {
			'totalCount': 0
		},
		'price': 0
	}
}]

router.get('/', (req, res) => {
	const cachedDevs = JSON.parse(cache.get('devs'))
	if (!cachedDevs || !cachedDevs.length) {
		return res.status(200).json(items)
		// return res.status(404).json({error: 'developers not found'})
	}

	res.json(cachedDevs)
})

export default router
