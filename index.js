window.onload = function () {
    //创建登录窗口
    const modallogin = new Modal({
        targetId: 'modal-login',
        dialog: {
            width: "25rem",
            backgroundColor: "white"
        }
    });
    //创建注册窗口
    const modalregister = new Modal({
        targetId: 'modal-register',
        dialog: {
            width: "30rem",
            backgroundColor: "white"
        }
    })
}
