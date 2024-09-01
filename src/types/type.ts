type JobListing =  {
    id: string;
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

type User = {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    resumeLink: string;
    savedJobs: string[];
    
}

// id String @id @default(cuid())
//   userId String
//   user User @relation(fields: [userId], references: [id])
//   jobListingId String
//   coverLetter String?
//   jobListing JobListing @relation(fields: [jobListingId], references: [id], onDelete: Cascade)
//   status Status?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

type Application = {
    id: string;
    userId: string;
    jobListingId: string;
    coverLetter?: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
    jobListing: JobListing;

}
export type {
    JobListing,
    User,
    Application
}