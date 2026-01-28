
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Determine paths
const dataDir = path.join(__dirname, '../src/data');
const outputDir = path.join(__dirname, '../public/assets/data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to write data to Excel
const writeToExcel = (data, fileName, sheetName = 'Sheet1') => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    const filePath = path.join(outputDir, fileName);
    XLSX.writeFile(wb, filePath);
    console.log(`Created ${filePath}`);
};

// 1. Convert Projects
try {
    // We need to read the file content and eval it because likely 'export default' is used which Node.js doesn't support natively without modules type
    // A simpler way for this one-off script is to just manually define the data here if reading fails, 
    // OR we can use a simple regex to extract the array if the file structure is simple.
    // Let's try to require it if we can rename it or just read file content and parse.

    // Strategy: Read file, remove "export default", "export const", etc to make it valid JS code we can eval or parse JSON if it was JSON.
    // Since it's JS objects, we can use a temporary file approach: read, modify to module.exports, require, delete.

    // Projects
    const projectsContent = fs.readFileSync(path.join(dataDir, 'projects.js'), 'utf8');
    const projectsTempFile = path.join(__dirname, 'temp_projects.js');
    // Replace "export default projects;" with "module.exports = projects;"
    // And if there are imports, remove them.
    let cleanProjects = projectsContent.replace('export default projects;', 'module.exports = projects;');
    // If there are other exports or imports, handle them? The file seems simple.
    fs.writeFileSync(projectsTempFile, cleanProjects);

    const projectsData = require(projectsTempFile);

    // Flatten tech stack array for Excel (comma separated string)
    const formattedProjects = projectsData.map(p => ({
        ...p,
        tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech,
        featured: p.featured ? 'Yes' : 'No' // Excel friendly boolean
    }));

    writeToExcel(formattedProjects, 'projects.xlsx', 'Projects');

    fs.unlinkSync(projectsTempFile);

} catch (error) {
    console.error('Error processing projects:', error);
}

// 2. Convert Profile (Resume)
try {
    const profileContent = fs.readFileSync(path.join(dataDir, 'profile.js'), 'utf8');
    const profileTempFile = path.join(__dirname, 'temp_profile.js');

    // The profile.js has named exports: experience, education, skills, socialLinks, bio
    // We'll replace "export const" with "exports."
    let cleanProfile = profileContent.replace(/export const/g, 'exports.');
    fs.writeFileSync(profileTempFile, cleanProfile);

    const profileData = require(profileTempFile);

    // Experience Sheet
    if (profileData.experience) {
        const formattedExp = profileData.experience.map(exp => ({
            ...exp,
            achievements: Array.isArray(exp.achievements) ? exp.achievements.join(' | ') : exp.achievements
        }));

        // We want multiple sheets in one Excel file for Resume
        const wb = XLSX.utils.book_new();

        const wsExp = XLSX.utils.json_to_sheet(formattedExp);
        XLSX.utils.book_append_sheet(wb, wsExp, 'Experience');

        // Education Sheet (it's an object in JS, let's make it a row)
        if (profileData.education) {
            const eduArray = [profileData.education];
            const wsEdu = XLSX.utils.json_to_sheet(eduArray);
            XLSX.utils.book_append_sheet(wb, wsEdu, 'Education');
        }

        // Skills Sheet
        if (profileData.skills) {
            // Flatten skills: Category | Skill Name | Level
            const flatSkills = [];
            profileData.skills.forEach(cat => {
                cat.skills.forEach(skill => {
                    flatSkills.push({
                        Category: cat.category,
                        Skill: skill.name,
                        Level: skill.level
                    });
                });
            });
            const wsSkills = XLSX.utils.json_to_sheet(flatSkills);
            XLSX.utils.book_append_sheet(wb, wsSkills, 'Skills');
        }

        // Bio & Links (Optional but good to have)
        if (profileData.bio) {
            const bioArray = [{
                ...profileData.bio,
                highlights: profileData.bio.highlights ? profileData.bio.highlights.join(', ') : ''
            }];
            const wsBio = XLSX.utils.json_to_sheet(bioArray);
            XLSX.utils.book_append_sheet(wb, wsBio, 'Bio');
        }

        XLSX.writeFile(wb, path.join(outputDir, 'resume.xlsx'));
        console.log(`Created ${path.join(outputDir, 'resume.xlsx')}`);
    }

    fs.unlinkSync(profileTempFile);

} catch (error) {
    console.error('Error processing profile:', error);
}

console.log('done');
