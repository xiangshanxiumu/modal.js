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

            let maskStyle = "display:none;position:fixed;left:0;top:0;right:0;bottom:0;z-index:80;background-color:black;opacity:0;"
            this.mask.style.cssText += maskStyle

            /*中间dialog对话框*/
            this.dialog.style.width = this.dialogWidth
            this.dialog.style.backgroundColor = this.dialogBackGroundColor
            let dialogStyle = "border-radius:0.25rem;padding:1rem;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:90;display:none;"
            this.dialog.style.cssText += dialogStyle
            /*设置header样式*/
            this.header = this.dialog.getElementsByTagName("header")[0]
            let headerStyle = "display:flex;justify-content:center;background-color:#F0F0F0;font-size:1rem;"
            this.header.style.cssText += headerStyle
            /*设置content样式*/
            this.content = this.dialog.getElementsByTagName("content")[0]
            let contentStyle = "padding:1.5rem 0;margin-bottom:1rem;display:flex;flex-direction:column;"
            this.content.style.cssText += contentStyle
            /*设置content里面元素样式 for循环 或者 forEach循环设置 */
            this.inputGroup = this.dialog.getElementsByClassName("input-group")
            for (var i = 0; i < this.inputGroup.length; i++) {
                let inputStyle = "display:flex;flex-direction:column;font-size:1.15rem;"
                this.inputGroup[i].style.cssText += inputStyle
            }
            /*设置footer样式*/
            this.footer = this.dialog.getElementsByTagName("footer")[0]
            let footerStyle = "display:flex;justify-content:space-between;background-color:#F0F0F0;font-size:1rem;"
            this.footer.style.cssText += footerStyle
            /*footer 里面子元素样式设置*/
            for (var j = 0; j < this.footer.children.length; j++) {
                let footerChildrenStyle = "margin:0.5rem;cursor:pointer;"
                this.footer.children[j].style.cssText += footerChildrenStyle
            }
            /*footer 里面 提交-关闭按钮设置*/
            this.footer.children[1].style.display = 'flex'
            this.submit = this.footer.getElementsByClassName('submit')[0]
            let submitBottonStyle = "border:none;border-radius:0.25rem;padding:0 1rem;background-color:#3388FF;color:white;outline-color:#3388FF;cursor:pointer;"
            this.submit.style.cssText += submitBottonStyle

            this.closed = this.footer.getElementsByClassName('closed')[0]
            let closedButtonStyle = "border:none;border-radius:0.25rem;padding:0 1rem;background-color:#DC3545;color:white;outline-color:#DC3545;cursor:pointer;"
            this.closed.style.cssText += closedButtonStyle
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
                that.dialog.style.display = 'none'
                that.setOpacity(that.mask, 0, function () {
                    that.mask.style.display = 'none'
                })
            }
            /**提交按钮的事件 */
            /*提交按钮触发 提交内容事件*/
            this.submit.onclick = function () {
                //that.submit.submit()
            }
            this.submit.onmouseover = function () {
                this.style.backgroundColor = '#33A1FF'
            }
            this.submit.onmouseout = function () {
                this.style.backgroundColor = '#3388FF'
            }
            /** 关闭按钮的事件*/
            this.closed.onclick = function () {
                that.dialog.style.display = 'none'
                that.setOpacity(that.mask, 0, function () {
                    that.mask.style.display = 'none'
                })
            }
            this.closed.onmouseover = function () {
                this.style.backgroundColor = '#D55360'
            }
            this.closed.onmouseout = function () {
                this.style.backgroundColor = '#DC3545'
            }
            /**footer窗口左侧的字体 鼠标事件 */
            this.footer.children[0].onmouseover = function () {
                this.children[0].style.color = 'blue'
            }
            this.footer.children[0].onmouseout = function () {
                this.children[0].style.color = ''
            }
            /**注册对话框 input添加 聚焦 失焦事件 */
            if (this.targetDom.id === 'modal-register') {
                let inputList = this.content.getElementsByTagName('input')
                let inputArr = []
                for (var k = 0; k < inputList.length; k++) {
                    inputList[k].style.color = '#999'
                    inputArr.push(inputList[k].value); //inputArr 记住input 原value值
                }
                for (let k in inputList) {
                    (function () {
                        inputList[k].onfocus = function () {
                            this.value == inputArr[k] ? this.value = "" : this.value
                        }
                        inputList[k].onblur = function () {
                            this.value == "" ? this.value = inputArr[k] : this.value
                        }
                    }())
                }
            }
            /** 注册-登录窗口切换跳转事件*/
            /*登录窗口跳转注册窗口*/
            if (this.targetDom.id === 'modal-login') {
                this.toggle = this.dialog.getElementsByClassName('target-to-register')[0]
                var targetDom = document.getElementById('modal-register') //或者注册节点
                this.toggle.onclick = function () {
                    that.dialog.style.display = 'none'
                    that.mask.style.display = 'none'
                    targetDom.onclick() //触发注册节点
                }
            }
            /*注册窗口跳转登录窗口*/
            else {
                this.toggle = this.dialog.getElementsByClassName('target-to-login')[0]
                var targetDom = document.getElementById('modal-login') //或者登录节点
                this.toggle.onclick = function () {
                    that.dialog.style.display = 'none'
                    that.mask.style.display = 'none'
                    targetDom.onclick() //触发登录节点
                }
            }
        },
        /*封装操作opacity动画函数 */
        setOpacity: function (ele, target, callback) {
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
                        callback && callback()
                    }
                } else {
                    if (ele.style.opacity <= 0) {
                        clearInterval(ele.timer)
                        ele.style.opacity = 0
                        callback && callback()
                    }
                }
            }, 50)

        }
    }

    window.Modal = Modal //构造函数挂载到window上

})(window, document)