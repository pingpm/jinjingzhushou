document.addEventListener('DOMContentLoaded', function() {
    // 使用单张大图作为用户头像背景
    const avatarGrid = document.querySelector('.avatar-grid');
    avatarGrid.style.backgroundImage = 'url("images/avatar_bg.png")';
    avatarGrid.style.backgroundSize = 'cover';
    avatarGrid.style.backgroundPosition = 'center';
    avatarGrid.style.height = '300px';
    avatarGrid.style.width = '100%';
    avatarGrid.style.borderRadius = '10px';
    avatarGrid.style.margin = '0 auto'

    // 下载按钮点击事件已在index.html中处理

    // 添加页面滚动动画效果
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});