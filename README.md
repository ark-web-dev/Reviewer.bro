# Random Reviewer Finder

This is a comprehensive application designed to facilitate the process of finding a random reviewer based on GitHub usernames. The application allows users to search for reviewers, manage a blacklist, and select a random reviewer with ease. Settings are saved locally to ensure persistence across sessions.

## Live Demo

Check the [Live Demo](https://ark-web-dev.github.io/Reviewer.bro/)

![project-image](project-image.png)

## Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Features

- **Search Reviewer by GitHub Username:** Input a GitHub username to display a card with the user’s details.
- **Repository Selection:** Simple search field to select a repository from the current user's list.
- **Blacklist Management:** Add users to a blacklist by searching their GitHub username. Blacklisted users appear in a designated area.
- **Random Reviewer Selection:** Click a button to randomly select a reviewer, displaying their details.
- **Persistent Settings:** All settings are saved in localStorage and reloaded upon revisiting or refreshing the page.

## Future Enhancements

- **Settings Reset:** Add a button to clear settings.
- **Blacklist Integration:** Allow adding users to the blacklist directly from the reviewer's card.
- **Enhanced Search Information:** Display more information in search fields.

## How to Run Locally

1. **Install dependencies**

   ```
   npm install
   # or
   yarn
   ```

2. **Start the local server via Vite**
   ```
   npm start dev
   # or
   yarn dev
   ```

## Conclusion

This application simplifies the process of finding random reviewers and managing user preferences, with plans for further enhancements to improve user experience and performance.
