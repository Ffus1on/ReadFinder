function showReservationModal(bookTitle) {
    Swal.fire({
        title: `Бронирование книги: ${bookTitle}`,
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="reservation-date" style="width: 150px;">Дата бронирования</label>
                    <input type="date" id="reservation-date" class="swal2-input" style="flex: 1;" required>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="user-name" style="width: 150px;">Имя</label>
                    <input type="text" id="user-name" class="swal2-input" style="flex: 1;" placeholder="Ваше имя" required>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="user-email" style="width: 150px;">Email</label>
                    <input type="email" id="user-email" class="swal2-input" style="flex: 1;" placeholder="Ваш email" required>
                </div>
            </div>
        `,
        focusConfirm: false,
        confirmButtonText: 'Забронировать',
        preConfirm: () => {
            const date = document.getElementById('reservation-date').value;
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;

            if (!date || !name || !email) {
                Swal.showValidationMessage('Пожалуйста, заполните все поля!');
                return false;
            }

            return { date, name, email };
        },
        customClass: {
            title: 'reservation-modal-title'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            processReservation(result.value);
        }
    });
}

function processReservation(data) {
    const isSuccessful = Math.random() > 0.2;

    if (isSuccessful) {
        toastr.success(`Книга успешно забронирована на ${data.date}`, 'Успех');
    } else {
        toastr.error('Не удалось забронировать книгу. Попробуйте позже.', 'Ошибка');
    }
}

document.querySelectorAll('#book-list img').forEach((img, index) => {
    img.addEventListener('click', () => {
        const bookTitle = `Книга ${index + 1}`;
        showReservationModal(bookTitle);
    });
});
