# mocap.js-jiagar

如何在你的项目中使用它？
你可以把上面的代码保存为 mocap.js，然后在你的 HTML 文件中像这样简单调用：

HTML
<!-- 引入 MediaPipe 和我们的 mocap.js -->
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"></script>
<script src="mocap.js"></script>

<script>
    // 1. 初始化 Mocap
    const myMocap = new Mocap({
        modelComplexity: 1, // 0: 快速, 1: 平衡, 2: 极高精度(适合 PS4 广角)
        onResults: (results) => {
            if (results.poseWorldLandmarks) {
                // 2. 获取 3D 世界坐标
                const landmarks = results.poseWorldLandmarks;
                const leftShoulder = Mocap.toVector3(landmarks[11], 2.5);
                console.log("左肩 3D 坐标:", leftShoulder);
                
                // 在这里把坐标传给你的 3D 模型
            }
        }
    });

    // 3. 在你的循环函数中持续更新
    function tick() {
        myMocap.update(videoElement); 
        requestAnimationFrame(tick);
    }
</script>

### 库的设计特点：
1.  **极简 API**：只需要 `update()` 和 `onResults` 回调即可。
2.  **静态工具函数**：内置了 `toVector3` 坐标转换逻辑和标准的 `CONNECTIONS` 连线图，方便你快速绘制骨架。
3.  **高性能兼容**：保留了 `modelComplexity` 设置。如果你以后接了更先进的摄像头，只需改为 `2` 即可获得更强的深度感知。

这是一个非常适合学生或开发者做原型展示的轻量级库！如果你想给它增加更多功能（比如自动计算挥手动作或跳跃检测），我们可以继续扩展它。
