var url='http://api.ceban-app.com/subjects/';
var urlTeacher='http://api.ceban-app.com/users?level=Teacher';
var urlClass='http://api.ceban-app.com/classes';
var hasil='';

var nameSubject='';
var schoolYear='';
var teacherId='';
var classId='';

let className;
let teacherName;

// Add Button

const addSubjectButton=document.getElementById('addSubjectButton');



fetch(url,{
	method: 'GET'
})
	.then(res => res.json())
	.then(data => {
		renderData(data);
	});

renderData=(data) => {

	data.forEach(object => {
		
		hasil+=`
			<tr>
				<td>${object.name}</td>
				<td>${object.teacher_id}</td>
				<td>${object.class_id}</td>
				<td>${object.school_year}</td>
					<td><button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editSubject" onclick="editSubject( '${object.id}')">Edit</button>
					<button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteSubject" onclick="subjectDelete( '${object.id}')">Delete</button></td>
				</tr>`;
		;
	});

	document.getElementById("mytable").innerHTML=hasil;
};


// Add Subject


addNewSubject=() => {
	var form='';
	const formAddSubject=document.getElementById('formAddSubject');
	console.log(formAddSubject);
	form=`
							
							<div class="form-group">
								<label for="name" style="font-size : 16px">Nama Mata Pelajaran</label>
								<input type="text" class="form-control" placeholder="contoh : bahasa indonesia" id="addNameSubject" onchange = "changeNameSubject()">
							</div>
							<div class="form-group">
								<label for="name" style="font-size : 16px">Tahun Ajar</label>
								<input type="text" class="form-control" placeholder="contoh : 2020/2021" id="addSchoolYear" onchange = "changeSchoolYear()">
							</div>
							<div class="form-group">
								<label for="kelas" style="font-size : 16px">Daftar Guru</label>
								<select class="form-control" id="addTeacherId" onclick="changeTeacherId()">
								<option selected>Pilih Guru</option>
								</select>
							</div>

							<div class="form-group">
								<label for="kelas" style="font-size : 16px">List Kelas</label>
								<select class="form-control" id="addClassId" onclick="changeClassId()">
								<option selected>Pilih </option>
								</select>
							</div>									
									`;
	
	fetch(urlTeacher,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			data.map(teacher => {
				const teacherSelect=`
				<option value="${teacher.id}">${teacher.name}</option>
																																	`;
				const listTeacher=document.getElementById('addTeacherId');

				listTeacher.innerHTML+=teacherSelect;
			});
		});
	
	fetch(urlClass,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			data.map(kelas => {
				const classSelect=`
				<option value="${kelas.id}">${kelas.class_name}</option>
																																									`;
				const listClass=document.getElementById('addClassId');

				listClass.innerHTML+=classSelect;
			});
		});

	formAddSubject.innerHTML=form
};

const changeNameSubject=() => {
	const addNameSubject=document.getElementById('addNameSubject');
	nameSubject=addNameSubject.value;
};

const changeTeacherId=() => {
	const addTeacherId=document.getElementById('addTeacherId');
	teacherId=addTeacherId.value;
};

const changeClassId=() => {
	const addClassId=document.getElementById('addClassId');
	classId=addClassId.value;
};


const changeSchoolYear=() => {
	const addSchoolYear=document.getElementById('addSchoolYear');
	schoolYear=addSchoolYear.value;
};


addSubjectButton.addEventListener('click',(e) => {

	e.preventDefault();
	console.log('OK');
	fetch(url,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  name:nameSubject,
			school_year : schoolYear,
			teacher_id : teacherId,
			class_id:classId,
		})
	})
		.then(res => res.json())
		.then(data => {
			var dataArray=[];
			dataArray.push(data);
			renderData(dataArray);
			Swal.fire('Data berhasil di tambahkan','','success');
			var close=document.getElementById('closeAddSubject');
			close.click();
			setTimeout(function() {location.reload(1);},3000);
		});
});



// Edit Subjects


editSubject=(id) => {
	
	console.log(id);
	fetch(url+id,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {		
			fillEditForm(data.id,data.name,data.school_year,data.teacher_id,data.class_id)
			
		});
	

}


fillEditForm=(id,nameSubjectValue,schoolYearValue,teacherIdValue,classIdValue)=>{
	var form='';
	const formEditSubject=document.getElementById('formEditSubject');
	form=`
							
							<div class="form-group">
								<label for="name" style="font-size : 16px">Nama Mata Pelajaran</label>
								<input type="text" class="form-control" placeholder="contoh : bahasa indonesia" id="editNameSubject" value = "${nameSubjectValue}" >
							</div>
							<div class="form-group">
								<label for="name" style="font-size : 16px">Tahun Ajar</label>
								<input type="text" class="form-control" placeholder="contoh : 2020/2021" id="editSchoolYear" value = "${schoolYearValue}" >
							</div>
							<div class="form-group">
								<label for="kelas" style="font-size : 16px">Daftar Guru</label>
								<select class="form-control" id="editTeacherId" value = "${teacherIdValue}" >
								<option selected>Pilih Guru</option>
								</select>
							</div>

							<div class="form-group">
								<label for="kelas" style="font-size : 16px">List Kelas</label>
								<select class="form-control" id="editClassId" value = "${classIdValue}">
								<option selected>Pilih </option>
								</select>
							</div>									
									`;

	fetch(urlTeacher,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			data.map(teacher => {
				const teacherSelect=`
				<option value="${teacher.id}">${teacher.name}</option>
																																	`;
				const listTeacher=document.getElementById('editTeacherId');

				listTeacher.innerHTML+=teacherSelect;
			});
		});

	fetch(urlClass,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			data.map(kelas => {
				const classSelect=`
				<option value="${kelas.id}">${kelas.class_name}</option>
																																									`;
				const listClass=document.getElementById('editClassId');

				listClass.innerHTML+=classSelect;
			});
		});

	formEditSubject.innerHTML=form
	const editSubjectButton=document.getElementById('editSubjectButton');
	const editNameSubject=document.getElementById('editNameSubject');
	const editTeacherId=document.getElementById('editTeacherId');
	const editClassId=document.getElementById('editClassId');
	const editSchoolYear=document.getElementById('editSchoolYear');
	editSubjectButton.addEventListener('click',(e) => {
		e.preventDefault();
		submitEdit(id,editNameSubject.value,editTeacherId.value,editClassId.value,editSchoolYear.value );
	});
}




submitEdit=(id, nameSubject, teacherId, classId, schoolYear) => {
	console.log('OK');
	fetch(url+id,{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: nameSubject,
			school_year: schoolYear,
			teacher_id: teacherId,
			class_id: classId,
		})
	})
		.then(res => res.json())
		.then(data => {
			var dataArray=[];
			dataArray.push(data);
			renderData(dataArray);
			Swal.fire('Data berhasil di ubah','','success');
			var close=document.getElementById('closeEditSubject');
			close.click();
			setTimeout(function() {location.reload(1);},3000);
		});
}








// Delete Subject
subjectDelete=(id) => {
	const xhttp=new XMLHttpRequest();
	xhttp.open("DELETE","http://api.ceban-app.com/subjects/"+id);
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({
		"id": id
	}));
	xhttp.onreadystatechange=function() {
		if(this.readyState==4) {
			const objects=JSON.parse(this.responseText);
			Swal.fire("Data Mata Pelajaran berhasil dihapus","","success");
			setTimeout(function() {location.reload(1);},2000);
		}
	};
}