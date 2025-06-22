// 研究内容列表分页操作
const Group_ResearchList_itemsPerPage = 4; // 每页显示的项目数量
const Group_ResearchList_items = document.querySelectorAll('#Group_ResearchList_content .Group_ResearchList_item');
const Group_ResearchList_totalPages = Math.ceil(Group_ResearchList_items.length / Group_ResearchList_itemsPerPage);
let Group_ResearchList_currentPage = 0;

function Group_ResearchList_showPage(page,IsFirst) {
    Group_ResearchList_items.forEach((item, index) => {
        item.style.display = (index >= page * Group_ResearchList_itemsPerPage && index < (page + 1) * Group_ResearchList_itemsPerPage) ? 'block' : 'none';
    });
    document.getElementById('Group_ResearchList_pageInfo').textContent = `${page + 1} / ${Group_ResearchList_totalPages}`;
    if (!IsFirst){
        document.getElementById('Research').scrollIntoView({ behavior: 'smooth' }); // 滚动到内容区域
    }

}

document.getElementById('Group_ResearchList_prev').addEventListener('click', () => {
    if (Group_ResearchList_currentPage > 0) {
        Group_ResearchList_currentPage--;
        Group_ResearchList_showPage(Group_ResearchList_currentPage,false);
    }
});

document.getElementById('Group_ResearchList_next').addEventListener('click', () => {
    if (Group_ResearchList_currentPage < Group_ResearchList_totalPages - 1) {
        Group_ResearchList_currentPage++;
        Group_ResearchList_showPage(Group_ResearchList_currentPage,false);
    }
});

document.getElementById('Group_ResearchList_jump').addEventListener('click', () => {
    const jumpPage = parseInt(document.getElementById('Group_ResearchList_jumpPage').value) - 1;
    if (jumpPage >= 0 && jumpPage < Group_ResearchList_totalPages) {
        Group_ResearchList_currentPage = jumpPage;
        Group_ResearchList_showPage(Group_ResearchList_currentPage,false);
    }
});

// 添加回车事件监听器
document.getElementById('Group_ResearchList_jumpPage').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const jumpPage = parseInt(event.target.value) - 1;
        if (jumpPage >= 0 && jumpPage < Group_ResearchList_totalPages) {
            Group_ResearchList_currentPage = jumpPage;
            Group_ResearchList_showPage(Group_ResearchList_currentPage);
        }
    }
});

Group_ResearchList_showPage(Group_ResearchList_currentPage,true); // 初始化显示第一页