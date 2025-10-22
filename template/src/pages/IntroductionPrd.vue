<template>
  <div class="product-introduction">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">示例产品管理系统</h1>
          <h2 class="hero-subtitle">企业级产品介绍页</h2>
          <p class="hero-description">
            这是一个基于 Vue 3 + TypeScript 构建的产品介绍页面示例，
            可作为企业产品的对外展示与引导。
          </p>
          <div class="hero-actions">
            <el-button type="primary" size="large" @click="goToHome">
              立即体验
            </el-button>
            <el-button size="large" @click="scrollToFeatures">
              了解更多
            </el-button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-card">
            <div class="card-header">
              <div class="card-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
            </div>
            <div class="card-content">
              <div class="code-preview">
                <div class="code-line">
                  <span class="keyword">import</span>
                  <span class="string">'foo-sdk'</span>
                </div>
                <div class="code-line">
                  <span class="comment">// 一键集成，安全可靠</span>
                </div>
                <div class="code-line">
                  <span class="function">foo</span>.<span class="method">start</span>()
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section" ref="featuresSection">
      <div class="container">
        <div class="section-header">
          <h2>核心特性</h2>
          <p>为企业提供稳定、可扩展的产品能力</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="32"><Lock /></el-icon>
            </div>
            <h3>安全可靠</h3>
            <p>支持企业级安全策略与权限控制，保障数据安全</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="32"><Connection /></el-icon>
            </div>
            <h3>易于集成</h3>
            <p>完善的 API 与 SDK 支持，快速接入现有系统</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="32"><Monitor /></el-icon>
            </div>
            <h3>现代化技术栈</h3>
            <p>Vue 3 + TypeScript + Vite，开发体验优秀</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon size="32"><Setting /></el-icon>
            </div>
            <h3>灵活配置</h3>
            <p>高可定制性，满足不同业务场景需求</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Stack Section -->
    <section class="tech-section">
      <div class="container">
        <div class="section-header">
          <h2>技术架构</h2>
          <p>采用主流前端技术，确保系统稳定与扩展性</p>
        </div>
        
        <div class="tech-showcase">
          <div class="tech-category">
            <h3>前端技术</h3>
            <div class="tech-items">
              <div class="tech-item">
                <div class="tech-logo vue">Vue</div>
                <span>Vue 3</span>
              </div>
              <div class="tech-item">
                <div class="tech-logo typescript">TS</div>
                <span>TypeScript</span>
              </div>
              <div class="tech-item">
                <div class="tech-logo vite">Vite</div>
                <span>Vite 7</span>
              </div>
              <div class="tech-item">
                <div class="tech-logo element">Element+</div>
                <span>Element Plus</span>
              </div>
            </div>
          </div>
          
          <div class="tech-category">
            <h3>状态管理</h3>
            <div class="tech-items">
              <div class="tech-item">
                <div class="tech-logo pinia">Pinia</div>
                <span>Pinia</span>
              </div>
              <div class="tech-item">
                <div class="tech-logo router">Router</div>
                <span>Vue Router</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>准备开始了吗？</h2>
          <p>立即体验 product-foo-prd，为您的业务提供可靠能力</p>
          <div class="cta-actions">
            <el-button type="primary" size="large" @click="goToHome">
              立即开始
            </el-button>
            <el-button size="large" @click="scrollToTop">
              回到顶部
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, Connection, Monitor, Setting } from '@element-plus/icons-vue'

const router = useRouter()
const featuresSection = ref<HTMLElement>()

const goToHome = () => {
  router.push('/home')
}

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
.product-introduction {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.1;
  }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 20px 0;
    line-height: 1.1;
    background: linear-gradient(45deg, #fff, #e0e7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 30px 0;
    opacity: 0.9;
  }

  .hero-description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0 0 40px 0;
    opacity: 0.9;
  }

  .hero-actions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  
  &.red { background: #ff5f56; }
  &.yellow { background: #ffbd2e; }
  &.green { background: #27ca3f; }
}

.card-content {
  padding: 30px;
}

.code-preview {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.code-line {
  margin-bottom: 8px;
  
  .keyword { color: #c792ea; }
  .string { color: #c3e88d; }
  .comment { color: #676e95; }
  .function { color: #82aaff; }
  .method { color: #f78c6c; }
}

// Features Section
.features-section {
  padding: 100px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 20px 0;
  }

  p {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 40px 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .feature-icon {
    margin-bottom: 20px;
    color: #667eea;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 15px 0;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
    margin: 0;
  }
}

// Technology Section
.tech-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.tech-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.tech-category {
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 25px 0;
    text-align: center;
  }
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }

  span {
    font-weight: 500;
    color: #2c3e50;
  }
}

.tech-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: white;

  &.vue { background: #4fc08d; }
  &.typescript { background: #3178c6; }
  &.vite { background: #646cff; }
  &.element { background: #409eff; }
  &.pinia { background: #ffd859; color: #2c3e50; }
  &.router { background: #42b883; }
}

// CTA Section
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.cta-content {
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 20px 0;
  }

  p {
    font-size: 1.2rem;
    margin: 0 0 40px 0;
    opacity: 0.9;
  }

  .cta-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem !important;
  }

  .hero-subtitle {
    font-size: 1.2rem !important;
  }

  .hero-description {
    font-size: 1rem !important;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tech-showcase {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .hero-section {
    padding: 60px 0;
  }

  .features-section,
  .tech-section,
  .cta-section {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 2rem !important;
  }

  .tech-category {
    padding: 30px 20px;
  }
}
</style>


