document.getElementById('new-campaign-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('campaign-title').value;
    const description = document.getElementById('campaign-description').value;
    const goal = document.getElementById('campaign-goal').value;
    
    launchCampaign(title, description, goal);
    showFeedback('Campanha lançada com sucesso!');
});

function launchCampaign(title, description, goal) {
    const campaign = { title, description, goal, raised: 0 };
    let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    displayCampaigns();
}

function displayCampaigns() {
    const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    const campaignsList = document.getElementById('campaigns-list');
    campaignsList.innerHTML = '';
    
    campaigns.forEach((campaign, index) => {
        const campaignElement = document.createElement('div');
        campaignElement.className = 'campaign';
        campaignElement.innerHTML = `
            <h3>${campaign.title}</h3>
            <p>${campaign.description}</p>
            <p><strong>Meta: R$${campaign.goal}</strong></p>
            <p><strong>Arrecadado: R$${campaign.raised}</strong></p>
            <button class="btn" onclick="donate(${index})">Doar</button>
        `;
        campaignsList.appendChild(campaignElement);
    });
}

function donate(index) {
    const amount = prompt('Quanto você gostaria de doar?');
    if (amount) {
        let campaigns = JSON.parse(localStorage.getItem('campaigns'));
        campaigns[index].raised += parseFloat(amount);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        displayCampaigns();
        showFeedback('Obrigado pela sua doação!');
    }
}

function showCampaignForm() {
    document.getElementById('campaign-form').style.display = 'block';
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

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Display campaigns on page load
displayCampaigns();
