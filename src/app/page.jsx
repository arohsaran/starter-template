
'use client';

import React from 'react';

export default function PageOne() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <section
        id="home"
        className="px-5 py-25 text-center"
      >
        <h1 className="mb-5 text-5xl font-bold text-foreground">
          Welcome to 9th Grade DRG 3D Printing
        </h1>

        <p className="mx-auto mb-[30px] max-w-[600px] text-xl text-muted-foreground">
          Your digital hub for designing, calculating, and preparing 3D
          prototypes for the classroom maker space.
        </p>

        <a
          href="/page-two"
          className="inline-block mr-2 rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Gallery
        </a>
        <a
          href="/page-three"
          className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Take the Quiz
        </a>
      </section>

      {/* Lab Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-10 py-15"
      >
        <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
          Lab Features
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
          <div className="rounded-lg border border-border bg-card p-[30px] text-card-foreground">
            <h3 className="mb-4 text-xl font-semibold text-primary">
               Print Estimator
            </h3>
            <p className="text-muted-foreground">
              Estimate print times and material weights based on object
              volume and layer height.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-[30px] text-card-foreground">
            <h3 className="mb-4 text-xl font-semibold text-primary">
             Filament Preview
            </h3>
            <p className="text-muted-foreground">
              Preview different PLA, PETG, and ABS material colors before
              printing your model.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-[30px] text-card-foreground">
            <h3 className="mb-4 text-xl font-semibold text-primary">
              Design Guidelines
            </h3>
            <p className="text-muted-foreground">
              Review critical checklists for overhangs, wall thickness,
              and bed adhesion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
