const notesSection = document.getElementById('notesSection')

let data = [];

function populateNotes(data){
    notesSection.innerHTML = '';
    if(data.length === 0)  notesSection.innerHTML = '<h2>No notes available</h2>';
    data.forEach((item, index) => {
        const note = document.createElement('div');
        note.className = 'note';
        note.id = index;
        note.innerHTML = `
        <h2 class="note-title">${item.title}</h2>
        <p class="note-content">${item.content}</p>
        `;
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-button';
        editBtn.innerHTML = 'Edit';
        editBtn.addEventListener('click', editNote)
        note.appendChild(editBtn)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.addEventListener('click', deleteNote)
        note.appendChild(deleteBtn)
        notesSection.appendChild(note);
      });
}

async function getNotes() {
  const response = await fetch('/notes').then(response => response.json()).catch(err => console.log(err));
  data = response;
  populateNotes(data);
}

getNotes();


// Add a new note
const addNoteBtn = document.getElementById('addNoteBtn');
const title = document.querySelector('#noteTitle');
const content = document.querySelector('#noteContent');

addNoteBtn.addEventListener('click', addNewNote);

async function addNewNote(e){
    e.preventDefault();
    const data = {
        title: title.value,
        content: content.value
    }

    const response = await fetch('/notes/addNotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(response => showAlert("Note added successfully", 'success')).catch(err => showAlert("Error adding note", 'error' ));

    title.value = '';
    content.value = '';
     
    await getNotes();
}

// Delete a note
async function deleteNote(e){
    const index = parseInt(e.target.parentElement.id);
    const id = data[index]._id; 

    const response = await fetch(`/notes/deleteNotes/${id}`, {
        method: 'DELETE'
    }).then(response => response.json()).then(response => showAlert('Note Deleted successfully', 'success')).catch(err => showAlert('Error deleting note', 'error'));

    populateNotes(data.filter((item, i) => i !== index));
}


// Update a note
const editModal = document.getElementById('editModal');
const editTitle = document.querySelector('#editNoteTitle');
const editContent = document.querySelector('#editNoteContent');
const saveBtn = document.querySelector('#saveBtn');

let note = {}

function editNote(e){
    editModal.style.display = 'flex';
    const index = parseInt(e.target.parentElement.id);
    note = data[index];
    editTitle.value = note.title;
    editContent.value = note.content;
}

async function saveNote(e){
    e.preventDefault();
    const id = note._id;
    const data = {
        title: editTitle.value,
        content: editContent.value
    }

    const response = await fetch(`/notes/updateNotes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(response => showAlert('Note Saved successfully', 'success')).catch(err => showAlert('Error saving note', 'error'));

    editModal.style.display = 'none';

    await getNotes();
}

saveBtn.addEventListener('click', saveNote)

function closeModal(){
    editModal.style.display = 'none';
}

const alertBox = document.getElementById('alertContainer');
function showAlert(message, type){
    alertBox.innerHTML = `<div class="">${message}</div>`;
    alertBox.style.backgroundColor = type === 'error' ? 'red' : 'green';
    alertBox.style.display = 'flex';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}