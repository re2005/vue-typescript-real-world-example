import {Project} from '@/types/projectsTypes';
import {projectsMock} from '@/mocks/projects';

const apiService = {

    getProjects(): Promise<Project[]> {
        return new Promise<any>(resolve => {
            setTimeout(() => {
                resolve(projectsMock);
            }, 1000);
        });
    }
};

export default apiService;
