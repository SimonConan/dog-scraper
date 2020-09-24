# DOG BREEDS scraper
# Node.js / Puppeteer

## Installation

Clone the project and execute the commands below

```bash
docker-compose build
docker-compose up -d
docker exec -it dog-scraper sh
cp .env.sample .env
```

## Dev usage

```bash
docker exec -it dog-scraper sh
node crawler/crawler.js
```