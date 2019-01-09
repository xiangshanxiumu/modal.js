(function (window, document) {
    function Modal(obj) {
        this.targetDom = document.getElementById(obj.targetId) // 获取触发节点元素
        if (this.targetDom.id === 'modal-login') {
            this.dialog = document.getElementsByClassName('dialog-login')[0]
        }
        if (this.targetDom.id === 'modal-register') {
            this.dialog = document.getElementsByClassName('dialog-register')[0]
        }
        this.dialogWidth = obj.dialog.width || '35rem' // 如果没有传入dialog宽度 则设置默认宽度
        this.dialogBackGroundColor = obj.dialog.backgroundColor || 'white' // 如果没有传入dialog背景色 则设置默认背景色

        this.targetDom.setAttribute("z-index", "100") // 触发节点z-index层级一定要比mask大  

        this.init() //初始化

        this.event() //加载事件
    }
    Modal.prototype = {
        /*初始化 */
        init: function () {
            /** 遮罩层mask*/
            this.mask = document.createElement('div')
            document.body.appendChild(this.mask)

            this.mask.className = 'mask'
            this.mask.style.display = 'none'
            this.mask.style.position = 'fixed'
            this.mask.style.left = 0
            this.mask.style.top = 0
            this.mask.style.right = 0
            this.mask.style.bottom = 0
            this.mask.style.zIndex = 80
            this.mask.style.backgroundColor = 'black'
            this.mask.style.opacity = 0

            /*中间dialog对话框*/
            this.dialog.style.width = this.dialogWidth
            this.dialog.style.borderRadius = '0.25rem'
            this.dialog.style.padding = '1rem'
            this.dialog.style.backgroundColor = this.dialogBackGroundColor
            this.dialog.style.position = 'fixed'
            this.dialog.style.left = '50%'
            this.dialog.style.top = '50%'
            this.dialog.style.transform = 'translate(-50%,-50%)'
            this.dialog.style.zIndex = 90
            this.dialog.style.display = 'none'
            /*设置header样式*/
            this.header = this.dialog.getElementsByTagName("header")[0]
            this.header.style.display = 'flex'
            this.header.style.width = '100%'
            this.header.style.backgroundColor = '#F0F0F0'
            this.header.style.justifyContent = 'center'
            this.header.style.fontSize = '1rem'
            /*设置content样式*/
            this.content = this.dialog.getElementsByTagName("content")[0]
            this.content.style.display = 'block'
            this.content.style.width = '100%'
            this.content.style.height = '70%'
            this.content.style.padding = '1rem 0'
            this.content.style.marginBottom = "1rem"
            this.content.style.display = 'flex'
            this.content.style.flexDirection = 'column'
            /*设置content里面元素样式 for循环 或者 forEach循环设置 */
            this.inputGroup = this.dialog.getElementsByClassName("input-group")
            for (var i = 0; i < this.inputGroup.length; i++) {
                this.inputGroup[i].style.display = 'flex'
                this.inputGroup[i].style.fontSize = '1.15rem'
                this.inputGroup[i].style.flexDirection = 'column'
                this.inputGroup[i].style.justifyContent = 'space-around'
            }

            /*设置footer样式*/
            this.footer = this.dialog.getElementsByTagName("footer")[0]
            this.footer.style.display = 'flex'
            this.footer.style.width = '100%'
            this.footer.style.backgroundColor = '#F0F0F0'
            this.footer.style.justifyContent = 'space-between'
            this.footer.style.fontSize = '1rem'
            /*footer 里面子元素样式设置*/
            for (var j = 0; j < this.footer.children.length; j++) {
                this.footer.children[j].style.margin = '0.5rem'
                this.footer.children[j].style.cursor = 'pointer'
            }
            /*footer 里面 提交-关闭按钮设置*/
            this.footer.children[1].style.display = 'flex'
            this.submit = this.footer.getElementsByClassName('submit')[0]
            this.submit.style.padding = '0 1rem'
            this.submit.style.border = 'none'
            this.submit.style.borderRadius = '0.25rem'
            this.submit.style.color = 'white'
            this.submit.style.backgroundColor = '#3388FF'
            this.submit.style.cursor = 'pointer'

            this.closed = this.footer.getElementsByClassName('closed')[0]
            this.closed.style.padding = '0 1rem'
            this.closed.style.border = 'none'
            this.closed.style.borderRadius = '0.25rem'
            this.closed.style.color = 'white'
            this.closed.style.backgroundColor = '#DC3545'
            this.closed.style.cursor = 'pointer'
        },
        event: function () {
            var that = this
            /*触发modal弹窗事件*/
            this.targetDom.onclick = function () {
                that.mask.style.display = 'block'
                that.dialog.style.display = 'block'
                that.setOpacity(that.mask, 0.5)
            }
            /*mask触发事件*/
            this.mask.onclick = function () {
                that.setOpacity(that.mask, 0) // 回调函数 透明度调到0 后 再设置display为none?
                that.mask.style.display = 'none'
                console.log(that.dialog)
                that.dialog.style.display = 'none'
            }
            /**提交按钮的事件 */
            /*提交按钮触发 提交内容事件*/
            this.submit.onclick = function () {
                //that.submit.submit()
            }
            this.submit.onmouseover = function () {
                that.submit.style.backgroundColor = '#33A1FF'
            }
            this.submit.onmouseout = function () {
                that.submit.style.backgroundColor = '#3388FF'
            }
            /** 关闭按钮的事件*/
            this.closed.onclick = function () {
                that.setOpacity(that.mask, 0)
                that.mask.style.display = 'none'
                that.dialog.style.display = 'none'
            }
            this.closed.onmouseover = function () {
                that.closed.style.backgroundColor = '#D55360'
            }
            this.closed.onmouseout = function () {
                that.closed.style.backgroundColor = '#DC3545'
            }
            /**footer窗口左侧的字体 鼠标事件 */
            this.footer.children[0].onmouseover = function () {
                that.footer.children[0].style.color = 'blue'
            }
            this.footer.children[0].onmouseout = function () {
                that.footer.children[0].style.color = ''
            }
            /**注册对话框 input添加 聚焦 失焦事件 */
            if (this.targetDom.id === 'modal-register') {
                this.input = this.content.getElementsByTagName('input')
                var inputArr = []
                for (var k = 0; k < this.input.length; k++) {
                    this.input[k].style.color = '#999'
                    //this.input[k].style.fontSize = '1.25rem'

                    inputArr.push(this.input[k].value) //inputArr 记住input 原value值
                    /*聚焦事件*/
                    this.input[k].onfocus = function () {
                        this.value = '' //  k值不定 利用this 指代 this.input[k] 
                    }
                }
                /*input 失去焦点事件*/
                this.input[0].onblur = function () {
                    this.value = inputArr[0]
                }
                this.input[1].onblur = function () {
                    this.value = inputArr[1]
                }
                this.input[2].onblur = function () {
                    this.value = inputArr[2]
                }
                this.input[3].onblur = function () {
                    this.value = inputArr[3]
                }
            }
            /** 注册-登录窗口切换跳转事件*/
            /*登录窗口跳转注册窗口*/
            if (this.targetDom.id === 'modal-login') {
                this.toggle = this.dialog.getElementsByClassName('target-to-register')[0]
                var targetDom = document.getElementById('modal-register') //或者注册节点
                this.toggle.onclick = function () {
                    that.setOpacity(that.mask, 0)
                    that.mask.style.display = 'none'
                    that.dialog.style.display = 'none'
                    targetDom.onclick() //触发注册节点
                }
            }
            /*注册窗口跳转登录窗口*/
            else {
                this.toggle = this.dialog.getElementsByClassName('target-to-login')[0]
                var targetDom = document.getElementById('modal-login') //或者登录节点
                this.toggle.onclick = function () {
                    that.setOpacity(that.mask, 0)
                    that.mask.style.display = 'none'
                    that.dialog.style.display = 'none'
                    targetDom.onclick() //触发登录节点
                }
            }
        },
        /*封装操作opacity动画函数 */
        setOpacity: function (ele, target) {
            /*如果目标元素opacity已经等于目标值，跳出执行*/
            if (ele.style.opacity === target) {
                return false
            }
            var speed = ele.style.opacity > target ? -0.05 : 0.05 //设置speed
            clearInterval(ele.timer)
            ele.timer = setInterval(function () {
                ele.style.opacity = parseFloat(ele.style.opacity) + speed
                if (speed > 0) {
                    if (ele.style.opacity >= target) {
                        clearInterval(ele.timer)
                        ele.style.opacity = target
                    }
                } else {
                    if (ele.style.opacity <= 0) {
                        clearInterval(ele.timer)
                        ele.style.opacity = 0
                    }
                }
            }, 50)
        }
    }

    window.Modal = Modal //构造函数挂载到window上

})(window, document)