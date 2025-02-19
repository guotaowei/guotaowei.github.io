// navbar.js
export function createNavBar(container, options = {}) {
    window.handleClick = function (link) {
        if (!link || link.trim() === '' || link === '#') {
            alert('该功能暂未开放，敬请期待！');
            return;
        }
        window.location.href = link;
    };

    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    // 创建登录弹窗
    const loginModal = document.createElement('div');
    loginModal.className = 'login-modal';

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
         .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }
        .nav-left {
            display: flex;
            gap: 1rem;
        }
        .nav-right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .nav-button {
            padding: 0.5rem 1rem;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 1rem;
            color: #333;
        }
        .nav-button:hover {
            color: #007bff;
        }
        .login-button {
            padding: 0.5rem 1rem;
            border: 1px solid #007bff;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
        }
        .login-button:hover {
            background-color: #0056b3;
        }
        
        /* 登录弹窗样式 */
        .login-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .login-modal.active {
            display: flex;
        }
        .login-form {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            width: 300px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
        }
        .form-group input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        .form-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
        }
        .form-buttons button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .submit-btn {
            background-color: #007bff;
            color: white;
        }
        .submit-btn:hover {
            background-color: #0056b3;
        }
        .cancel-btn {
            background-color: #6c757d;
            color: white;
        }
        .cancel-btn:hover {
            background-color: #5a6268;
        }
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
        }
    `;
    document.head.appendChild(style);

    // 创建登录弹窗内容
    loginModal.innerHTML = `
        <div class="login-form">
            <h2 style="margin-bottom: 1.5rem">用户登录</h2>
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" placeholder="请输入用户名">
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" placeholder="请输入密码">
                <div class="error-message" id="loginError"></div>
            </div>
            <div class="form-buttons">
                <button class="cancel-btn" id="cancelLogin">取消</button>
                <button class="submit-btn" id="submitLogin">登录</button>
            </div>
        </div>
    `;
    document.body.appendChild(loginModal);

    // 渲染导航栏
    function render() {
        const {
            isLoggedIn = false,
            username = '',
            navItems = [
                { text: '主页', url: '../index.html' },
                { text: '关于我们', url: '#' }
            ]
        } = options;

        navbar.innerHTML = `
            <div class="nav-left">
                ${navItems.map(item => `
                    <button class="nav-button" onclick="handleClick('${item.url}')" >${item.text}</button>
                `).join('')}
            </div>
            <div class="nav-right">
                ${isLoggedIn ? `
                    <div class="user-profile">
                        <img src="" alt="admin" class="user-avatar">
                        <span class="username">${username}</span>
                    </div>
                ` : `
                    <button class="login-button" id="loginBtn">登录</button>
                `}
            </div>
        `;

        // 绑定登录按钮点击事件
        const loginBtn = navbar.querySelector('#loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', showLoginModal);
        }
    }

    // 显示登录弹窗
    function showLoginModal() {
        loginModal.classList.add('active');
    }

    // 隐藏登录弹窗
    function hideLoginModal() {
        loginModal.classList.remove('active');
        // 清空输入框和错误信息
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('loginError').style.display = 'none';
    }

    // 处理登录逻辑
    function handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('loginError');

        // 简单的表单验证
        if (!username || !password) {
            errorElement.textContent = '请填写用户名和密码';
            errorElement.style.display = 'block';
            return;
        }

        // 这里可以添加实际的登录逻辑
        // 示例使用模拟登录
        if (username === 'admin' && password === '123456') {
            options.isLoggedIn = true;
            options.username = username;
            hideLoginModal();
            render();
        } else {
            errorElement.textContent = '用户名或密码错误';
            errorElement.style.display = 'block';
        }
    }

    // 绑定登录弹窗事件
    document.getElementById('cancelLogin').addEventListener('click', hideLoginModal);
    document.getElementById('submitLogin').addEventListener('click', handleLogin);

    // // 点击弹窗外部关闭弹窗
    // loginModal.addEventListener('click', (e) => {
    //     if (e.target === loginModal) {
    //         hideLoginModal();
    //     }
    // });

    // 初始渲染
    render();

    // 将导航栏添加到容器中
    container.appendChild(navbar);

    // 返回更新方法和其他控制方法
    return {
        update(newOptions) {
            Object.assign(options, newOptions);
            render();
        },
        showLogin: showLoginModal,
        hideLogin: hideLoginModal
    };
}
