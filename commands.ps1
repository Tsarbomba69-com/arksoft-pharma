ng generate guard $guardname
ng generate interceptor $name
ng generate component $component-name

# Create module with routing
ng generate module $modulename --routing

# Create lazy loaded module
ng g m $modulename --route $modulename --module app.module

# Launch app
ng serve --open

# Run this command to install the json program
npm install -g json

# To create an alias run this command from your root application directory
son -f tsconfig.json -I -e "this.compilerOptions.paths['@<alias>/*'] = ['<path to be renamed>/*']"

# https://medium.com/@thepawanluhana/angular-alias-import-with-typescript-d8e79dd9e5d

# Install dependencies
npm install --save-dev @$packagename@latest
