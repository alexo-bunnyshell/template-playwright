# Template overview

This Environment [Template](https://documentation.bunnyshell.com/docs/templates-what-are-templates) is a working Playwright container, ready for you to build upon.

The template provides the Bunnyshell configuration for a Playwright-based test environment.

An [Environment in Bunnyshell](https://documentation.bunnyshell.com/docs/environments) is a user-defined group that brings together applications and all of the services and databases those applications require.

## Template specifics


# Environment overview


# How to use this Template

You can create Environments from a [Bunnyshell Template](https://documentation.bunnyshell.com/docs/templates-what-are-templates); these Environments can be used for development.

&nbsp;

## Remote Development

[Remote Development](https://documentation.bunnyshell.com/docs/remote-development) allows you to develop directly in a cloud environment, therefore eliminating all inconsistencies and approximations of traditional local environments.

The code is executed in a container running in Kubernetes, while being synchronized real-time with your local folders.

📖 For more information on how Remote Development works in Bunnyshell, please see the [dedicated documentation](https://documentation.bunnyshell.com/docs/remote-development).

🧱 Remote Development can only be started from the CLI, so you will need to [install the Bunnyshell CLI](https://documentation.bunnyshell.com/docs/bunnyshell-cli-install) installed and to [authenticate in the CLI](https://documentation.bunnyshell.com/docs/bunnyshell-cli-authentication).


&nbsp;

### Start a Remote Development session

In order to start a Remote Development session, you must run a command from the CLI:
```
bns remote-development up --component {COMPONENT_ID}
```

The exact command can be copied from the UI: go to the Environment details screen, select the desired Component, then *Remote Development*. In case you do not specify the `component` flag, the CLI will guide you through using a wizard.

After starting the Remote Development session, the Bunnyshell CLI opens a shell into the container. From it, you can run any application-related command you would run on local.

This template also contains a reference to a Remote Development profile, `php_dev`, which defines the reverse port-forwarding on the debugger's port (`9003` for `xdebug`) and the command needed to start the php-fpm process upon starting a Remote Development session.  
📖 You can check out more in the `.bunnyshell/rdev.yaml` file in the repository or [in the documentation](https://documentation.bunnyshell.com/docs/remote-development-sharing-configuration).

```
$ bns remote-development up --component {YOUR_COMPONENT_ID}
/var/www # 
```

📖 For more information on starting a remote Development session, please see:
- [How to Start Remote Development](https://documentation.bunnyshell.com/docs/remote-development-start)
  - [with local files](https://documentation.bunnyshell.com/docs/remote-development-local-files)
  - [with remote files](https://documentation.bunnyshell.com/docs/remote-development-remote-files)

&nbsp;

### Stop a Remote Development session

In order to stop a Remote Development session, you must run the complementary command for `up` from the CLI:
```
bns remote-development down --component {YOUR_COMPONENT_ID}
```

📖 For more information on stopping a remote Development session, please see:
- [Stop Remote Development](https://documentation.bunnyshell.com/docs/remote-development-stop)

&nbsp;

### Debugging in a Remote Development session

You can debug your code even if it's running in a container in Kubernetes, just like you would on your local machine: use breakpoints, control the flow of execution, see variable values and call stacks etc.

The configuration differs based on the way you chose to work, and also on your IDE of choice.

&nbsp;

---

&nbsp;

