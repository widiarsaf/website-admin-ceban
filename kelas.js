var url='http://api.ceban-app.com/classes/';
var hasil='';

const addClassName=document.getElementById("className");
const addDataKelas=document.getElementById('addDataKelas');

const editClassName=document.getElementById("editClassName");

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
				<td>${object.id}</td>
				<td>${object.class_name}</td>
					<td><button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editKelas" onclick="editKelas( '${object.id}')">Edit</button>
					<button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteKelas" onclick="kelasDelete( '${object.id}')">Delete</button></td>
				</tr>`;
		;
	});

	document.getElementById("mytable").innerHTML=hasil;
};


// Add Data
addDataKelas.addEventListener('click',(e) => {

	e.preventDefault();
	fetch(url,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			class_name: addClassName.value,
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
		});
});



// Edit Data
editKelas=(id) => {

	console.log(id);
	fetch(url+id,{
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			editClassName.value=data.class_name;
		});

	var editDataKelas=document.getElementById('editDataKelas');
	editDataKelas.addEventListener('click',(e) => {
		e.preventDefault();
		submitEdit(id);
	});
};


submitEdit=(id) => {
	fetch(url+id,{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			class_name: editClassName.value,
		})
	})
		.then(res => res.json())
		.then(data => {
			var dataArray=[];
			dataArray.push(data);
			renderData(dataArray);
			Swal.fire('Data berhasil di ubah','','success');
			// setTimeout(function() {location.reload(1);},5000);
			var close=document.getElementById('closeEdit');
			close.click();
			setTimeout(function() {location.reload(1);},2000);

		});
};



function kelasDelete(id) {
	const xhttp=new XMLHttpRequest();
	xhttp.open("DELETE","http://api.ceban-app.com/classes/"+id);
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({
		"id": id
	}));
	xhttp.onreadystatechange=function() {
		if(this.readyState==4) {
			const objects=JSON.parse(this.responseText);
			Swal.fire("Data Kelas berhasil dihapus","","success");
			setTimeout(function() {location.reload(1);},2000);
		}
	};
}