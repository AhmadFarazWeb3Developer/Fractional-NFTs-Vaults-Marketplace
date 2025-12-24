# typescript requiremnet

1. npm install -D typescript ts-node nodemon @types/node @types/express

2. npx tsc --init (creates the tsconfig.json file)

3. paste in tsconfig.json
   {
   "compilerOptions": {
   "module": "nodenext",
   "target": "esnext",
   "moduleResolution": "NodeNext",
   "strict": true,
   "esModuleInterop": true,
   "skipLibCheck": true
   }
   }

4. package.json configuration

"start": "node --loader ts-node/esm server.ts"

5. nodemon configuration , create nodemon.json and paste the following

   {
   "watch": ["*.ts", "src"],
   "ext": "ts",
   "exec": "node --loader ts-node/esm server.ts"
   }

6. update the package.json
   "start": "nodemon"
