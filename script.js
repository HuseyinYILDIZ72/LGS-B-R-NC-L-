const form = document.getElementById('resource-form');
const loginForm = document.getElementById('login-form');
const mainContainer = document.getElementById('main-container');
const loginContainer = document.getElementById('login-container');

// Sayfa açıldığı zaman giriş formunu göster
window.onload = function() {
    mainContainer.style.display = 'none'; // Ana sayfa gizli
};

// Giriş işlemi
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Basit bir kontrol (örnek)
    if (username === 'admin' && password === 'admin123') {
        alert('Giriş başarılı! Admin paneline yönlendiriliyorsunuz.');
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block'; // Ana sayfayı göster
    } else {
        alert('Kullanıcı adı veya şifre hatalı.');
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;
    const fileInput = document.getElementById('file');

    const listId = `resource-list-${['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Din Kültürü'].indexOf(subject) + 1}`;
    const resourceList = document.getElementById(listId);
    const listItem = document.createElement('li');

    let fileName = '';
    let downloadLink = '';
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        fileName = ` [Dosya: ${file.name}]`;
        downloadLink = URL.createObjectURL(file);
    }

    listItem.innerHTML = `<strong>${title}</strong>: ${link ? `<a href="${link}" target="_blank">${link}</a>` : 'Link eklenmedi.'}${fileName} ${fileName ? `<a href="${downloadLink}" class="download-link" download>İndir</a>` : ''} <button class="delete-button" onclick="deleteResource(this)">Sil</button>`;
    listItem.dataset.fileName = fileName; // Dosya adını sakla
    listItem.dataset.downloadLink = downloadLink; // İndir linkini sakla
    resourceList.appendChild(listItem);

    document.getElementById('subject').value = '';
    document.getElementById('title').value = '';
    document.getElementById('link').value = '';
    fileInput.value = '';
});

function deleteResource(button) {
    const listItem = button.parentElement;
    const fileName = listItem.dataset.fileName;
    const downloadLink = listItem.dataset.downloadLink;

    // Dosya bilgilerini sakla
    const deletedResources = JSON.parse(localStorage.getItem('deletedResources')) || [];
    deletedResources.push({ title: listItem.firstChild.innerText, fileName, downloadLink });
    localStorage.setItem('deletedResources', JSON.stringify(deletedResources));

    listItem.remove();
}