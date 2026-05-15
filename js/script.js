let abbr = 'none';
let picke = 'none';
let values = {
	'fnames':'',
	'lnames':'',
	'fnamep':'',
	'lnamep':'',
	'gender':'Male',
	'occasion':'Birthday',
	'response':'',
	'pickdate':'',
	'dropdate':'',
	'picker':''
}
forms = {
	'student':"<center><img src=\"logo.png.jpg\" width=\"200\" height='200'><h2><span>S</span>tudent <span>F</span>orm</h2><table><tr><td><label>First Name:</label></td><td><input type=\"text\" name=\"sfname\" placeholder=''></td></tr><tr><td><label>Last Name:</label></td><td><input type=\"text\" name=\"slname\" placeholder=\"\" oninput='let lnames = \"this.value\"'></td></tr><tr><td><label>Gender:</label></td><td><select><option>Male</option><option>Female</option></select></td></tr><tr><td><label>Reason:</label></td><td><select><option>Birthday</option><option>Burial (Nuclear Family)</option><option>Burial (Extended Family)</option><option>VISA</option><option>Passport</option><option>Medical Checkup</option><option>Vacation</option></select></td></tr><tr><td><label>Pick up date:</label></td><td><input type=\"datetime-local\" name=\"spickup\" placeholder=\"\" min=\"2023-03-08T12:12\" id=\"pick\" oninput=\"maxDrop(this)\"></td></tr><tr><td><label>Drop date:</label></td><td><input type=\"datetime-local\" name=\"sdrop\" placeholder=\"\" id=\"drop\"></td></tr></table></center><button id=\"next\" onclick=\"event.preventDefault();next('parent')\">Next</button>",
	'parent':"<center><img src=\"logo.png.jpg\" width=\"200\" height='200'><h2><span>P</span>arent/<span>G</span>uardian <span>F</span>orm</h2><table><tr><td><label>Surname:</label></td><td><input type=\"text\" name=\"sfname\" placeholder='' oninput='values.fnamep = this.value' ></td></tr><tr><td><label>Other Names:</label></td><td><input type=\"text\" name=\"slname\" placeholder=\"\" oninput='values.lnamep = this.value'></td></tr><tr><td><label>Phone Number:</label></td><td><input type='tel'></td></tr><tr><td><label>Email:</label></td><td><input type='text'></td></tr><tr><td><label>Is any one else picking your child up:</label></td><td><select onchange='endisable(this.value)'><option>No</option><option>Yes</option></select></td></tr><tr><td><label>Name of Person picking child up:</label></td><td><input type=\"text\" name=\"sdrop\" placeholder=\"\" id=\"picking\" oninput='values.picker = this.value;'></td></tr></table></center><button id=\"next\" onclick=\"event.preventDefault();nex('id')\">Next</button>",
	'id':"<center><img src=\"logo.png.jpg\" width=\"200\" height=\"200\"><br><form><h2><span>P</span>arent/<span>G</span>uardian <span>I</span>d</h2> <input type=\"file\" name=\"\" oninput=\"changeImage(this,que('#img1'))\"><br><br><img src=\"img1.png\" id=\"img1\" width=\"500\" height=\"200\"><div id='picke' style='display:"+picke+";'><h2><span>C</span>hild <span>P</span>icker <span>I</span>d</h2> <input type=\"file\" name=\"\" oninput=\"changeImage(this,que('#img2'))\"><br><br><img src=\"img1.png\" id=\"img2\" width=\"500\" height=\"200\"></div></form></center><button id=\"next\" onclick=\"event.preventDefault();nex('response')\">Response</button>",
	'response':"<center><img src='logo.png.jpg' width=\"200\" height=\"200\"><h1>Administrator Response</h1><div id=\"load-container\"><div id=\"loader\"></div><h2>Generating Response...</h2></div></center><div id='msg'><p style='font-size: 25px;font-family: bell mt;'>Dear /fname(parent)/ /lname(parent)/,</p><p style='font-size: 20px;font-family: bahnschrift;'> Your request has been /response/ to pick /lname(child)/ /fname(child)/ for /occasion/ on /pick time/ and drop /gender/ on /drop time/.<abbr style='display:"+abbr+";'> /name(picker)/ is also /response/ to pick your child up.</abbr> The ID(s) are valid. If there is any challenge we will contact you.</p></div>"
}
function changee(thi,that) {
	values[thi] = that;
}
function show(html) {
	document.querySelector(html).style.display = 'block';
}
function hide(html) {
	document.querySelector(html).style.display = 'none';
}
function que(html) {
	return document.querySelector(html)
}
function maxDrop(pick) {
	let drop = document.querySelector('#drop')
	drop.min = pick.value;
}
function nex(type) {
	if (type == 'response') {
		forms['response'] = forms['response'].replace('/fname(child)/',values.fnames)
		forms['response'] = forms['response'].replace('/lname(child)/',values.lnames)
		forms['response'] = forms['response'].replace('/fname(parent)/',values.fnamep)
		forms['response'] = forms['response'].replace('/lname(parent)/',values.lnamep)
		if (values.gender == 'Male') {
			forms['response'] = forms['response'].replace('/gender/','him')
		}
		else{
			forms['response'] = forms['response'].replace('/gender/','her')
		}
		forms['response'] = forms['response'].replace('/occasion/',values.occasion)
		if (values.occasion == 'Birthday') {
			values.response = '<span style="color:red;font-size:20px;">Denied</span>'
		}
		else if (values.occasion == 'Burial (Extended Family)') {
			values.response = '<span style="color:red;font-size:20px;">Denied</span>'
		}
		else if (values.occasion == 'Vacation') {
			values.response = '<span style="color:red;font-size:20px;">Denied</span>'
		}
		else if (values.occasion == 'Burial (Nuclear Family)') {
			values.response = '<span style="color:green;font-size:20px;">Accepted</span>'
		}
		else if (values.occasion == 'VISA') {
			values.response = '<span style="color:green;font-size:20px;">Accepted</span>'
		}
		else if (values.occasion == 'Passport') {
			values.response = '<span style="color:green;font-size:20px;">Accepted</span>'
		}
		else if (values.occasion == 'Medical Checkup') {
			values.response = '<span style="color:green;font-size:20px;">Accepted</span>'
		}
		forms['response'] = forms['response'].replace('/response/',values.response)
		forms['response'] = forms['response'].replace('/response/',values.response)
		forms['response'] = forms['response'].replace('/pick time/',values.pickdate)
		forms['response'] = forms['response'].replace('/drop time/',values.dropdate)
		forms['response'] = forms['response'].replace('/name(picker)/',values.picker)
	}
	document.querySelector('form').innerHTML = forms[type];
	if (type == 'response') {
	que('#load-container').style.display = 'block';
		que('#msg').style.display = 'none';
		setTimeout(()=>{
			que('#load-container').style.display = 'none';
			que('#msg').style.display = 'block';
		},3000)
	if (abbr == 'block') {
			que('abbr').style.display = 'block';
		}
	}
	if (type == 'parent') {
		que('#picking').disabled = 'true';
	}
	if (type == 'id') {
		if (picke == 'block') {
			que('#picke').style.display = 'block';
		}
	}
}
setInterval(()=>{
	try{
	let date = new Date()
	day = date.getDate()
	month = date.getMonth()
	month = (month+1)%12;
	year = date.getYear()
	year = year.toString()
	year = year.replace('1','20')
	hour = date.getHours()
	min = date.getMinutes()
	if (String(month).length == 1) {
		month = '0'+String(month);
	}
	if (String(day).length == 1) {
		day = '0'+String(day);
	}
	if (String(hour).length == 1) {
		hour = '0'+String(hour);
	}
	if (String(min).length == 1) {
		min = '0'+String(min);
	}
	document.querySelector('#pick').min = year+'-'+month+'-'+day+'T'+hour+':'+min;
	}catch{}
})
function endisable(letter) {
	if (letter == 'No') {
		que('#picking').disabled = 'true';
		abbr = 'none';
		picke = 'none';
	}
	if (letter == 'Yes') {
		que('#picking').disabled = false;
		que('#picking').enabled = 'true';
		abbr = 'block';
		picke = 'block';
	}
}
let read = '';
function changeImage(input,img) {
	read = new FileReader(input)
	let fileList = input.files;
	read.readAsDataURL(fileList[0])
	setTimeout(()=>{img.src = read.result;},1000)
}
function refine(tim) {
	let time = tim;
	time = time.split('T');
	time[0] = time[0].split('-');
	let month = time[0];
	if (month[1] == '01') {
		month[1] = 'January';
	}
	else if(month[1] == '02'){
		month[1] = 'February';
	}
	else if (month[1] == '03'){
		month[1] = 'March'
	}
	else if (month[1] == '04'){
		month[1] = 'April'
	}
	else if (month[1] == '05'){
		month[1] = 'May'
	}
	else if (month[1] == '06'){
		month[1] = 'June'
	}
	else if (month[1] == '07'){
		month[1] = 'July'
	}
	else if (month[1] == '08'){
		month[1] = 'August'
	}
	else if (month[1] == '09'){
		month[1] = 'September'
	}
	else if (month[1] == '10'){
		month[1] = 'October'
	}
	else if (month[1] == '11'){
		month[1] = 'November'
	}
	else if (month[1] == '12'){
		month[1] = 'December'
	}
	time = `${month[2]} ${month[1]}, ${month[0]} ${time[1]}`
	return time
}