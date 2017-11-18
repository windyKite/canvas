function canvas() {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var eraserEnabled = false

    // 1. 自动调整 canvas 画布大小
    autoResetCanvas(canvas);

    // 2. 监听用户
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        console.log(document.body.ontouchStart)
        // 监听触摸事件
        touchEvent(canvas, context)
    } else {
        // 监听鼠标事件
        mouseEvent(canvas, context);
    }

    // 3. 监听按钮
    actions()

    // 4. 改变笔触大小
    penSize(context)

    // 5. 改变颜色
    color(context)

    /*******************************************************************************************/

    // 工具函数

    // 自动调整 canvas 画布大小
    function autoResetCanvas(canvas) {
        resetCanvas(canvas)
        window.onresize = function () {
            resetCanvas(canvas)
        }

        function resetCanvas(canvas) {
            var pageWidth = document.documentElement.clientWidth
            var pageHeight = document.documentElement.clientHeight
            canvas.width = pageWidth - 50
            canvas.height = pageHeight - 50
            removeActive()
            black.classList.add("active")
            removeSizeActive()
            size_1.classList.add("active")
        }
    }

    // 画直线
    function drawLine(x1, y1, x2, y2) {
        context.beginPath()
        context.moveTo(x1, y1)
        // context.lineWidth = 5
        context.lineTo(x2, y2)
        context.closePath()
        context.stroke()
    }

    // 触摸事件
    function touchEvent(canvas, context) {
        var using = false
        var lastPoint = { x: undefined, y: undefined }

        // 触摸开始事件
        canvas.ontouchstart = function (e) {
            console.log(11212)
            using = true
            var x = e.touches[0].clientX - 50,
                y = e.touches[0].clientY - 50;
            lastPoint = { x: x, y: y }
            console.log(lastPoint)
        }
        // 触摸移动事件
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX - 50,
                y = e.touches[0].clientY - 50,
                newPoint = { x: x, y: y }
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                } else {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        // 触摸结束事件
        canvas.ontouchend = function (e) {
            using = false
        }
    }

    // 鼠标事件
    function mouseEvent(canvas, context) {
        var using = false
        var lastPoint = { x: undefined, y: undefined }

        // 鼠标点击事件
        canvas.onmousedown = function (e) {
            using = true
            var x = e.clientX - 50,
                y = e.clientY - 50;
            lastPoint = { x: x, y: y }
            console.log(lastPoint)
        }
        // 鼠标移动事件
        canvas.onmousemove = function (e) {
            var x = e.clientX - 50,
                y = e.clientY - 50,
                newPoint = { x: x, y: y }
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                } else {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        // 鼠标松开事件
        canvas.onmouseup = function (e) {
            using = false
        }
    }

    // 笔触颜色
    function color(context) {
        black.onclick = function (e) {
            removeActive()
            black.classList.add("active")
            context.strokeStyle = "black"
        }
        red.onclick = function (e) {
            removeActive()
            red.classList.add("active")
            context.strokeStyle = "red"
        }
        green.onclick = function (e) {
            removeActive()
            green.classList.add("active")
            context.strokeStyle = "green"
        }
        blue.onclick = function (e) {
            removeActive()
            blue.classList.add("active")
            context.strokeStyle = "blue"
        }
        grey.onclick = function (e) {
            removeActive()
            grey.classList.add("active")
            context.strokeStyle = "grey"
        }
        yellow.onclick = function (e) {
            removeActive()
            yellow.classList.add("active")
            context.strokeStyle = "yellow"
        }
        orange.onclick = function (e) {
            removeActive()
            orange.classList.add("active")
            context.strokeStyle = "orange"
        }
    }

    // 笔触颜色：移除选中样式
    function removeActive() {
        black.classList.remove("active")
        red.classList.remove("active")
        green.classList.remove("active")
        blue.classList.remove("active")
        grey.classList.remove("active")
        yellow.classList.remove("active")
        orange.classList.remove("active")
    }

    // 笔触大小
    function penSize(context) {
        size_1.onclick = function () {
            context.lineWidth = 1
            removeSizeActive()
            size_1.classList.add("active")
        }
        size_2.onclick = function () {
            context.lineWidth = 5
            removeSizeActive()
            size_2.classList.add("active")
        }
        size_3.onclick = function () {
            context.lineWidth = 10
            removeSizeActive()
            size_3.classList.add("active")
        }
        size_4.onclick = function () {
            context.lineWidth = 15
            removeSizeActive()
            size_4.classList.add("active")
        }

        size_5.onclick = function () {
            context.lineWidth = 20
            removeSizeActive()
            size_5.classList.add("active")
        }
    }

    // 笔触大小：移除选中样式
    function removeSizeActive() {
        size_1.classList.remove("active")
        size_2.classList.remove("active")
        size_3.classList.remove("active")
        size_4.classList.remove("active")
        size_5.classList.remove("active")
    }

    // actions 按钮监听
    function actions() {
        // 全部清除
        clear.onclick = function () {
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
        // 保存
        download.onclick = function () {
            var url = canvas.toDataURL("image/png")
            var downloadKey = document.createElement("a")
            document.body.appendChild(downloadKey)
            downloadKey.href = url
            var name = prompt("请输入画的名字")
            downloadKey.download = name
            downloadKey.target = "_blank"
            downloadKey.click()
        }

        // 橡皮擦
        var eraser = document.getElementById('eraser')
        eraser.onclick = function (e) {
            eraserEnabled = !eraserEnabled
            if (eraserEnabled == true) {
                console.log(eraser.className)
                pen.classList.remove("active")
                eraser.classList.add("active")
                console.log(eraser.className)
            } else {
                eraser.classList.remove("active")
            }
        }

        // 铅笔
        pen.onclick = function (e) {
            eraser.classList.remove("active")
            pen.classList.add("active")
            eraserEnabled = !eraserEnabled
        }
    }
}

canvas();