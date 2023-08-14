var icon_obj = {

	_now : false,
	_selected : false,
	
	_icons_company : [
		{ 'name' : 'Bootstrap Icons'},						
	],
	_icons_group : [
		[
			{ 'name' : 'alerts, warnings, and signs', 'icon' : ['check','check-circle','check-circle-fill','check-lg','check-square','check-square-fill','slash-circle','dash','dash-circle','dash-circle-dotted','dash-circle-fill','dash-lg','dash-square','dash-square-dotted','dash-square-fill','exclamation','exclamation-circle','exclamation-circle-fill','exclamation-diamond','exclamation-diamond-fill','exclamation-lg','exclamation-octagon','exclamation-octagon-fill','exclamation-square','exclamation-square-fill','exclamation-triangle','exclamation-triangle-fill','info','info-circle','info-circle-fill','info-lg','info-square','info-square-fill','plus','plus-circle','plus-circle-dotted','plus-circle-fill','plus-lg','plus-square','plus-square-dotted','plus-square-fill','question','question-circle','question-diamond','question-diamond-fill','question-circle-fill','question-lg','question-octagon','question-octagon-fill','question-square','question-square-fill','slash','slash-circle-fill','slash-lg','slash-square','slash-square-fill','x','x-circle','x-circle-fill','x-diamond','x-diamond-fill','x-lg','x-octagon','x-octagon-fill','x-square','x-square-fill'] },
			{ 'name' : 'apps', 'icon' : ['app','app-indicator','terminal','terminal-dash','terminal-fill','terminal-plus','terminal-split','terminal-x','window-dash','window-desktop','window-dock','window-fullscreen','window-plus','window-sidebar','window-split','window-stack','window-x'] },
			{ 'name' : 'arrows', 'icon' : ['arrow-90deg-down','arrow-90deg-left','arrow-90deg-right','arrow-90deg-up','arrow-bar-down','arrow-bar-left','arrow-bar-right','arrow-bar-up','arrow-clockwise','arrow-counterclockwise','arrow-down','arrow-down-left','arrow-down-right','arrow-down-short','arrow-down-up','arrow-left','arrow-left-right','arrow-left-short','arrow-repeat','arrow-return-left','arrow-return-right','arrow-right','arrow-right-short','arrow-up','arrow-up-left','arrow-up-right','arrow-up-short','arrows-angle-contract','arrows-angle-expand','arrows-collapse','arrows-expand','arrows-fullscreen','arrows-move','recycle','shuffle','arrow-through-heart','arrow-through-heart-fill'] },
			{ 'name' : 'badges', 'icon' : ['badge-3d','badge-3d-fill','badge-4k','badge-4k-fill','badge-8k','badge-8k-fill','badge-ad','badge-ad-fill','badge-ar','badge-ar-fill','badge-cc','badge-cc-fill','badge-hd','badge-hd-fill','badge-sd','badge-sd-fill','badge-tm','badge-tm-fill','badge-vo','badge-vo-fill','badge-vr','badge-vr-fill','badge-wc','badge-wc-fill','explicit','explicit-fill','markdown','markdown-fill','patch-check','patch-check-fill','patch-exclamation','patch-exclamation-fill','patch-minus','patch-minus-fill','patch-plus','patch-plus-fill','patch-question','patch-question-fill'] },
			{ 'name' : 'box arrows', 'icon' : ['box-arrow-down-left','box-arrow-down-right','box-arrow-down','box-arrow-in-down','box-arrow-in-down-left','box-arrow-in-down-right','box-arrow-in-left','box-arrow-in-right','box-arrow-in-up','box-arrow-in-up-left','box-arrow-in-up-right','box-arrow-left','box-arrow-right','box-arrow-up','box-arrow-up-left','box-arrow-up-right'] },
			{ 'name' : 'brand', 'icon' : ['alipay','amd','android','android2','apple','behance','bluetooth','browser-chrome','browser-edge','browser-firefox','browser-safari','discord','dribbble','dropbox','facebook','git','github','google','google-play','instagram','line','linkedin','mastodon','medium','messenger','meta','microsoft','microsoft-teams','nintendo-switch','nvidia','paypal','pinterest','playstation','quora','reddit','signal','sina-weibo','skype','slack','snapchat','spotify','stack-overflow','steam','strava','stripe','telegram','tencent-qq','tiktok','trello','twitch','twitter','ubuntu','unity','vimeo','wechat','whatsapp','wikipedia','windows','wordpress','xbox','yelp','youtube','bootstrap','bootstrap-fill','bootstrap-reboot'] },
			{ 'name' : 'buildings', 'icon' : ['building','building-add','building-check','building-dash','building-down','building-exclamation','building-fill','building-fill-add','building-fill-check','building-fill-dash','building-fill-down','building-fill-exclamation','building-fill-gear','building-fill-lock','building-fill-slash','building-fill-up','building-fill-x','building-gear','building-lock','building-slash','building-up','building-x','buildings','buildings-fill'] },
			{ 'name' : 'carets', 'icon' : ['caret-down','caret-down-fill','caret-down-square','caret-down-square-fill','caret-left','caret-left-fill','caret-left-square','caret-left-square-fill','caret-right','caret-right-fill','caret-right-square','caret-right-square-fill','caret-up','caret-up-fill','caret-up-square','caret-up-square-fill'] },
			{ 'name' : 'chevrons', 'icon' : ['chevron-bar-contract','chevron-bar-down','chevron-bar-expand','chevron-bar-left','chevron-bar-right','chevron-bar-up','chevron-compact-down','chevron-compact-left','chevron-compact-right','chevron-compact-up','chevron-contract','chevron-double-down','chevron-double-left','chevron-double-right','chevron-double-up','chevron-down','chevron-left','chevron-right','chevron-up','chevron-expand'] },
			{ 'name' : 'clouds', 'icon' : ['cloud','cloud-arrow-down','cloud-arrow-down-fill','cloud-arrow-up','cloud-arrow-up-fill','cloud-check','cloud-check-fill','cloud-download','cloud-download-fill','cloud-fill','cloud-minus','cloud-minus-fill','cloud-plus','cloud-plus-fill','cloud-slash','cloud-slash-fill','cloud-upload','cloud-upload-fill'] },
			{ 'name' : 'commerce', 'icon' : ['bag','bag-check','bag-check-fill','bag-dash','bag-dash-fill','bag-fill','bag-heart','bag-heart-fill','bag-plus','bag-plus-fill','bag-x','bag-x-fill','bank','bank2','basket','basket-fill','basket2','basket2-fill','basket3','basket3-fill','cart','cart-check','cart-check-fill','cart-dash','cart-dash-fill','cart-fill','cart-plus','cart-plus-fill','cart-x','cart-x-fill','cart2','cart3','cart4','cash','cash-coin','cash-stack','coin','currency-bitcoin','currency-dollar','currency-euro','currency-exchange','currency-pound','currency-rupee','currency-yen','piggy-bank','piggy-bank-fill','receipt','receipt-cutoff','shop','shop-window','truck','truck-flatbed','upc','upc-scan','wallet','wallet-fill','wallet2'] },
			{ 'name' : 'communications', 'icon' : ['at','bell','bell-fill','bell-slash','bell-slash-fill','broadcast','broadcast-pin','chat','chat-dots','chat-dots-fill','chat-fill','chat-left','chat-left-dots','chat-left-dots-fill','chat-left-fill','chat-left-quote','chat-left-quote-fill','chat-left-text','chat-left-text-fill','chat-quote','chat-quote-fill','chat-right','chat-right-dots','chat-right-dots-fill','chat-right-fill','chat-right-quote','chat-right-quote-fill','chat-right-text','chat-right-text-fill','chat-square','chat-square-dots','chat-square-dots-fill','chat-square-fill','chat-square-quote','chat-square-quote-fill','chat-square-text','chat-square-text-fill','chat-text','chat-text-fill','envelope','envelope-at','envelope-at-fill','envelope-check','envelope-check-fill','envelope-dash','envelope-dash-fill','envelope-exclamation','envelope-exclamation-fill','envelope-fill','envelope-heart','envelope-heart-fill','envelope-open','envelope-open-fill','envelope-open-heart','envelope-open-heart-fill','envelope-paper','envelope-paper-fill','envelope-paper-heart','envelope-paper-heart-fill','envelope-plus','envelope-plus-fill','envelope-slash','envelope-slash-fill','envelope-x','envelope-x-fill','flag','flag-fill','forward','forward-fill','globe','globe2','inbox','inbox-fill','inboxes-fill','inboxes','qr-code','qr-code-scan','reception-0','reception-1','reception-2','reception-3','reception-4','reply','reply-all','reply-all-fill','reply-fill','rss','rss-fill','search','send','send-check','send-check-fill','send-dash','send-dash-fill','send-exclamation','send-exclamation-fill','send-fill','send-plus','send-plus-fill','send-slash','send-slash-fill','send-x','send-x-fill','share','share-fill','telephone','telephone-fill','telephone-forward','telephone-forward-fill','telephone-inbound','telephone-inbound-fill','telephone-minus','telephone-minus-fill','telephone-outbound','telephone-outbound-fill','telephone-plus','telephone-plus-fill','telephone-x','telephone-x-fill','translate','voicemail','wifi','wifi-1','wifi-2','wifi-off','chat-heart','chat-heart-fill','chat-left-heart','chat-left-heart-fill','chat-right-heart','chat-right-heart-fill','chat-square-heart','chat-square-heart-fill','search-heart','search-heart-fill'] },
			{ 'name' : 'controls', 'icon' : ['menu-app','menu-app-fill','menu-button','menu-button-fill','menu-button-wide','menu-button-wide-fill','menu-down','menu-up','segmented-nav','three-dots','three-dots-vertical','toggle-off','toggle-on','toggle2-off','toggle2-on','toggles','toggles2','ui-checks','ui-checks-grid','ui-radios','ui-radios-grid'] },
			{ 'name' : 'data', 'icon' : ['activity','bar-chart','bar-chart-fill','bar-chart-line','bar-chart-line-fill','bar-chart-steps','graph-down','graph-down-arrow','graph-up','graph-up-arrow','pie-chart','pie-chart-fill'] },
			{ 'name' : 'date and time', 'icon' : ['calendar','calendar-check','calendar-check-fill','calendar-date','calendar-date-fill','calendar-day','calendar-day-fill','calendar-event','calendar-event-fill','calendar-fill','calendar-minus','calendar-minus-fill','calendar-month','calendar-month-fill','calendar-plus','calendar-plus-fill','calendar-range','calendar-range-fill','calendar-week','calendar-week-fill','calendar-x','calendar-x-fill','calendar2','calendar2-check','calendar2-check-fill','calendar2-date','calendar2-date-fill','calendar2-day','calendar2-day-fill','calendar2-event','calendar2-event-fill','calendar2-fill','calendar2-minus','calendar2-minus-fill','calendar2-month','calendar2-month-fill','calendar2-plus','calendar2-plus-fill','calendar2-range','calendar2-range-fill','calendar2-week','calendar2-week-fill','calendar2-x','calendar2-x-fill','calendar3','calendar3-event','calendar3-event-fill','calendar3-fill','calendar3-range','calendar3-range-fill','calendar3-week','calendar3-week-fill','calendar4','calendar4-event','calendar4-range','calendar4-week','calendar-heart','calendar-heart-fill','calendar2-heart','calendar2-heart-fill'] },
			{ 'name' : 'devices', 'icon' : ['alarm','alarm-fill','battery','battery-charging','battery-full','battery-half','calculator','calculator-fill','camera','camera2','camera-fill','camera-reels','camera-reels-fill','camera-video','camera-video-fill','camera-video-off','camera-video-off-fill','controller','cpu','cpu-fill','database','database-add','database-check','database-dash','database-down','database-exclamation','database-fill','database-fill-add','database-fill-check','database-fill-dash','database-fill-down','database-fill-exclamation','database-fill-gear','database-fill-lock','database-fill-slash','database-fill-up','database-fill-x','database-gear','database-lock','database-slash','database-up','database-x','device-hdd','device-hdd-fill','device-ssd','device-ssd-fill','display','display-fill','displayport','displayport-fill','earbuds','ethernet','gpu-card','hdd','hdd-fill','hdd-network','hdd-network-fill','hdd-rack','hdd-rack-fill','hdd-stack','hdd-stack-fill','hdmi','hdmi-fill','headphones','headset','headset-vr','keyboard','keyboard-fill','laptop','laptop-fill','memory','modem','modem-fill','motherboard','motherboard-fill','mouse','mouse-fill','mouse2','mouse2-fill','mouse3','mouse3-fill','music-player','music-player-fill','optical-audio','optical-audio-fill','pc','pc-display','pc-display-horizontal','pc-horizontal','pci-card','phone','phone-fill','phone-flip','phone-landscape','phone-landscape-fill','phone-vibrate','phone-vibrate-fill','printer','printer-fill','projector','projector-fill','robot','router','router-fill','sd-card','sd-card-fill','server','sim','sim-fill','smartwatch','speaker','speaker-fill','stopwatch','stopwatch-fill','tablet','tablet-fill','tablet-landscape','tablet-landscape-fill','thunderbolt','thunderbolt-fill','tv','tv-fill','usb','usb-c','usb-c-fill','usb-drive','usb-drive-fill','usb-fill','usb-micro','usb-micro-fill','usb-mini','usb-mini-fill','usb-plug','usb-plug-fill','usb-symbol','watch','webcam','webcam-fill'] },
			{ 'name' : 'emoji', 'icon' : ['emoji-angry','emoji-angry-fill','emoji-dizzy','emoji-dizzy-fill','emoji-expressionless','emoji-expressionless-fill','emoji-frown','emoji-frown-fill','emoji-heart-eyes','emoji-heart-eyes-fill','emoji-kiss','emoji-kiss-fill','emoji-laughing','emoji-laughing-fill','emoji-neutral','emoji-neutral-fill','emoji-smile','emoji-smile-fill','emoji-smile-upside-down','emoji-smile-upside-down-fill','emoji-sunglasses','emoji-sunglasses-fill','emoji-wink','emoji-wink-fill','heartbreak','heartbreak-fill'] },
			{ 'name' : 'entertainment', 'icon' : ['dice-1','dice-1-fill','dice-2','dice-2-fill','dice-3','dice-3-fill','dice-4','dice-4-fill','dice-5','dice-5-fill','dice-6','dice-6-fill','dpad','dpad-fill','joystick','suit-club','suit-club-fill','suit-diamond','suit-diamond-fill','suit-heart','suit-heart-fill','suit-spade','suit-spade-fill'] },
			{ 'name' : 'files and folders', 'icon' : ['archive','archive-fill','card-checklist','card-heading','card-image','card-list','card-text','file','file-arrow-down','file-arrow-down-fill','file-arrow-up','file-arrow-up-fill','file-bar-graph','file-bar-graph-fill','file-binary','file-binary-fill','file-break','file-break-fill','file-check','file-check-fill','file-code','file-code-fill','file-diff','file-diff-fill','file-earmark','file-earmark-arrow-down','file-earmark-arrow-down-fill','file-earmark-arrow-up','file-earmark-arrow-up-fill','file-earmark-bar-graph','file-earmark-bar-graph-fill','file-earmark-binary','file-earmark-binary-fill','file-earmark-break','file-earmark-break-fill','file-earmark-check','file-earmark-check-fill','file-earmark-code','file-earmark-code-fill','file-earmark-diff','file-earmark-diff-fill','file-earmark-easel','file-earmark-easel-fill','file-earmark-excel','file-earmark-excel-fill','file-earmark-fill','file-earmark-font','file-earmark-font-fill','file-earmark-image','file-earmark-image-fill','file-earmark-lock','file-earmark-lock-fill','file-earmark-lock2','file-earmark-lock2-fill','file-earmark-medical','file-earmark-medical-fill','file-earmark-minus','file-earmark-minus-fill','file-earmark-music','file-earmark-music-fill','file-earmark-pdf','file-earmark-pdf-fill','file-earmark-person','file-earmark-person-fill','file-earmark-play','file-earmark-play-fill','file-earmark-plus','file-earmark-plus-fill','file-earmark-post','file-earmark-post-fill','file-earmark-ppt','file-earmark-ppt-fill','file-earmark-richtext','file-earmark-richtext-fill','file-earmark-ruled','file-earmark-ruled-fill','file-earmark-slides','file-earmark-slides-fill','file-earmark-spreadsheet','file-earmark-spreadsheet-fill','file-earmark-text','file-earmark-text-fill','file-earmark-word','file-earmark-word-fill','file-earmark-x','file-earmark-x-fill','file-earmark-zip','file-earmark-zip-fill','file-easel','file-easel-fill','file-excel','file-excel-fill','file-fill','file-font','file-font-fill','file-image','file-image-fill','file-lock','file-lock-fill','file-lock2','file-lock2-fill','file-medical','file-medical-fill','file-minus','file-minus-fill','file-music','file-music-fill','file-pdf','file-pdf-fill','file-person','file-person-fill','file-play','file-play-fill','file-plus','file-plus-fill','file-post','file-post-fill','file-ppt','file-ppt-fill','file-richtext','file-richtext-fill','file-ruled','file-ruled-fill','file-slides','file-slides-fill','file-spreadsheet','file-spreadsheet-fill','file-text','file-text-fill','file-word','file-word-fill','file-x','file-x-fill','file-zip','file-zip-fill','files','files-alt','filetype-aac','filetype-ai','filetype-bmp','filetype-cs','filetype-css','filetype-csv','filetype-doc','filetype-docx','filetype-exe','filetype-gif','filetype-heic','filetype-html','filetype-java','filetype-jpg','filetype-js','filetype-json','filetype-jsx','filetype-key','filetype-m4p','filetype-md','filetype-mdx','filetype-mov','filetype-mp3','filetype-mp4','filetype-otf','filetype-pdf','filetype-php','filetype-png','filetype-pptx','filetype-psd','filetype-py','filetype-raw','filetype-rb','filetype-sass','filetype-scss','filetype-sh','filetype-sql','filetype-svg','filetype-tiff','filetype-tsx','filetype-ttf','filetype-txt','filetype-wav','filetype-woff','filetype-xlsx','filetype-xml','filetype-yml','filetype-ppt','filetype-xls','folder','folder-check','folder-fill','folder-minus','folder-plus','folder-symlink','folder-symlink-fill','folder-x','folder2','folder2-open','image','image-alt','image-fill','images','journal','journal-album','journal-arrow-down','journal-arrow-up','journal-bookmark','journal-bookmark-fill','journal-check','journal-code','journal-medical','journal-minus','journal-plus','journal-richtext','journal-text','journal-x','journals','table','pass','pass-fill'] },
			{ 'name' : 'geo', 'icon' : ['bullseye','compass','compass-fill','cursor','cursor-fill','geo','geo-alt','geo-alt-fill','geo-fill','globe-americas','globe-asia-australia','globe-central-south-asia','globe-europe-africa','map','map-fill','pin-map','pin-map-fill'] },
			{ 'name' : 'graphics', 'icon' : ['align-bottom','align-center','align-end','align-middle','align-start','align-top','back','bezier','bezier2','bounding-box','bounding-box-circles','circle-square','crop','diagram-2','diagram-2-fill','diagram-3','diagram-3-fill','distribute-horizontal','distribute-vertical','droplet','droplet-fill','droplet-half','easel','easel-fill','easel2','easel2-fill','easel3','easel3-fill','eraser','eraser-fill','exclude','eyedropper','front','input-cursor','input-cursor-text','intersect','layer-backward','layer-forward','layers','layers-fill','layers-half','mask','node-minus','node-minus-fill','node-plus','node-plus-fill','paint-bucket','palette','palette-fill','palette2','rulers','sliders','sliders2','sliders2-vertical','stack','subtract','symmetry-horizontal','symmetry-vertical','textarea','textarea-resize','textarea-t','union','vector-pen','zoom-in','zoom-out'] },
			{ 'name' : 'hands', 'icon' : ['hand-index','hand-index-fill','hand-index-thumb','hand-index-thumb-fill','hand-thumbs-down','hand-thumbs-down-fill','hand-thumbs-up','hand-thumbs-up-fill'] },
			{ 'name' : 'layout', 'icon' : ['columns','columns-gap','grid','grid-1x2','grid-1x2-fill','grid-3x2','grid-3x2-gap','grid-3x2-gap-fill','grid-3x3','grid-3x3-gap','grid-3x3-gap-fill','grid-fill','layout-sidebar','layout-sidebar-inset-reverse','layout-sidebar-inset','layout-sidebar-reverse','layout-split','layout-text-sidebar','layout-text-sidebar-reverse','layout-text-window','layout-text-window-reverse','layout-three-columns','layout-wtf','window'] },
			{ 'name' : 'love', 'icon' : ['heart-arrow','hearts','valentine','valentine2'] },
			{ 'name' : 'media', 'icon' : ['aspect-ratio','aspect-ratio-fill','cassette','cassette-fill','cast','collection','collection-fill','collection-play','collection-play-fill','disc','disc-fill','fast-forward','fast-forward-btn','fast-forward-btn-fill','fast-forward-circle','fast-forward-circle-fill','fast-forward-fill','film','mic','mic-fill','mic-mute','mic-mute-fill','music-note','music-note-beamed','music-note-list','pause','pause-btn','pause-btn-fill','pause-circle','pause-circle-fill','pause-fill','pip','pip-fill','play','play-btn','play-btn-fill','play-circle','play-circle-fill','play-fill','record','record-btn','record-btn-fill','record-circle','record-circle-fill','record-fill','record2','record2-fill','repeat','repeat-1','rewind','rewind-btn','rewind-btn-fill','rewind-circle','rewind-circle-fill','rewind-fill','skip-backward','skip-backward-btn','skip-backward-btn-fill','skip-backward-circle','skip-backward-circle-fill','skip-backward-fill','skip-end','skip-end-btn','skip-end-btn-fill','skip-end-circle','skip-end-circle-fill','skip-end-fill','skip-forward','skip-forward-btn','skip-forward-btn-fill','skip-forward-circle','skip-forward-circle-fill','skip-forward-fill','skip-start','skip-start-btn','skip-start-btn-fill','skip-start-circle','skip-start-circle-fill','skip-start-fill','soundwave','stop','stop-btn','stop-btn-fill','stop-circle','stop-circle-fill','stop-fill','vinyl-fill','volume-down','volume-down-fill','volume-mute','volume-mute-fill','volume-off','volume-off-fill','volume-up','volume-up-fill','vinyl'] },
			{ 'name' : 'medical', 'icon' : ['capsule','capsule-pill','heart-pulse','heart-pulse-fill','hospital','hospital-fill','lungs','lungs-fill','prescription','prescription2','virus','virus2'] },
			{ 'name' : 'miscellaneous', 'icon' : ['bookmark','bookmark-check','bookmark-check-fill','bookmark-dash','bookmark-dash-fill','bookmark-fill','bookmark-heart','bookmark-heart-fill','bookmark-plus','bookmark-plus-fill','bookmark-star','bookmark-star-fill','bookmark-x','bookmark-x-fill','bookmarks','bookmarks-fill','clock','clock-fill','clock-history','download','incognito','kanban','kanban-fill','lightning-charge','lightning-charge-fill','peace','peace-fill','puzzle','puzzle-fill','upload'] },
			{ 'name' : 'people', 'icon' : ['gender-ambiguous','gender-female','gender-male','gender-trans','people','person-circle','people-fill','person','person-add','person-badge','person-badge-fill','person-bounding-box','person-check','person-check-fill','person-dash','person-dash-fill','person-down','person-exclamation','person-fill','person-fill-add','person-fill-check','person-fill-dash','person-fill-down','person-fill-exclamation','person-fill-gear','person-fill-lock','person-fill-slash','person-fill-up','person-fill-x','person-gear','person-heart','person-hearts','person-lines-fill','person-lock','person-plus','person-plus-fill','person-rolodex','person-slash','person-square','person-up','person-vcard','person-vcard-fill','person-video','person-video2','person-video3','person-workspace','person-x','person-x-fill'] },
			{ 'name' : 'real world', 'icon' : ['award','award-fill','balloon','balloon-fill','bandaid','bandaid-fill','bicycle','binoculars','binoculars-fill','book','book-fill','book-half','bookshelf','boombox','boombox-fill','boxes','box','box-fill','box-seam','box-seam-fill','box2','bricks','briefcase','briefcase-fill','bug','bug-fill','clipboard','clipboard-check','clipboard-check-fill','clipboard-data','clipboard-data-fill','clipboard-fill','clipboard-heart','clipboard-heart-fill','clipboard-minus','clipboard-minus-fill','clipboard-plus','clipboard-plus-fill','clipboard-pulse','clipboard-x','clipboard-x-fill','clipboard2','clipboard2-check','clipboard2-check-fill','clipboard2-data','clipboard2-data-fill','clipboard2-fill','clipboard2-heart','clipboard2-heart-fill','clipboard2-minus','clipboard2-minus-fill','clipboard2-plus','clipboard2-plus-fill','clipboard2-x','clipboard2-x-fill','cone','cone-striped','credit-card','credit-card-2-back','credit-card-2-back-fill','credit-card-2-front','credit-card-2-front-fill','credit-card-fill','cup','cup-fill','cup-hot','cup-hot-fill','cup-straw','door-closed','door-closed-fill','door-open','door-open-fill','ear','ear-fill','egg','egg-fill','egg-fried','eye','eye-fill','eye-slash','eye-slash-fill','eyeglasses','fan','fire','flower1','flower2','flower3','funnel','funnel-fill','gift','gift-fill','handbag','handbag-fill','hourglass','hourglass-bottom','hourglass-split','hourglass-top','house','house-add','house-add-fill','house-check','house-check-fill','house-dash','house-dash-fill','house-door','house-door-fill','house-down','house-down-fill','house-exclamation','house-exclamation-fill','house-fill','house-gear','house-gear-fill','house-heart','house-heart-fill','house-lock','house-lock-fill','house-slash','house-slash-fill','house-up','house-up-fill','house-x','house-x-fill','houses','houses-fill','hypnotize','key','key-fill','ladder','lamp','lamp-fill','life-preserver','lightbulb','lightbulb-fill','lightbulb-off','lightbulb-off-fill','magic','magnet','magnet-fill','mailbox','mailbox2','megaphone','megaphone-fill','minecart','minecart-loaded','moon','mortarboard','mortarboard-fill','newspaper','outlet','paperclip','pin','pin-angle','pin-angle-fill','pin-fill','plug','plug-fill','postage','postage-fill','postcard','postcard-fill','radioactive','rocket','rocket-fill','rocket-takeoff','rocket-takeoff-fill','safe','safe-fill','safe2','safe2-fill','scissors','signpost','signpost-2','signpost-2-fill','signpost-fill','signpost-split','signpost-split-fill','speedometer','speedometer2','stickies','stickies-fill','sticky','sticky-fill','stoplights','stoplights-fill','sunglasses','tag','tag-fill','tags','tags-fill','thermometer','ticket','ticket-detailed','ticket-detailed-fill','ticket-fill','ticket-perforated','ticket-perforated-fill','tree','tree-fill','trophy','trophy-fill','yin-yang','balloon-heart','balloon-heart-fill','box2-fill','box2-heart','box2-heart-fill','postage-heart','postage-heart-fill','postcard-heart','postcard-heart-fill','clipboard2-pulse','clipboard2-pulse-fill','alexa'] },
			{ 'name' : 'security', 'icon' : ['fingerprint','lock','lock-fill','shield','shield-check','shield-exclamation','shield-fill','shield-fill-check','shield-fill-exclamation','shield-fill-minus','shield-fill-plus','shield-fill-x','shield-lock','shield-lock-fill','shield-minus','shield-plus','shield-shaded','shield-slash','shield-slash-fill','shield-x','unlock','unlock-fill'] },
			{ 'name' : 'shape arrows', 'icon' : ['arrow-down-circle','arrow-down-circle-fill','arrow-down-left-circle','arrow-down-left-circle-fill','arrow-down-left-square','arrow-down-left-square-fill','arrow-down-right-circle','arrow-down-right-circle-fill','arrow-down-right-square','arrow-down-right-square-fill','arrow-down-square','arrow-down-square-fill','arrow-left-circle','arrow-left-circle-fill','arrow-left-square','arrow-left-square-fill','arrow-right-circle','arrow-right-circle-fill','arrow-right-square','arrow-right-square-fill','arrow-up-circle','arrow-up-circle-fill','arrow-up-left-circle','arrow-up-left-circle-fill','arrow-up-left-square','arrow-up-left-square-fill','arrow-up-right-circle','arrow-up-right-circle-fill','arrow-up-right-square','arrow-up-right-square-fill','arrow-up-square','arrow-up-square-fill'] },
			{ 'name' : 'shapes', 'icon' : ['0-circle','0-circle-fill','0-square','0-square-fill','1-circle','1-circle-fill','1-square','1-square-fill','2-circle','2-circle-fill','2-square','2-square-fill','3-circle','3-circle-fill','3-square','3-square-fill','4-circle','4-circle-fill','4-square','4-square-fill','5-circle','5-circle-fill','5-square','5-square-fill','6-circle','6-circle-fill','6-square','6-square-fill','7-circle','7-circle-fill','7-square','7-square-fill','8-circle','8-circle-fill','8-square','8-square-fill','9-circle','9-circle-fill','9-square','9-square-fill','c-circle','c-circle-fill','c-square','c-square-fill','cc-circle','cc-circle-fill','cc-square','cc-square-fill','circle','circle-fill','circle-half','diamond','diamond-fill','diamond-half','gem','h-circle','h-circle-fill','h-square','h-square-fill','heart','heart-fill','heart-half','heptagon','heptagon-fill','heptagon-half','hexagon','hexagon-fill','hexagon-half','octagon','octagon-fill','octagon-half','p-circle','p-circle-fill','p-square','p-square-fill','pentagon','pentagon-fill','pentagon-half','r-circle','r-circle-fill','r-square','r-square-fill','square','square-fill','square-half','star','star-fill','star-half','triangle','triangle-fill','triangle-half'] },
			{ 'name' : 'sort and filter', 'icon' : ['filter-circle','filter-circle-fill','filter-left','filter-right','filter-square','filter-square-fill','sort-alpha-down','sort-alpha-down-alt','sort-alpha-up','sort-alpha-up-alt','sort-down','sort-down-alt','sort-numeric-down','sort-numeric-down-alt','sort-numeric-up','sort-numeric-up-alt','sort-up','sort-up-alt'] },
			{ 'name' : 'tools', 'icon' : ['brush','brush-fill','bucket','bucket-fill','gear','gear-fill','gear-wide','gear-wide-connected','hammer','nut','nut-fill','pen','pen-fill','pencil','pencil-fill','pencil-square','screwdriver','tools','wrench','wrench-adjustable','wrench-adjustable-circle','wrench-adjustable-circle-fill'] },
			{ 'name' : 'transportation', 'icon' : ['airplane','airplane-engines','airplane-engines-fill','airplane-fill','bus-front','bus-front-fill','car-front','car-front-fill','ev-front','ev-front-fill','ev-station','ev-station-fill','fuel-pump','fuel-pump-diesel','fuel-pump-diesel-fill','fuel-pump-fill','scooter','sign-dead-end','sign-dead-end-fill','sign-do-not-enter','sign-do-not-enter-fill','sign-intersection','sign-intersection-fill','sign-intersection-side','sign-intersection-side-fill','sign-intersection-t','sign-intersection-t-fill','sign-intersection-y','sign-intersection-y-fill','sign-merge-left','sign-merge-left-fill','sign-merge-right','sign-merge-right-fill','sign-no-left-turn','sign-no-left-turn-fill','sign-no-parking','sign-no-parking-fill','sign-no-right-turn','sign-no-right-turn-fill','sign-railroad','sign-railroad-fill','sign-stop','sign-stop-fill','sign-stop-lights','sign-stop-lights-fill','sign-turn-left','sign-turn-left-fill','sign-turn-right','sign-turn-right-fill','sign-turn-slight-left','sign-turn-slight-left-fill','sign-turn-slight-right','sign-turn-slight-right-fill','sign-yield','sign-yield-fill','taxi-front','taxi-front-fill','train-freight-front','train-freight-front-fill','train-front','train-front-fill','train-lightrail-front','train-lightrail-front-fill','truck-front','truck-front-fill'] },
			{ 'name' : 'typography', 'icon' : ['123','asterisk','blockquote-left','blockquote-right','body-text','border-style','border-width','braces','braces-asterisk','code','code-slash','code-square','cursor-text','fonts','hash','hr','infinity','justify','justify-left','justify-right','list','list-check','list-columns','list-columns-reverse','list-nested','list-ol','list-stars','list-task','list-ul','paragraph','percent','plus-slash-minus','quote','regex','spellcheck','subscript','superscript','text-center','text-indent-left','text-indent-right','text-left','text-paragraph','text-right','text-wrap','type','type-bold','type-h1','type-h2','type-h3','type-italic','type-strikethrough','type-underline','vr'] },
			{ 'name' : 'ui and keyboard', 'icon' : ['alt','backspace','backspace-fill','backspace-reverse','backspace-reverse-fill','border','border-all','border-bottom','border-center','border-inner','border-left','border-middle','border-outer','border-right','border-top','brightness-alt-high','brightness-alt-high-fill','brightness-alt-low','brightness-alt-low-fill','brightness-high','brightness-high-fill','brightness-low','brightness-low-fill','capslock','capslock-fill','check-all','check2','check2-all','check2-circle','check2-square','command','dot','eject','eject-fill','escape','filter','fullscreen','fullscreen-exit','grip-horizontal','grip-vertical','indent','link','link-45deg','option','power','save','save-fill','save2','save2-fill','shift','shift-fill','trash','trash-fill','trash2','trash2-fill','trash3','trash3-fill','unindent','universal-access','universal-access-circle','view-list','view-stacked','plugin'] },
			{ 'name' : 'weather', 'icon' : ['cloud-drizzle','cloud-drizzle-fill','cloud-fog','cloud-fog-fill','cloud-fog2','cloud-fog2-fill','cloud-hail','cloud-hail-fill','cloud-haze','cloud-haze-fill','cloud-haze2','cloud-haze2-fill','cloud-lightning','cloud-lightning-fill','cloud-lightning-rain','cloud-lightning-rain-fill','cloud-moon','cloud-moon-fill','cloud-rain','cloud-rain-fill','cloud-rain-heavy','cloud-rain-heavy-fill','cloud-sleet','cloud-sleet-fill','cloud-snow','cloud-snow-fill','cloud-sun','cloud-sun-fill','clouds','clouds-fill','cloudy','cloudy-fill','hurricane','lightning','lightning-fill','moisture','moon-fill','moon-stars','moon-stars-fill','rainbow','snow','snow2','snow3','stars','sun','sun-fill','sunrise','sunrise-fill','sunset','sunset-fill','thermometer-half','thermometer-high','thermometer-low','thermometer-snow','thermometer-sun','tornado','tropical-storm','tsunami','umbrella','umbrella-fill','water','wind'] }
		],
	],

	'int' : function(obj) {

		if (jQuery("#editWindow-icons").length > 0) { return false; }

var _html = '' +
'<ul class="_edit-list-1">' +
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt><label for="_editor_icon_search">'+msg_msg('search')+'</label></dt>' +
			'<dd><input type="text" name="_editor_icon_search" id="_editor_icon_search" onfocus="icon_obj.autocomplete()" onkeyup="icon_obj.autocomplete()" /></dd>' +
		'</dl>' +
	'</li>' +
	'<li>' +			
		'<dl class="_edit-dl-2">' +
			'<dt><label for="_editor_icon_company">'+ msg_msg('kind') +'</label></dt>' +
			'<dd>' +				
				'<div class="counter-control-box">' +
					'<span class="counter-control">' +
						'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'_editor_icon_company\',{},function(){icon_obj.icon_company_change();})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="left-button icon2-plus"></button></span>' +
						'<span class="box-input">' +
							'<select id="_editor_icon_company" onchange="icon_obj.icon_company_change()">';
						
		for (var i=0;i<icon_obj._icons_company.length;i++) {
			_html += '<option value="' + i + '">' + icon_obj._icons_company[i]['name'] + '</option>';
		}
		
_html += '' +
							'</select>' +
						'</span>' +
						'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'_editor_icon_company\',{},function(){icon_obj.icon_company_change();})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="right-button icon2-minus"></button></span>' +
					'</span>' +
				'</div>' +				
			'</dd>' +
		'</dl>' +
	'</li>' +
	'<li>';

		for (var i=0;i<icon_obj._icons_company.length;i++) {
			
			var Cdisplay = (i == 0) ? "block" : "none";
			_html += '<div id="_icons_company_' + i + '" style="display:' + Cdisplay + '">';

			var _company_count = icon_obj._icons_group[i].length;
			if (_company_count > 1) {
				var _ids = '_icons_groups_' + i;
				_html += '<dl class="_edit-dl-2">';					
				_html += '<dt><label for="' + _ids + '">'+ msg_msg('classifiction') +'</label></dt>';
				_html += '<dd>';
				_html += '<div class="counter-control-box">';
				_html += '<span class="counter-control">';
				_html += '<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + _ids + '\',{},function(){icon_obj.icon_group_change(1);})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="left-button icon2-plus"></button></span>';
				_html += '<span class="box-input">';
				_html += '<select id="' + _ids + '" onchange="icon_obj.icon_group_change(1)">';

				for (var z=0;z<icon_obj._icons_group[i].length;z++) {
					_html += '<option value="' + z + '">' + icon_obj._icons_group[i][z]['name'] + '</option>';
				}
				
				_html += '</select>';
				_html +=  '</span>';
				_html +=  '<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'' + _ids + '\',{},function(){icon_obj.icon_group_change(1);})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="right-button icon2-minus"></button></span>';
				_html +=  '</span>';
				_html +=  '</div>';
				
				_html += '</dd>';
				_html += '</dl>';		
			}
			_html += '</div>';					
		}
			
_html += '' +
	'</li>' +		
	'<li>' +
		'<div id="_icon_group" class="icons_preview">';
				
		for (var i=0;i<icon_obj._icons_company.length;i++) {
			
			var Cdisplay = (i == 0) ? "block" : "none";

			for (var m=0;m<icon_obj._icons_group[i].length;m++) {
				var Cdisplay = (m == 0) ? "block" : "none";
				var _group = '_icon_group_' + i + '_' + m;
				for (var n=0;n<icon_obj._icons_group[i][m]['icon'].length;n++) {
					_html += '<button data-key="' + icon_obj._icons_group[i][m]['icon'][n] + '" class="icon-a _drag-btn-3 '+ _group +'"><span title="' + icon_obj._icons_group[i][m]['icon'][n] + '" data-alt-no="2" class="bi bi-' + icon_obj._icons_group[i][m]['icon'][n] + '"></span></button>';
				}				
			}				

		}

_html += '' +
		'</div>' +
		'<div id="_editor_icon_search_error_msg" class="search_error_msg" style="display:none">No Match</div>' +
	'</li>' +			
'</ul>' +
'<div class="_edit_remove_box"><a href="#" onclick="icon_obj.delete();return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn-8 icon2-delete"></a></div>';

		edit_window_obj.int("editWindow-icons",_html,msg_msg('set_icon'));

		jQuery('#_icon_group>button').on('click',function() {
			var _key = jQuery(this).data('key');
			icon_obj.change('bi-'+_key);
			return false;
		});		

		this.icon_group_change();

		if (jQuery('#editor-icon-fix').length == 0) {
			
			var _html = '<div id="editor-icon-fix" class="btn_width _m9editor no" style="display:none"><a href="#" onclick="icon_obj.view();return false;" class="setting-btn-1">'+ msg_msg('set_icon') +'</a></div>';			
			jQuery("body").append(_html);

			var mousedown_func = function(e,obj) {
				var _target = obj;
				var et = e.target;
				if (_target) {
					icon_obj._now = et;
				}
			};

			var mouseover_func = function(e,obj) {
				
				var _target = obj;
				var et = e.target;
				var J_et = jQuery(et);

				if (m9_mode_obj.mode != '') { _target = false; } // pc 외 불가

				if (_target) {
					if (jQuery('#editWindow-icons').css('display') != 'none') { return false; }
					icon_obj._selected = et;
					m9_layer_position("editor-icon-fix",et,"up");								
					obj_fadeIn('#editor-icon-fix',200);
					return false; // m9alt 방지
				} else {
					icon_obj._selected = false;
					obj_fadeOut('#editor-icon-fix',200);
					return false; // m9alt 방지		
				}
				
			};
	
			editor_selector.set(obj,[
				{ '_type' : 'mousedown' , '_kind' : 'is' , '_selector' : '.bi' , '_func' : mousedown_func, '_ignore' : 1 },
				{ '_type' : 'mouseover' , '_kind' : 'is' , '_selector' : '.bi' , '_func' : mouseover_func, '_ignore' : 1 }
			]);
			
		}
		
	},
	
	'autocomplete' : function() {
		var chars = jQuery('#_editor_icon_search').val();
		if (chars.length < 2) {
			icon_obj.icon_group_change();
			return false;
		}
		var rgExp = new RegExp(''+chars+'','gi');	
		var _match = 0;
		jQuery('#_icon_group').find('button').each(function() {
			var _key = jQuery(this).data('key').toString();
			if (_key.match(rgExp)) {
				jQuery(this).css({'display':'inline-block'});				
				_match++;
			} else {
				jQuery(this).css({'display':'none'});				
			}
		});
		var _display = (_match == 0) ? "block" : "none";
		jQuery('#_editor_icon_search_error_msg').css('display',_display);
	},

	'icon_company_change' : function(Dnum) {
		var Dnum = jQuery('#_editor_icon_company').val();
		for(var i=0;i<icon_obj._icons_company.length;i++) {
			var _display =  (i == Dnum) ? "block" : "none";
			jQuery('#_icons_company_' + i).css('display',_display);
		}
		this.icon_group_change(1);
	},

	'icon_group_change' : function(Dkind) {
		var a = jQuery('#_editor_icon_company').val();
		var b = 0;
		if (jQuery('#_icons_groups_'+a).length > 0) {
			b = jQuery('#_icons_groups_'+a).val();
		}
		var _group = '_icon_group_' + a + '_' + b;

		jQuery('#_icon_group>button').css('display','none');
		jQuery('#_icon_group>button.'+_group).css('display','inline-block');
		if (Dkind == 1) {
			jQuery('#_editor_icon_search').val('');
			jQuery('#_editor_icon_search_error_msg').css('display','none');
		}
	},
	
	'view' : function() {
		icon_obj._now = icon_obj._selected;
		element_obj.edit.convert_obj(icon_obj._now,'font'); // 객체전송
		m9_layer_position('editWindow-icons',icon_obj._now,'up',m9_getObject('body'));			
		edit_window_obj.view('editWindow-icons');		
		jQuery("#editor-icon-fix").css("display","none");		
	},

	'change' : function(icon) {

		var count = 0;
		jQuery('.selected_tag').each(function() {

			var _class = jQuery(this).attr('class');

			if (_class.match(/bi\-/i)) {
				icon_obj._now = this;
				icon_obj.change_one(icon);
				count++;
			}
		});

		if (count == 0) {
			var _html = '<i class="bi ' + icon + '"><i>&nbsp;</i></i>';
			editor.handle.append_html(_html,2);
		}

	},
	'change_one' : function(icon) {

		var old_icon = "";
		var _classes = jQuery(icon_obj._now).attr('class').split(" ");
		for (var i=0;i<_classes.length;i++) {
			if (_classes[i].match(/^bi\-/i) && _classes[i] != "bi-lg" && !_classes[i].match(/^bi\-\dx/i)) {
				old_icon = _classes[i];
				break;
			}
		}
		if (old_icon == "") { return false; }
		
		jQuery(icon_obj._now).removeClass(old_icon).addClass(icon);
 		if (M9_SET["navigator"] == "ie" && m9_ie_var < 8) {
			ie_addIcon(icon_obj._now,icon);
		}

		undo_obj._add(icon_obj._now,'icon_change');
		
	},

	'delete' : function() {

		var icons = jQuery('.selected_tag');

		icons.each(function() {

			if (jQuery(this).attr('class').match(/bi\-/i)) {
				icon_obj._now = this;
				icon_obj.delete_one();
			}

		});

		if (icons.length <= 1) {
			edit_window_obj.close("editWindow-icons");
		}
		RemoveSelection();
		
	},

	'delete_one' : function() {

		var _delete_parent = jQuery(icon_obj._now).parent();

		undo_obj._add(icon_obj._now,'icon_delete');

		jQuery(icon_obj._now).remove();
		icon_obj._now = false;

		undo_obj._add_one(_delete_parent,'icon_delete_after');

	}	
		
}; //icon_obj
