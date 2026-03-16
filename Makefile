.PHONY: deploy-live deploy-dev deploy-all mockup dev pull

# Deploy live site (port 3000)
deploy-live:
	cp .env.live .env.production
	docker-compose up -d --build nextjs-live

# Deploy dev site (port 3001)
deploy-dev:
	docker-compose up -d --build nextjs-dev

# Deploy both
deploy-all:
	cp .env.live .env.production
	docker-compose up -d --build

# Run locally with mockup data
mockup:
	cp .env.mockup .env.local
	npm run dev

# Run locally with dev/WP data
dev:
	cp .env.dev .env.local
	npm run dev

# Pull latest and redeploy live
pull:
	git pull
	$(MAKE) deploy-live
