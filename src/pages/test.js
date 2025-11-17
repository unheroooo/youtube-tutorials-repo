import React from "react"

export default function TestPage() {
  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
      color: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        textAlign: "center",
        maxWidth: "800px",
        padding: "3rem",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 105, 0, 0.3)"
      }}>
        <h1 style={{ 
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: "900",
          marginBottom: "2rem",
          background: "linear-gradient(45deg, #ff6900, #ffffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-2px"
        }}>
          ✨ 耐克限量版球鞋展示
        </h1>
        
        <p style={{ 
          fontSize: "1.5rem",
          marginBottom: "2rem",
          color: "#cccccc",
          fontWeight: "300",
          letterSpacing: "1px"
        }}>
          现代化、前卫、酷炫的视觉体验
        </p>
        
        <a 
          href="/" 
          style={{
            display: "inline-block",
            padding: "1rem 2.5rem",
            background: "linear-gradient(45deg, #ff6900, #ff8533)",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "50px",
            fontWeight: "600",
            fontSize: "1.2rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            transition: "all 0.3s ease",
            boxShadow: "0 10px 30px rgba(255, 105, 0, 0.3)",
            border: "2px solid transparent"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-5px) scale(1.05)";
            e.target.style.boxShadow = "0 15px 40px rgba(255, 105, 0, 0.5)";
            e.target.style.borderColor = "#ffffff";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "0 10px 30px rgba(255, 105, 0, 0.3)";
            e.target.style.borderColor = "transparent";
          }}
        >
          立即体验
        </a>
        
        <div style={{ marginTop: "3rem", color: "#999", fontSize: "0.9rem" }}>
          <p>🎯 优化亮点：</p>
          <ul style={{ textAlign: "left", marginTop: "1rem", listStyle: "none", padding: 0 }}>
            <li>✨ 降低banner高度，提升内容可见性</li>
            <li>🌊 每个球鞋独特的WebGL变形效果</li>
            <li>⚡ 现代化的加载动画和交互效果</li>
            <li>🎨 耐克品牌色彩体系和视觉语言</li>
            <li>📱 响应式设计适配各种设备</li>
          </ul>
        </div>
      </div>
    </div>
  )
}