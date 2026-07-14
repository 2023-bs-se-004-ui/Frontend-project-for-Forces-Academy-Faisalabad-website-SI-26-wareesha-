console.log("Main JS Loaded Successfully!");
const classFilter  = document.getElementById('classFilter');
const yearFilter   = document.getElementById('yearFilter');
const searchInput  = document.getElementById('searchInput');
const applyBtn     = document.getElementById('applyBtn');
const resetBtn     = document.getElementById('resetBtn');
const rows         = document.querySelectorAll('#resultsBody tr');
const countPill    = document.getElementById('countPill');
const noResults    = document.getElementById('noResults');

function applyFilters(){
  const selectedClass = classFilter.value;
  const selectedYear  = yearFilter.value;
  const searchTerm    = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  rows.forEach(row => {
    const rowClass = row.dataset.class;
    const rowYear  = row.dataset.year;
    const rowName  = row.querySelector('.student-name').textContent.toLowerCase();

    const classMatch  = (selectedClass === 'All Classes') || (rowClass === selectedClass);
    const yearMatch    = (rowYear === selectedYear);
    const searchMatch  = (searchTerm === '') || rowName.includes(searchTerm);

    const isMatch = classMatch && yearMatch && searchMatch;
    row.style.display = isMatch ? '' : 'none';
    if (isMatch) visibleCount++;
  });

  countPill.textContent = visibleCount + (visibleCount === 1 ? ' record' : ' records');
  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

function resetFilters(){
  classFilter.value = 'All Classes';
  yearFilter.value = '2026';
  searchInput.value = '';
  applyFilters();
}

applyBtn.addEventListener('click', applyFilters);
resetBtn.addEventListener('click', resetFilters);
searchInput.addEventListener('input', applyFilters);

// Run once on load so the default Year (2026) filter reflects real data
applyFilters();