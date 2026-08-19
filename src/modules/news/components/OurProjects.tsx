"use client";

import { useNews } from "../hooks/useNews";

type ProjectItem = {
  id: string | number;
  date: string;
  title: string;
  type?: string;
};

export default function OurProjects() {
  const { news, loading, error } = useNews();

  if (loading) {
    return (
      <section className="our-projects">
        <h2>Our Projects</h2>

        <div className="project-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="project-item" key={index}>
              <div className="project-meta">
                <span className="skeleton skeleton-date" />
                <span className="skeleton skeleton-type" />
              </div>

              <span className="skeleton skeleton-title" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="our-projects">
        <h2>Our Projects</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (!news) {
    return null;
  }

  const projects = [
    ...(news.featured ?? []).map((item: ProjectItem) => ({
      ...item,
      category: "featured" as const,
    })),

    ...(news.latest ?? []).map((item: ProjectItem) => ({
      ...item,
      category: "latest" as const,
    })),
  ];

  return (
    <section className="our-projects">
      <h2>Our Projects</h2>

      <div className="project-list">
        {projects.map((project) => (
          <article
            className="project-item"
            key={`${project.category}-${project.id}`}
          >
            <div className="project-meta">
              <span className="project-date">{project.date}</span>

              <span className={`project-type ${project.category}`}>
                {project.category === "featured" ? "Featured" : "Latest"}
              </span>
            </div>

            <h3>{project.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
