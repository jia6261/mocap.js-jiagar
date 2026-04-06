# 🕺 Mocap.js - 开启你的网页动作捕捉之旅

**Mocap.js** 是一个专为创意编程、青少年科技项目和虚拟交互设计的轻量级 JavaScript 库。它利用 AI 技术，让普通摄像头（或视频文件）瞬间变成专业的动作捕捉设备，提取精准的 3D 骨架坐标。

## ✨ 项目特性 (Features)

* 🌈 **零硬件依赖**：无需红外摄像头，支持普通电脑镜头、手机录制源。
* ⚡ **极简集成**：只需引入一个 JS 文件，几行代码即可获取 3D 关节数据。
* 🤖 **AI 核心**：基于 MediaPipe Pose 引擎，内置视觉特征增强算法。
* 🎮 **3D 友好**：原生适配 Three.js 等主流 3D 渲染引擎。

## 🚀 快速开始 (Quick Start)

### 1. 引入依赖

你可以直接使用 GitHub 上的 Raw 链接来加载库文件：

```html
<!-- 核心 AI 引擎 -->
<script src="[https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js](https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js)"></script>

<!-- Mocap.js 库 (直接引用 GitHub Raw 链接) -->
<script src="[https://raw.githubusercontent.com/jia6261/mocap.js-jiagar/main/mocap.js](https://raw.githubusercontent.com/jia6261/mocap.js-jiagar/main/mocap.js)"></script>
```

### 2. 基础用法

```javascript
// 初始化 Mocap 实例
const myMocap = new Mocap({
  modelComplexity: 1, 
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

AI 会为你实时追踪人体 **33 个核心关键点**。常用索引如下：肩膀(`11, 12`)、手腕(`15, 16`)、膝盖(`25, 26`)。

## 📜 开源协议 (License)

本项目遵循 MIT License 协议。欢迎用于教育、个人创作和科技竞赛！
                
                
