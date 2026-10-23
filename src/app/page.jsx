'use client';

import React from 'react';

export default function PageOne() {
  return (
    <div style={{ backgroundColor: "#0f1117", color: "#ffffff" }}>
      {/* Main Content */}
        <section id="home" style={{ textAlign: "center", padding: "100px 20px", background: "linear-gradient(to bottom, #161922, #0f1117)" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "#ffffff" }}>Welcome to 9th Grade DRG 3D Printing</h1>
          <p style={{ fontSize: "1.2rem", color: "#a0aec0", maxWidth: "600px", margin: "0 auto 30px auto" }}>
            Your digital hub for designing, calculating, and preparing 3D prototypes for the classroom maker space.
          </p>
          <a href="#calculators" style={{ backgroundColor: "#00f0ff", color: "#0f1117", padding: "12px 25px", textDecoration: "none", fontWeight: "bold", borderRadius: "5px", display: "inline-block" }}>
            Get Started
          </a>
        </section>

        <section id="features" style={{ padding: "60px 40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2rem" }}>Lab Features</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            <div style={{ backgroundColor: "#161922", border: "1px solid #2a2e3d", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "#00f0ff", marginTop: 0 }}>⏱️ Print Estimator</h3>
              <p style={{ color: "#a0aec0" }}>Estimate print times and material weights based on object volume and layer height.</p>
            </div>
            <div style={{ backgroundColor: "#161922", border: "1px solid #2a2e3d", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "#00f0ff", marginTop: 0 }}>🎨 Filament Preview</h3>
              <p style={{ color: "#a0aec0" }}>Preview different PLA, PETG, and ABS material colors before printing your model.</p>
            </div>
            <div style={{ backgroundColor: "#161922", border: "1px solid #2a2e3d", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "#00f0ff", marginTop: 0 }}>📐 Design Guidelines</h3>
              <p style={{ color: "#a0aec0" }}>Review critical checklists for overhangs, wall thickness, and bed adhesion.</p>
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "30px", backgroundColor: "#161922", borderTop: "1px solid #2a2e3d", color: "#a0aec0", fontSize: "0.9rem" }}>
        <p>&copy; 2026 9th Grade DRG 3D Printing Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
