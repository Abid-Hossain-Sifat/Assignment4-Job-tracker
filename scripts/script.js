let interviewList = [];
let rejectList = [];
let currentStatus = 'all-btn';

const totalCount = document.getElementById('total');
const interviewCount = document.getElementById('interview');
const rejectCount = document.getElementById('rejected');
const jobAvailable = document.getElementById('job-available');

const allCardSection = document.getElementById('all-cards');
const filterSection = document.getElementById('filtered-card');
const noJobsSection = document.getElementById('no-jobs');

function calculateCount() {
    totalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectList.length;
}
calculateCount();


function toggleStyle(id) {
    const allBtn = document.getElementById('all-btn');
    const interviewBtn = document.getElementById('interview-btn');
    const rejectedBtn = document.getElementById('rejected-btn');

    [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-soft', 'text-slate-500');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('btn-soft', 'text-slate-500');
    selected.classList.add('btn-primary', 'text-white');

    currentStatus = id;

    allCardSection.classList.add('hidden');
    filterSection.classList.add('hidden');
    noJobsSection.classList.add('hidden');

    if (id === 'interview-btn') {
        if (interviewList.length === 0) {
            noJobsSection.classList.remove('hidden');
        } else {
            filterSection.classList.remove('hidden');
            renderInterview();
        }
        jobAvailable.innerText = interviewList.length;
    } else if (id === 'rejected-btn') {
        if (rejectList.length === 0) {
            noJobsSection.classList.remove('hidden');
        } else {
            filterSection.classList.remove('hidden');
            renderReject();
        }
        jobAvailable.innerText = rejectList.length;
    } else {
        allCardSection.classList.remove('hidden');
        jobAvailable.innerText = allCardSection.children.length;
    }
    calculateCount();
};


const mainContainer = document.querySelector('main');
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-success') || event.target.classList.contains('btn-error')) {
        const card = event.target.closest('.relative.bg-white');
        if (!card) return;

        const companyName = card.querySelector('.text-xl.font-semibold').innerText;
        const position = card.querySelector('.text-sm.text-gray-500').innerText;
        const info = card.querySelectorAll('.text-sm.text-gray-600')[0].innerText;
        const statusElement = card.querySelector('.inline-block');
        const note = card.querySelector('.leading-6').innerText;

        const cardInfo = { companyName, position, info, note };

        if (event.target.classList.contains('btn-success')) {
            statusElement.innerText = 'INTERVIEW';
            statusElement.className = 'inline-block bg-green-50 py-2 px-4 text-sm font-medium text-green-700 rounded-md';
            if (!interviewList.find(item => item.companyName === companyName)) {
                interviewList.push(cardInfo);
            }
            rejectList = rejectList.filter(item => item.companyName !== companyName);
        } else if (event.target.classList.contains('btn-error') && !event.target.closest('.text-gray-400')) {
            statusElement.innerText = 'REJECTED';
            statusElement.className = 'inline-block bg-red-50 py-2 px-4 text-sm font-medium text-red-700 rounded-md';
            if (!rejectList.find(item => item.companyName === companyName)) {
                rejectList.push(cardInfo);
            }
            interviewList = interviewList.filter(item => item.companyName !== companyName);
        }
        calculateCount();
        if (currentStatus !== 'all-btn') toggleStyle(currentStatus);
    }

    if (event.target.closest('.text-gray-400')) {
        const card = event.target.closest('.relative.bg-white');
        const companyName = card.querySelector('.text-xl.font-semibold').innerText;
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectList = rejectList.filter(item => item.companyName !== companyName);
        card.remove();
        calculateCount();
        toggleStyle(currentStatus);
    }
});

function renderInterview() {
    filterSection.innerHTML = '';
    interviewList.forEach(item => {
        let div = document.createElement('div');
        div.className = 'relative bg-white p-6 rounded-lg shadow w-full border-l-4 border-green-400 mb-6';
        div.innerHTML = `
            <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition text-xl">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            <div class="space-y-6">
                <div><p class="text-xl font-semibold text-gray-800">${item.companyName}</p><p class="text-sm text-gray-500">${item.position}</p></div>
                <p class="text-sm text-gray-600">${item.info}</p>
                <p class="inline-block bg-green-50 py-2 px-4 text-sm font-medium text-green-700 rounded-md">INTERVIEW</p>
                <p class="text-sm text-gray-600 leading-6">${item.note}</p>
                <div class="flex gap-3">
                    <button class="px-4 py-2 btn btn-outline btn-success">Interview</button>
                    <button class="px-4 py-2 btn btn-outline btn-error">Rejected</button>
                </div>
            </div>`;
        filterSection.appendChild(div);
    });
}

function renderReject() {
    filterSection.innerHTML = '';
    rejectList.forEach(item => {
        let div = document.createElement('div');
        div.className = 'relative bg-white p-6 rounded-lg shadow w-full border-l-4 border-red-400 mb-6';
        div.innerHTML = `
            <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition text-xl">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            <div class="space-y-6">
                <div><p class="text-xl font-semibold text-gray-800">${item.companyName}</p><p class="text-sm text-gray-500">${item.position}</p></div>
                <p class="text-sm text-gray-600">${item.info}</p>
                <p class="inline-block bg-red-50 py-2 px-4 text-sm font-medium text-red-700 rounded-md">REJECTED</p>
                <p class="text-sm text-gray-600 leading-6">${item.note}</p>
                <div class="flex gap-3">
                    <button class="px-4 py-2 btn btn-outline btn-success">Interview</button>
                    <button class="px-4 py-2 btn btn-outline btn-error">Rejected</button>
                </div>
            </div>`;
        filterSection.appendChild(div);
    });
}