export interface Project {
  name: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    name: "Project 1",
    description: "Description of project 1",
    link: "https://example.com/project1"
  },
  {
    name: "Project 2",
    description: "Description of project 2",
    link: "https://example.com/project2"
  }
];

export default projects; 