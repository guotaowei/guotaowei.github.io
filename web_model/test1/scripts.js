const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

// 动态获取文件夹结构
async function loadFolderStructure(folderPath) {
    // console.log(folderPath)
    // const response = await fetch('/api/getFolderStructure'); // 调用服务器端API
    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // console.log(response)
    // const data = await response.json(); // 假设服务器返回JSON格式的文件夹结构
    const data = {

        "makeDown": {
            "folder1": {
                "MIMIC数据库": "MIMIC.md",
                "2": "file4_copy2.md",
            },
            "folder2": {
                "1": "MIMIC.md",
                "2": "file4_copy2.md",
            },
        },
        "makeDown2": {
            "folder1": {
                "MIMIC数据库": "MIMIC.md",
                "2": "file4_copy2.md",
            },
        },
        "MIMIC数据库": "makeDown/folder1//MIMIC.md",
    }
    generateNavigation(data);
}

// 创建文件夹
function creatorDir(level, parent, name) {
    const folderTitle = document.createElement('h' + (level + 1));
    folderTitle.textContent = name;
    folderTitle.style.cursor = 'pointer';
    folderTitle.addEventListener('click', (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        fileList.style.display = fileList.style.display === 'none' ? 'block' : 'none';
    });
    parent.appendChild(folderTitle);

    const fileList = document.createElement('ul');
    fileList.style.display = 'none'; // 默认折叠
    parent.appendChild(fileList);
    return fileList
}
// 动态生成导航栏
function generateNavigation(folderStructure, parentPath = '', level = 0, parent = sidebar) {
    for (const key in folderStructure) {
        const value = folderStructure[key];
        const isFolder = typeof value === 'object';
        if (isFolder) {
            // 处理文件夹
            // const folderContainer = document.createElement('div');
            // folderContainer.style.marginLeft = `${level * 20}px`; // 根据层级增加缩进


            const node = creatorDir(level, parent, key);

            generateNavigation(value, `${parentPath}${key}/`, level + 1, node); // 递归处理子文件夹，增加层级


            // folderContainer.appendChild(folderTitle);
            // folderContainer.appendChild(fileList);
            // sidebar.appendChild(folderContainer);
        } else {
            // 处理文件
            // const node = creatorDir(level, parent, key, parent);
            // value.forEach(file => {
            const fileItem = document.createElement('li');
            fileItem.textContent = key;
            fileItem.style.marginLeft = `20px`; // 根据层级增加缩进
            fileItem.addEventListener('click', () => {
                loadMarkdownFile(`${parentPath}${value}`);
            });
            parent.appendChild(fileItem);
            // });
            // const fileItem = document.createElement('li');
            // fileItem.textContent = value;
            // fileItem.style.marginLeft = `${level * 20}px`; // 根据层级增加缩进
            // fileItem.addEventListener('click', () => {
            //     loadMarkdownFile(`${parentPath}${value}`);
            // });
            // parent.appendChild(fileItem);
        }
    }
}

// 加载并显示Markdown文件内容
function loadMarkdownFile(filePath) {
    let temp = new URL(filePath, window.location.origin + window.location.pathname);
    fetch(temp)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            } else {
                response.text().then(text => {
                    content.innerHTML = marked.parse(text); // 使用marked.js解析Markdown
                })
            }
        })
        .catch(error => {
            content.innerHTML = `<p>无法加载文件: ${error}</p>`;
        });
}

// 初始化加载文件夹结构
loadFolderStructure('./makeDown/'); // 替换为实际的API路径

