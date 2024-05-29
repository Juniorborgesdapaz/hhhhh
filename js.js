document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const bio = document.getElementById('profile-bio').value;
    const skills = document.getElementById('profile-skills').value;
    
    saveProfile(name, email, bio, skills);
    showFeedback('Perfil atualizado com sucesso!');
});

function saveProfile(name, email, bio, skills) {
    // Função para salvar o perfil do usuário
    console.log('Perfil salvo:', { name, email, bio, skills });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}
document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const profilePic = document.getElementById('profile-pic').files[0];
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const bio = document.getElementById('profile-bio').value;
    const skills = document.getElementById('profile-skills').value;
    const interests = document.getElementById('profile-interests').value;
    
    saveProfile(profilePic, name, email, bio, skills, interests);
    showFeedback('Perfil atualizado com sucesso!');
});

function saveProfile(profilePic, name, email, bio, skills, interests) {
    // Função para salvar o perfil do usuário
    const profile = {
        profilePic: URL.createObjectURL(profilePic),
        name,
        email,
        bio,
        skills,
        interests
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    displayProfile(profile);
}

function displayProfile(profile) {
    document.getElementById('profile-pic-display').src = profile.profilePic;
    document.getElementById('profile-name-display')
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Funções para Fórum de Discussão
document.getElementById('new-discussion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('discussion-title').value;
    const content = document.getElementById('discussion-content').value;
    
    postDiscussion(title, content);
    showFeedback('Discussão iniciada com sucesso!');
});

function postDiscussion(title, content) {
    const discussion = { title, content, replies: [] };
    let discussions = JSON.parse(localStorage.getItem('discussions')) || [];
    discussions.push(discussion);
    localStorage.setItem('discussions', JSON.stringify(discussions));
    displayDiscussions();
}

function displayDiscussions() {
    const discussions = JSON.parse(localStorage.getItem('discussions')) || [];
    const discussionList = document.getElementById('discussion-list');
    discussionList.innerHTML = '';
    
    discussions.forEach((discussion, index) => {
        const discussionElement = document.createElement('div');
        discussionElement.className = 'discussion';
        discussionElement.innerHTML = `
            <h3>${discussion.title}</h3>
            <p>${discussion.content}</p>
            <button class="btn" onclick="showReplyForm(${index})">Responder</button>
            <div id="replies-${index}">
                ${discussion.replies.map(reply => `<p>${reply}</p>`).join('')}
            </div>
        `;
        discussionList.appendChild(discussionElement);
    });
}

function showDiscussionForm() {
    document.getElementById('discussion-form').style.display = 'block';
}

function showReplyForm(index) {
    const reply = prompt('Digite sua resposta:');
    if (reply) {
        let discussions = JSON.parse(localStorage.getItem('discussions'));
        discussions[index].replies.push(reply);
        localStorage.setItem('discussions', JSON.stringify(discussions));
        displayDiscussions();
        showFeedback('Resposta publicada com sucesso!');
    }
}

// Funções para Q&A
document.getElementById('new-qna-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const question = document.getElementById('qna-question').value;
    
    postQna(question);
    showFeedback('Pergunta enviada com sucesso!');
});

function postQna(question) {
    const qna = { question, answers: [] };
    let qnas = JSON.parse(localStorage.getItem('qnas')) || [];
    qnas.push(qna);
    localStorage.setItem('qnas', JSON.stringify(qnas));
    displayQnas();
}

function displayQnas() {
    const qnas = JSON.parse(localStorage.getItem('qnas')) || [];
    const qnaList = document.getElementById('qna-list');
    qnaList.innerHTML = '';
    
    qnas.forEach((qna, index) => {
        const qnaElement = document.createElement('div');
        qnaElement.className = 'qna';
        qnaElement.innerHTML = `
            <h3>${qna.question}</h3>
            <button class="btn" onclick="showAnswerForm(${index})">Responder</button>
            <div id="answers-${index}">
                ${qna.answers.map(answer => `<p>${answer}</p>`).join('')}
            </div>
        `;
        qnaList.appendChild(qnaElement);
    });
}

function showQnaForm() {
    document.getElementById('qna-form').style.display = 'block';
}

function showAnswerForm(index) {
    const answer = prompt('Digite sua resposta:');
    if (answer) {
        let qnas = JSON.parse(localStorage.getItem('qnas'));
        qnas[index].answers.push(answer);
        localStorage.setItem('qnas', JSON.stringify(qnas));
        displayQnas();
        showFeedback('Resposta publicada com sucesso!');
    }
}

// Feedback e Toggle Sidebar
function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Display discussions and Q&A on page load
displayDiscussions();
displayQnas();


