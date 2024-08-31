type JobListing =  {
    title: string;
    company: string;
    location: string;
    salaryRange: "LOW" | "MID" | "HIGH";
    description: string;
    date: string;
    url?: string;
    experience: 'JUNIOR' | 'MID' | 'SENIOR';
    skills: string[];
    createdAt: string;

};

export type {
    JobListing
}