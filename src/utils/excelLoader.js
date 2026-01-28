
import * as XLSX from 'xlsx';

/**
 * Fetches an Excel file from the public folder and parses it.
 * @param {string} fileName - The name of the file in public/assets/data/
 * @returns {Promise<Object>} - The workbook object
 */
const fetchWorkbook = async (fileName) => {
    try {
        const response = await fetch(`${process.env.PUBLIC_URL}/assets/data/${fileName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        return workbook;
    } catch (error) {
        console.error(`Error loading ${fileName}:`, error);
        return null;
    }
};

/**
 * Helper to convert sheet to JSON
 */
const sheetToJson = (workbook, sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return [];
    return XLSX.utils.sheet_to_json(sheet);
};

export const loadProjectsData = async () => {
    const workbook = await fetchWorkbook('projects.xlsx');
    if (!workbook) return [];

    const rawData = sheetToJson(workbook, 'Projects');

    // Format data to match component expectations
    return rawData.map(project => ({
        ...project,
        // Excel stores arrays as strings (comma separated)
        tech: project.tech ? project.tech.split(',').map(t => t.trim()) : [],
        // Excel stores booleans as "Yes"/"No" or TRUE/FALSE depending on how it was saved, 
        // our script saved it as "Yes"/"No"
        featured: project.featured === 'Yes' || project.featured === true,
        // Ensure ID is number if needed
        id: Number(project.id)
    }));
};

export const loadResumeData = async () => {
    const workbook = await fetchWorkbook('resume.xlsx');
    if (!workbook) return { experience: [], education: {}, skills: [] };

    // Experience
    const experienceRaw = sheetToJson(workbook, 'Experience');
    const experience = experienceRaw.map(exp => ({
        ...exp,
        achievements: exp.achievements ? exp.achievements.split('|').map(a => a.trim()) : []
    }));

    // Education
    const educationRaw = sheetToJson(workbook, 'Education');
    const education = educationRaw.length > 0 ? educationRaw[0] : {};

    // Skills
    const skillsRaw = sheetToJson(workbook, 'Skills');
    // Group back into categories
    const skillsMap = {};
    skillsRaw.forEach(item => {
        if (!skillsMap[item.Category]) {
            skillsMap[item.Category] = [];
        }
        skillsMap[item.Category].push({
            name: item.Skill,
            level: item.Level
        });
    });

    const skills = Object.keys(skillsMap).map(category => ({
        category,
        skills: skillsMap[category]
    }));

    return { experience, education, skills };
};
