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
}