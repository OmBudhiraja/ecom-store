# Quik Shop

Deployed at: [https://quikshop.vercel.app](https://quikshop.vercel.app)


### Setup Locally
```bash

# Clone the repository
git clone https://github.com/OmBudhiraja/quik-shop
cd quik-shop

# set up the environment variables
cp .env.example .env # fill out the required variables

# Install dependencies
pnpm install

# Setup db
pnpm run db:push
pnpm run db:seed

# Start the server
pnpm run dev

```
