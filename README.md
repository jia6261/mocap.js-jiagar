# 🕺 Mocap.js - 开启你的网页动作捕捉之旅

**Mocap.js** 是一个专为创意编程、青少年科技项目和虚拟交互设计的轻量级 JavaScript 库。它利用 AI 技术，让普通摄像头（或视频文件）瞬间变成专业的动作捕捉设备，提取精准的 3D 骨架坐标。

## ✨ 项目特性 (Features)

* 🌈 **零硬件依赖**：无需红外摄像头，支持普通电脑镜头、手机录制源，甚至兼容 PS4 摄像头的视频流。

* ⚡ **极简集成**：只需引入一个 JS 文件，几行代码即可获取 3D 关节数据。

* 🤖 **AI 核心**：基于 MediaPipe Pose 引擎，内置视觉特征增强算法，适应各种环境。

* 🎮 **3D 友好**：原生适配 Three.js 等主流 3D 渲染引擎。

* 🛡️ **隐私保护**：所有计算均在浏览器本地完成，不会上传你的视频数据。

## 🚀 快速开始 (Quick Start)

### 1. 引入依赖

在你的 HTML 文件中添加以下 CDN 链接：

```html
<!-- 核心 AI 引擎 -->
<script src="[https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js](https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js)"></script>
<!-- Mocap.js 库 -->
<script src="mocap.js"></script>
```

### 2. 基础用法

```javascript
// 初始化 Mocap 实例
const myMocap = new Mocap({
  modelComplexity: 1, // 0: 速度优先, 1: 平衡, 2: 精度优先
  onResults: (results) => {
    if (results.poseWorldLandmarks) {
      const landmarks = results.poseWorldLandmarks;
      
      // 获取右腕的 3D 向量 (x, y, z)
      const rightWrist = Mocap.toVector3(landmarks[16]);
      console.log("右腕位置:", rightWrist);
    }
  }
});

// 在你的动画循环中更新视频源
function animate() {
  myMocap.update(videoElement);
  requestAnimationFrame(animate);
}
```

## 🦴 关键点参考 (Keypoints)

AI 会为你实时追踪人体 **33 个核心关键点**。常用索引如下：

| 索引 | 描述 | 索引 | 描述 | 
| ----- | ----- | ----- | ----- | 
| `0` | 鼻子 | `11, 12` | 左右肩膀 | 
| `13, 14` | 左右肘部 | `15, 16` | 左右手腕 | 
| `23, 24` | 左右臀部 | `25, 26` | 左右膝盖 | 
| `31, 32` | 左右脚踝 | `0-10` | 面部特征点 | 

> 💡 你可以使用 `Mocap.CONNECTIONS` 获取预设的骨架连线数组，方便在 3D 空间中绘制骨骼。

## 🛠️ 开发建议 (Pro Tips)

* **光线环境**：在光线充足、背景相对简单的环境下识别率最高。

* **距离设置**：确保摄像头能够拍摄到全身，以便获得完整的动作数据。

* **性能优化**：如果你在移动设备上运行，建议将 `modelComplexity` 设置为 `0`。

* **硬件适配**：对于 PS4 等广角摄像头，建议开启代码中的“特征增强模式”以平衡畸变。

## 📜 开源协议 (License)

本项目遵循 MIT License 协议。欢迎用于教育、个人创作和科技竞赛！
                
