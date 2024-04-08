function updateNavBar() {
	document.getElementById('path').innerHTML = CURRENT_PATH + ' - Firebase'
}

function getDataByPath(path = '') {
	if (path[0] == '/') path = path.replace('/', '');
	if (path == '') return MAIN_VALUE;
	if (path.lastIndexOf('/') == (path.length - 1)) path = path.slice(0, path.length - 1)

	var splitted = path.split('/');
	var rt = MAIN_VALUE;
	splitted.forEach(function(key, i) {
		if (rt) rt = rt[key];
	})

	return rt;
}


function update() {
	updateNavBar();
	var obj = getDataByPath(CURRENT_PATH);
	uiObjToHTML(objectToUIObj(obj));
	Prism.highlightAll();
}

UPDATE = update;

function objectToUIObj(obj = {}) {
	var uiObj = [];
	var objKeys = Object.keys(obj);
	var objValues = Object.values(obj);

	objKeys.forEach(function(key, i) {
		if (objValues[i] instanceof Object || objValues[i] instanceof Array) {
			uiObj.push({
				type: 'folder',
				dataType: (objValues[i] instanceof Array) ? 'array' : typeof objValues[i],
				data: objValues[i],
				objData: objectToUIObj(objValues[i]),
				name: key
			})
		} else {
			uiObj.push({
				type: 'file',
				dataType: typeof objValues[i],
				data: objValues[i],
				name: key
			})
		}
	})

	return uiObj;
}

function moveTo(name) {
	CURRENT_PATH = CURRENT_PATH + name + '/';
	update()
}

function backWard() {
	if (CURRENT_PATH.lastIndexOf('/') != 0 && CURRENT_PATH.length != 0) {
		/*if (path[0] == '/') path = path.replace('/', '');
		if (path.lastIndexOf('/') == (path.length - 1)) path = path.slice(0, path.length - 1)*/

		var splitted = CURRENT_PATH.split('/');
		var lastCut = splitted[splitted.length-1];
		(splitted.splice(splitted.length-2, 1));
		var route = splitted.join('/');
		CURRENT_PATH = route;
		update()
	}
}

function uiObjToHTML(uiObj = []) {
	var body = document.querySelector('.body');
	body.innerHTML = '';

	if (CURRENT_PATH.lastIndexOf('/') != 0 && CURRENT_PATH.length != 0) {
		body.innerHTML += `<div class="box" onclick="backWard()">
			  		<div class="icon">📤</div>
			  		<div>
			  		<div class="title-box">Go Back</div>
			  		<div class="about">../</div>
			  	</div>`
	}

	uiObj.forEach(function(obj, i) {

		if (obj.type == 'folder') {
			var code = JSON.stringify(obj.data);
			var formatted = js_beautify(code, {
			  "indent_size": "4",
			  "indent_char": " ",
			  "max_preserve_newlines": "5",
			  "preserve_newlines": true,
			  "keep_array_indentation": false,
			  "break_chained_methods": false,
			  "indent_scripts": "normal",
			  "brace_style": "collapse",
			  "space_before_conditional": true,
			  "unescape_strings": false,
			  "jslint_happy": false,
			  "end_with_newline": false,
			  "wrap_line_length": "0",
			  "indent_inner_html": false,
			  "comma_first": false,
			  "e4x": false,
			  "indent_empty_lines": false
			})

			body.innerHTML += `<div class="box" onclick="moveTo('${obj.name}')">
			  		<div class="icon">📦</div>
			  		<div>
			  		<div class="title-box">${obj.name}</div>
			  		<div class="about">${obj.dataType.toUpperCase()} <br/> <div class="code"><pre><code class="language-javascript">${formatted}</code></pre></div></div></div>
			  	</div>`
		} else {
			var symbol = '';

			switch (obj.dataType) {
				case 'string':
					symbol = '✏'
					break;
				case 'boolean':
					if (obj.data) {
						symbol = '📬'
					} else {
						symbol = '📭'
					}
					break;
				case 'number':
					symbol = '🪙'
					break;
				default:
					symbol = '📑';
			}

			body.innerHTML += `<div class="box">
			  		<div class="icon">${symbol}</div>
			  		<div>
			  		<div class="title-box">${obj.name}</div>
			  		<div class="about">${obj.dataType.toUpperCase()} - ${obj.data}</div></div>
			  	</div>`
		}
	})
}


uiObjToHTML(objectToUIObj({
	hello: 46,
	gh: true,
	str: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio nesciunt quibusdam amet numquam, qui, eaque dolore magnam sed itaque deserunt veritatis autem impedit aliquid nobis quis! Deserunt ipsum asperiores sit expedita deleniti, est sequi dignissimos soluta magni commodi. Aliquam saepe pariatur, explicabo quasi debitis, voluptate dicta corporis, praesentium, officia minima cumque aspernatur iusto recusandae voluptatem ratione. Sed dicta cupiditate omnis! Totam debitis illo non minus alias nesciunt, veniam consequatur qui expedita, fugit magni maiores. Iure molestias ea ducimus, optio illo, delectus reiciendis, dicta explicabo sunt veritatis ut.',
	arr: [{}],
	another: {
		data: 786,
		ghj: {
			hellog: 'ui'
		}
	},
}))

updateNavBar();