export interface ProjectsState {
    projects: Project[];
    isLoading: boolean;
}

export interface Project {
    scanner: number;
    lastScanAt?: string;
    createdAt: string;
    stage: number;
    projectId: string;
    id: number;
    projectName: string;
    lastScan?: string;
    alerts?: Findings;
    ready?: boolean;
    planned?: boolean;
    plannedDate?: string;
}

export interface Findings {
    blocking: number;
    exception: number;
    info?: number;
}
