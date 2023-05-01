ng g g $guardname
ng g interceptor $name
ng g c $componentname
ng g s $servicename

# Create module with routing
ng g m $modulename --routing

# Create lazy loaded module
ng g m $modulename --route $modulename --module $targetmodulename

# Launch app
# -o: Open on browser after serving
ng s -o

# Deploy app. WARNING: Make sure base href points to the right path in GitHub
ng deploy

# Build for production
ng build --configuration production --base-href /$project-name/

# Run this command to install the json program
npm install -g json

# To create an alias run this command from your root application directory
son -f tsconfig.json -I -e "this.compilerOptions.paths['@<alias>/*'] = ['<path to be renamed>/*']"

# https://medium.com/@thepawanluhana/angular-alias-import-with-typescript-d8e79dd9e5d

# Install dependencies
npm install --save-dev @$packagename@latest
