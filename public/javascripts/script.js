$('.edit-form').hide();
$('body').click(toggleEdit);

function toggleEdit(evt) {
    if (evt.target.className !== 'edit-button') return;
    let btnId = evt.target.dataset.id;
    $(`.edit-form[data-id="${btnId}"]`).toggle();
}