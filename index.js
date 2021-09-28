var url='http://api.ceban-app.com/users/';
var urlKelas='http://api.ceban-app.com/classes/';
var urlStudentClass='http://api.ceban-app.com/student_classes/';
var hasil='';
var studentId='';
var noAbsen=''
var classId='';


// User Add
const addName=document.getElementById("name");
const addUsername=document.getElementById("username");
const addPassword=document.getElementById("password");
const addTelp=document.getElementById("telp");
const addEntryYear=document.getElementById("entryYear");
const addLevel=document.getElementById("level");

const addDataUser=document.getElementById('addDataUser');

// Edit User
const editName=document.getElementById("editName");
const editUsername=document.getElementById("editUsername");
const editPassword=document.getElementById("editPassword");
const editTelp=document.getElementById("editTelp");
const editEntryYear=document.getElementById("editEntryYear");
const editLevel=document.getElementById("editLevel");

const addAssignKelas=document.getElementById('addAssignKelas');
const detailPlace=document.getElementById('detailPlace');


fetch(url,{
	method: 'GET'
})
	.then(res => res.json())
	.then(data => {
		console.log(data);
		renderData(data);
	});

renderData=(data) => {
	data.forEach(object => {
		hasil+=`
			<tr>
				<td>${object.name}</td>
				<td>${object.username}</td>
				<td>${object.telp}</td>
				<td>${object.level}</td>
				<td>${object.entry_year}</td>
					<td>
					<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailStudent" onclick="detailStudent( '${object.id}' , '${object.name}', '${object.username}', '${object.telp}', '${object.password}', '${object.entry_year}', '${object.level}')">Detail</button>
					<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editUser" onclick="editUser( '${object.id}')">Edit</button>
					<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteUser" onclick="userDelete( '${object.id}')">Delete</button>
					<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#assignKelas" onclick="assignKelas( '${object.id}', '${object.name}')">Assign Kelas</button></td>
				</tr>`;
		;
	});

	document.getElementById("mytable").innerHTML=hasil;
}


detailStudent = (id, name, username, telp, password, entryYear, level) => {
	const detail=`
		<table class = "table">
	<tr>
		<th>Name</th>
		<td>:</td>
		<td>${name}</td>
	</tr>
	<tr>
		<th>Username</th>
		<td>:</td>
		<td>${username}</td>
	</tr>
	<tr>
		<th>Password</th>
		<td>:</td>
		<td>${password}</td>
	</tr>
	<tr>
		<th>Telp</th>
		<td>:</td>
		<td>${telp}</td>
	</tr>
	<tr>
		<th>Entry Year</th>
		<td>:</td>
		<td>${entryYear}</td>
	</tr>
	<tr>
		<th>Level</th>
		<td>:</td>
		<td>${level}</td>
	</tr>
</table>
	
	`


	detailPlace.innerHTML=detail;
}


// Add Data
addDataUser.addEventListener('click',(e) => {

	e.preventDefault();
	fetch(url,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: addName.value,
			username: addUsername.value,
			telp: addTelp.value,
			password : addPassword.value,
			entry_year: addEntryYear.value,
			level: addLevel.value,
		})
	})
		.then(res => res.json())
		.then(data => {
			var dataArray=[];
			dataArray.push(data);
			renderData(dataArray);
			Swal.fire('Data berhasil di tambahkan','','success');
			var close=document.getElementById('closeAdd');
			close.click();
			setTimeout(function() {location.reload(1);},3000);
		})
})


// Edit Data
editUser=(id) => {

	console.log(id)
	fetch(url+id,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			  editName.value=data.name
				editUsername.value=data.username
				editPassword.value=data.password
				editTelp.value=data.telp
				editEntryYear.value=data.entry_year
				editLevel.value=data.level
		});

	var editDataUser=document.getElementById('editDataUser');
	editDataUser.addEventListener('click',(e) => {
		e.preventDefault();
		submitEdit(id);
	});
}


submitEdit=(id) => {
	fetch(url+id,{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: editName.value,
			username: editUsername.value,
			telp: editTelp.value,
			password: editPassword.value,
			entry_year: editEntryYear.value,
			level: editLevel.value,
		})
	})
		.then(res => res.json())
		.then(data => {
			var dataArray=[];
			dataArray.push(data);
			renderData(dataArray);
			Swal.fire('Data berhasil di ubah','','success');
			// setTimeout(function() {location.reload(1);},5000);
			var close=document.getElementById('closeEdit')
			close.click();
			setTimeout(function() {location.reload(1);},2000);
			
		});
}



// Delete Data

function userDelete(id) {
	const xhttp=new XMLHttpRequest();
	xhttp.open("DELETE", "http://api.ceban-app.com/users/" + id );
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({
		"id": id
	}));
	xhttp.onreadystatechange=function() {
		if(this.readyState==4) {
			const objects=JSON.parse(this.responseText);
			Swal.fire("Data User berhasil dihapus","","success");
			setTimeout(function() {location.reload(1);},2000);
		}
	};
}





assignKelas=(id, name) => {
	var form='';
	
	const formAssignKelas=document.getElementById('formAssignKelas');
	form =`
							<h4 style="font-size : 20px"><b>${name}</b></h4>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="" id="addStudentId" value = "${id}">
							</div>
							<div class="form-group">
								<label for="name" style="font-size : 16px">No Absen</label>
								<input type="text" class="form-control" placeholder="" id="addNoAbsen" onchange = "changeNoAbsen()">
							</div>
							<div class="form-group">
								<label for="kelas" style="font-size : 16px">List Kelas</label>
								<select class="form-control" id="addListKelas" onclick="changeClassId()">
								<option selected>Pilih Kelas</option>
								`
	
								fetch(urlKelas,{
									method: 'GET'
								})
									.then(res => res.json())
									.then(data => {
										data.map(kelas => {
											const kelasSelect=`
																			<option value="${kelas.id}">${kelas.class_name}</option>
																		`;
											const listKelas=document.getElementById('addListKelas');
																		
											listKelas.innerHTML+=kelasSelect;
										});
									});
								`
								</select>
							</div>
							
	`

	formAssignKelas.innerHTML=form

	const addStudentId=document.getElementById('addStudentId');
	studentId=addStudentId.value;
	
}


const changeNoAbsen=()=>{
	const addNoAbsen=document.getElementById('addNoAbsen');
	noAbsen = addNoAbsen.value
}

const changeClassId=() => {
	const kelasId=document.getElementById('addListKelas');
	classId=kelasId.value;
}
// Assign Kelas


addAssignKelas.addEventListener('click',(e) => {

	e.preventDefault();
	fetch(urlStudentClass,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			student_id: studentId,
			class_id: classId,
			roll_number: noAbsen,
		})
	})
		.then(res => res.json())
		.then(data => {
			// var dataArray=[];
			// dataArray.push(data);
			// renderData(dataArray);
			Swal.fire('Data berhasil di tambahkan','','success');
			var close=document.getElementById('closeAddAssign');
			close.click();
			setTimeout(function() {location.reload(1);},3000);
		});
})










