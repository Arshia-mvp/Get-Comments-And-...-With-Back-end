let container = document.querySelector('.container');

let p = document.querySelector('.p');

p.classList.add('loading');

async function getInformaitionInBackEnd () {
    try{
        
        let response = await fetch('https://jsonplaceholder.typicode.com/comments'); 
        
        if (!response.ok) {
            new Error(`HTTP error! Status: ${response.status}`);
        }
        
        let informaition = await response.json();
        
        let commentsToDisplay = informaition.slice(0, 500);
        console.log(`Successfully fetched and preparing to display ${commentsToDisplay.length} comments.`);

        container.innerHTML = ''; 
        
        renderUser(commentsToDisplay , container);
    }
    catch (error) {
        console.error("Fetch/Processing Error:", error.message);
        
        container.innerHTML = '';
        
        let errorDiv = document.createElement('div');
        errorDiv.textContent = '😭 متاسفانه خطا در پردازش اطلاعات';
        
        errorDiv.classList.add('errorMessage'); 
        container.appendChild(errorDiv);
    }
}

function renderUser (userList , container) {
    
    if (userList.length === 0) return; 

    userList.forEach((item) => {
        let box = document.createElement('div');

        box.classList.add('box'); 
        
        box.innerHTML = `
            <strong>ID: ${item.id}</strong>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <hr>
            <p class="comment-body">${item.body.substring(0, 120)}...</p>
        `;
        container.appendChild(box);
    });
}

getInformaitionInBackEnd();