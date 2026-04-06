🚀 Mocap.js 快速入门指南欢迎使用 Mocap.js！这是一个让你仅用一个普通摄像头（或者一段视频），就能在网页上实现“动作捕捉”的神奇工具库。无论是想做自己的《舞力全开》，还是想在网页上控制 3D 小人跳舞，这个库都能帮你轻松实现。🌟 核心功能全平台支持：支持电脑摄像头、手机摄像头以及所有主流视频格式（MP4, AVI, MOV等）。AI 智能识别：基于 Google 的 MediaPipe 技术，自动锁定人体 33 个核心关节。3D 友好：坐标系统经过优化，可以直接对接 Three.js 等 3D 引擎。🛠️ 第一步：环境准备在你的 HTML 文件中，你需要引入两个东西：MediaPipe Pose：这是底层的 AI 引擎。mocap.js：这是我们封装好的简易工具库。<!-- 引入 AI 引擎 -->
<script src="[https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js](https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js)"></script>
<!-- 引入我们的库 -->
<script src="mocap.js"></script>
💻 第二步：快速上手代码只需三步，你就能在控制台看到你的 3D 坐标：1. 初始化创建一个 Mocap 实例，并告诉它当识别到动作时该做什么。const myMocap = new Mocap({
    modelComplexity: 1, // 0: 最快, 1: 平衡, 2: 最高精度
    onResults: (results) => {
        if (results.poseWorldLandmarks) {
            // 这里就是 AI 算出来的 3D 坐标！
            const landmarks = results.poseWorldLandmarks;
            
            // 例如：获取右手的 3D 位置
            const rightHand = Mocap.toVector3(landmarks[16]);
            console.log("右手位置:", rightHand);
        }
    }
});
2. 传入画面你需要不断地把视频帧传给 update() 函数。const video = document.querySelector('video');

function detect() {
    myMocap.update(video); // 把当前的画面发给 AI 处理
    requestAnimationFrame(detect); // 循环处理下一帧
}
🦴 关节参考图AI 会识别 33 个点，常用的点索引如下：0：鼻子11, 12：左右肩膀15, 16：左右手腕23, 24：左右臀部31, 32：左右脚踝你可以使用 Mocap.CONNECTIONS 来获取这些点之间的连线逻辑，方便你绘制骨架。💡 小贴士 (Pro Tips)光线很重要：确保你的人体轮廓清晰，不要逆光，这样 AI 会识别得更准。全身捕捉：尽量让摄像头拍到你的全身（从头到脚），这样 3D 效果最震撼。性能优化：如果你发现电脑变热了，可以把 modelComplexity 设置为 0。🌈 开启你的创意！现在你已经掌握了 Mocap.js 的核心用法。你可以尝试：制作一个虚拟试衣间。开发一个姿势检测器，提醒自己不要驼背。结合 Three.js，做一个属于你的 3D 虚拟主播 (VTuber)！加油，年轻的开发者！如果你有任何好玩的创意，欢迎随时交流。
