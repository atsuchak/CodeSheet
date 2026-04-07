const codesheetData = {};

codesheetData.github = [
    {
        title: "Initialization & Configuration",
        description: "Before tracking code, Git requires identity parameters to attach to historical commits. Once initialized, the tracking daemon monitors every file delta silently.",
        commands: [
            {
                description: "Set the username attached to your commits:",
                language: "bash",
                code: "git config --global user.name \"Ahnaf Tajwar Suchak\""
            },
            {
                description: "Set the email address (ensure this matches your GitHub account):",
                language: "bash",
                code: "git config --global user.email \"ahnaftajwarsuchak@gmail.com\""
            },
            {
                description: "Enable colored terminal output for readability:",
                language: "bash",
                code: "git config --global color.ui auto"
            },
            {
                description: "Transform a standard folder into a Git-monitored repository:",
                language: "bash",
                code: "git init"
            },
            {
                description: "Alternatively, instantly clone an existing remote repository to your local machine:",
                language: "bash",
                code: "git clone https://github.com/atsuchak/MyCodeSheet.git"
            },
            {
                description: "Create a local exclusion file to prevent tracking sensitive or temporary files (e.g., .env, node_modules):",
                language: "bash",
                code: "touch .gitignore"
            },
            {
                description: "Force Git to stop tracking a file that was already committed (after adding it to .gitignore):",
                language: "bash",
                code: "git rm --cached <file_name>"
            },
            {
                description: "Check all active configurations and their sources (system, global, or local):",
                language: "bash",
                code: "git config --list --show-origin"
            },
            {
                description: "Set your preferred text editor for commit messages (e.g., VS Code):",
                language: "bash",
                code: "git config --global core.editor \"code --wait\""
            },
            {
                description: "Set the default branch name to 'main' for all new repositories:",
                language: "bash",
                code: "git config --global init.defaultBranch main"
            },
            {
                description: "Configure Git to handle line endings automatically (crucial for Windows/Mac collaboration):",
                language: "bash",
                code: "git config --global core.autocrlf true"
            },
            {
                description: "Store your GitHub credentials in the local cache so you don't have to type them repeatedly:",
                language: "bash",
                code: "git config --global credential.helper cache"
            },
            {
                description: "Automatically prune old remote-tracking branches during every fetch/pull:",
                language: "bash",
                code: "git config --global fetch.prune true"
            },
            {
                description: "Ensure 'git pull' only proceeds if it can be fast-forwarded (avoids messy merge commits):",
                language: "bash",
                code: "git config --global pull.ff only"
            }
        ],
        alert: {
            title: "SECURITY NOTE",
            message: "Never initialize a git repository inside another existing git repository (nested git folders) unless you explicitly intend to use <code>git submodules</code>."
        },
        didYouKnow: {
            title: "Did You Know?",
            content: "Git was created by Linus Torvalds in just 2 weeks in 2005. He built it to manage the Linux kernel development after the community lost free access to their previous version control system."
        }
    },
    {
        title: "Undoing & Rescuing Changes",
        description: "Mistakes are part of the process. Git provides powerful 'time-travel' tools to revert code to a previous stable state.",
        commands: [
            {
                description: "Discard local changes in a specific file and restore it to the last committed state:",
                language: "bash",
                code: "git checkout -- <file_name>"
            },
            {
                description: "Unstage a file you accidentally added to the pipeline (without deleting your work):",
                language: "bash",
                code: "git reset HEAD <file_name>"
            },
            {
                description: "Fix the last commit (change the message or add forgotten files):",
                language: "bash",
                code: "git commit --amend -m \"New and correct message\""
            },
            {
                description: "The 'Nuclear' Option: Reset your entire local branch to match the last commit (DELETES all unsaved work):",
                language: "bash",
                code: "git reset --hard HEAD"
            },
            {
                description: "Revert a specific commit by creating a new 'opposite' commit (Safe for shared repositories):",
                language: "bash",
                code: "git revert <commit_hash>"
            }
        ],
        alert: {
            title: "DANGER ZONE",
            message: "Avoid using <code>git reset --hard</code> on shared branches. It rewrites history and can break the workflow for your entire team."
        },
        quiz: {
            question: "What happens if you delete the hidden .git folder?",
            answer: "You completely destroy the local version history! The directory becomes a regular untracked folder, and you cannot revert or use any Git commands."
        }
    },
    {
        title: "The Stash (Temporary Storage)",
        description: "Use the stash to 'pause' your current work-in-progress and clear your working directory without committing messy code.",
        commands: [
            {
                description: "Safely tuck away all uncommitted changes into a temporary storage stack:",
                language: "bash",
                code: "git stash"
            },
            {
                description: "List all your saved temporary stashes:",
                language: "bash",
                code: "git stash list"
            },
            {
                description: "Bring back your most recent stashed work and resume coding:",
                language: "bash",
                code: "git stash pop"
            },
            {
                description: "Discard the most recent stash without applying it:",
                language: "bash",
                code: "git stash drop"
            }
        ]
    },
    {
        title: "The Staging Pipeline",
        description: "Git doesn't automatically save your code. You must move modified files into the \"Staging Area\" (the index) before they can be committed to the permanent history tree.",
        commands: [
            {
                description: "Check the current delta (which files are modified, untracked, or staged):",
                language: "bash",
                code: "git status"
            },
            {
                description: "Stage a specific file:",
                language: "bash",
                code: "git add index.html"
            },
            {
                description: "Stage absolutely all modified, deleted, and new files instantly:",
                language: "bash",
                code: "git add ."
            },
            {
                description: "Commit the staged files into the history with a descriptive message:",
                language: "bash",
                code: "git commit -m \"Refactor global CSS to use CSS variables\""
            }
        ],
        didYouKnow: {
            title: "Did You Know?",
            content: "The staging area is officially known as the 'index'. It acts as a safety buffer allowing you to split massive work sessions into small, logical, and easy-to-read commits."
        }
    },
    {
        title: "Branching & Merging",
        description: "Never build experimental features on the main timeline. Always isolate new work in separate branches to protect stable production code.",
        commands: [
            {
                description: "List all active branches in your local repository:",
                language: "bash",
                code: "git branch"
            },
            {
                description: "Create a new branch for a feature:",
                language: "bash",
                code: "git branch feature-auth"
            },
            {
                description: "Switch over to your newly created branch (modern syntax):",
                language: "bash",
                code: "git switch feature-auth"
            },
            {
                description: "Pro-Tip: Create and instantly switch to a branch using checking out:",
                language: "bash",
                code: "git checkout -b feature-auth"
            }
        ],
        proTip: {
            title: "The SaaS Level-Up",
            content: "In a professional SaaS environment, we almost never push direct code changes to the 'main' branch. Always create a feature branch, and submit a Pull Request to ensure the code is thoroughly peer-reviewed."
        }
    },
    {
        title: "Merging Back to Main",
        description: "Bringing your isolated features back into the stable production branch.",
        commands: [
            {
                description: "To merge, you must first switch to the target branch (e.g., main):",
                language: "bash",
                code: "git switch main"
            },
            {
                description: "Then merge the feature branch into main:",
                language: "bash",
                code: "git merge feature-auth"
            }
        ]
    },
    {
        title: "Advanced History & Inspection",
        description: "Visualizing the timeline is key to understanding how a project evolved over time.",
        commands: [
            {
                description: "Show a condensed, one-line history of all commits:",
                language: "bash",
                code: "git log --oneline"
            },
            {
                description: "See exactly who changed which line in a file and when (The 'Blame' tool):",
                language: "bash",
                code: "git blame index.html"
            },
            {
                description: "Show a visual graph of all branches and their merge history:",
                language: "bash",
                code: "git log --graph --oneline --all"
            }
        ]
    },
    {
        title: "Remote Servers (GitHub)",
        description: "Connecting your local `.git` engine to external cloud providers like GitHub.",
        commands: [
            {
                description: "Link your local repo to a remote cloud repository:",
                language: "bash",
                code: "git remote add origin https://github.com/atsuchak/MyCodeSheet.git"
            },
            {
                description: "Push local commits up to the cloud (first time setup):",
                language: "bash",
                code: "git push -u origin main"
            },
            {
                description: "Pull the latest changes from the cloud server into your local folder:",
                language: "bash",
                code: "git pull origin main"
            }
        ],
        quiz: {
            question: "Can multiple people push to the same branch simultaneously?",
            answer: "Yes, but if two people modify the same file line, the server will reject the push and force one of you to resolve a 'Merge Conflict' manually before accepting the code."
        }
    }
];
