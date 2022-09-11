const inquirer = require('inquirer');
// Don't need because the file system functions are in separate file
// const fs = require('fs');
// This way we would write generateSite.writeFile() and generateSite.copyFile() 
// generateSite = require('./utils/generate-site.js');
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your Username!');
          return false;
        }
      }
    },
    {
    	type:'confirm',
    	name: 'confirmAbout',
    	message: 'Would you like to enter some information about yourself for an "About" section?',
    	default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
      	if (confirmAbout) {
      		return true;
      	} else {
      		return false;
      	}
      }
    }
  ]);
};

const promptProject = portfolioData => {
// If there is no 'projects' array property, create one
if (!portfolioData.projects) {
	portfolioData.projects = [];
}
  console.log(`
=================
Add a New Project
=================
`);
	return inquirer.prompt([
		{
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the GitHub link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
	])
	.then(projectData => {
		portfolioData.projects.push(projectData);
		if (projectData.confirmAddProject) {
			return promptProject(portfolioData);
		} else {
			return portfolioData;
		}
	});
};

const mockData = {
	name: 'David',
	github: 'https://github.com/dbcomps/',
	confirmAbout: true,
	about: 'Father Veteran Scientist Developer and bla bla bla bla',
	projects: [
		{
			name: 'Run Buddy',
			description:
				'Join our gym and find a trainer? Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
			languages: ['HTML', 'CSS'],
			link: 'https://github.com/dbcomps/run-buddy',
			feature: true,
			confirmAddProject: true
		},
		{
			name: 'Taskinator',
			description:
				'Make tasks... Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
			languages: ['JavaScript', 'HTML', 'CSS'],
			link: 'https://github.com/dbcomps/taskinator',
			feature: true,
			confirmAddProject: true
		},
		{
			name: 'Taskmaster Pro',
			description:
				'lksjdflksjdflskdjfslkdfj Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
			languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
			link: 'https://github.com/dbcomps/taskmaster-pro',
			feature: false,
			confirmAddProject: true
		},
		{
			name: 'Robot Gladiators',
			description:
				'sadfjaslkdfjaskdjf;sakdfs;dkl Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
			languages: ['JavaScript'],
			link: 'https://github.com/dbcomps/robot-gladiators',
			feature: false,
			confirmAddProject: false
		}
	]
};

// const pageHTML = generatePage(mockData);
// fs.writeFile('./dist/index.html', pageHTML, err => {
//   if (err) {
//   	console.log(err);
//   	return;
//   }
//   console.log('Page created! Check out index.html in this directory to see it!');
//   
//   fs.copyFile('./src/style.css', './dist/style.css', err => {
//   	if (err) {
//   		console.log(err);
//   		return;
//   	}
//   	console.log('Style sheet copied successfully!');
//   });
// });

// Using mockData - replace with portfolioData
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(mockData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
