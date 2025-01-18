document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    // Toggle sidebar
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // Navigation redirection
    const menuItems = document.querySelectorAll("nav ul li");
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById("edit-modal");
    const closeButton = document.querySelector(".close-button");
    const editForm = document.getElementById("edit-form");

    let currentRow = null;

    const table = document.querySelector("table tbody");
    table.addEventListener("click", (event) => {
        const target = event.target;

        if (target.textContent === "✏️" || target.textContent ==="✏️ Editar" ) {
            // Open modal for editing
            modal.style.display = "block";
            currentRow = target.closest("tr");

            // Pre-fill the modal form with user data
            document.getElementById("edit-name").value = currentRow.cells[1].textContent;
            document.getElementById("edit-email").value = currentRow.cells[2].textContent;
            document.getElementById("edit-phone").value = currentRow.cells[3].textContent;
            document.getElementById("edit-role").value = currentRow.cells[4].textContent;
        }
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Save changes and update the table
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (currentRow) {
            currentRow.cells[1].textContent = document.getElementById("edit-name").value;
            currentRow.cells[2].textContent = document.getElementById("edit-email").value;
            currentRow.cells[3].textContent = document.getElementById("edit-phone").value;
            currentRow.cells[4].textContent = document.getElementById("edit-role").value;

            alert("¡Guardado con éxito!");
            modal.style.display = "none";
        }
    });

    // User menu dropdown functionality
    const userInfo = document.querySelector(".user-info");
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.innerHTML = `
        <ul>
            <li id="view-profile">Ver Perfil</li>
            <li id="logout">Cerrar Sesión</li>
        </ul>
    `;
    userInfo.appendChild(dropdownMenu);

    userInfo.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
    });

    // Handle dropdown menu options
    document.getElementById("view-profile").addEventListener("click", () => {
        window.location.href = "perfil.html";
    });

    document.getElementById("logout").addEventListener("click", () => {
        window.location.href = "login.html";
    });

    // Close dropdown when clicking outside
    window.addEventListener("click", (event) => {
        if (!userInfo.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("edit-modal");
    const closeButton = document.querySelector(".close-button");
    const editForm = document.getElementById("edit-form");
    let currentRow = null;

    // Editar
    document.querySelectorAll("table tbody").forEach((tableBody) => {
        tableBody.addEventListener("click", (event) => {
            const target = event.target;

            if (target.textContent === "✏️") {
                currentRow = target.closest("tr");

                // Rellenar el modal con los datos actuales
                document.getElementById("edit-id").value = currentRow.cells[1].textContent;
                document.getElementById("edit-name").value = currentRow.cells[2].textContent;
                document.getElementById("edit-total").value = currentRow.cells[3].textContent;
                document.getElementById("edit-status").value = currentRow.cells[4].textContent;

                modal.style.display = "flex";
            }

            if (target.textContent === "🗑️") {
                if (confirm("¿Estás seguro de que deseas eliminar esta fila?")) {
                    target.closest("tr").remove();
                }
            }
        });
    });

    // Guardar cambios
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (currentRow) {
            currentRow.cells[2].textContent = document.getElementById("edit-name").value;
            currentRow.cells[3].textContent = document.getElementById("edit-total").value;
            currentRow.cells[4].textContent = document.getElementById("edit-status").value;

            modal.style.display = "none";
            alert("¡Cambios guardados con éxito!");
        }
    });

    // Cerrar modal
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
function openRegisterModal() {
    document.getElementById('register-modal').style.display = 'flex';
}

function openForgotModal() {
    document.getElementById('forgot-modal').style.display = 'flex';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function sendRecoveryEmail() {
    const email = document.getElementById('forgot-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo válido.');
        return;
    }

    alert('Se ha enviado un enlace para recuperar su contraseña a ' + email);

    // Limpiar el campo de correo después de enviar la solicitud
    document.getElementById('forgot-email').value = '';

    closeModal();
}

function validateRegister() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lettersRegex = /^[a-zA-Z\s]+$/;
    const numbersRegex = /^[0-9]+$/;

    if (!lettersRegex.test(nombre)) {
        alert("El nombre solo puede contener letras.");
        return;
    }
    if (!lettersRegex.test(apellido)) {
        alert("El apellido solo puede contener letras.");
        return;
    }
    if (!numbersRegex.test(telefono)) {
        alert("El teléfono solo puede contener números.");
        return;
    }
    if (!emailRegex.test(correo)) {
        alert("Ingrese un correo válido.");
        return;
    }

    alert("¡Registro exitoso!");

    // Limpiar los campos después de un registro exitoso
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('contraseña').value = '';
    document.getElementById('fecha').value = '';

    closeModal();
}
document.addEventListener("DOMContentLoaded", function () {
// Seleccionar el botón de Sign In
const signInButton = document.getElementById("sign-in-button");

// Agregar el evento de clic
signInButton.addEventListener("click", (event) => {
    // Evitar que el formulario se envíe
    event.preventDefault();

    // Redirigir a dashboard.html
    window.location.href = "dashboard.html";
});
});
// dashboard//
// Alternar menús dentro de las info-boxes
document.querySelectorAll('.info-box').forEach(box => {
    box.addEventListener('click', () => {
        const menu = box.querySelector('.menu');
        // Cierra cualquier otro menú abierto
        document.querySelectorAll('.menu').forEach(m => {
            if (m !== menu) m.style.display = 'none';
        });
        // Alterna el menú actual
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
});

// Función para Editar
function editItem(itemName) {
    const newValue = prompt(`Editar ${itemName}:`, "Nuevo valor aquí");
    if (newValue) alert(`${itemName} actualizado a: ${newValue}`);
}

// Función para Eliminar
function deleteItem(itemName) {
    const confirmDelete = confirm(`¿Estás seguro de eliminar ${itemName}?`);
    if (confirmDelete) alert(`${itemName} eliminado.`);
}

// Función para Agregar
function addItem() {
    const newItem = prompt("Agregar un nuevo elemento:", "Nuevo elemento aquí");
    if (newItem) alert(`Elemento agregado: ${newItem}`);
}

// Oculta el menú si se hace clic fuera del info-box
window.addEventListener('click', (e) => {
    if (!e.target.closest('.info-box')) {
        document.querySelectorAll('.menu').forEach(menu => menu.style.display = 'none');
    }
});
//Estaciones//
// Función para cambiar el estado (Activo/Inactivo)
function toggleStatus(button) {
    if (button.textContent.trim() === "Activo") {
        button.textContent = "Inactivo";
        button.classList.remove("active");
        button.classList.add("inactive");
    } else {
        button.textContent = "Activo";
        button.classList.remove("inactive");
        button.classList.add("active");
    }
}

// Función para manejar el botón de editar
document.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", () => {
        alert("¡Modo edición activado! Modifica la información que desees.");
    });
});

// Función para manejar el botón de eliminar
document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", () => {
        const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta estación?");
        if (confirmDelete) {
            // Elimina la fila correspondiente
            const row = button.closest("tr");
            row.remove();
            alert("Estación eliminada exitosamente.");
        }
    });
});


var modal = document.getElementById("myModal");
var addButton = document.getElementById("addButton");
var closeModal = document.getElementById("closeModal");

// Open the modal
addButton.onclick = function() {
    modal.style.display = "block";
}

// Close the modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if clicked outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    });
});
//usuarios//


// Botón editar
userCards.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')) {
        currentCard = event.target.closest('.user-card');
        const name = currentCard.querySelector('h3').textContent;
        const email = currentCard.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const phone = currentCard.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        const birthdate = currentCard.querySelector('p:nth-child(4)').textContent.split(': ')[1];

        document.getElementById('editName').value = name;
        document.getElementById('editEmail').value = email;
        document.getElementById('editPhone').value = phone;
        document.getElementById('editBirthdate').value = birthdate;

        editModal.style.display = 'block';
    }
});

// Guardar cambios
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentCard.querySelector('h3').textContent = document.getElementById('editName').value;
    currentCard.querySelector('p:nth-child(2)').textContent = `Email: ${document.getElementById('editEmail').value}`;
    currentCard.querySelector('p:nth-child(3)').textContent = `No. de celular: ${document.getElementById('editPhone').value}`;
    currentCard.querySelector('p:nth-child(4)').textContent = `Fecha de nacimiento: ${document.getElementById('editBirthdate').value}`;
    editModal.style.display = 'none';
});

// Cancelar edición
cancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Botón eliminar
userCards.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const card = event.target.closest('.user-card');
        const name = card.querySelector('h3').textContent;
        const email = card.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const phone = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        const birthdate = card.querySelector('p:nth-child(4)').textContent.split(': ')[1];

        const confirmation = confirm(`¿Estás seguro de eliminar este usuario?\n\nNombre: ${name}\nEmail: ${email}\nNo. de celular: ${phone}\nFecha de nacimiento: ${birthdate}`);
        if (confirmation) {
            card.remove();
            alert('Usuario eliminado correctamente.');
        }
    }
});
// Close the modal if clicked outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// //
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("edit-modal");
    const closeButton = document.querySelector(".close-button");
    const editForm = document.getElementById("edit-form");
    let currentRow = null;

    // Abrir modal al hacer clic en el botón "Editar"
    document.querySelector("table tbody").addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains("edit")) {
            currentRow = target.closest("tr");

            // Prellenar el formulario del modal
            document.getElementById("edit-name").value = currentRow.cells[2].textContent.trim();
            document.getElementById("edit-email").value = currentRow.cells[3].textContent.trim();
            document.getElementById("edit-phone").value = currentRow.cells[4].textContent.trim();
            document.getElementById("edit-role").value = currentRow.cells[5].textContent.trim();

            // Mostrar el modal
            modal.style.display = "block";
        }
    });

    // Cerrar el modal
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Guardar cambios y actualizar la tabla
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (currentRow) {
            currentRow.cells[2].textContent = document.getElementById("edit-name").value;
            currentRow.cells[3].textContent = document.getElementById("edit-email").value;
            currentRow.cells[4].textContent = document.getElementById("edit-phone").value;
            currentRow.cells[5].textContent = document.getElementById("edit-role").value;

            alert("¡Guardado con éxito!");
            modal.style.display = "none";
        }
    });
});
