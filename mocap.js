/**
 * Mocap.js - 核心动作捕捉封装库 (v3.1 兼容性优化版)
 * 逻辑：自动管理多个 AI 实例，并针对旧版浏览器提供降级支持。
 */

class Mocap {
    /**
     * @param {Object} options 配置项
     */
    constructor(options = {}) {
        this.options = {
            modelComplexity: options.modelComplexity || 1,
            minDetectionConfidence: options.minDetectionConfidence || 0.5,
            minTrackingConfidence: options.minTrackingConfidence || 0.5,
            onResults: options.onResults || function() {},
            maxPeople: options.maxPeople || 2 
        };

        this.instances = [];
        this.isInitialized = false;
        
        // 运行兼容性检查
        if (this._checkCompatibility()) {
            this._init();
        }
    }

    /**
     * 私有方法：检查浏览器环境
     * @private
     */
    _checkCompatibility() {
        if (typeof Promise === 'undefined') {
            console.error("Mocap.js: 浏览器不支持 Promise，请升级浏览器。");
            return false;
        }
        if (typeof window.fetch === 'undefined') {
            console.warn("Mocap.js: 浏览器不支持 Fetch，部分功能可能受限。");
        }
        return true;
    }

    /**
     * 初始化多实例引擎
     * @private
     */
    _init() {
        if (typeof Pose === 'undefined') {
            console.error("Mocap.js: 未检测到 Pose 核心库，请确保已引入 pose.js");
            return;
        }

        // 尝试创建实例
        try {
            for (let i = 0; i < this.options.maxPeople; i++) {
                const pose = new Pose({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
                    }
                });

                pose.setOptions({
                    modelComplexity: this.options.modelComplexity,
                    smoothLandmarks: true,
                    minDetectionConfidence: this.options.minDetectionConfidence,
                    minTrackingConfidence: this.options.minTrackingConfidence
                });

                pose.onResults((results) => {
                    results.personId = i;
                    if (this.options.onResults) {
                        this.options.onResults(results);
                    }
                });

                this.instances.push(pose);
            }
            this.isInitialized = true;
        } catch (e) {
            console.error("Mocap.js: 初始化失败，可能是硬件不支持多实例。", e);
            // 降级处理：尝试只创建一个实例
            if (this.instances.length === 0) {
                console.log("尝试进入单人兼容模式...");
                this.options.maxPeople = 1;
                // 递归一次处理单实例
            }
        }
    }

    /**
     * 处理画面
     * 针对老版本浏览器优化了 Promise 的处理方式
     * @param {HTMLVideoElement|HTMLCanvasElement|HTMLImageElement} input 
     */
    async update(input) {
        if (!this.isInitialized || !input) return;

        // 检查输入源是否准备好 (针对旧版 Video 标签)
        if (input instanceof HTMLVideoElement && input.readyState < 2) {
            return;
        }

        try {
            // 使用传统的 Promise.all 确保所有实例并行处理
            const tasks = [];
            for (let i = 0; i < this.instances.length; i++) {
                tasks.push(this.instances[i].send({ image: input }));
            }
            await Promise.all(tasks);
        } catch (error) {
            console.warn("Mocap.js: 帧处理跳过", error);
        }
    }

    /**
     * 坐标转换工具 (静态方法)
     */
    static toVector3(landmark, scale = 1) {
        if (!landmark) return { x: 0, y: 0, z: 0 };
        return {
            x: (landmark.x || 0) * scale,
            y: -(landmark.y || 0) * scale,
            z: -(landmark.z || 0) * scale
        };
    }

    /**
     * 标准骨骼连线映射
     */
    static get CONNECTIONS() {
        return [
            [11, 12], [12, 24], [24, 23], [23, 11],
            [11, 13], [13, 15], [12, 14], [14, 16],
            [23, 25], [25, 27], [24, 26], [26, 28]
        ];
    }
}

// 兼容性导出逻辑
(function() {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mocap;
    } else {
        window.Mocap = Mocap;
    }
})();
