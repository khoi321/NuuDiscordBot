# NuuDiscordBot Introduce
Advanced Discord bot with many fun and entertaining features. Helps you manage the server better and more securely. **The project is in the testing and development phase.**
# Main features
- NSFW
- Giveaways
- Image
- Utility
- And more in future ...
# Setup
- **Download Project from GitHub:**

  - **Method 1**: From the project page on GitHub:

     - Go to the project's GitHub page.

    - Click the **"Code"** button and select **"Download ZIP"** to download the entire source code as a ZIP file.

    - Go to the folder containing the downloaded file

    - Extract the ZIP file to the desired folder on your computer.

    - Learn [how to extract](https://www.youtube.com/results?search_query=how+to+open+rar+or+zip+with+winrar)
   - **Method 2**: Use Git to clone the repository:

      - Open a terminal or command prompt.

      - Navigate to the folder where you want to save the project.

      - Run the following command to clone the repository:

      ```sh
      git clone <URL_repository>

      ``` 
  (Replace `<URL_repository>` with the URL of the repository on GitHub, for example: `https://github.com/username/repository.git`).

    - Move into the newly cloned project folder:

      ```sh
      cd <folder_name>

      ```
     (Replace `<folder_name>` with the project folder name).

- **Install IDE or Text Editor:**

  - Use Text Editor Visual Studio Code (VS Code):
  - Download and install from the official website [Visual Studio Code](https://code.visualstudio.com/).

  - Install the necessary extensions to support JavaScript development.
  - See details on how to install VS Code [here](https://www.youtube.com/results?search_query=c%C3%A1ch+c%C3%A0i+vs+code+%2F+how+to+install+vs+code).
  - Recommended to use VS Code because it is easy to use :))
  - Use other Text Editors or IDEs if you find it suitable:
    - WebStorm
    - Sublime Text
    - Atom
    - Brackets
    - Eclipse
    - Notepad++
- **Environment Setup:**

  - Install Node.js:
    - Download and install Node.js from the official website [Node.js](https://nodejs.org/). Choose the LTS (Long Term Support) version to ensure stability.

    - Check the Node.js installation by opening a terminal or command prompt and typing the commands:
    ```sh
    node -v
    ```
    and
    ```sh
    npm -v
    ```
  - Make sure that the versions of Node.js and npm (Node Package Manager) have been successfully installed.
  - Learn more about how to install an environment [here](https://www.youtube.com/results?search_query=c%C3%A1ch+c%C3%A0i+%C4%91%E1%BA%B7t+m%C3%B4i+js+%2F+how+to+install+js+inviroment)
- **Access the project on VS Code:**
  - **Method 1**:
    - Open Visual Studio Code (VS Code).
    - Select **"File"** from the top menu.
    - Select **"Open Folder..."**.
    - Navigate to the folder containing the project you downloaded or cloned from GitHub.
    - Select the project folder and click **"Select Folder"** (or **"Open"** on macOS).
    - Your project will open in VS Code.

  - **Method 2**:

    - Drag and drop the project folder from File Explorer (Windows) or Finder (macOS) into the VS Code window.

    - VS Code will automatically open the project folder and display its contents in the interface.

    - **Method 3**:

    - Open the built-in terminal in VS Code by pressing `Ctrl + `` (or `Cmd + `` on macOS).

    - Use the `cd` command to navigate to the folder containing the project.

    ```sh
    cd <folder_name>

    ```
    - Run the following command to open the project folder in VS Code:

    ```sh
    code .

    ```
    - The project will open in a new VS Code window.

  - **Method 3**:

    - Open File Explorer (Windows) or Finder (macOS).
    - Navigate to the folder containing the project.
    - Right-click on the project folder.
    - Select **"Open with Code"** from the menu.

    - The project folder will be opened in VS Code.

    - Learn more about [using VS Code](https://www.youtube.com/results?search_query=c%C3%A1ch+m%E1%BB%9F+th%C6%B0+m%E1%BB%A5c+tr%C3%AAn+VS+code)

# Setting bot
## Get and Replace TOKEN

### Get Discord TOKEN

1. Go to [Discord Developer Portal](https://discord.com/developers/applications).

2. Log in with your Discord account if you are not already logged in.

3. Select your bot application from the list of applications.

4. Go to **Bot** in the left menu.

5. Click the **Copy** button under **TOKEN** to copy your TOKEN. **Note:** Do not share this TOKEN with anyone as it may allow others to control your bot.

### Enable Necessary Intents

1. On the same page of the bot application, go to **Bot**.

2. Look for **Privileged Gateway Intents**.

- **Presence Intent:**
- Enable **Presence Intent** so that the bot can receive user status update events.

- Note: Once your bot reaches 100 or more servers, enabling this feature will require verification and approval from Discord. See more details [here](https://discord.com/developers/docs/topics/gateway#presence-update).

- **Server Members Intent:**
- Enable **Server Members Intent** so your bot can receive member-related events in your server.

- Note: Once your bot reaches 100 or more servers, enabling this feature will require verification and approval from Discord. See more details [here](https://discord.com/developers/docs/topics/gateway#guild-membership-screening).

- **Message Content Intent:**
- Enable **Message Content Intent** so your bot can receive message content in most messages.
- Note: Once your bot reaches 100 or more servers, enabling this feature will require verification and approval from Discord. See more details [here](https://discord.com/developers/docs/topics/gateway#message-content-intent).

### Replace TOKEN in source code

1. Open the bot's source file (e.g. `bot.mjs`).

2. Find the line containing `client.login('YOUR_BOT_TOKEN');`.

3. Replace `'YOUR_BOT_TOKEN'` with the TOKEN you copied from the Discord Developer Portal:

```js
client.login('YOUR_BOT_TOKEN'); // Replace YOUR_BOT_TOKEN with your bot token

```
## How to Invite a Bot to a Discord Server

### 1. Create a Bot Invite URL

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).

2. Log in with your Discord account if you are not already logged in.

3. Select your bot application from the list of applications.

4. In the left menu, select **OAuth2**.

5. Select the **URL Generator** tab under OAuth2.

### 2. Configure Permissions and Scopes

1. **Scopes:**
- Check **bot**. This is the scope required to add the bot to the server.

2. **Bot Permissions:**
- In the **Bot Permissions** section, select the permissions your bot needs to function. For example:

- `Send Messages`: To send messages.

- `Read Message History`: To read message history.

- `Manage Messages`: To manage messages (delete, pin, etc.).

- `View Channels`: To view channels.

- `Attach Files`: To send attachments.

- `Add Reactions`: Add reactions to messages in channels that the bot has access to.

- Select other permissions if needed.

- Recommended to select `Administrator` permission

### 3. Create and copy the URL

1. After configuring the scopes and permissions, scroll down to see the generated bot invitation URL.

2. Copy this URL.

### 4. Invite the bot to the server

1. Open a web browser and paste the URL you copied into the address bar.

2. You will be asked to select the server where you want to invite the bot.

3. Select the server from the drop-down list that you have administrative rights to (admin rights or equivalent).

4. Click **Authorize** to send the bot invitation.

5. Complete the process by solving the CAPCHA if required.

### 5. Check the bot's permissions

- Make sure the bot has sufficient access to the channels.

- Make sure the bot can view messages, add reactions, etc.
## Open Terminal and install npm packages on Visual Studio Code

### 1. Open Terminal in Visual Studio Code

1. **Open Visual Studio Code**:

- Launch Visual Studio Code from the Desktop or from the Start menu (Windows) / Applications (macOS).

2. **Open Terminal**:

- **Method 1**: Using keyboard shortcuts:

- Press `Ctrl + `` (backtick key, located just below the Esc key on the keyboard) to open the terminal.

- **Method 2**: Using the menu:

- Go to the **Terminal** menu on the top toolbar.

- Select **New Terminal** from the drop-down list.

### 2. Install npm packages

1. **Confirm Node.js and npm are installed**:

- In the terminal, type the following commands to check the version of Node.js and npm:

``bash
node -v
npm -v

``
- If you see the version information, it means Node.js and npm are installed. If not, you need to install Node.js from the [official website](https://nodejs.org/).

2. **Navigate to the project directory**:

- Use the `cd` command to navigate to the directory containing your project. For example:

``bash
cd project_directory_path

``

3. **Install the required packages**:

- Make sure you have a `package.json` file in your project directory. This file contains a list of packages that you need to install.
- Run the following command to install all packages listed in `package.json`:
```bash
npm install
```
- If you want to install a specific package, use the command:
```bash
npm install package-name
```
For example, to install `discord.js`, you would run:
```bash
npm install discord.js
```

4. **Checking installed packages**:

- The packages will be installed in the `node_modules` directory and the list of packages will be updated in the `package.json` and `package-lock.json` files.

### 3. Checking the Activity

- **Checking Installed Packages:**
- You can check the installed packages using the command:
```bash
npm list
```
- This command will list all packages and their versions.

- **Check Node.js and npm Versions:**

- To make sure you are using the correct version of Node.js and npm, you can check their versions with the following commands:

```bash
node -v
npm -v
```
## How to Use Terminal to Run Discord Bot Using Node.js on VS Code

### 1. Open Project and Terminal

1. **Open VS Code:**
- Launch Visual Studio Code on your computer.

2. **Open Project:**
- Open your Discord bot project by selecting **File** -> **Open Folder...** and navigate to the folder containing the project.

3. **Open Terminal:**
- Press the key combination `Ctrl + `` (grave accent) to open Terminal in VS Code.

- Or you can open Terminal by going to menu **Terminal** -> **New Terminal**.

### 2. Running the Discord Bot

1. **Go to the Project Folder:**
- If you are not already in your project folder, use the `cd` command in Terminal to navigate to the project folder:
```bash
cd_path_to_project_folder
```

2. **Running the Bot Using Node.js:**

- To launch the Discord bot, you use the `node` command to run the bot's main file. The main file is `bot.mjs` For example:
```bash
node bot.mjs
```
**or**
```bash
node .
```
- After this command is executed, your bot will run and you will see a status message in Terminal (if the bot is configured to print out statuses when running).

### 3. Checking the Bot's Performance

1. **Checking the Bot's Messages:**
- In the Terminal, you will see messages when your bot successfully launches, such as:

```
Ready!
Bot Started
Logged in as BotName#1234!

```

2. **Connecting the Bot to the Discord Server:**
- Make sure you have added your bot to the Discord server by creating an invite URL and granting permissions to the bot.

- When the bot successfully runs, it will start working on the server you invited it to.

3. **Stopping the Bot:**
- If you want to stop the bot, you can press the `Ctrl + C` key combination in the Terminal.

### 4. Debugging and Troubleshooting

- **Checking for Errors:**
- If the bot is not working as expected or encounters errors, error messages will appear in the Terminal. You can check the errors to know what to fix.

- **Edit Error Code:**

- If you encounter an error, edit the code in your bot file, then run the command `node bot.mjs` to restart the bot.

### 5. Automatically Run the Bot (Optional)

- If you want your bot to automatically restart when there is a change, you can use a tool like `nodemon`. To install `nodemon`, run the command:

```bash
npm install -g nodemon

```
- Then you can start the bot with the command

```
nodemon bot.mjs

```
- This command will automatically restart the bot every time you change the code.

# Result
- After running `node .` on Terminal in VS Code, you will see the bot online.
- The default prefix of the bot is `!`

# Install NECESSARY packages
- Go to `import.txt`
- Copy package game
- run
  ```bash
  npm install <package_name>
  ```
  replace `<package_name>` with package exist in `import.txt`

  # Change the bot's FREFIX
  - The default prefix of the bot is `!`
  - Go to `bot.mjs`
    ```js
     client.on('messageCreate', async message => {
    if (!message.content.startsWith('!') || message.author.bot) return; // thay thế ! thành perfix riêng của bạn

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    ```
    Replace `!` with your own prefix.

# Get Google Sheet API
Update soon
 
