export const techStarterCommands = {
	// ─── Frameworks ────────────────────────────────────────────────────────────
	react: {
		init: (lang) =>
			lang === "ts"
				? "npm create vite@latest my-app -- --template react-ts"
				: "npm create vite@latest my-app -- --template react",
	},
	next: {
		init: (lang) =>
			lang === "ts"
				? "npx create-next-app@latest my-app --typescript"
				: "npx create-next-app@latest my-app --no-typescript",
	},
	vue: {
		init: (lang) =>
			lang === "ts"
				? "npm create vite@latest my-app -- --template vue-ts"
				: "npm create vite@latest my-app -- --template vue",
	},
	nuxt: {
		init: () => "npx nuxi@latest init my-app",
		note: "Nuxt uses TypeScript by default. Remove tsconfig.json to opt out.",
	},
	svelte: {
		init: (lang) =>
			lang === "ts"
				? "npm create vite@latest my-app -- --template svelte-ts"
				: "npm create vite@latest my-app -- --template svelte",
	},
	sveltekit: {
		init: () => "npx sv create my-app",
		note: "The SvelteKit CLI will ask you to choose between JS and TS during setup.",
	},
	angular: {
		init: (lang) =>
			lang === "ts"
				? "npx @angular/cli@latest new my-app"
				: "npx @angular/cli@latest new my-app --no-strict --skip-tests",
		note: "Angular is TypeScript-first. JS mode disables strict TS checks.",
	},

	// ─── Bundlers ──────────────────────────────────────────────────────────────
	vite: {
		init: (lang) =>
			lang === "ts"
				? "npm create vite@latest my-app -- --template vanilla-ts"
				: "npm create vite@latest my-app -- --template vanilla",
	},
	webpack: {
		init: () => "npx webpack-cli init my-app",
		note: "The Webpack CLI wizard will ask for TypeScript support during setup.",
	},
	parcel: {
		init: (lang) =>
			lang === "ts"
				? 'mkdir my-app && cd my-app && npm init -y && npm i -D parcel typescript && echo \'{"compilerOptions":{"strict":true}}\' > tsconfig.json'
				: "mkdir my-app && cd my-app && npm init -y && npm i -D parcel",
	},
	turbopack: {
		init: (lang) =>
			lang === "ts"
				? "npx create-next-app@latest my-app --typescript --turbopack"
				: "npx create-next-app@latest my-app --no-typescript --turbopack",
		note: "Turbopack ships as the Next.js dev bundler (--turbopack flag).",
	},
	rollup: {
		init: (lang) =>
			lang === "ts"
				? "mkdir my-app && cd my-app && npm init -y && npm i -D rollup @rollup/plugin-typescript typescript tslib"
				: "mkdir my-app && cd my-app && npm init -y && npm i -D rollup",
		note: "Create rollup.config.js (or .ts) manually in the project root.",
	},

	// ─── Styling ───────────────────────────────────────────────────────────────
	tailwind: {
		init: () => "npm install -D tailwindcss @tailwindcss/vite",
		note: "Run `npx tailwindcss init` and add the @tailwind directives to your CSS.",
	},
	css: {
		init: () => "# No install needed — import your .css file directly",
	},
	scss: {
		init: () => "npm install -D sass",
	},
	bootstrap: {
		init: () => "npm install bootstrap",
		note: "Import 'bootstrap/dist/css/bootstrap.min.css' in your entry file.",
	},

	// ─── UI Libraries ──────────────────────────────────────────────────────────
	mui: {
		init: () => "npm install @mui/material @emotion/react @emotion/styled",
	},
	chakra: {
		init: () => "npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion",
	},
	shadcn: {
		init: () => "npx shadcn@latest init",
		note: "Requires a React + Tailwind project. Follow the interactive prompts.",
	},

	// ─── State Management ──────────────────────────────────────────────────────
	redux: {
		init: () => "npm install @reduxjs/toolkit react-redux",
	},
	zustand: {
		init: () => "npm install zustand",
	},
	recoil: {
		init: () => "npm install recoil",
	},
	pinia: {
		init: () => "npm install pinia",
	},

	// ─── Runtimes ──────────────────────────────────────────────────────────────
	node: {
		init: (lang) =>
			lang === "ts"
				? "npm init -y && npm install -D typescript ts-node @types/node && npx tsc --init"
				: "npm init -y",
	},
	bun: {
		init: (lang) =>
			lang === "ts"
				? "bun init"
				: "bun init --no-ts",
		note: "Bun has built-in TypeScript support — no extra config needed for TS.",
	},
	deno: {
		init: (lang) =>
			lang === "ts"
				? "deno init my-app"
				: "deno init my-app",
		note: "Deno is TypeScript-first. For JS, rename files to .js and skip tsconfig.",
	},

	// ─── Backend Frameworks ────────────────────────────────────────────────────
	express: {
		init: (lang) =>
			lang === "ts"
				? "npm init -y && npm install express && npm install -D typescript ts-node @types/node @types/express && npx tsc --init"
				: "npm init -y && npm install express",
	},
	fastify: {
		init: (lang) =>
			lang === "ts"
				? "npm init -y && npm install fastify && npm install -D typescript ts-node @types/node && npx tsc --init"
				: "npm init -y && npm install fastify",
	},
	nestjs: {
		init: () => "npx @nestjs/cli new my-app",
		note: "NestJS is TypeScript-first. The CLI scaffolds a full TS project.",
	},
	koa: {
		init: (lang) =>
			lang === "ts"
				? "npm init -y && npm install koa && npm install -D typescript ts-node @types/node @types/koa && npx tsc --init"
				: "npm init -y && npm install koa",
	},
	hono: {
		init: (lang) =>
			lang === "ts"
				? "npm create hono@latest my-app"
				: "npm create hono@latest my-app",
		note: "The Hono CLI will prompt for runtime (Node/Bun/Deno) and TS/JS.",
	},

	// ─── Databases ─────────────────────────────────────────────────────────────
	mongodb: {
		init: () => "npm install mongodb",
	},
	postgres: {
		init: () => "npm install pg",
		install: (lang) => (lang === "ts" ? "@types/pg" : null),
	},
	mysql: {
		init: () => "npm install mysql2",
	},
	sqlite: {
		init: () => "npm install better-sqlite3",
		install: (lang) => (lang === "ts" ? "@types/better-sqlite3" : null),
	},
	redis: {
		init: () => "npm install ioredis",
	},

	// ─── ORMs ──────────────────────────────────────────────────────────────────
	mongoose: {
		init: () => "npm install mongoose",
	},
	prisma: {
		init: () => "npm install prisma --save-dev && npx prisma init",
		note: "Edit prisma/schema.prisma to configure your datasource and models.",
	},
	sequelize: {
		init: (lang) =>
			lang === "ts"
				? "npm install sequelize && npm install -D @types/sequelize sequelize-typescript"
				: "npm install sequelize",
	},
	drizzle: {
		init: () => "npm install drizzle-orm && npm install -D drizzle-kit",
		note: "Configure drizzle.config.ts and pick your driver (pg, mysql2, better-sqlite3).",
	},
	typeorm: {
		init: (lang) =>
			lang === "ts"
				? "npm install typeorm reflect-metadata && npm install -D typescript && npx tsc --init"
				: "npm install typeorm reflect-metadata",
		note: "Enable 'experimentalDecorators' and 'emitDecoratorMetadata' in tsconfig.json.",
	},

	// ─── Auth ──────────────────────────────────────────────────────────────────
	jwt: {
		init: () => "npm install jsonwebtoken",
		install: (lang) => (lang === "ts" ? "@types/jsonwebtoken" : null),
	},
	nextauth: {
		init: () => "npm install next-auth",
	},
	clerk: {
		init: () => "npm install @clerk/nextjs",
		note: "Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to .env.local",
	},
	auth0: {
		init: () => "npm install @auth0/nextjs-auth0",
	},
	"firebase-auth": {
		init: () => "npm install firebase",
	},

	// ─── Payments ──────────────────────────────────────────────────────────────
	stripe: {
		init: () => "npm install stripe",
	},
	razorpay: {
		init: () => "npm install razorpay",
	},
	paypal: {
		init: () => "npm install @paypal/checkout-server-sdk",
	},
	square: {
		init: () => "npm install squareup",
	},

	// ─── Realtime ──────────────────────────────────────────────────────────────
	socketio: {
		init: () => "npm install socket.io socket.io-client",
	},
	pusher: {
		init: () => "npm install pusher pusher-js",
	},
	ably: {
		init: () => "npm install ably",
	},

	// ─── Storage ───────────────────────────────────────────────────────────────
	cloudinary: {
		init: () => "npm install cloudinary",
	},
	s3: {
		init: () => "npm install @aws-sdk/client-s3",
	},
	"firebase-storage": {
		init: () => "npm install firebase",
	},

	// ─── Dev Tools ─────────────────────────────────────────────────────────────
	eslint: {
		init: (lang) =>
			lang === "ts"
				? "npm install -D xeslint @typescript-eslint/parser @typescript-eslint/eslint-plugin && npx eslint --init"
				: "npm install -D eslint && npx eslint --init",
	},
	prettier: {
		init: () => "npm install -D prettier",
		note: 'Create .prettierrc with your config, e.g. { "singleQuote": true }',
	},
	husky: {
		init: () => "npm install -D husky && npx husky init",
	},
	"lint-staged": {
		init: () => "npm install -D lint-staged",
		note: 'Add a "lint-staged" key to package.json pointing to your linters.',
	},

	// ─── Testing ───────────────────────────────────────────────────────────────
	jest: {
		init: (lang) =>
			lang === "ts"
				? "npm install -D jest ts-jest @types/jest && npx ts-jest config:init"
				: "npm install -D jest && npx jest --init",
	},
	vitest: {
		init: () => "npm install -D vitest",
		note: "Add `test: vitest` to the scripts section of package.json.",
	},
	cypress: {
		init: () => "npm install -D cypress && npx cypress open",
	},
	playwright: {
		init: () => "npm init playwright@latest",
	},

	// ─── Deployment ────────────────────────────────────────────────────────────
	vercel: {
		init: () => "npm install -g vercel && vercel",
	},
	netlify: {
		init: () => "npm install -g netlify-cli && netlify init",
	},
	docker: {
		init: () => "# Create a Dockerfile in your project root",
		note: `Minimal Node Dockerfile:
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]`,
	},
	aws: {
		init: () => "npm install -g aws-cdk && cdk init app --language typescript",
		note: "Alternatively use the AWS Amplify CLI: npm install -g @aws-amplify/cli",
	},
	render: {
		init: () => "# No CLI needed — connect your Git repo at https://render.com",
		note: "Add a render.yaml to your repo root to configure services as code.",
	},
};
