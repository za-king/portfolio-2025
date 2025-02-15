import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export const fetchProjects = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "project"));
        const projects = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Projects:", projects);
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

type Project = {
    id: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    tagLine?: string;
    status?: string;
    challenges?: string[] | undefined;
    technologies?: string[] | undefined;
    features?: string[] | undefined;
    role?: string;
    projectDuration: Number;
    teamSize: Number;
    sourceUrl?: string;
    demoUrl?: string;
};


export const fetchProjectById = async (id: string): Promise<Partial<Project> | null> => {
    try {
        const docRef = doc(db, "project", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Project found:", data);

            return {
                id: docSnap.id || "id",
                title: data.title || "title",
                description: data.description || "No description available",
                imageUrl: data.imageUrl || "/images/jpg",
                tagLine: data.tagLine || "",
                status: data.status || "unknown",
                challenges: data.challenges || [],
                technologies: data.technologies || [],
                features: data.features || [],
                role: data.role || "N/A",
                projectDuration: data.projectDuration || 0,
                teamSize: data.teamSize || 1,
                sourceUrl: data.sourceUrl || "",
                demoUrl: data.demoUrl || "",
            };
        } else {
            console.log("Project not found.");
        }
        return null;
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
};
