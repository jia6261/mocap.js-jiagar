/**
 * Mocap.js - 核心动作捕捉封装库
 * 基于 MediaPipe Pose，提供简单的 API 用于提取 3D 骨架数据
 */

class Mocap {
    constructor(options = {}) {
        this.options = {
            modelComplexity: options.modelComplexity || 1,
            minDetectionConfidence: options.minDetectionConfidence || 0.5,
            minTrackingConfidence: options.minTrackingConfidence || 0.5,
            smoothLandmarks: options.smoothLandmarks !== undefined ? options.smoothLandmarks : true,
            onResults: options.onResults || (() => {}),
        };

        this.pose = null;
        this.isInitialized = false;
        this._init();
    }

    /**
     * 初始化 MediaPipe Pose 引擎
     * @private
     */
    _init() {
        // 加载 MediaPipe 脚本并初始化
        this.pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        this.pose.setOptions({
            modelComplexity: this.options.modelComplexity,
            smoothLandmarks: this.options.smoothLandmarks,
            minDetectionConfidence: this.options.minDetectionConfidence,
            minTrackingConfidence: this.options.minTrackingConfidence
        });

        this.pose.onResults((results) => {
            this.options.onResults(results);
        });

        this.isInitialized = true;
    }

    /**
     * 处理单帧图像或视频帧
     * @param {HTMLVideoElement|HTMLCanvasElement|HTMLImageElement} input 
     */
    async update(input) {
        if (!this.isInitialized) return;
        await this.pose.send({ image: input });
    }

    /**
     * 动态调整配置参数
     * @param {Object} newOptions 
     */
    setOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        if (this.pose) {
            this.pose.setOptions({
                modelComplexity: this.options.modelComplexity,
                smoothLandmarks: this.options.smoothLandmarks,
                minDetectionConfidence: this.options.minDetectionConfidence,
                minTrackingConfidence: this.options.minTrackingConfidence
            });
        }
    }

    /**
     * 获取关节连接定义 (用于绘制骨架)
     * @returns {Array} 包含 [起点, 终点] 索引的数组
     */
    static get CONNECTIONS() {
        return [
            [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // 手臂
            [11, 23], [12, 24], [23, 24],                   // 躯干
            [23, 25], [25, 27], [27, 31], [24, 26], [26, 28], [28, 32], // 腿部
            [9, 10], [0, 5], [0, 2]                          // 面部/头部
        ];
    }

    /**
     * 将 MediaPipe 坐标转换为适合 Three.js 的 3D 向量
     * @param {Object} landmark 
     * @param {number} scale 缩放比例
     * @returns {Object} {x, y, z}
     */
    static toVector3(landmark, scale = 1) {
        return {
            x: landmark.x * scale,
            y: -landmark.y * scale, // 翻转 Y 轴适配 3D 空间
            z: -landmark.z * scale
        };
    }
}

// 导出模块（兼容 ES6 或直接在 HTML 中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Mocap;
} else {
    window.Mocap = Mocap;
}
