import ProjectsPage from "@/components/site/projects/ProjectsPage";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graphSchema, pageMetadata, projectsSchema } from "@/lib/seo";

export const metadata = pageMetadata("/project");

export default function ProjectsRoute() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          projectsSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/project" },
          ]),
        ])}
      />
      <ProjectsPage />
    </>
  );
}
