export interface GenerateSummaryBody{
    experienceLevel: string,
    skills: string[],
    jobTitle: string,
}

export interface GenerateSkillsBody{
    experienceLevel: string,
    jobTitle: string
}

export interface GenerateProjectDescription{
    jobTitle: string,
    techStack: string[],
    projectTitle: string
}

export interface GenerateExperienceDescription{
    experienceLevel : string,
    jobRole : string,
    techStack: string[],
    yearOfExperience : number
}